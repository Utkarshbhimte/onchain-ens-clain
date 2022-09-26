import React, { useState } from "react";
import Card from "react-animated-3d-card";
import Button from "./Button";

const ClaimedCard = ({ ensName }: { ensName: string }) => {
	const joinUrl = `https://join.skiptheline.dev/build-camps/join/${encodeURIComponent(
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

	if (ensName) {
		return (
			<div>
				<Card>
					{/* <div className="text-white p-12 flex flex-col space-y-12 m-auto border border-white rounded-3xl w-[700px]"> */}
					<div className="flex items-center justify-between">
						<h1 className="font-bold text-4xl text-left">
							Get your sub-domain of your community!
						</h1>
						<img src="/biglogo.png" className=" w-36 h-36" alt="" />
					</div>
					<div className="w-full rounded-lg text-left shadow-[7px_5px_0_2px] shadow-[#1649FF] py-8 px-6 bg-white">
						<p className="text-3xl font-medium text-[#1D263B]">{`${ensName}.isbuildingon.eth`}</p>
					</div>
					{/* </div> */}
				</Card>

				<div className="mt-12">
					<Button onClick={handleJoin}>Tweet it!</Button>
				</div>
			</div>
		);
	}

	return null;
};

export default ClaimedCard;
