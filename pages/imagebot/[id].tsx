import {PageSEO} from "@/layouts/SEO";
import ImageBotView from "@/components/imagebot/ImageBotView";
import React from "react";

const Id = () => {
  return (
    <>
      <PageSEO title={`Imagebot | Chainbot`} description={`Imagebot | Chainbot`}/>
      <ImageBotView/>
    </>
  );
};

export default Id;
