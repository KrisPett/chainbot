import {useRouter} from "next/router";
import {PageSEO} from "@/layouts/SEO";
import ImageBot from "@/components/imagebot/ImageBot";
import React from "react";

const Id = () => {
  const router = useRouter();
  const {id} = router.query;

  return (
    <>
      <PageSEO
        title={`ChainBot | ImageBot ${id}`}
        description={`ChainBot | ImageBot ${id}`}
      />
      <ImageBot/>
    </>
  );
};

export default Id;
