import React from "react";
import {Configuration, OpenAIApi} from "openai";

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPEN_AI,
});
if (!configuration.apiKey) throw new Error("No API key found");

const openai = new OpenAIApi(configuration);
const ImageBot = () => {
  const btnOnclick = () => {
    console.log("wadawd");
    // openai.listEngines().then((data) => {
    //   console.log(data.data)
    // });
    openai.listModels().then((data) => {
      console.log(data.data)
    });

  };

  return <div className={"mt-28"}>
    <section className={"flex flex-col items-center justify-center"}>
      <button className={"btn"} onClick={() => btnOnclick()}>ImageBot</button>
    </section>
  </div>;
};

export default ImageBot;
