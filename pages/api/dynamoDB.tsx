import {NextApiRequest, NextApiResponse} from "next";
import AWS, {DynamoDB} from "aws-sdk";
import process from "process";
import jwt, {decode} from "jsonwebtoken";
import {CreateTableInput, PutItemInput, PutItemInputAttributeMap, UpdateItemInput} from "aws-sdk/clients/dynamodb";

const dynamodb = new AWS.DynamoDB({
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_REACT_APP_AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.NEXT_PUBLIC_REACT_APP_AWS_SECRET_ACCESS_KEY || ""
  },
  region: process.env.NEXT_PUBLIC_REACT_APP_AWS_REGION || ""
});

export const images = {
    "M": {
      "images": {
        "L": [
          {
            "M": {
              "imageId": {
                "S": "cb9a75a2-2553-4c9f-ab0a-1388c54d6621"
              },
              "url": {
                "S": "https://s3.amazonaws.com/chainbot.chaincuet.com.storage/imagebot/cb9a75a2-2553-4c9f-ab0a-1388c54d6621"
              }
            }
          },
          {
            "M": {
              "imageId": {
                "S": "09ed4bf2-e43c-4a25-804b-5f55bc94090d"
              },
              "url": {
                "S": "https://s3.amazonaws.com/chainbot.chaincuet.com.storage/imagebot/09ed4bf2-e43c-4a25-804b-5f55bc94090d"
              }
            }
          },
          {
            "M": {
              "imageId": {
                "S": "a49da393-db67-4886-951c-a9a63b66348b"
              },
              "url": {
                "S": "https://s3.amazonaws.com/chainbot.chaincuet.com.storage/imagebot/a49da393-db67-4886-951c-a9a63b66348b"
              }
            }
          },
          {
            "M": {
              "imageId": {
                "S": "f0116257-4c8d-4edb-b48e-cbe500a67d6a"
              },
              "url": {
                "S": "https://s3.amazonaws.com/chainbot.chaincuet.com.storage/imagebot/f0116257-4c8d-4edb-b48e-cbe500a67d6a"
              }
            }
          }
        ]
      },
      "imagesCollectionId": {
        "S": "5ec5d9a2-3104-4472-89ad-fc45bf4ade51"
      },
      "timestamp": {
        "S": "2022-03-21T10:30:00Z"
      }
    }
}


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const access_token = req.headers.authorization
  const token = access_token?.replace('Bearer ', '')
  if (token) {
    const subId = decode(token)?.sub as string
    const params: UpdateItemInput = {
      TableName: "user-images-test",
      Key: {"userId": {"S": subId}},
      UpdateExpression: "SET #images = list_append(#images, :new_images)",
      ExpressionAttributeNames: {"#images": "imagesCollection"},
      ExpressionAttributeValues: {
        ":new_images": {"M": images.M}
      },
    }

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
