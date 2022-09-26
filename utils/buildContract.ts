import { ethers, Signer } from "ethers";
import buildContractABI from "../abis/build.json";

declare let window: any;

export const buildContract = (walletAddress?: string) => {
	const { ethereum } = window;
	if (ethereum) {
		const contractAddress =
			process.env.NODE_ENV == "development"
				? "0x7CEbc67ad1f0d0391781bD80cc608369303dab80"
				: "0x0A5d2045B999469ED0DcaE2dC58FEc7f83e146f8";

		const provider = new ethers.providers.Web3Provider(ethereum);
		const signer = provider.getSigner(walletAddress);
		const contractReader = new ethers.Contract(
			contractAddress,
			buildContractABI,
			signer
		);
		return contractReader;
	}
	return null;
};
