import React, {useEffect, useState} from "react";
import {Configuration, OpenAIApi} from "openai";
import {logicalExpression} from "@babel/types";
import Image from "next/image";
import catIcon from "@/assets/icons/cat.jpg";
import SideMenuChatBot from "@/components/chatbot/SideMenuChatBot";
import SideMenuImageBot from "@/components/imagebot/SideMenuImageBot";
import {useRouter} from "next/router";
import LoadingImage from "@/components/imagebot/LoadingImage";
import {useSession} from "next-auth/react";
import {useMutation} from "@tanstack/react-query";
import process from "process";

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPEN_AI,
});
// if (!configuration.apiKey) throw new Error("No API key found");

const url1 = "https://oaidalleapiprodscus.blob.core.windows.net/private/org-Gj9qRtTFTcQvSvQMlsTGqRzb/user-WIsWrURgDHs7MJkppHrsBBgZ/img-cyNtdD8z57rt4QUwB6ZUr3Iw.png?st=2023-03-11T11%3A26%3A56Z&se=2023-03-11T13%3A26%3A56Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-03-10T23%3A57%3A15Z&ske=2023-03-11T23%3A57%3A15Z&sks=b&skv=2021-08-06&sig=L9DCdRxwCX6isVdX1/lUynQJPexOTS3/kDg37yoo0aQ%3D"
const url2 = "https://oaidalleapiprodscus.blob.core.windows.net/private/org-Gj9qRtTFTcQvSvQMlsTGqRzb/user-WIsWrURgDHs7MJkppHrsBBgZ/img-hjY3DCqiaLjmDFAAEx5ENDtm.png?st=2023-03-05T12%3A34%3A04Z&se=2023-03-05T14%3A34%3A04Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-03-05T01%3A25%3A46Z&ske=2023-03-06T01%3A25%3A46Z&sks=b&skv=2021-08-06&sig=ynvNdm4F8lhu2x1JTxYU0wOD9971sQ2k3Mm0IbArWpI%3D"
const url3 = "https://oaidalleapiprodscus.blob.core.windows.net/private/org-Gj9qRtTFTcQvSvQMlsTGqRzb/user-WIsWrURgDHs7MJkppHrsBBgZ/img-hjY3DCqiaLjmDFAAEx5ENDtm.png?st=2023-03-05T12%3A34%3A04Z&se=2023-03-05T14%3A34%3A04Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-03-05T01%3A25%3A46Z&ske=2023-03-06T01%3A25%3A46Z&sks=b&skv=2021-08-06&sig=ynvNdm4F8lhu2x1JTxYU0wOD9971sQ2k3Mm0IbArWpI%3D"
const url4 = "https://oaidalleapiprodscus.blob.core.windows.net/private/org-Gj9qRtTFTcQvSvQMlsTGqRzb/user-WIsWrURgDHs7MJkppHrsBBgZ/img-hjY3DCqiaLjmDFAAEx5ENDtm.png?st=2023-03-05T12%3A34%3A04Z&se=2023-03-05T14%3A34%3A04Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-03-05T01%3A25%3A46Z&ske=2023-03-06T01%3A25%3A46Z&sks=b&skv=2021-08-06&sig=ynvNdm4F8lhu2x1JTxYU0wOD9971sQ2k3Mm0IbArWpI%3D"
const openai = new OpenAIApi(configuration);

interface Images {
  url: string;
}

interface ImageAiMutateMutationFn {
  accessToken: string | undefined;
  text: string;
}

const ImageBot = () => {
  const router = useRouter()
  const {id} = router.query;
  const {data: session} = useSession()

  const [imageUrl, setImageUrl] = useState<Images[]>([{url: url1}, {url: url2}, {url: url3}, {url: url4}]);
  const [isLoading, setIsLoading] = useState(false);
  const [textLines, setTextLines] = useState(1);
  const [text, setText] = useState("Two futuristic towers with a skybridge covered in lush foliage, digital art");

  const generateImageMutate = useMutation(["CHAT_AI"], ({accessToken, text}: ImageAiMutateMutationFn) => {
    return openai.createImage({prompt: text, n: 4, size: "256x256"})
      .then(response => {
        if (response.data.data[0].url) {
          const data = response.data.data as Images[];
          setImageUrl(data);
        }
      }).then(() => setIsLoading(false));
  }, {});

  const handleTextareaKeydown = async (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const isCtrlEnterPressed = textLines > 1 && event.ctrlKey && event.key === "Enter";
    const isEnterPressed = event.key === "Enter";

    if (isCtrlEnterPressed) {
      setTextLines(textLines - 1);
      return;
    }

    if (isEnterPressed) {
      event.preventDefault();
    }

    if (session) {
      if (isEnterPressed && text !== "") {
        const chatAiMutateMutationFn: ImageAiMutateMutationFn = {
          accessToken: session.access_token,
          text: text,
        }
        generateImageMutate.mutate(chatAiMutateMutationFn);
        setTextLines(1);
        setText("");
      }
    }
  }
  console.log(imageUrl)

  return (
    <div className={"mt-28 flex justify-center"}>
      <SideMenuImageBot/>
      <section className={"flex flex-col items-center justify-center "} style={{minHeight: "50vh"}}>
        <div className={"max-w-screen-xl space-y-5 sm:ml-64 xxs:w-12/12 xs:w-12/12 sm:w-12/12 md:w-8/12"}>
          <div className={`w-full rounded-full h-2.5 bg-gray-200 bg-zinc-400 dark:bg-zinc-600 ${generateImageMutate.isLoading ? "block" : "hidden"}`}>
            <div
              className="bg-gradient-to-t from-gray-300 to-gray-400 dark:bg-orange-1100 dark:from-orange-600 dark:to-amber-900 h-2.5 rounded-full"
              style={{width: "40%"}}></div>
          </div>
          <div
            className={`grid md:grid-cols-2 lg:grid-cols-4 gap-5`}>
            {generateImageMutate.isLoading ? <>
              <LoadingImage/>
              <LoadingImage/>
              <LoadingImage/>
              <LoadingImage/>
            </> : <>
              {imageUrl.map((image, index) => {
                return (
                  <div key={index}>
                    <Image
                      src={url1} alt="user_icon"
                      width={200}
                      height={300}
                      className="xxs:h-32 xs:h-32 sm:h-32 md:h-56 lg:h-56 xl:h-56 2xl:h-56 xxs:w-56 xs:w-56 sm:w-56 md:w-64 lg:w-64 xl:w-56 2xl:w-64"
                      priority={true}
                    />
                  </div>
                )
              })}
            </>}
          </div>
          {/*<div className={"grid md:grid-cols-2 lg:grid-cols-4 gap-5"}>*/}
          {/*  {imageUrl.map((image, index) => {*/}
          {/*    return (*/}
          {/*      <div key={index}><Image src={url1} alt="user_icon" width={100} height={200} className="min-w-full"*/}
          {/*                              priority={true}/></div>*/}
          {/*    )*/}
          {/*  })}*/}
          {/*</div>*/}
        </div>
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
                onKeyDown={handleTextareaKeydown}
                value={text}
              />
            <div
              className={`absolute inset-y-0 right-0 bottom-1 flex items-center pr-3 ${generateImageMutate.isLoading ? "block" : "hidden"} opacity-50`}>
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
  )
};

export default ImageBot;
