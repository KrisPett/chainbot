import {NextApiRequest, NextApiResponse} from "next";
import AWS from "aws-sdk";
import process from "process";
import {decode} from "jsonwebtoken";
import {UpdateItemInput} from "aws-sdk/clients/dynamodb";
import {v4 as uuidv4} from 'uuid';

const updatedynamoDB = new AWS.DynamoDB({
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_REACT_APP_AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.NEXT_PUBLIC_REACT_APP_AWS_SECRET_ACCESS_KEY || ""
  },
  region: process.env.NEXT_PUBLIC_REACT_APP_AWS_REGION || ""
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const images = {
    "L": [{
      "M": {
        "images": {
          "L": [
            {"M": {"imageId": {"S": uuidv4()}, "url": {"S": "https://s3.amazonaws.com/"}}},
            {"M": {"imageId": {"S": uuidv4()}, "url": {"S": "https://s3.amazonaws.com/"}}},
            {"M": {"imageId": {"S": uuidv4()}, "url": {"S": "https://s3.amazonaws.com/"}}},
            {"M": {"imageId": {"S": uuidv4()}, "url": {"S": "https://s3.amazonaws.com/"}}}
          ]
        },
        "imagesCollectionId": {"S": uuidv4()},
        "timestamp": {"S": new Date().toISOString()}
      }
    }]
  }
  const access_token = req.headers.authorization
  const token = access_token?.replace('Bearer ', '')
  if (token) {
    const subId = decode(token)?.sub as string
    const params: UpdateItemInput = {
      TableName: "user-images-test",
      Key: {"userId": {"S": subId}},
      UpdateExpression: "SET #images = list_append(#images, :new_images)",
      ExpressionAttributeNames: {"#images": "imagesCollection"},
      ExpressionAttributeValues: {":new_images": images},
    }
    console.log(images.L[0].M.imagesCollectionId.S)
    try {
      const data = await updatedynamoDB.updateItem(params).promise();
      console.log(data);
      res.status(200).json({message: 'Table created successfully'});
    } catch (err) {
      console.log(err);
      res.status(500).json({message: 'Failed to create table'});
    }
  }
}
export default handler;
