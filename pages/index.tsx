import Head from 'next/head';
import ChatBot from '@/components/chatbot/ChatBot';
import { PageSEO } from '@/layouts/SEO';
import React from 'react';

export default function Home() {
  return (
    <>
      <PageSEO
        title={'ChainBot | ChatBot'}
        description={'ChainBot | ChatBot'}
      />
      <ChatBot />
    </>
  );
}
