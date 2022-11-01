import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { publicProvider } from "wagmi/providers/public";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { alchemyProvider } from "wagmi/providers/alchemy";

const selectedChain =
	Number(process.env.NEXT_PUBLIC_CHAIN_ID) === 4
		? chain.rinkeby
		: chain.mainnet;

const { chains, provider } = configureChains(
	[selectedChain],
	[
		jsonRpcProvider({
			rpc: () => ({
				http:
					selectedChain === chain.rinkeby
						? "https://rpc.ankr.com/eth_rinkeby"
						: "https://rpc.ankr.com/eth",
			}),
		}),
		alchemyProvider({
			apiKey: "gB7n0nQo3zsJZnQKSK2iPQd_g-wm_tef",
		}),
		publicProvider(),
	]
);

const { connectors } = getDefaultWallets({
	appName: "OnChain Identity",
	chains,
});

const wagmiClient = createClient({
	autoConnect: true,
	connectors,
	provider,
});

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<WagmiConfig client={wagmiClient}>
			<RainbowKitProvider chains={chains}>
				<Component {...pageProps} />
				<ToastContainer position="top-center" />
			</RainbowKitProvider>
		</WagmiConfig>
	);
}

export default MyApp;
