import Button from "@/components/Button";
import { BuildConnectButton } from "@/components/Button/ConnectButton";
import WavesImage from "@/components/Waves";
import useWhiteList from "@/hooks/useWhiteList";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAccount, useContract, useNetwork, useSigner } from "wagmi";
import web3 from 'web3'
import { useRouter } from "next/router";
import { buildContract } from "@/utils/buildContract";

const preferredChainId = Number(process.env.NEXT_PUBLIC_CHAIN_ID);
const Home: NextPage = () => {
	const { isConnected, address, isConnecting } = useAccount();
	const { chain } = useNetwork();
	const router = useRouter();

	const signer = useSigner();

	const { onWhiteList, proof } = useWhiteList(address)

	const [loading, setLoading] = useState(false);
	const [name, setName] = useState('')
	const [isAvailable, setIsAvailable] = useState(false)
	const [hasClaimed, setHasClaimed] = useState(false);

	// const contract = useContract({
	// 	addressOrName: '0x7CEbc67ad1f0d0391781bD80cc608369303dab80',
	// 	contractInterface: buildContractABI,
	// 	signerOrProvider: signer.data
	// })
	// const contract = useMemo(() => buildContract(address), [address])

	const isValidChain = preferredChainId === chain?.id;

	const isLoginSuccessful = isValidChain && isConnected;

	const checkEnsAvailability = useCallback(async () => {
		setLoading(true)
		try {
			const response = await buildContract()?.domainMap(name)
			setIsAvailable(!web3.utils.toAscii(response).replaceAll('\u0000', "").length)
		} catch (error) {
			console.error(error)
		} finally {
			setLoading(false)
		}
	}, [name])

	const claimEns = useCallback(async () => {
		setLoading(true)
		try {
			const tx = await buildContract()?.claimSubdomain(
				name,
				proof
			)
			await tx.wait();
			router.push('/congratulations')
			console.log('Transaction successfull')
		} catch (error) {
			console.error(error)
		} finally {
			setLoading(false)
		}
	}, [name, proof])

	const checkIfAlreadyExists = useCallback(async () => {
		if(!address?.length || !isConnected) return
		setLoading(true);
		try {
			const hash = await buildContract()?.addressToHashmap(
				address.toLowerCase()
			)
			setHasClaimed(!!web3.utils.toAscii(hash).replaceAll('\u0000', "").length)
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false)
		}
	}, [address, isConnected])

	useEffect(() => {
		checkIfAlreadyExists()
	}, [address, isConnected])

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
					<a
						className="underline md:block hidden"
						href="onchain.skiptheline.dev"
						target={"_blank"}
					>
						Start your web3 journey today
					</a>
					{!!isLoginSuccessful && (<div><ConnectButton /></div>)}
				</div>
			</div>
			<div className="absolute top-0 left-0 w-screen h-screen decorative-stuff overflow-hidden">
				<WavesImage classnames="absolute top-0 right-0 decorative-stuff" />
				<div className="blob decorative-stuff"/>
			</div>
			<div className="max-w-4xl mx-auto md:mb-12 px-4 md:px-0">
				<div className="text-center md:mb-24 mb-12">
					<h1 className="md:text-6xl text-2xl font-bold leading-13 mb-4">
						Welcome, <br /> Let’s get you a custom <br /> ENS
						subdomain
					</h1>
					<p className="md:text-xl text-md">
						You can use this to easily recieve & send tokens in your
						wallet.
					</p>
				</div>

				{
					!isLoginSuccessful ? (
						<div className="flex justify-center">
							<BuildConnectButton />
						</div>
					) : onWhiteList 
					? hasClaimed 
					? (
						<p className="md:text-xl text-md">
							You have already claimed ens
						</p>
					)
					: (
						<form className="">
							{isLoginSuccessful && (
								<label className="flex space-x-2 items-center border border-white/[.1] focus-within:border-white rounded-2xl py-4 px-4 mb-4 focus-within:bg-white/[.05] transition-all duration-300 backdrop-blur">
									<input
										type="text"
										placeholder="Enter your sub-domain"
										className=" border-0 flex-1 bg-transparent block w-full focus:outline-none"
										value={name}
										onChange={(e) => {
											setName(e.target.value)
											isAvailable && setIsAvailable(false)
										}}
									/>
									<span className="text-white">
										.buildonchain.eth
									</span>
								</label>
							)}
							{
								!!isLoginSuccessful && (
									<div className="flex items-center justify-around">
										<Button loading={loading} onClick={checkEnsAvailability} disabled={isAvailable}>Check availability</Button>
										{isAvailable && <Button loading={loading} onClick={claimEns}>Claim Your ENS!</Button>}
									</div>
								)
							}
						</form>
					) : (
						<p className="md:text-xl text-md">
							Not on whitelist
						</p>
					)
				}
			</div>
		</div>
	);
};

export default Home;
