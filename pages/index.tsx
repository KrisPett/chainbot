import {PageSEO} from "@/layouts/SEO";
import React, {useEffect} from "react";
import HomeView from "@/components/home/HomeView";
import {EthereumClient, w3mConnectors, w3mProvider} from '@web3modal/ethereum'
import {useWeb3ModalTheme, Web3Modal} from '@web3modal/react'
import {configureChains, createClient, WagmiConfig} from 'wagmi'
import {arbitrum, mainnet, polygon} from 'wagmi/chains'
import process from "process";
import {useTheme} from "next-themes";

const chains = [arbitrum, mainnet, polygon]
const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_ID
const {provider} = configureChains(chains, [w3mProvider({projectId})])

const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({projectId, version: 1, chains}),
  provider
})

const ethereumClient = new EthereumClient(wagmiClient, chains)

export default function Home() {
  const {setTheme} = useWeb3ModalTheme()
  const {theme} = useTheme()

  useEffect(() => {
    if (localStorage.getItem("theme")) {
      setTheme({
        themeMode: theme === 'dark' ? 'dark' : 'light',
        themeVariables: {
          '--w3m-font-family': 'Roboto, sans-serif',
          '--w3m-accent-color': '#F5841F'
        }
      })
    }
  }, [theme])

  return (
    <>
      <PageSEO title={"Chatbot | Chainbot"} description={"Chatbot | Chainbot"}/>
      <WagmiConfig client={wagmiClient}>
        <HomeView/>
      </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient}/>
    </>
  );
}
