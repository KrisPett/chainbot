import {Configuration, OpenAIApi} from "openai";
import {NextApiRequest, NextApiResponse} from "next";
import axios from "axios";
import {v4 as uuidv4} from 'uuid';
import AWS from "aws-sdk";
import {decode} from "jsonwebtoken";
import {UpdateItemInput} from "aws-sdk/clients/dynamodb";
import process from "process";
import {ImagesCollection} from "@/components/imagebot/models/interfaces";

const awsCredentialsOptions = {
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_REACT_APP_AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.NEXT_PUBLIC_REACT_APP_AWS_SECRET_ACCESS_KEY || ""
  },
  region: process.env.NEXT_PUBLIC_REACT_APP_AWS_REGION || ""
}

const s3 = new AWS.S3(awsCredentialsOptions),
  dynamodb = new AWS.DynamoDB(awsCredentialsOptions);


const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPEN_AI,
});

const openai = new OpenAIApi(configuration);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  const {text} = req.body;
  const access_token = req.headers.authorization
  const token = access_token?.replace('Bearer ', '')
  if (!token) {
    return res.status(401).json({message: 'Unauthorized'})
  }

  const dynamoDBParam: ImagesCollection = {
    "L": [{
      "M": {
        "images": {"L": []},
        "imagesCollectionId": {"S": uuidv4()},
        "timestamp": {"S": new Date().toISOString()}
      }
    }]
  }

  openai.createImage({prompt: text, n: 1, size: "256x256"})
    .then(async (data) => {
      const responseImages = [];
      if (data.data.data) {
        const urls = data.data.data
        for (const url of urls) {
          if (url.url) {
            const response = await axios.get(url.url, {responseType: 'arraybuffer'});
            const uuid = uuidv4();
            const s3Params = {
              Bucket: 'chainbot.chaincuet.com.storage',
              Key: 'imagebot/' + uuid,
              Body: response.data,
              ContentType: response.headers['content-type'],
            };
            const result = await s3.upload(s3Params).promise();
            console.log(`File uploaded successfully. Location:`, result.Location);
            console.log(`File uploaded successfully. Key:`, result.Key);
            responseImages.push(result.Key);
            dynamoDBParam.L[0].M.images.L.push({
              "M": {
                "imageId": {"S": uuidv4()},
                "url": {"S": result.Location}
              }
            })
          }
        }
        if (token) {
          const subId = decode(token)?.sub as string
          const params: UpdateItemInput = {
            TableName: "user_images",
            Key: {"userId": {"S": subId}},
            UpdateExpression: "SET #images = list_append(#images, :new_images)",
            ExpressionAttributeNames: {"#images": "imagesCollection"},
            ExpressionAttributeValues: {":new_images": dynamoDBParam as any},
          }
          const data = await dynamodb.updateItem(params).promise();
          console.log("Uploaded to dynamoDB successfully: " + data)
        }
      }
      res.status(200).json(responseImages);
    })
    .catch((error) => {
      console.error('Error creating images:', error);
      res.status(500).json({message: 'Error creating images'});
    });
};

export default handler;
