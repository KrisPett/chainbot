import React from "react";
import {PageSEO} from "@/layouts/SEO";
import ImageBotView from "@/components/imagebot/ImageBotView";

const Index = () => {
  return (
    <>
      <PageSEO
        title={"Imagebot | Chainbot"}
        description={"Imagebot | Chainbot"}
      />
      <ImageBotView />
    </>
  );
};

export default Index;
