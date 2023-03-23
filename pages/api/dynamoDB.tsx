import {NextApiRequest, NextApiResponse} from "next";
import AWS from "aws-sdk";
import process from "process";
import {decode} from "jsonwebtoken";
import {UpdateItemInput} from "aws-sdk/clients/dynamodb";
import {v4 as uuidv4} from 'uuid';

const dynamodb = new AWS.DynamoDB({
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
            {"M": {"imageId": {"S": uuidv4()}, "url": {"S": "https://s3.amazonaws.com/chainbot.chaincuet.com.storage/imagebot/cb9a75a2-2553-4c9f-ab0a-1388c54d6621"}}},
            {"M": {"imageId": {"S": uuidv4()}, "url": {"S": "https://s3.amazonaws.com/chainbot.chaincuet.com.storage/imagebot/09ed4bf2-e43c-4a25-804b-5f55bc94090d"}}},
            {"M": {"imageId": {"S": uuidv4()}, "url": {"S": "https://s3.amazonaws.com/chainbot.chaincuet.com.storage/imagebot/a49da393-db67-4886-951c-a9a63b66348b"}}},
            {"M": {"imageId": {"S": uuidv4()}, "url": {"S": "https://s3.amazonaws.com/chainbot.chaincuet.com.storage/imagebot/f0116257-4c8d-4edb-b48e-cbe500a67d6a"}}}
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
      const data = await dynamodb.updateItem(params).promise();
      console.log(data);
      res.status(200).json({message: 'Table created successfully'});
    } catch (err) {
      console.log(err);
      res.status(500).json({message: 'Failed to create table'});
    }
  }
}
export default handler;
