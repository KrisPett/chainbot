import React, {useState} from "react";
import {Configuration, OpenAIApi} from "openai";
import {logicalExpression} from "@babel/types";
import Image from "next/image";
import catIcon from "@/assets/icons/cat.jpg";
import SideMenuChatBot from "@/components/chatbot/SideMenuChatBot";
import SideMenuImageBot from "@/components/imagebot/SideMenuImageBot";
import {useRouter} from "next/router";
import LoadingImage from "@/components/imagebot/LoadingImage";

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPEN_AI,
});
// if (!configuration.apiKey) throw new Error("No API key found");
const url1 = "https://oaidalleapiprodscus.blob.core.windows.net/private/org-Gj9qRtTFTcQvSvQMlsTGqRzb/user-WIsWrURgDHs7MJkppHrsBBgZ/img-qkpIMXwcfGowGSEG60pKbVMd.png?st=2023-03-05T12%3A45%3A47Z&se=2023-03-05T14%3A45%3A47Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-03-05T01%3A28%3A11Z&ske=2023-03-06T01%3A28%3A11Z&sks=b&skv=2021-08-06&sig=sz8W0GRhnCLAbWxAu6HA0y/SufWmZn0U8Z8PWdRIi%2BY%3D"
const url2 = "https://oaidalleapiprodscus.blob.core.windows.net/private/org-Gj9qRtTFTcQvSvQMlsTGqRzb/user-WIsWrURgDHs7MJkppHrsBBgZ/img-hjY3DCqiaLjmDFAAEx5ENDtm.png?st=2023-03-05T12%3A34%3A04Z&se=2023-03-05T14%3A34%3A04Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-03-05T01%3A25%3A46Z&ske=2023-03-06T01%3A25%3A46Z&sks=b&skv=2021-08-06&sig=ynvNdm4F8lhu2x1JTxYU0wOD9971sQ2k3Mm0IbArWpI%3D"
const openai = new OpenAIApi(configuration);

const ImageBot = () => {
  const router = useRouter()
  const {id} = router.query;

  const [imageUrl, setImageUrl] = useState<string>(url1);
  const [isLoading, setIsLoading] = useState(false);
  const [textLines, setTextLines] = useState(1);
  const [text, setText] = useState("Two futuristic towers with a skybridge covered in lush foliage, digital art");

  const btnOnclick = async () => {
    console.log("wadawd");
    // openai.listEngines().then((data) => {
    //   console.log(data.data)
    // });
    // openai.listFiles().then((data) => {
    //   console.log(data.data)
    // });´
    setIsLoading(true);
    const response = await openai.createImage({
      prompt: "a white siamese cat",
      n: 1,
      size: "1024x1024",
    }).then((data) => {
      if (data.data.data[0].url) {
        setImageUrl(data.data.data[0].url);
      }
    }).then(() => setIsLoading(false));

  };

  return (
    // <div className={"flex justify-center"} style={{minHeight: "70vh"}}>
      <div className={"mt-28"}>
        <SideMenuImageBot/>
        <section className={"flex flex-col items-center justify-center"} style={{minHeight: "50vh"}}>
          <div className={"max-w-screen-xl space-y-5 sm:ml-72"}>
            <div className="w-full rounded-full h-2.5 bg-gray-200 bg-zinc-400 dark:bg-zinc-600">
              <div
                className="bg-gradient-to-t from-gray-300 to-gray-400 dark:bg-orange-1100 dark:from-orange-600 dark:to-amber-900 h-2.5 rounded-full"
                style={{width: "40%"}}></div>
            </div>
            <div className={"flex flex-row gap-5 p-5"}>
              <LoadingImage/>
              <LoadingImage/>
              <LoadingImage/>
              <LoadingImage/>
            </div>
          </div>
          <div>
            {/*<Image src={imageUrl}*/}
            {/*       alt="user_icon"*/}
            {/*       width={500}*/}
            {/*       height={500}*/}
            {/*       className="min-w-full"*/}
            {/*       priority={true}*/}
            {/*/>*/}
          </div>
          <p>{id}</p>
        </section>

        <footer className="fixed bottom-0 flex w-full justify-center bg-transparent">
          <form
            className="mb-2 w-full xxs:w-11/12 sm:ml-64 sm:w-6/12 sm:w-7/12 md:w-7/12 md:w-10/12 lg:w-8/12 lg:w-11/12 xl:w-9/12"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="relative w-full">
              <textarea
                disabled={false}
                className="textarea-bordered textarea w-full resize-none rounded-2xl bg-zinc-300
                  placeholder-opacity-50
                  focus:outline-none focus:ring-0 focus:ring-offset-2 focus:ring-offset-orange-300 bg-opacity-60
                  focus-visible:border-0 focus-visible:ring-0 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300
                  dark:placeholder-neutral-100 dark:focus-visible:ring-offset-orange-600 dark:disabled:opacity-30
                  dark:bg-zinc-600 dark:bg-opacity-70
                  "
                placeholder="Type here..."
                onChange={(e) => setText(e.target.value)
                }
                rows={textLines}
                onKeyDown={() => console.log("onKeyDown")}
                value={text}
              />
              <div
                className={`absolute inset-y-0 right-0 bottom-1 flex items-center pr-3 ${false ? "block" : "hidden"} opacity-50`}>
                <div
                  className="inline-block h-8 w-8 animate-[spinner-grow_0.75s_linear_infinite]
                rounded-full bg-current align-[-0.125em] opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite]
                bg-gradient-to-t from-gray-400 to-gray-300 text-gray-900 opacity-0 dark:bg-orange-1100 dark:from-orange-600 dark:to-amber-900"
                  role="status">
                <span
                  className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                  Loading...
                </span>
                </div>
              </div>
            </div>
          </form>
        </footer>
      </div>
    // </div>
  )
};

export default ImageBot;
