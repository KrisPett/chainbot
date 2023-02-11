import React from "react";
import SideMenu from "@/components/chatbot/SideMenu";
import catIcon from "@/assets/icons/cat.jpg";
import chainIcon from "@/assets/icons/chainiconm.png";
import Image from "next/image";

const ChatBot = () => {
  return (
    <div className={""}>
      <SideMenu/>
      <main className={"mt-28"}>
        <section className={"space-y-5 sm:ml-72"}>
          <div className="chat chat-start">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <Image src={catIcon} alt="user_icon" width={200} height={200} className="min-w-full" priority={true}/>
              </div>
            </div>
            <div className="chat-bubble">Explain crypto as a yoda</div>
          </div>
          <div className="chat chat-end mr-5">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <Image src={chainIcon} alt="user_icon" width={200} height={200} className="min-w-full" priority={true}/>
              </div>
            </div>
            <div className="chat-bubble">
              Crypto, hmmm. Currency of the digital realm it is. Hidden and difficult to mine, like valuable Jedi crystals. And like the Force, powerful it can be, if you know how to harness it. A careful balance it requires, between security and accessibility. Too much security, and you may never access it. Too little, and it may fall into the wrong hands.
              In the digital world, it is a way to store wealth, to trade, and to exchange. But, be mindful, young Padawan. Volatile it can be, like the stock market. Wisely, you must invest. And always, be vigilant, for hackers and thieves are always lurking, attempting to steal your crypto.
              A powerful tool it can be, if you are disciplined and patient. Like the Jedi, you must be mindful of your actions, and always strive to do what is right. Use it for good, and great riches you shall attain. Use it for evil, and suffer the consequences you will.

            </div>
          </div>
        </section>
        <footer className="fixed bottom-0 w-full bg-zinc-300 dark:bg-zinc-600 flex justify-center">
          <textarea className="textarea textarea-bordered bg-zinc-700 w-full sm:w-8/12 md:w-10/12 sm:ml-64" placeholder="Text"></textarea>
        </footer>
      </main>
    </div>
  )
};

export default ChatBot;
