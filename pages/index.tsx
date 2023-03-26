import ChatBot from "@/components/chatbot/ChatBot";
import {PageSEO} from "@/layouts/SEO";
import React from "react";

export default function Home() {
  return (
    <>
      <PageSEO
        title={"Chatbot | Chainbot"}
        description={"Chatbot | Chainbot"}
      />
      <ChatBot/>
    </>
  );
}
