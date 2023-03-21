import {NextApiRequest, NextApiResponse} from "next";
import AWS from "aws-sdk";
import process from "process";

const dynamodb = new AWS.DynamoDB({
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_REACT_APP_AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.NEXT_PUBLIC_REACT_APP_AWS_SECRET_ACCESS_KEY || ""
  },
  region: process.env.NEXT_PUBLIC_REACT_APP_AWS_REGION || ""
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const params = {
    TableName: 'my_table',
    KeySchema: [
      { AttributeName: 'partitionKey', KeyType: 'HASH' }, // Replace with your partition key attribute name
    ],
    AttributeDefinitions: [
      { AttributeName: 'partitionKey', AttributeType: 'S' }, // Replace with your partition key attribute type
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5, // Change to your preferred read capacity units
      WriteCapacityUnits: 5, // Change to your preferred write capacity units
    },
  };

  try {
    const data = await dynamodb.createTable(params).promise();
    console.log(data);
    res.status(200).json({ message: 'Table created successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to create table' });
  }
}
export default handler;
