import React, {useEffect, useState} from "react";
import {models} from "@/components/utils/AIModels";
import Image from "next/image";
import catIcon from "@/assets/icons/cat.jpg";
import {router} from "next/client";
import {useRouter} from "next/router";

interface Props {
  setModelSelected: (model: string) => void;
  setIsCheckedYodaMode: (isChecked: boolean) => void;
  setTemperatureRange: (range: number) => void;
  temperatureRange: number
  isCheckedYodaMode: boolean;
}

interface ImageGroupProps {
  isImageSelected: number;
  index: number;
}

const ImageGroup = ({isImageSelected, index}: ImageGroupProps) => {
  const router = useRouter()
  const {id} = router.query;
  const [selectedImage, setSelectedImage] = useState();

  useEffect(() => {
    // if (id)
    // setSelectedImage(id)
  }, [id]);
  const onImageGroupClick = (isImageSelected: number) => {
    // console.log(id)
    // router.push(`/imagebot/${index}`)    router.push(`/imagebot/${isImageSelected}`);
    return router.push(`/imagebot/${index}`);
    // const { id } = router.query;
    // console.log(id)
  };
  console.log(selectedImage)
  console.log(id === index.toString())
  return (
    <div
      onClick={() => onImageGroupClick(isImageSelected)}
      className={"flex flex-row space-x-1 justify-center cursor-pointer transition duration-100 ease-in-out transform hover:-translate-y-0 hover:scale-95 hover:opacity-90"}>
      <div className={`${id === index.toString() ? "border border-2 border-orange-1100" : ""}`}></div>
      <Image
        src={catIcon}
        alt="user_icon"
        width={200}
        height={200}
        className="w-14 h-12"
        priority={true}
      />
      <Image
        src={catIcon}
        alt="user_icon"
        width={200}
        height={200}
        className="w-14 h-12"
        priority={true}
      />
      <Image
        src={catIcon}
        alt="user_icon"
        width={200}
        height={200}
        className="w-14 h-12"
        priority={true}
      />
      <Image
        src={catIcon}
        alt="user_icon"
        width={200}
        height={200}
        className="w-14 h-12"
        priority={true}
      />
    </div>
  )
}

const SideMenuImageBot = () => {
  const [isImageSelected, setIsImageSelected] = useState(1);

  return (
    <div
      className="fixed inset-y-0 left-0 h-full w-64 bg-zinc-300 dark:bg-gradient-to-b from-zinc-600 to-zinc-500 xxs:hidden sm:block">
      <section className={"mt-24"}>
        <p className=" p-3 text-2xl font-bold text-zinc-800 dark:text-zinc-200">DALL-E History</p>
      </section>
      <section className={"flex flex-col gap-2"}>
        {Array.from(Array(20).keys()).map((i, index) =>
          <div key={index}>
            <ImageGroup isImageSelected={isImageSelected} index={index}/>
          </div>)}
      </section>
    </div>
  );
};

export default SideMenuImageBot;
