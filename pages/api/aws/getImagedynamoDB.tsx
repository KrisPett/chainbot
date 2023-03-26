import {NextApiRequest, NextApiResponse} from "next";
import AWS from "aws-sdk";
import process from "process";
import {decode} from "jsonwebtoken";
import {GetItemInput, QueryInput} from "aws-sdk/clients/dynamodb";
import {ImagesCollection, UserImages} from "@/components/imagebot/models/interfaces";
import {adapter} from "next/dist/server/web/adapter";

const dynamoDb = new AWS.DynamoDB({
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_REACT_APP_AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.NEXT_PUBLIC_REACT_APP_AWS_SECRET_ACCESS_KEY || ""
  },
  region: process.env.NEXT_PUBLIC_REACT_APP_AWS_REGION || ""
});

const docClient = new AWS.DynamoDB.DocumentClient({
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_REACT_APP_AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.NEXT_PUBLIC_REACT_APP_AWS_SECRET_ACCESS_KEY || ""
  },
  region: process.env.NEXT_PUBLIC_REACT_APP_AWS_REGION || ""
});


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const access_token = req.headers.authorization
  const token = access_token?.replace('Bearer ', '')
  console.log(token)
  if (token) {
    // const subId = decode(token)?.sub as string
    const subId = "267e9859-3351-4194-9ae7-f73a5ed9ef11"
    const imagesCollectionId = "53ceeda8-e6fe-4f53-ab65-c8e0b1de5dbf"

    // const params: QueryInput = {
    //   TableName: 'user_images',
    //   KeyConditionExpression: 'userId = :userId and imagesCollectionId = :imagesCollectionId',
    //   // ExpressionAttributeValues: {
    //   //   ':userId': { S: subId },
    //   //   ':imagesCollectionId': { S: imagesCollectionId }
    //   // },
    //   // ExpressionAttributeNames: {"#imagesCollection": "imagesCollection" },
    //   FilterExpression: 'contains(imagesCollection.imagesCollectionId, :imagesCollectionId)',
    //   ExpressionAttributeValues: {
    //     ':userId': { S: subId },
    //     ':imagesCollectionId': { S: imagesCollectionId }
    //   },
    //   // FilterExpression: 'contains(#imagesCollection, :imagesCollectionId)',
    //
    // };

    const params = {
      TableName: "user_images",
      KeyConditionExpression: "userId = :userId",
      FilterExpression: "contains(imagesCollection[0].imagesCollectionId, :imagesCollectionId)",
      ExpressionAttributeValues: {
        ":userId": { S: subId },
        ":imagesCollectionId": { S: imagesCollectionId }
      }
    };

    try {
      const data = await dynamoDb.query(params).promise();
      console.log(data)
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json({message: 'Failed to get item'});
    }
  }
}
export default handler;
