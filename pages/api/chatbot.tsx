import { Configuration, CreateCompletionResponse, OpenAIApi } from "openai";
import { NextApiRequest, NextApiResponse } from "next";

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPEN_AI,
});
const openai = new OpenAIApi(configuration);

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<CreateCompletionResponse>
) => {
  if (!configuration.apiKey) throw new Error("No API key found");

  const { text } = req.body;
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: text,
    temperature: 0,
    max_tokens: 30,
  });

  return res.status(200).json(response.data);
};

export default handler;
