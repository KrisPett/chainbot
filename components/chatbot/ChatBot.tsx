import React, {useState,} from "react";
import SideMenu from "@/components/chatbot/SideMenu";
import catIcon from "@/assets/icons/cat.jpg";
import chainIcon from "@/assets/icons/chainiconm.png";
import Image from "next/image";
import {useMutation} from "@tanstack/react-query";

interface IUserChat {
  text: string
}

const UserChat = (props: IUserChat) => {
  return (<div className="chat chat-start">
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
      className="chat-bubble bg-gray-200 bg-gradient-to-t from-gray-200 to-gray-300 text-gray-900 dark:bg-orange-1100 dark:from-orange-600 dark:to-amber-900 dark:text-gray-300">
      {props.text}
    </div>
  </div>)
}

interface IAIChat {
  text: string
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
        className="chat-bubble bg-gray-300 bg-gradient-to-b from-gray-200 to-gray-300 text-gray-900 dark:bg-orange-1000 dark:from-orange-600 dark:to-amber-900 dark:text-gray-300">
        {props.text}
      </div>
    </div>
  )
}

type TChatPrompt = {
  text: string;
}

const initData: TChatPrompt[] = [{text: "Explain crypto as a yoda"}, {text: "Crypto, hmmm. Currency of the digital realm it is. Hidden and difficult to mine, like valuable Jedi crystals. And like the Force, powerful it can be, if you know how to harness it. A careful balance it requires, between security and accessibility. Too much security, and you may never access it. Too little, and it may fall into the wrong hands. In the digital world, it is a way to store wealth, to trade, and to exchange. But, be mindful, young Padawan. Volatile it can be, like the stock market. Wisely, you must invest. And always, be vigilant, for hackers and thieves are always lurking, attempting to steal your crypto. A powerful tool it can be, if you are disciplined and patient. Like the Jedi, you must be mindful of your actions, and always strive to do what is right. Use it for good, and great riches you shall attain. Use it for evil, and suffer the consequences you will."}]

const ChatBot = () => {
    const [textLines, setTextLines] = useState(1);
    const [text, setText] = useState("");
    const [prompt, setPrompt] = useState<TChatPrompt[]>(initData);

    const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setText(event.target.value);
    };
    console.log(prompt)

    const chatAiMutate = useMutation(['CHAT_AI'], () => {
      return fetch("http://localhost:3000/api/chatbot/", {
        method: "POST",
        headers: {"Content-Type": "application/json",},
        body: JSON.stringify({text: "What is AWS?"})
      }).then(value => value.json())
        .then(res => prompt.push({text: res.choices[0].text}))
    });

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.shiftKey && event.key === "Enter") {
        setTextLines(textLines + 1);
        return;
      }
      if (textLines > 1 && event.ctrlKey && event.key === "Enter") {
        setTextLines(textLines - 1);
        return;
      }
      if (event.key === "Enter") {
        event.preventDefault();
        console.log(text);
        chatAiMutate.mutate();
      }
    };
    console.log(prompt[1].text)
    return (
      <div className={""}>
        <SideMenu/>
        <main className={"mt-28 flex justify-center"}>
          <section className={"space-y-5 sm:ml-72 max-w-screen-xl"}>
            {prompt.map((item, index) => {
              return <div key={index}>{index % 2 === 0 ? <UserChat text={item.text}/> : <AIChat text={item.text}/>}</div>
            })}
          </section>
          <footer className="fixed bottom-0 flex w-full justify-center bg-transparent">
            <form
              className="mb-5 xxs:w-11/12 sm:w-7/12 md:w-7/12 lg:w-8/12 xl:w-9/12 w-full sm:ml-64 sm:w-8/12 md:w-10/12 lg:w-11/12"
              onSubmit={e => e.preventDefault()}>
              <div className="relative w-full">
                <textarea
                  className="dark:placeholder-neutral-100 placeholder-opacity-50 rounded-2xl textarea-bordered textarea w-full
                  resize-none bg-zinc-200 dark:bg-zinc-600 focus-visible:border-0 focus-visible:ring-0 focus-visible:ring-offset-2
                  focus-visible:ring-offset-orange-300 dark:focus-visible:ring-offset-orange-600"
                  placeholder="Type here..."
                  onChange={handleTextAreaChange}
                  rows={textLines}
                  onKeyDown={handleKeyDown}
                />
                <div
                  className={`absolute inset-y-0 right-0 bottom-2 flex items-center pr-3 ${chatAiMutate.isLoading ? "block" : "hidden"}`}>
                  <div
                    className="spinner-grow inline-block w-8 h-8 bg-gradient-to-t from-gray-400 to-gray-300 text-gray-900 dark:bg-orange-1100 dark:from-orange-600 dark:to-amber-900 rounded-full opacity-20"
                    role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              </div>
            </form>
          </footer>
        </main>
      </div>
    );
  }
;

export default ChatBot;
