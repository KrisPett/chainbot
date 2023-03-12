import React, {useState} from "react";
import Image from "next/image";
import SideMenuImageBot from "@/components/imagebot/SideMenuImageBot";
import {useRouter} from "next/router";
import LoadingImage from "@/components/imagebot/LoadingImage";
import {useSession} from "next-auth/react";
import {useMutation} from "@tanstack/react-query";
import process from "process";
import axios from "axios";

const url1 = "https://oaidalleapiprodscus.blob.core.windows.net/private/org-Gj9qRtTFTcQvSvQMlsTGqRzb/user-WIsWrURgDHs7MJkppHrsBBgZ/img-cyNtdD8z57rt4QUwB6ZUr3Iw.png?st=2023-03-11T11%3A26%3A56Z&se=2023-03-11T13%3A26%3A56Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-03-10T23%3A57%3A15Z&ske=2023-03-11T23%3A57%3A15Z&sks=b&skv=2021-08-06&sig=L9DCdRxwCX6isVdX1/lUynQJPexOTS3/kDg37yoo0aQ%3D"
const url2 = "https://oaidalleapiprodscus.blob.core.windows.net/private/org-Gj9qRtTFTcQvSvQMlsTGqRzb/user-WIsWrURgDHs7MJkppHrsBBgZ/img-hjY3DCqiaLjmDFAAEx5ENDtm.png?st=2023-03-05T12%3A34%3A04Z&se=2023-03-05T14%3A34%3A04Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-03-05T01%3A25%3A46Z&ske=2023-03-06T01%3A25%3A46Z&sks=b&skv=2021-08-06&sig=ynvNdm4F8lhu2x1JTxYU0wOD9971sQ2k3Mm0IbArWpI%3D"
const url3 = "https://oaidalleapiprodscus.blob.core.windows.net/private/org-Gj9qRtTFTcQvSvQMlsTGqRzb/user-WIsWrURgDHs7MJkppHrsBBgZ/img-hjY3DCqiaLjmDFAAEx5ENDtm.png?st=2023-03-05T12%3A34%3A04Z&se=2023-03-05T14%3A34%3A04Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-03-05T01%3A25%3A46Z&ske=2023-03-06T01%3A25%3A46Z&sks=b&skv=2021-08-06&sig=ynvNdm4F8lhu2x1JTxYU0wOD9971sQ2k3Mm0IbArWpI%3D"
const url4 = "https://oaidalleapiprodscus.blob.core.windows.net/private/org-Gj9qRtTFTcQvSvQMlsTGqRzb/user-WIsWrURgDHs7MJkppHrsBBgZ/img-hjY3DCqiaLjmDFAAEx5ENDtm.png?st=2023-03-05T12%3A34%3A04Z&se=2023-03-05T14%3A34%3A04Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-03-05T01%3A25%3A46Z&ske=2023-03-06T01%3A25%3A46Z&sks=b&skv=2021-08-06&sig=ynvNdm4F8lhu2x1JTxYU0wOD9971sQ2k3Mm0IbArWpI%3D"

interface Images {
  url: string;
}

interface ImageAiMutateMutationFn {
  accessToken: string | undefined;
  text: string;
}

type AIPromptRequestBody = {
  text: string
}

