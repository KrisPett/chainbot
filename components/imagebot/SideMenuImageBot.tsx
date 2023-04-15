import React, {useContext, useEffect} from "react";
import Image from "next/image";
import {useRouter} from "next/router";
import ButtonAlt from "@/lib/ButtonAlt";
import {ImageContext, ImageContextProvider} from "@/components/imagebot/ImageContextProvider";
import {Images, ImagesCollection} from "@/components/imagebot/models/interfaces";

interface ImageGroupProps {
  index: number;
  imagesGroup: Images
}

const ImageGroup = ({index, imagesGroup}: ImageGroupProps) => {
  const router = useRouter()
  const {id} = router.query;

  const onImageGroupClick = () => {
    return router.push(`/imagebot/${index}`);
  };

  const updateImageUrl = (url: string) => {
    return url.replace("https://s3.amazonaws.com/chainbot.chaincuet.com.storage/imagebot", "https://storage-chainbot.chaincuet.com/imagebot")
  }

  return (
    <div
      onClick={() => onImageGroupClick()}
      className={`flex flex-row space-x-1 justify-center cursor-pointer transition duration-100 ease-in-out transform hover:-translate-y-0 hover:scale-95 hover:opacity-90`}>
      <div className={`${id === index.toString() ? "border-2 border-orange-1100" : ""}`}></div>
      {imagesGroup.images.L.map((image, index) => {
        return (
          <Image key={index}
                 className={`w-14 h-12`}
                 src={updateImageUrl(image.M.url.S)}
                 alt="user_icon" width={200} height={200} priority
          />
        )
      })
      }
    </div>
  )
}

interface ImagesListProps {
  setTotalImagesCollectionSize: (size: number) => void;
}

const ImagesList = ({setTotalImagesCollectionSize}: ImagesListProps) => {
  const images = useContext<ImagesCollection>(ImageContext);

  useEffect(() => {
    setTotalImagesCollectionSize(images.L.length)
  }, [images, setTotalImagesCollectionSize])

  return (
    (images && images.L) &&
    <>
        <div className={"overflow-y-auto overflow-hidden animate-[fade-in-down_1s_ease-in-out]"
        } style={{maxHeight: "90%"}}
        >
            <section className={"mt-20"}>
                <p className="p-3 text-2xl font-bold text-zinc-800 dark:text-zinc-200">DALL-E History</p>
            </section>
            <section className={"flex flex-col gap-2"}>
              {Object.values(images.L).reverse().map((imagesGroup, index) =>
                <div key={index}>
                  <ImageGroup imagesGroup={imagesGroup.M} index={images.L.length - index - 1}/>
                </div>
              )}
            </section>
        </div>
        <div className={"p-1 mt-2 flex justify-center items-center"}>
            <ButtonAlt disabled={true} title={"Clear"} onClick={() => console.log("ButtonAlt")}></ButtonAlt>
        </div>
    </>
  )
}

interface SideMenuImageBotProps {
  setTotalImagesCollectionSize: (size: number) => void;
}

const SideMenuImageBot = ({setTotalImagesCollectionSize}: SideMenuImageBotProps) => {
  return (
    <div className="absolute inset-y-0 left-0 h-full w-64 bg-zinc-300 dark:bg-gradient-to-b from-zinc-600 to-zinc-500
                    xxs:hidden sm:block">
      <ImageContextProvider>
        <ImagesList setTotalImagesCollectionSize={setTotalImagesCollectionSize}/>
      </ImageContextProvider>
    </div>
  );
};

export default SideMenuImageBot;
