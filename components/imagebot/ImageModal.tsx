import React, {Fragment, useEffect, useRef, useState} from 'react';
import {Dialog, Transition} from '@headlessui/react'
import Image from "next/image";
import ButtonAlt2 from "@/lib/ButtonAlt2";
import ButtonAlt3 from "@/lib/ButtonAlt3";
import ButtonAlt4 from "@/lib/ButtonAlt4";
import {mintNFTContractWeb3} from "@/contracts/TransactionsHelper";

const isMetamaskInstalled = typeof window !== 'undefined' && typeof window.ethereum !== 'undefined';

interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedImage: string;
}

const downloadImage = (url: string) => {
  let fileName = url.split("/").pop();
  fetch(url)
    .then(response => response.blob())
    .then(blob => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName || "image.png";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
}

const ImageModalOld = ({open, setOpen, selectedImage}: ModalProps) => {
  const [isMetamaskConnected, setIsMetamaskConnected] = useState<boolean>(false);
  const [ethAddress, setEthAddress] = useState<string>("");

  const cancelButtonRef = useRef(null)

  useEffect(() => {
    if (isMetamaskInstalled) {
      if (window.ethereum.selectedAddress !== null && window.ethereum.selectedAddress !== undefined && window.ethereum.selectedAddress !== "") {
        setIsMetamaskConnected(true)
        setEthAddress(window.ethereum.selectedAddress)
      }
    }
  }, []);

  const mintNFT = async (selectedImage: string) => {
    mintNFTContractWeb3(selectedImage)
  }

  return (
    <div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-100"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto lg:ml-64">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-100"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-100"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel
                  className="relative transform overflow-hidden rounded-lg text-left transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-transparent px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className={""}>
                      <Image
                        src={selectedImage}
                        alt="user_icon"
                        width={500}
                        height={500}
                        className="rounded min-w-full "
                        priority={true}
                      />
                    </div>
                  </div>
                  <div className={"flex justify-center"}>
                    <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 rounded
                    bg-gradient-to-br from-gray-200 to-gray-300 dark:from-zinc-600 dark:to-zinc-700 w-11/12 xxs:space-y-1 sm:space-y-0">
                      <ButtonAlt2 title={"Download"} onClick={() => downloadImage(selectedImage)}/>
                      <div className={`${!isMetamaskInstalled || !isMetamaskConnected ? "tooltip" : ""}`}
                           data-tip="Required Metamask">
                        <ButtonAlt4 disabled={!isMetamaskInstalled || !isMetamaskConnected} title={"Mint"}
                                    onClick={() => mintNFT(selectedImage)}/>
                      </div>
                      <ButtonAlt3 title={"Close"} onClick={() => setOpen(false)}/>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default ImageModalOld;
