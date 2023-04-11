import React from 'react';
import CreditCard from "@/components/home/CreditCard";

const HomeView = () => {
  return (
    <div>
      <main className={"mt-28"}>
        <section className={"flex flex-col gap-4 mt-10 sm:ml-7 md:ml-16"}>
          <p className={"text-5xl max-w-2xl"}>Experience the Future of Art and Conversation with OpenAI's Technology</p>
          <p className={"text-lg max-w-2xl"}>Discover the power of Chaincue by generating unique images using OpenAI DALL-E image generator and then
            minting them on the Ethereum blockchain.</p>
        </section>
        <section className={"flex flex-col items-center mt-5"}>
          <button className="group btn relative text-sm
      text-gray-800 hover:text-gray-700 group-hover:to-orange-400
      bg-gradient-to-b from-zinc-300 to-green-200 dark:bg-transparen dark:from-transparent dark:to-orange-1100 dark:text-gray-300
      border-amber-900
      dark:hover:text-white dark:group-hover:to-orange-400 normal-case
      inline-flex w-full justify-center px-3 py-2 font-semibold shadow-sm sm:w-11/12">
            Connect Wallet
          </button>
        </section>
        <section className={"flex flex-col items-center gap-4 mt-10"}>
          <CreditCard/>
          <div className="indicator w-11/12 rounded-2xl">
            <span className="indicator-item badge bg-gray-200 bg-gradient-to-t from-gray-200 to-gray-300 text-gray-900
            dark:bg-orange-1100 dark:from-orange-600 dark:to-amber-900 dark:text-gray-300 rounded-2xl "></span>
            <div className="grid w-full h-20 bg-zinc-800 place-items-center rounded-2xl">
              Address to receive NFTs
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomeView;
