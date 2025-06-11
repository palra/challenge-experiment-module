import { ethers } from "ethers";
import { toast } from "react-toastify";

export class NoProviderDetectedError extends Error {
  constructor() {
    super("No Provider API detected. Make sure that a wallet is installed on your browser.")
  }
}

export const connectMetamask = async () => {
  if (!window.ethereum) {
    throw new NoProviderDetectedError();
  }

  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return { signer: signer, provider: provider };
  } catch (error) {
    console.log("error", error);
  }
};

export const checkIfWalletIsConnect = async (setAccount) => {
  if (!window.ethereum) {
    throw new NoProviderDetected();
  }

  try {
    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });

    if (accounts.length) {
      setAccount(accounts[0]);
    } else {
      console.log("No accounts found");
    }
  } catch (error) {
    console.log(error);
  }
};
