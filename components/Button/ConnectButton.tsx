import { ConnectButton } from "@rainbow-me/rainbowkit";
import Button from ".";
export const BuildConnectButton = () => {
	return (
		<ConnectButton.Custom>
			{({
				account,
				chain,
				openAccountModal,
				openChainModal,
				openConnectModal,
				authenticationStatus,
				mounted,
			}) => {
				// Note: If your app doesn't use authentication, you
				// can remove all 'authenticationStatus' checks
				const ready = mounted && authenticationStatus !== "loading";
				const connected =
					ready &&
					account &&
					chain &&
					(!authenticationStatus ||
						authenticationStatus === "authenticated");
				return (
					<div
						{...(!ready && {
							"aria-hidden": true,
							style: {
								opacity: 0,
								pointerEvents: "none",
								userSelect: "none",
							},
						})}
					>
						{(() => {
							if (!connected) {
								return (
									<Button
										onClick={openConnectModal}
										type="button"
									>
										Connect Wallet
									</Button>
								);
							}
							if (chain.unsupported) {
								return (
									<button
										onClick={openChainModal}
										type="button"
									>
										Wrong network
									</button>
								);
							}
							return (
								<div className=" bg-slate-200 p-2 rounded-xl flex space-x-2">
									<Button
										onClick={openChainModal}
										type="button"
									>
										{chain.hasIcon && (
											<div
												style={{
													background:
														chain.iconBackground,
													width: 12,
													height: 12,
													borderRadius: 999,
													overflow: "hidden",
													marginRight: 4,
												}}
											>
												{chain.iconUrl && (
													<img
														alt={
															chain.name ??
															"Chain icon"
														}
														src={chain.iconUrl}
														style={{
															width: 12,
															height: 12,
														}}
													/>
												)}
											</div>
										)}
										{chain.name}
									</Button>
									<Button
										onClick={openAccountModal}
										type="button"
									>
										{account.displayName}
										{account.displayBalance
											? ` (${account.displayBalance})`
											: ""}
									</Button>
								</div>
							);
						})()}
					</div>
				);
			}}
		</ConnectButton.Custom>
	);
};
