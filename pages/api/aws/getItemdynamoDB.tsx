import {NextApiRequest, NextApiResponse} from "next";
import AWS from "aws-sdk";
import process from "process";
import {decode} from "jsonwebtoken";
import {GetItemInput} from "aws-sdk/clients/dynamodb";
import {ImagesCollection, UserImages} from "@/components/imagebot/models/interfaces";

const updatedynamoDB = new AWS.DynamoDB({
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
    const subId = decode(token)?.sub as string
    const params: GetItemInput = {
      TableName: "user_images",
      Key: {"userId": {"S": subId}}
    }
    try {
      const data = await updatedynamoDB.getItem(params).promise();
      const item = data.Item as unknown as UserImages;
      const imagesCollection = item.imagesCollection;
      res.status(200).json(imagesCollection);
    } catch (err) {
      console.log(err);
      res.status(500).json({message: 'Failed to get item'});
    }
  }
}
export default handler;
