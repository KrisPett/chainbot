import {CONTRACT_ABI} from "@/contracts/ContractABI";

const Web3 = require('web3');

const CONTRACT_PUBLIC_ADDRESS = "0xf91b686333FDF0d59dCdD5C5fEf0C1fCDBEf7bC5";

export const mintNFTContractWeb3 = async (tokenURI: string) => {
  const web3 = await new Web3(window.ethereum);
  const signer = await web3.eth.getAccounts()
  const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_PUBLIC_ADDRESS);
  return contract.methods.mintNFT(signer[0], tokenURI).send({from: signer[0]});
};

