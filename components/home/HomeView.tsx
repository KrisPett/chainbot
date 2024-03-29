import React, {useEffect, useState} from 'react';
import CreditCard from "@/components/home/CreditCard";
import {useWeb3Modal} from '@web3modal/react'

const isMetamaskInstalled = typeof window !== 'undefined' && typeof window.ethereum !== 'undefined';

const HomeView = () => {
  const [isMetamaskConnected, setIsMetamaskConnected] = useState<boolean>(false);
  const [ethAddress, setEthAddress] = useState<string>("");
  const {isOpen, open, close, setDefaultChain} = useWeb3Modal();

  useEffect(() => {
    if (isMetamaskInstalled) {
      if (window.ethereum.selectedAddress !== null && window.ethereum.selectedAddress !== undefined && window.ethereum.selectedAddress !== "") {
        setIsMetamaskConnected(true)
        setEthAddress(window.ethereum.selectedAddress)
      }
    }
  }, [isOpen]);

  const connectWallet = async () => {
    await open()
      .then((account) => {
        console.log(account)
      })
      .catch((err) => {
        console.log(err)
      });
  }

  const getButtonText = () => {
    if (isMetamaskConnected) return "You Are Connected"
    else if (isOpen) return "Pending Metamask Extension..."
    else return "Connect Wallet"
  }

  const isButtonDisabled = () => {
    if (isMetamaskConnected) return true
    if (isOpen) return true
    return !!(window.ethereum && window.ethereum.selectedAddress)
  }

  return (
    <main className={"xxs:mt-10 md:mt-44"}>
      <div className={"flex xxs:flex-col lg:flex-row justify-center xl:gap-x-64"}>
        <section className={"mt-20"}>
          <div className={"flex flex-col items-center"}>
            <p className={"text-5xl max-w-2xl w-11/12"}>Experience the Future of Art and Conversation with OpenAI&apos;s
              Technology</p>
            <p className={"text-lg max-w-2xl mt-10 w-11/12"}>Discover the power of Chaincue by generating unique images
              using
              OpenAI
              DALL-E image generator and then
              minting them on the Ethereum blockchain.</p>
          </div>
          <div className={"w-full mt-20 flex justify-center"}>
            <button disabled={isButtonDisabled()} onClick={() => connectWallet()}
                    className="dark:disabled:opacity-70 disabled:text-gray-600 group btn relative text-xl text-gray-800 hover:text-gray-700 group-hover:to-orange-400 bg-gradient-to-b
            from-zinc-300 to-zinc-200 dark:bg-transparen dark:from-orange-1000 dark:to-orange-1100 dark:text-gray-300
            border-zinc-300 border-1 border-base-300/50 hover:dark:border-orange-1100 dark:hover:text-white dark:group-hover:to-orange-400 normal-case inline-flex justify-center
            px-3 py-2 font-semibold shadow-sm hover:bg-opacity-0 xxs:w-11/12 sm:w-11/12">
              {getButtonText()}
            </button>
          </div>
        </section>
        <section className={"mt-10"}>
          <div className={"flex flex-col items-center gap-4 mt-10"}>
            <CreditCard/>
            <div className="w-full xxs:w-11/12 rounded-2xl mt-12">
              <span className="rounded-2xl"></span>
              <div data-tip="copy" onClick={() => navigator.clipboard.writeText(ethAddress)}
                   className="tooltip cursor-pointer grid w-full h-20 place-items-center rounded-2xl group-hover:to-orange-400 bg-gradient-to-b
            from-zinc-300 to-zinc-300 dark:bg-transparen dark:from-orange-900 dark:to-orange-1100 dark:text-gray-300
            border-amber-900 dark:hover:text-white dark:group-hover:to-orange-400 active:brightness-110">
                {ethAddress.slice(0, 20) + "..." + ethAddress.slice(-4)}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default HomeView;
