import React, {useState} from "react";
import {Configuration, OpenAIApi} from "openai";
import {logicalExpression} from "@babel/types";
import Image from "next/image";
import catIcon from "@/assets/icons/cat.jpg";
import SideMenuChatBot from "@/components/chatbot/SideMenuChatBot";
import SideMenuImageBot from "@/components/imagebot/SideMenuImageBot";
import {useRouter} from "next/router";

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
    <div className={"mt-28"}>
      <SideMenuImageBot/>
      <section className={"flex flex-col items-center justify-center"}>
        <div
          className="transition duration-500 ease-in-out bg-blue-500 hover:bg-red-500 transform hover:-translate-y-1 hover:scale-110">
          Hover me
        </div>
        <div className={" flex w-96"}>
          <button className={"btn w-10/12"} onClick={() => btnOnclick()}>{isLoading ? <>
            <div role="status">
              <svg aria-hidden="true"
                   className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                   viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"/>
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"/>
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </> : <>ImageBot</>}
          </button>
        </div>
        <div>
          <Image src={imageUrl}
                 alt="user_icon"
                 width={500}
                 height={500}
                 className="min-w-full"
                 priority={true}
          />
        </div>
        <p>{id}</p>
      </section>
    </div>
  )
};

export default ImageBot;
