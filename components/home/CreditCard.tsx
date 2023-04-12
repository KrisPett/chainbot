import React from 'react';
import Image from "next/image";
import ethereum_logo from "../../assets/images/ethereum_logo.png";

const CreditCard = () => {
  return (
    <div>
      <div className="bg-transparent min-h-screen flex justify-center items-center">
        <div className="space-y-16 ">
          <div className="xxs:w-56 xxs:h-36 xs:w-64 xs:h-50 sm:w-96 sm:h-56
          m-auto rounded-xl relative text-white shadow-2xl transition-transform transform hover:scale-110
          group-hover:to-orange-400 bg-gradient-to-b from-zinc-300 to-zinc-200 dark:bg-orange-1000 dark:from-transparent
          dark:to-orange-1100 dark:text-gray-300 border-amber-900 dark:hover:text-white dark:group-hover:to-orange-400
          ">
            <div className="w-full px-8 absolute top-8 ">
              <div className="flex justify-between">
                <div className="">
                  <p className="font-light dark:text-gray-300 text-gray-900 dark:hover:text-white">Name</p>
                  <p className="font-medium tracking-widest dark:text-gray-300 text-gray-900 dark:hover:text-white">Chaincue Technologies</p>
                </div>
                <Image className="w-8 h-14" src={ethereum_logo} alt={"alt"} width={100} height={100}/>
              </div>
              <div className="xxs:pt-0 sm:pt-20">
                <div className="flex justify-between">
                  <div className="">
                    <p className="font-light text-xs dark:text-gray-300 text-gray-900 dark:hover:text-white">Address</p>
                    <p className="font-medium tracking-wider text-sm dark:text-gray-300 text-gray-900 dark:hover:text-white">Ethereum</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCard;
