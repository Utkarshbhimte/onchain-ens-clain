import Button from "@/components/Button";
import { BuildConnectButton } from "@/components/Button/ConnectButton";
import WavesImage from "@/components/Waves";
import useWhiteList from "@/hooks/useWhiteList";
import { buildContract } from "@/utils/buildContract";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAccount, useContract, useNetwork, useSigner } from "wagmi";
import web3 from "web3";
import Card from "react-animated-3d-card";
import ClaimedCard from "@/components/ClaimedCard";
import Modal from "@/components/Modal";

const preferredChainId = Number(process.env.NEXT_PUBLIC_CHAIN_ID);
const Home: NextPage = () => {
	const { isConnected, address, isDisconnected } = useAccount();
	const { chain } = useNetwork();

	const { onWhiteList, proof } = useWhiteList(address);

	const [loading, setLoading] = useState(false);
	const [name, setName] = useState("");
	const [ensName, setEnsName] = useState("");
	const [hasClaimed, setHasClaimed] = useState(false);

	const [pendingModal, setPendingModal] = useState(false);

	// const signer = useSigner();

	// const contract = useContract({
	// 	addressOrName: '0x7CEbc67ad1f0d0391781bD80cc608369303dab80',
	// 	contractInterface: buildContractABI,
	// 	signerOrProvider: signer.data
	// })
	// const contract = useMemo(() => buildContract(address), [address])

	const isValidChain = preferredChainId === chain?.id;

	const isLoginSuccessful = isValidChain && isConnected;

	const claimEns = useCallback(
		async (e: any) => {
			e.preventDefault();
			setLoading(true);
			try {
				setPendingModal(true);
				const temp = await buildContract(address)?.merkleHash;
				const response = await buildContract(address)?.domainMap(name);
				if (
					!!web3.utils.toAscii(response).replaceAll("\u0000", "")
						.length
				) {
					toast.error("ens domain not available!");
					setLoading(false);
					return;
				}
				const tx = await buildContract(address)?.claimSubdomain(
					name,
					proof
				);
				await tx.wait();
				const username = Buffer.from(name as string).toString("base64");
				const url = `https://join.skiptheline.dev/on-chain/welcome/${username}`;
				await fetch(url);
				setHasClaimed(true);
				toast.success("Ens Claimed Successfully");
				// router.push('/congratulations')
				console.log("Transaction successfull");
			} catch (error) {
				console.error(error);
			} finally {
				setPendingModal(false);
				setLoading(false);
			}
		},
		[name, proof]
	);

	const checkIfAlreadyExists = useCallback(async () => {
		if (!address?.length || !isConnected) return;
		setLoading(true);
		try {
			const hash = await buildContract()?.addressToHashmap(
				address.toLowerCase()
			);
			setHasClaimed(
				!!web3.utils.toAscii(hash).replaceAll("\u0000", "").length
			);
			if (!!web3.utils.toAscii(hash).replaceAll("\u0000", "").length) {
				const name = await buildContract()?.hashToDomainMap(hash);
				setEnsName(name);
			}
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	}, [address, isConnected]);

	useEffect(() => {
		checkIfAlreadyExists();
	}, [address, isConnected]);

	useEffect(() => {
		if (isDisconnected) setHasClaimed(false);
	}, [isDisconnected]);

	const shouldShowMsg = !address ? true : onWhiteList;

	return (
		<div className="py-6 justify-center text-center bg-dark-blue h-screen flex items-center text-white flex-col">
			<div className="flex justify-between max-w-7xl mx-auto fixed top-0 py-6 w-full px-4 md:px-0">
				<div className="flex items-center space-x-2">
					<img src="/logo.png" alt="" />
					<span className="font-medium md:block hidden">
						BuildOnChain
					</span>
				</div>
				<div className="flex space-x-6 items-center">
					{shouldShowMsg && (
						<a
							className="underline md:block hidden"
							href="onchain.skiptheline.dev"
							target={"_blank"}
						>
							Start your web3 journey today
						</a>
					)}
					{!!isLoginSuccessful && (
						<div>
							<ConnectButton />
						</div>
					)}
				</div>
			</div>
			<div className="absolute top-0 left-0 w-screen h-screen decorative-stuff overflow-hidden">
				<WavesImage classnames="absolute top-0 right-0 decorative-stuff" />
				<div className="blob decorative-stuff" />
			</div>
			<div className="max-w-4xl mx-auto md:mb-12 px-4 md:px-0">
				{!shouldShowMsg && address && (
					<>
						<img
							className="mx-auto mb-8 rounded-3xl"
							src="https://media4.giphy.com/media/l0ErQ2UfBNFEIlqjC/giphy.gif?cid=ecf05e47f69jrncvqz3b3ttzqco0sp1dxj2iz56bizguntrx&rid=giphy.gif&ct=g"
							alt="gif"
						/>
					</>
				)}
				{!hasClaimed && (
					<div className="text-center md:mb-24 mb-12">
						<h1 className="md:text-6xl text-2xl font-bold leading-13 mb-4">
							{shouldShowMsg ? (
								<>
									Welcome, <br /> Let’s get you a custom{" "}
									<br /> ENS subdomain
								</>
							) : (
								<>Sorry this wallet is not whitelisted</>
							)}
						</h1>
						<p className="md:text-xl text-md">
							<>
								You can use this to easily recieve & send tokens
								in your wallet.
							</>
						</p>
						{!shouldShowMsg && (
							<a
								className="underline mt-4 md:block hidden"
								href="https://onchain.skiptheline.dev"
								target={"_blank"}
							>
								Start your web3 journey today
							</a>
						)}
					</div>
				)}

				{!isLoginSuccessful ? (
					<div className="flex justify-center">
						<BuildConnectButton />
					</div>
				) : onWhiteList ? (
					hasClaimed ? (
						<ClaimedCard ensName={ensName} />
					) : (
						<form className="" onSubmit={claimEns}>
							{isLoginSuccessful && (
								<label className="flex space-x-2 items-center border border-white/[.1] focus-within:border-white rounded-2xl py-4 px-4 mb-4 focus-within:bg-white/[.05] transition-all duration-300 backdrop-blur">
									<input
										type="text"
										placeholder="Enter your sub-domain"
										className=" border-0 flex-1 bg-transparent block w-full focus:outline-none"
										value={name}
										onChange={(e) => {
											setName(e.target.value);
										}}
									/>
									<span className="text-white">
										.isbuildingon.eth
									</span>
								</label>
							)}
							{!!isLoginSuccessful && (
								<div className="flex items-center justify-around">
									<Button
										loading={loading}
										onClick={claimEns}
									>
										Claim Your ENS!
									</Button>
								</div>
							)}
						</form>
					)
				) : null}
			</div>
			<Modal open={pendingModal}>
				<div className="flex-col justify-center items-center w-full space-y-6">
					<svg
						className="animate-spin mx-auto h-10 w-10"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
					>
						<circle
							className="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							stroke-width="4"
						></circle>
						<path
							className="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						></path>
					</svg>

					<div>
						<div>ENS subdomain claiming in process...</div>
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default Home;
