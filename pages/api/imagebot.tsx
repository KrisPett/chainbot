import {Configuration, CreateCompletionResponse, ImagesResponse, OpenAIApi} from "openai";
import {NextApiRequest, NextApiResponse} from "next";
import axios from "axios";
import {ImagesRequest, ImageUrl} from "@/components/imagebot/ImageModel";
import {v4 as uuidv4} from 'uuid';
import AWS from "aws-sdk";

const s3 = new AWS.S3({
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_REACT_APP_AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.NEXT_PUBLIC_REACT_APP_AWS_SECRET_ACCESS_KEY || ""
  },
  region: process.env.NEXT_PUBLIC_REACT_APP_AWS_REGION || ""
});

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPEN_AI,
});

const openai = new OpenAIApi(configuration);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {text} = req.body;

  openai.createImage({prompt: text, n: 4, size: "256x256"})
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
            responseImages.push(result.Location);
          }
        }
      }
      res.status(200).json(responseImages);
    })
    .catch((error) => {
      console.error('Error creating images:', error);
      res.status(500).json({message: 'Error creating images'});
    });
};

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   const {text} = req.body;
//   const response = await openai.createImage({prompt: text, n: 4, size: "256x256"})
//     .then((data) => {
//       let request = data.request() as ImagesResponse;
//       data.data = request.data;
//     })
//   // return res.status(200).json(response.data);
//   const images = response as unknown as ImagesResponse;
//
//   const responseImages = [];
//
//   try {
//     for (let i = 0; i < images.data.length; i++) {
//       const response = await axios.get(images.data[i].url, {responseType: 'arraybuffer'});
//       const uuid = uuidv4();
//       const s3Params = {
//         Bucket: 'chainbot.chaincuet.com.storage',
//         Key: 'imagebot/' + uuid,
//         Body: response.data,
//         ContentType: response.headers['content-type'],
//       };
//       const result = await s3.upload(s3Params).promise();
//       console.log(`File ${i + 1} uploaded successfully. Location:`, result.Location);
//       responseImages.push(result.Location)
//     }
//     res.status(200).json(responseImages);
//   } catch (error) {
//     console.error('Error uploading file:', error);
//     res.status(500).json({message: 'Error uploading file'});
//   }
//
// };

export default handler;
