import React, {createContext} from "react";
import {ImagesCollection, mockImagesData} from "@/components/imagebot/models/interfaces";
import {useQuery} from "@tanstack/react-query";
import {useSession} from "next-auth/react";
import {useRouter} from "next/router";
import process from "process";

const ImageContext = createContext<ImagesCollection>({} as ImagesCollection);

const apiGateway = "https://ehy1v3c0ze.execute-api.us-east-1.amazonaws.com/chatbot-stage/imagebot"
// const apiGateway = "http://localhost:3000/api/aws/getItemdynamoDB"
const FETCH_IMAGES = "FETCH_IMAGES";
const FETCH_IMAGES_FILTER = "FETCH_IMAGES_FILTER";

const fetchMetadata = async (accessToken?: string): Promise<ImagesCollection> => {
  if (!accessToken) return Promise.reject("No access token provided")
  return fetch(process.env.NEXT_PUBLIC_AWS_GATEWAY_URL_IMAGEBOT, {
    method: "GET",
    headers: {'Authorization': `Bearer ${accessToken}`, "Content-Type": "application/json"},
  })
    .then((response) => {
      if (!response.ok) Promise.reject(response)
      return response.json()
    }).catch((error) => console.log(error))
};

interface ImageContextProviderProps {
  children: React.ReactNode;
}

const ImageContextProvider = ({children}: ImageContextProviderProps) => {
  const {data: session} = useSession()
  const router = useRouter()
  const {id} = router.query;

  const {data, isLoading, isRefetching, isFetching, isPaused, fetchStatus, status, isStale} = useQuery([FETCH_IMAGES], () => {
    if (session) return fetchMetadata(session.access_token)
  }, {});

  if (isLoading || isFetching && !id) {
    return (
      <div className={"flex justify-center mt-20"}>
        <div className={` flex  ${!isLoading ? "block" : "hidden"}`}>
          <div
            className="inline-block h-8 w-8 animate-[spinner-grow_0.75s_linear_infinite]
                rounded-full bg-current align-[-0.125em] opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite]
                bg-gradient-to-t from-gray-400 to-gray-300 text-gray-900 opacity-0 dark:bg-orange-1100 dark:from-orange-600 dark:to-amber-900"
            role="status">
                <span
                  className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                  Loading...
                </span>
          </div>
        </div>
      </div>
    )
  }

  if(!data) return <></>

  return (
    <ImageContext.Provider value={data}>
      {children}
    </ImageContext.Provider>
  );
};

export {ImageContext, FETCH_IMAGES, FETCH_IMAGES_FILTER, ImageContextProvider};
