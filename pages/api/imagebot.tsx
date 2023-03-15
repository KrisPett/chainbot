import {Configuration, CreateCompletionResponse, ImagesResponse, OpenAIApi} from "openai";
import {NextApiRequest, NextApiResponse} from "next";

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPEN_AI,
});

const openai = new OpenAIApi(configuration);

const upload = async () => {
  const form = new FormData();

  fetch('<link to the image>')
    .then((res) => res.blob())
    .then((blob) => {
      const file = new File([blob], 'image', {
        type: blob.type,
      });

      form.append('image', file);
      return file
    });
};



const handler = async (req: NextApiRequest, res: NextApiResponse<ImagesResponse>) => {
  const {text} = req.body;
  const response = await openai.createImage({prompt: text, n: 4, size: "256x256"})
  upload();
  return res.status(200).json(response.data);
};

export default handler;
