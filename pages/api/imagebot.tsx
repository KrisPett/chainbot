import {Configuration, CreateCompletionResponse, OpenAIApi} from "openai";
import {NextApiRequest, NextApiResponse} from "next";

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPEN_AI,
});

const openai = new OpenAIApi(configuration);

const handler = async (req: NextApiRequest, res: NextApiResponse<CreateCompletionResponse>) => {

  const response = await openai.listModels();
  // res.status(200).response);
  // return res.status(200).json(response.data);
};

export default handler;