const ImageBot = () => {
  const router = useRouter()
  const {id} = router.query;
  const {data: session} = useSession()

  const [imageUrl, setImageUrl] = useState<Images[]>([]);
  const [textLines, setTextLines] = useState(1);
  const [text, setText] = useState("Two futuristic towers with a skybridge covered in lush foliage, digital art");
  const [progress, setProgress] = useState(0)

  const generateImageMutate = useMutation(["CHAT_AI"], ({accessToken, text}: ImageAiMutateMutationFn) => {
    const progressInterval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress === 100) {
          setProgress(100);
          clearInterval(progressInterval);
          return prevProgress;
        } else {
          return prevProgress + 1;
        }
      });
    }, 10);
    setTimeout(() => {
      setProgress(100);
      clearInterval(progressInterval);
    }, 5000);
    const aiPromptRequestBody: AIPromptRequestBody = {text: text}
    return fetch(process.env.NEXT_PUBLIC_AWS_GATEWAY_URL_IMAGEBOT, {
      method: "POST",
      headers: {'Authorization': `Bearer ${accessToken}`, "Content-Type": "application/json"},
      body: JSON.stringify(aiPromptRequestBody),
    })
      .then((response) => {
        if (!response.ok) return Promise.reject(response)
        return response.json()
      }).then((value) => {
        if (value.data) {
          setProgress(100)
          setImageUrl(value.data);
        }
        return value
      })
  });

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
        generateImageMutate.mutate(chatAiMutateMutationFn)
        setTextLines(1);
        setText("");
      }
    }
  }

  const downloadImage = (url: string) => {
    return fetch("https://oaidalleapiprodscus.blob.core.windows.net/private/org-Gj9qRtTFTcQvSvQMlsTGqRzb/user-WIsWrURgDHs7MJkppHrsBBgZ/img-UVcaEE4p4iNrX27Kz43tB7SE.png?st=2023-03-12T14%3A07%3A07Z&se=2023-03-12T16%3A07%3A07Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-03-12T06%3A18%3A48Z&ske=2023-03-13T06%3A18%3A48Z&sks=b&skv=2021-08-06&sig=kaau1d9w8eyz/z/eEjAfZ4Jyy%2Bz7JEkSBRYyYgWXeA0%3D",
      {
        method: "GET",
        mode: "no-cors",
      })
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'image.png');
        document.body.appendChild(link);
        link.click();
        // @ts-ignore
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url)
      });
  }

  return (
    <div className={"mt-28 flex justify-center"}>
      <SideMenuImageBot/>
      <section className={"flex flex-col items-center justify-center "} style={{minHeight: "50vh"}}>
        <div className={"max-w-screen-xl space-y-5 sm:ml-64 xxs:w-12/12 xs:w-12/12 sm:w-12/12 md:w-8/12"}>
          <div
            className={`w-full rounded-full h-2.5 bg-gray-200 bg-zinc-400 dark:bg-zinc-600 ${generateImageMutate.isLoading ? "block" : "hidden"}`}>
            <div
              className="bg-gradient-to-t from-gray-300 to-gray-400 dark:bg-orange-1100 dark:from-orange-600 dark:to-amber-900 h-2.5 rounded-full"
              style={{width: `${progress}%`}}></div>
          </div>
          <div
            className={`grid md:grid-cols-2 lg:grid-cols-4 gap-5`}>
            {(generateImageMutate.isLoading || imageUrl.length < 3) && (
              <>
                <LoadingImage/>
                <LoadingImage/>
                <LoadingImage/>
                <LoadingImage/>
              </>
            )}
            {(!generateImageMutate.isLoading && imageUrl.length > 3 && progress === 100) && (
              <>
                {imageUrl.map((image, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => downloadImage(image.url)}
                    >
                      <Image
                        src={image.url}
                        alt="user_icon"
                        width={300}
                        height={300}
                        className="xxs:h-32 xs:h-32 sm:h-32 md:h-56 lg:h-56 xl:h-56 2xl:h-56 xxs:w-56 xs:w-56 sm:w-56 md:w-64 lg:w-64 xl:w-64 2xl:w-64
                        cursor-pointer transition duration-100 ease-in-out transform hover:-translate-y-0 hover:scale-110 rounded"
                        priority={true}
                      />
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </section>
      <footer className="fixed bottom-0 flex w-full justify-center bg-transparent">
        <form
          className="mb-2 w-full xxs:w-11/12 sm:ml-64 sm:w-6/12 sm:w-7/12 md:w-7/12 md:w-10/12 lg:w-8/12 lg:w-11/12 xl:w-9/12"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="relative w-full">
              <textarea
                disabled={generateImageMutate.isLoading}
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
