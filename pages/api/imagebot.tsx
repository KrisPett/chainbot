import {Configuration, CreateCompletionResponse, ImagesResponse, OpenAIApi} from "openai";
import {NextApiRequest, NextApiResponse} from "next";

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPEN_AI,
});

const openai = new OpenAIApi(configuration);

const handler = async (req: NextApiRequest, res: NextApiResponse<ImagesResponse>) => {
  const {text} = req.body;
  const response = await openai.createImage({prompt: text, n: 4, size: "256x256"})
  return res.status(200).json(response.data);
};

export default handler;
