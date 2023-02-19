import React from "react";
import ChatBot from "@/components/chatbot/ChatBot";
import {PageSEO} from "@/layouts/SEO";

const Index = () => {
  return (
    <>
      <PageSEO
        title={"ChainBot | ChatBot"}
        description={"ChainBot | ChatBot"}
      />
      <ChatBot />
    </>
  );
};

export default Index;

