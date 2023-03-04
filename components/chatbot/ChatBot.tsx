import React, {useEffect, useRef, useState} from "react";
import SideMenu from "@/components/chatbot/SideMenu";
import catIcon from "@/assets/icons/cat.jpg";
import chainIcon from "@/assets/icons/chainiconm.png";
import Image from "next/image";
import {useMutation} from "@tanstack/react-query";
import {useSession} from "next-auth/react";
import {models} from "@/components/utils/AIModels";
import * as process from "process";

interface IUserChat {
  text: string;
}

const UserChat = (props: IUserChat) => {
  return (
    <div className="chat chat-start ml-3">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <Image
            src={catIcon}
            alt="user_icon"
            width={200}
            height={200}
            className="min-w-full"
            priority={true}
          />
        </div>
      </div>
      <div
        className="chat-bubble bg-gray-200 bg-gradient-to-t from-gray-200 to-gray-300 text-gray-900
        dark:bg-orange-1100 dark:from-orange-600 dark:to-amber-900 dark:text-gray-300 break-all">
        {props.text}
      </div>
    </div>
  );
};

interface IAIChat {
  text: string;
}

const AIChat = (props: IAIChat) => {
  return (
    <div className="chat chat-end mr-5">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <Image
            src={chainIcon}
            alt="user_icon"
            width={200}
            height={200}
            className="min-w-full"
            priority={true}
          />
        </div>
      </div>
      <div
        className="chat-bubble bg-gray-300 bg-gradient-to-b from-gray-200 to-gray-300 text-gray-900
        dark:bg-orange-1000 dark:from-orange-600 dark:to-amber-900 dark:text-gray-300 break-all">
        {props.text}
      </div>
    </div>
  );
};

type TChatPrompt = {
  text: string;
};

const initData: TChatPrompt[] = [
  {text: "Explain crypto as a yoda"},
  {
    text: "Crypto, hmmm. Currency of the digital realm it is. Hidden and difficult to mine, like valuable Jedi crystals. And like the Force, powerful it can be, if you know how to harness it. A careful balance it requires, between security and accessibility. Too much security, and you may never access it. Too little, and it may fall into the wrong hands. In the digital world, it is a way to store wealth, to trade, and to exchange. But, be mindful, young Padawan. Volatile it can be, like the stock market. Wisely, you must invest. And always, be vigilant, for hackers and thieves are always lurking, attempting to steal your crypto. A powerful tool it can be, if you are disciplined and patient. Like the Jedi, you must be mindful of your actions, and always strive to do what is right. Use it for good, and great riches you shall attain. Use it for evil, and suffer the consequences you will.",
  },
];

type ChatAiMutateMutationFn = {
  accessToken: string | undefined;
  text: string
  model: string
}

type AIPromptRequestBody = {
  text: string
  model: string
  isCheckedYodaMode: boolean
}

/*
*   prompt: "The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.

  \n\nHuman: Hello, who are you?
  \nAI: I am an AI created by OpenAI. How can I help you today?
  \nHuman: \nAI: What would you like me to do for you?
  \nHuman: what is facebbok
  \nAI: Facebook is a social networking website that allows people to connect with friends, family, and other people they know online. It also allows users to share photos, videos, and messages.
  \nHuman: what was my prevoisly question Your previous question was \"Hello, who are you?\".",*/

