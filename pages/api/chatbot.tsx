import {Configuration, CreateCompletionResponse, OpenAIApi} from "openai";
import {NextApiRequest, NextApiResponse} from "next";

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPEN_AI,
});

const openai = new OpenAIApi(configuration);

const handler = async (req: NextApiRequest, res: NextApiResponse<CreateCompletionResponse>) => {
  if (!configuration.apiKey) throw new Error("No API key found");
  const {text, model, isCheckedYodaMode: isCheckedYodaMode} = req.body;

  let prompt;
  prompt = `${text}`;

  if(isCheckedYodaMode) {
    prompt = `Explain as Yoda, min words 100, be creative and funny if possible use hmmm in a creative way,
     if asked to give code or write a program provide the programming code: ${text}`;
  }

  const response = await openai.createCompletion({
    model: model,
    prompt: prompt,
    temperature: 0,
    max_tokens: 100,
  });

  return res.status(200).json(response.data);
};

export default handler;
