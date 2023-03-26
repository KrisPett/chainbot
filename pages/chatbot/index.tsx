import React from "react";
import ChatBot from "@/components/chatbot/ChatBot";
import {PageSEO} from "@/layouts/SEO";

const Index = () => {
  return (
    <>
      <PageSEO
        title={"Chatbot | Chainbot"}
        description={"Chatbot | Chainbot"}
      />
      <ChatBot />
    </>
  );
};

export default Index;

