import React, {useEffect, useState} from "react";
import Image from "next/image";
import SideMenuImageBot from "@/components/imagebot/SideMenuImageBot";
import {useRouter} from "next/router";
import LoadingImageBig from "@/components/imagebot/LoadingImageBig";
import {useSession} from "next-auth/react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import process from "process";
import ImageModal from "@/components/imagebot/ImageModal";
import {ImageResponse, ImagesCollectionResponse} from "@/components/imagebot/models/ImageModel";
import {FETCH_IMAGES} from "@/components/imagebot/ImageContextProvider";

interface ImageAiMutateMutationFn {
  accessToken: string | undefined;
  text: string;
}

type AIPromptRequestBody = {
  text: string
}

interface EventBody {
  imageIndex: string | string[] | undefined
}

const ImageBotView = () => {
  const router = useRouter()
  const {id} = router.query
  const {data: session} = useSession()
  const queryClient = useQueryClient();

  const [images, setImages] = useState<ImageResponse[] | undefined>([]);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [textLines, setTextLines] = useState(1);
  const [text, setText] = useState("");
  const [progress, setProgress] = useState(0)
  const [open, setOpen] = useState(false)
  const [totalImagesCollectionSize, setTotalImagesCollectionSize] = useState<number>()

  type MutateFetchSelectedImagesType = {
    access_token: string
  }

  const mutateFetchSelectedImages = useMutation((mutateFetchSelectedImagesType: MutateFetchSelectedImagesType) => {
    const eventBody: EventBody = {
      "imageIndex": id
    };
    return fetch(process.env.NEXT_PUBLIC_AWS_GATEWAY_URL_IMAGEBOT_FILTER_IMAGES, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${mutateFetchSelectedImagesType.access_token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(eventBody)
    })
      .then(response => response.json())
      .then(data => {
        let imagesCollectionResponse = data as ImagesCollectionResponse;
        setImages(imagesCollectionResponse.images)
        return imagesCollectionResponse.images
      })
  }, {});

  useEffect(() => {
    if (session?.access_token && id && id !== "-1")
      mutateFetchSelectedImages.mutate({access_token: session.access_token})
  }, [id, session])

  useEffect(() => {
    ultraFastProgressTimeout()
  }, [mutateFetchSelectedImages.isLoading])

  const ultraFastProgressTimeout = () => {
    setProgress(0)
    const progressInterval1 = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress === 100) {
          setProgress(100);
          clearInterval(progressInterval1);
          return prevProgress;
        } else {
          return prevProgress + 1;
        }
      });
    }, 50);

    setTimeout(() => {
      setProgress(100);
      clearInterval(progressInterval1);
    }, 50);
  }

  const generateImageMutate = useMutation(["IMAGE_AI"], ({accessToken, text}: ImageAiMutateMutationFn) => {
    let keepTrackOfImagesCollectionSize = totalImagesCollectionSize
    setProgress(0)
    const progressInterval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress === 100) {
          setProgress(100);
          clearInterval(progressInterval);
          return prevProgress;
        } else {
          return prevProgress + 1;
        }
      });
    }, 100);

    setTimeout(() => {
      setProgress(100);
      clearInterval(progressInterval);
    }, 10000);

    const aiPromptRequestBody: AIPromptRequestBody = {text: text}
    return fetch(process.env.NEXT_PUBLIC_AWS_GATEWAY_URL_IMAGEBOT, {
      method: "POST",
      headers: {'Authorization': `Bearer ${accessToken}`, "Content-Type": "application/json"},
      body: JSON.stringify(aiPromptRequestBody),
    })
      .then((response) => {
        if (!response.ok) return Promise.reject(response)
        return response.json()
      }).then((value) => {
        setProgress(100)
        setImages(value)
        return value
      })
      .finally(() => {
        if (keepTrackOfImagesCollectionSize) {
          router.push(`/imagebot/${keepTrackOfImagesCollectionSize}`).then();
        }
        queryClient.refetchQueries([FETCH_IMAGES]).then()
      })
  });

  const handleTextareaKeydown = async (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const isCtrlEnterPressed = textLines > 1 && event.ctrlKey && event.key === "Enter";
    const isEnterPressed = event.key === "Enter";

    if (isCtrlEnterPressed) {
      setTextLines(textLines - 1);
      return;
    }

    if (isEnterPressed) {
      event.preventDefault();
    }

    if (session) {
      if (isEnterPressed && text !== "") {
        const chatAiMutateMutationFn: ImageAiMutateMutationFn = {
          accessToken: session.access_token,
          text: text,
        }
        generateImageMutate.mutate(chatAiMutateMutationFn)
        setTextLines(1);
        setText("");
      }
    }
  }

  const onClickImage = (imageResponse: ImageResponse) => {
    setOpen(true)
    setSelectedImage(imageResponse.url)
  }

  return (
    <div className={"mt-28 flex justify-center"}>
      <SideMenuImageBot setTotalImagesCollectionSize={setTotalImagesCollectionSize}/>
      <section className={"flex flex-col items-center justify-center "} style={{minHeight: "50vh"}}>
        <div className={"max-w-screen-xl space-y-5 sm:ml-64 xxs:w-12/12 xs:w-12/12 sm:w-12/12 md:w-8/12"}>
          <div
            className={`w-full rounded-full h-2.5 bg-zinc-400 dark:bg-zinc-600 ${generateImageMutate.isLoading || mutateFetchSelectedImages.isLoading ? "opacity-100" : "opacity-0"}`}>
            <div
              className="bg-gradient-to-t from-gray-300 to-gray-400 dark:bg-orange-1100 dark:from-orange-600 dark:to-amber-900 h-2.5 rounded-full"
              style={{width: `${progress}%`}}></div>
          </div>
          <div
            className={`grid md:grid-cols-2 lg:grid-cols-4 gap-5`}>
            {(generateImageMutate.isLoading || images?.length === 0 || images === undefined) && (
              <>
                <LoadingImageBig/>
                <LoadingImageBig/>
                <LoadingImageBig/>
                <LoadingImageBig/>
              </>
            )}
            {!generateImageMutate.isLoading && images ? <>
              {(images) && (
                <>
                  {images.map((image, index) => {
                    return (
                      <div key={index} onClick={() => onClickImage(image)}>
                        {image.url ? (
                          <Image
                            src={image.url}
                            alt="user_icon"
                            width={300}
                            height={300}
                            className="xxs:h-32 xs:h-32 sm:h-32 md:h-56 lg:h-56 xl:h-56 2xl:h-56 xxs:w-56 xs:w-56 sm:w-56 md:w-64 lg:w-64 xl:w-64 2xl:w-64
                        cursor-pointer transition duration-100 ease-in-out transform hover:-translate-y-0 hover:scale-110 rounded"
                            priority={true}
                          />) : (
                          <>
                            <LoadingImageBig/>
                          </>
                        )}
                      </div>

                    );
                  })}
                </>
              )}
            </> : <></>}
          </div>
          <ImageModal open={open} setOpen={setOpen} selectedImage={selectedImage}/>
        </div>
      </section>
      <footer className="fixed bottom-0 flex w-full justify-center bg-transparent">
        <form
          className="mb-2 w-full xxs:w-11/12 sm:ml-64 sm:w-6/12 sm:w-7/12 md:w-7/12 md:w-10/12 lg:w-8/12 lg:w-11/12 xl:w-9/12"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="relative w-full">
              <textarea
                disabled={generateImageMutate.isLoading}
                className="textarea-bordered textarea w-full resize-none rounded-2xl bg-zinc-300
                  placeholder-opacity-50
                  focus:outline-none focus:ring-0 focus:ring-offset-2 focus:ring-offset-orange-300 bg-opacity-60
                  focus-visible:border-0 focus-visible:ring-0 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300
                  dark:placeholder-neutral-100 dark:focus-visible:ring-offset-orange-600 dark:disabled:opacity-30
                  dark:bg-zinc-600 dark:bg-opacity-70
                  "
                placeholder="Type here..."
                onChange={(e) => setText(e.target.value)
                }
                rows={textLines}
                onKeyDown={handleTextareaKeydown}
                value={text}
              />
            <div
              className={`absolute inset-y-0 right-0 bottom-1 flex items-center pr-3 ${generateImageMutate.isLoading ? "block" : "hidden"} opacity-50`}>
              <div
                className="inline-block h-8 w-8 animate-[spinner-grow_0.75s_linear_infinite]
                rounded-full bg-current align-[-0.125em] opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite]
                bg-gradient-to-t from-gray-400 to-gray-300 text-gray-900 dark:bg-orange-1100 dark:from-orange-600 dark:to-amber-900"
                role="status">
                <span
                  className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                  Loading...
                </span>
              </div>
            </div>
          </div>
        </form>
      </footer>
    </div>
  )
};

export default ImageBotView;
