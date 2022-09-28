import React, { useEffect, useState } from "react";
import Card from "react-animated-3d-card";
import Button from "./Button";

const ClaimedCard = ({
	loading,
	ensName,
}: {
	loading: boolean;
	ensName: string;
}) => {
	const joinUrl = `https://join.skiptheline.dev/on-chain/join/${encodeURIComponent(
		ensName
	)}`;

	const handleJoin = () => {
		const message =
			"Join me in BuildOnChain and learn exciting things from web3 leaders";
		const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
			message
		)}&url=${encodeURIComponent(joinUrl)}`;

		window.open(url, "_blank");
	};

	console.log({ ensName });

	if (ensName) {
		return (
			<div>
				{loading ? (
					<div>
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
					</div>
				) : (
					<>
						<Card>
							<div className="flex items-center justify-between">
								<h1 className="font-bold text-4xl text-left">
									I am a Builder on chain
								</h1>
								<img
									src="/biglogo.png"
									className=" w-36 h-36"
									alt=""
								/>
							</div>
							<div className="w-full rounded-lg text-left shadow-[7px_5px_0_2px] shadow-[#1649FF] py-8 px-6 bg-white">
								<p className="text-3xl font-medium text-[#1D263B]">{`${ensName}.isbuildingon.eth`}</p>
							</div>
						</Card>

						<div className="mt-12">
							<Button onClick={handleJoin}>Tweet it!</Button>
						</div>
					</>
				)}
			</div>
		);
	}

	return null;
};

export default ClaimedCard;
