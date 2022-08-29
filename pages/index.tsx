import WavesImage from "@/components/Waves";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import { useAccount, useNetwork } from "wagmi";

const preferredChainId = Number(process.env.NEXT_PUBLIC_CHAIN_ID);
const Home: NextPage = () => {
  const { isConnected } = useAccount();
  const { chain } = useNetwork();

  const isValidChain = preferredChainId === chain?.id;
  console.log(
    "🚀 ~ file: index.tsx ~ line 12 ~ preferredChainId === chain?.id",
    preferredChainId,
    chain?.id,
    isValidChain
  );

  const isLoginSuccessful = isValidChain && isConnected;
  console.log(
    "🚀 ~ file: index.tsx ~ line 20 ~ isLoginSuccessful = isValidChain && isConnected",
    isLoginSuccessful,
    isValidChain,
    isConnected
  );
  return (
    <div className="py-6 justify-center text-center bg-dark-blue h-screen flex items-center text-white flex-col">
      <div className="flex justify-between max-w-7xl mx-auto fixed top-0 py-6 w-full px-4 md:px-0">
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="" />
          <span className="font-medium md:block hidden">BuildOnChain</span>
        </div>
        <div className="flex space-x-6 items-center">
          <a
            className="underline md:block hidden"
            href="onchain.skiptheline.dev"
          >
            Start your web3 journey today
          </a>
          {!!isLoginSuccessful && <ConnectButton />}
        </div>
      </div>
      <div className="absolute top-0 left-0 w-screen h-screen decorative-stuff overflow-hidden">
        <WavesImage classNames="absolute top-0 right-0 decorative-stuff" />
        <div className="blob decorative-stuff"></div>
      </div>
      <div className="max-w-4xl mx-auto md:mb-12 px-4 md:px-0">
        <div className="text-center md:mb-24 mb-12">
          <h1 className="md:text-6xl text-2xl font-bold leading-13 mb-4">
            Welcome, <br /> Let’s get you a custom <br /> ENS subdomain
          </h1>
          <p className="md:text-xl text-md">
            You can use this to easily recieve & send tokens in your wallet.
          </p>
        </div>

        <form className="">
          <label className="flex space-x-2 items-center border border-white/[.1] focus-within:border-white rounded-2xl py-4 px-4 mb-4 focus-within:bg-white/[.05] transition-all duration-300 backdrop-blur">
            <input
              type="text"
              placeholder="Enter your sub-domain"
              className=" border-0 flex-1 bg-transparent block w-full focus:outline-none"
            />
            <span className="text-white">.buildonchain.eth</span>
          </label>
          {!isLoginSuccessful && (
            <div className="flex justify-center">
              <ConnectButton />
            </div>
          )}
          {!!isLoginSuccessful && (
            <button
              type="button"
              className="inline-flex items-center px-12 py-3 border border-transparent text-base rounded-2xl shadow-sm text-white bg-primary-blue hover:bg-primary-blue focus:outline-none focus:ring-2 focus:ring-primary-blue cursor-pointer md:w-auto w-full justify-center font-medium"
            >
              Claim your ENS
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Home;
