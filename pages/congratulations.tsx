import Button from "@/components/Button";
import WavesImage from "@/components/Waves";
import Link from "next/link";
import React from "react";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

const Congratulation = () => {
	const { height, width } = useWindowSize();

	return (
		<div className="h-screen w-screen bg-dark-blue flex items-center justify-center">
			<div className="flex justify-between max-w-7xl mx-auto fixed top-0 py-6 w-full px-4 md:px-0 text-white">
				<div className="flex items-center space-x-2">
					<img src="/logo.png" alt="" />
					<span className="font-medium md:block hidden">
						<Link href={"/"}>BuildOnChain</Link>
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
				</div>
			</div>
			<div className="absolute top-0 left-0 w-screen h-screen decorative-stuff overflow-hidden">
				<WavesImage classnames="absolute top-0 right-0 decorative-stuff" />
				<div className="blob decorative-stuff"/>
			</div>
			<div className="text-white p-12 backdrop-blur-md flex flex-col space-y-12 m-auto border border-white rounded-3xl w-auto">
				<div className="font-bold text-4xl">Congratulations 🥳,</div>
				<div className="text-2xl flex flex-col">
					You've successfully registered your ens now!
					<div className="text-base mt-4">
						<div>
							Go ahead and set your records, eth address avatars
							and customise your subdomain!
						</div>
						<div>
							Aur bhai @0xbhaisaab.eth give the content for this
						</div>
					</div>
				</div>
				<div className="w-full">
					<Button fullWidth>Flaunt this on Twitter</Button>
				</div>
			</div>
			<Confetti height={height} width={width} recycle={false} />
		</div>
	);
};

export default Congratulation;
