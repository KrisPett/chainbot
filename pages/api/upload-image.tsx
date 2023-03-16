import {NextApiRequest, NextApiResponse} from "next";
import AWS from "aws-sdk";
import process from "process";
import axios from "axios";
import {ImagesRequest} from "@/components/imagebot/ImageModel";
import { v4 as uuidv4 } from 'uuid';

const s3 = new AWS.S3({
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_REACT_APP_AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.NEXT_PUBLIC_REACT_APP_AWS_SECRET_ACCESS_KEY || ""
  },
  region: process.env.NEXT_PUBLIC_REACT_APP_AWS_REGION || ""
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const urls: ImagesRequest = req.body;
  try {
    for (let i = 0; i < urls.imageUrls.length; i++) {
      const response = await axios.get(urls.imageUrls[i].url, {responseType: 'arraybuffer'});
      const uuid = uuidv4();
      const s3Params = {
        Bucket: 'chainbot.chaincuet.com.storage',
        Key: 'imagebot/' + uuid,
        Body: response.data,
        ContentType: response.headers['content-type'],
      };
      const result = await s3.upload(s3Params).promise();
      console.log(`File ${i + 1} uploaded successfully. Location:`, result.Location);
    }
    res.status(200).json({message: 'Success'});
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({message: 'Error uploading file'});
  }
};

export default handler;
