import { ethers, Signer } from "ethers";
import buildContractABI from '../abis/build.json';

declare let window: any;

export const buildContract = (walletAddress?: string) => {
    const {ethereum} = window;
    if(ethereum) {
       const provider = new ethers.providers.Web3Provider(ethereum);
       const signer = provider.getSigner(walletAddress)
       const contractReader = new ethers.Contract(
            "0x7CEbc67ad1f0d0391781bD80cc608369303dab80",
            buildContractABI,
            signer
       )
       return contractReader
    }
    return null;
}