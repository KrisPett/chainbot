import React from 'react';
import {Fragment, useRef, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import Image from "next/image";

interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedImage: string;
}

const ImageModal = ({open, setOpen, selectedImage}: ModalProps) => {
  const cancelButtonRef = useRef(null)

  console.log("https://storage-chainbot.chaincuet.com/" + selectedImage)

  return (
    <div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
          </Transition.Child>

          <div className="fixed inset-0 z-10  ">
            <div className="flex min-h-full items-end justify-center p-4 items-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel style={{height: "80vh"}}
                              className="relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all
                  sm:w-full sm:max-w-xl md:max-w-2xl lg:max-w-4xl lg:max-w-5xl">
                  <div className="bg-transparent">
                    <div className=" sm:flex sm:flex-row-reverse pt-5 pb-4 sm:mr-3">
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold
                        text-white shadow-sm hover:bg-orange-500 sm:ml-3 sm:w-auto"
                        onClick={() => setOpen(false)}
                      >
                        Download
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900
                        shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={() => setOpen(false)}
                        ref={cancelButtonRef}
                      >
                        Cancel
                      </button>
                    </div>
                    <div className={"flex justify-center h-screen"}>
                      <div className={"h-4/6"}>
                        <Image
                          src={"https://storage-chainbot.chaincuet.com/" + selectedImage}
                          alt="user_icon"
                          width={0}
                          height={0}
                          className="w-max h-full rounded"
                          priority={true}
                        />
                      </div>

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

export default ImageModal;
