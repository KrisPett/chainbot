import React from 'react';
import Image from "next/image";
import ethereum_logo from "../../assets/images/ethereum_logo.png";

const CreditCard = () => {
  return (
    <div>
      <div className="bg-transparent min-h-screen flex justify-center items-center">
        <div className="space-y-16">
          <div className="xxs:w-56 xxs:h-36 xs:w-64 xs:h-50 sm:w-96 sm:h-56
          m-auto bg-red-700 rounded-xl relative text-white shadow-2xl transition-transform transform hover:scale-110
          group-hover:to-orange-400 bg-gradient-to-b from-zinc-300 to-green-200 dark:bg-transparen dark:from-transparent
          dark:to-orange-1100 dark:text-gray-300 border-amber-900 dark:hover:text-white dark:group-hover:to-orange-400
          ">
            <div className="w-full px-8 absolute top-8">
              <div className="flex justify-between">
                <div className="">
                  <p className="font-light">Name</p>
                  <p className="font-medium tracking-widest">Chaincue Technologies</p>
                </div>
                <Image className="w-8 h-14" src={ethereum_logo} alt={"alt"} width={100} height={100}/>
              </div>
              <div className="pt-20">
                <div className="flex justify-between">
                  <div className="">
                    <p className="font-light text-xs">Address</p>
                    <p className="font-medium tracking-wider text-sm">Ethereum</p>
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
