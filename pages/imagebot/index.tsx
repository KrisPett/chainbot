import React from "react";
import { PageSEO } from "@/layouts/SEO";
import ImageBot from "@/components/imagebot/ImageBot";

const Index = () => {
  return (
    <>
      <PageSEO
        title={"ChainBot | ImageBot"}
        description={"ChainBot | ImageBot"}
      />
      <ImageBot />
    </>
  );
};

export default Index;
