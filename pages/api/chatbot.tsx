import {Configuration, CreateCompletionResponse, OpenAIApi} from "openai";
import {NextApiRequest, NextApiResponse} from "next";

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPEN_AI,
});
const openai = new OpenAIApi(configuration);

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<CreateCompletionResponse>
) => {
  if (!configuration.apiKey) throw new Error("No API key found");

  const {text} = req.body;
  // const prompt = `Explain as Yoda: ${text}`;
  const prompt = `
  Explain as Yoda,
  min words 100, 
  be creative and funny if possible use hmmm in a creative way,
  , if asked to give code or write a program provide the programming code: ${text}`;
  // const prompt = `Min tokens 50: ${text}`;
  // const prompt = `${text}`;
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    temperature: 0,
    max_tokens: 100
  });

  return res.status(200).json(response.data);
};

export default handler;
