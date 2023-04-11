import {PageSEO} from "@/layouts/SEO";
import React from "react";
import HomeView from "@/components/home/HomeView";

export default function Home() {
  return (
    <>
      <PageSEO
        title={"Chatbot | Chainbot"}
        description={"Chatbot | Chainbot"}
      />
      <HomeView/>
    </>
  );
}