const ChatBot = () => {
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [textLines, setTextLines] = useState(1);
  const [text, setText] = useState("");
  const [prompt, setPrompt] = useState<TChatPrompt[]>(initData);
  const [previousTextSent, setPreviousTextSent] = useState<string[]>(["what is aws"]);
  const [chatHistory, setChatHistory] = useState<string[]>([]);
  const {data: session} = useSession()
  const [modelSelected, setModelSelected] = useState(models[0].value);
  const [isCheckedYodaMode, setIsCheckedYodaMode] = useState(false);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollIntoView({behavior: "smooth"});
    }
  }, [prompt]);

  const chatAiMutate = useMutation(["CHAT_AI"], ({accessToken, text, model}: ChatAiMutateMutationFn) => {
    const aiPromptRequestBody: AIPromptRequestBody = {text: text, model: model, isCheckedYodaMode: isCheckedYodaMode}
    return fetch(process.env.NEXT_PUBLIC_AWS_GATEWAY_URL, {
      method: "POST",
      headers: {'Authorization': `Bearer ${accessToken}`, "Content-Type": "application/json"},
      body: JSON.stringify(aiPromptRequestBody),
    })
      .then((value) => {
        if (!value.ok) return Promise.reject(value);
        return value.json()
      })
      .then((res) => {
          if (res && res.choices && res.choices.length > 0) {
            console.log(res)
            setPrompt((prevState) => [...prevState, {text: res.choices[0].text}])
            setChatHistory((prevState) => [...prevState, `AI: ${res.choices[0].text.trim()}`])
          }
        }
      )
      .finally(() => {
        const autoSelectTextArea = setInterval(() => {
          if (textareaRef.current) {
            textareaRef.current.select();
            clearInterval(autoSelectTextArea);
          }
        }, 100);
      })
      .catch((err) => {
        console.log(err)
        setPrompt((prevState) => [...prevState, {text: `Error ${err.statusText}: ${err.status}`}]);
      });
  });

  const handleTextareaKeydown = async (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const isArrowUpPressed = event.key === "ArrowUp";
    const isArrowDownPressed = event.key === "ArrowDown";
    const isShiftEnterPressed = event.shiftKey && event.key === "Enter";
    const isCtrlEnterPressed = textLines > 1 && event.ctrlKey && event.key === "Enter";
    const isEnterPressed = event.key === "Enter";
    const isTextAreaEmpty = text.trim() === "";
    console.log(previousTextSent)
    if (isArrowUpPressed) {
      event.preventDefault();
      if (textareaRef.current){
        setText(previousTextSent[previousTextSent.length - 1]);
        event.currentTarget.selectionStart = textareaRef.current.value.length;
        event.currentTarget.selectionEnd = textareaRef.current.value.length;
      }
    }
    if (isArrowDownPressed) setText("");

    if (isShiftEnterPressed) {
      setTextLines(textLines + 1);
      return;
    }

    if (isCtrlEnterPressed) {
      setTextLines(textLines - 1);
      return;
    }

    if (isEnterPressed) {
      event.preventDefault();
    }

    if (session) {
      if (isEnterPressed && !isTextAreaEmpty) {
        setPrompt((prevState) => [...prevState, {text: text}]);
        const sendWithChatHistory = chatHistory.join("\n") + `Human: ${text}`
        console.log(sendWithChatHistory)
        const chatAiMutateMutationFn: ChatAiMutateMutationFn = {
          accessToken: session.access_token,
          text: sendWithChatHistory,
          model: modelSelected
        }
        chatAiMutate.mutate(chatAiMutateMutationFn);
        setTextLines(1);
        setText("");
        setChatHistory((prevState) => [...prevState, `Human: ${text}`])
        setPreviousTextSent((prevState) => [...prevState, text]);
      }
    }
  };

  return (
    <div className={""}>
      <SideMenu setModelSelected={model => setModelSelected(model)} isCheckedYodaMode={isCheckedYodaMode}
                setIsCheckedYodaMode={setIsCheckedYodaMode}/>
      <main className={"mt-28 flex justify-center"}>
        <section className={"max-w-screen-xl space-y-5 sm:ml-72"}>
          {prompt.map((item, index) => {
            return (
              <div key={index}>
                {index % 2 === 0 ? (<UserChat text={item.text}/>) : (<AIChat text={item.text}/>)}
              </div>
            );
          })}
        </section>
        <footer className="fixed bottom-0 flex w-full justify-center bg-transparent">
          <form
            className="mb-2 w-full xxs:w-11/12 sm:ml-64 sm:w-6/12 sm:w-7/12 md:w-7/12 md:w-10/12 lg:w-8/12 lg:w-11/12 xl:w-9/12"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="relative w-full">
              <textarea
                ref={textareaRef}
                disabled={chatAiMutate.isLoading}
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
                className={`absolute inset-y-0 right-0 bottom-1 flex items-center pr-3 ${chatAiMutate.isLoading ? "block" : "hidden"} opacity-50`}>
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
      </main>
      <div ref={messagesContainerRef}/>
    </div>
  );
};

export default ChatBot;
