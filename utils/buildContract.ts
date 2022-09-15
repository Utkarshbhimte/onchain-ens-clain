import { ethers, Signer } from "ethers";
import buildContractABI from '../abis/build.json';

declare let window: any;

export const buildContract = (walletAddress?: string) => {
    const {ethereum} = window;
    if(ethereum) {
       const provider = new ethers.providers.Web3Provider(ethereum);
       const signer = provider.getSigner(walletAddress)
       const contractReader = new ethers.Contract(
            "0x0A5d2045B999469ED0DcaE2dC58FEc7f83e146f8",
            buildContractABI,
            signer
       )
       return contractReader
    }
    return null;
}