import {
  BrowserProvider,
  Contract,
} from "ethers";


// ==========================================
// ASTITVA SMART CONTRACT
// ==========================================

export const CONTRACT_ADDRESS =
  "0x742881C3b77F8D81C0938Af140690BA8E3D02D26";


// ==========================================
// CONTRACT ABI
// ==========================================

export const CONTRACT_ABI = [
  {
    inputs: [
      {
        internalType: "string",
        name: "fileHash",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "logStamp",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },

  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "fileStamps",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];


// ==========================================
// SEPOLIA CHAIN ID
// ==========================================

export const SEPOLIA_CHAIN_ID = 11155111;


// ==========================================
// CONNECT METAMASK
// ==========================================

export async function connectWallet() {

  if (!window.ethereum) {
    throw new Error(
      "MetaMask is not installed."
    );
  }

  const provider =
    new BrowserProvider(
      window.ethereum
    );

  const accounts =
    await provider.send(
      "eth_requestAccounts",
      []
    );

  const network =
    await provider.getNetwork();

  if (
    Number(network.chainId) !==
    SEPOLIA_CHAIN_ID
  ) {
    throw new Error(
      "Please switch MetaMask to Ethereum Sepolia."
    );
  }

  return {
    provider,
    account: accounts[0],
  };
}


// ==========================================
// GET CONTRACT WITH SIGNER
// ==========================================

export async function getWriteContract() {

  const {
    provider,
    account,
  } = await connectWallet();

  const signer =
    await provider.getSigner(
      account
    );

  const contract =
    new Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    );

  return {
    contract,
    account,
  };
}


// ==========================================
// WRITE TO BLOCKCHAIN
// ==========================================

export async function logFileStamp(
  fileHash,
  timestamp
) {

  const {
    contract,
    account,
  } = await getWriteContract();

  const tx =
    await contract.logStamp(
      fileHash,
      timestamp
    );

  return {
    tx,
    account,
  };
}


// ==========================================
// READ FROM BLOCKCHAIN
// ==========================================

export async function getFileStamp(
  fileHash
) {

  if (!window.ethereum) {
    throw new Error(
      "MetaMask is not installed."
    );
  }

  const provider =
    new BrowserProvider(
      window.ethereum
    );

  const network =
    await provider.getNetwork();

  if (
    Number(network.chainId) !==
    SEPOLIA_CHAIN_ID
  ) {
    throw new Error(
      "Please switch MetaMask to Ethereum Sepolia."
    );
  }

  const contract =
    new Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      provider
    );

  const timestamp =
    await contract.fileStamps(
      fileHash
    );

  return timestamp;
}