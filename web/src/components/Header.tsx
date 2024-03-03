import {
  Link,
} from "@chakra-ui/react";
import { useDisconnect, useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";


export const Header = () => {
  const { address, isConnected } = useAccount();
  // const { disconnectWeb3 } = useDisconnect();
  const { disconnect } = useDisconnect();

  return (
    <header className="self-stretch bg-newbackground sticky box-border flex flex-row items-center justify-between py-4 px-[62px] gap-[20px] top-[0] z-[99] max-w-full text-left text-8xl-9 text-gray-1 font-body-2-body-2 border-b-[1px] border-solid border-whitesmoke-300 mq675:pl-[31px] mq675:pr-[31px] mq675:box-border">
      <div className="flex flex-row items-center justify-start py-[4.347039699554443px] pr-1 pl-[4.347039699554443px] gap-[4.35px]">
        <Link href="/">
          <div className="relative leading-[140%] font-bold whitespace-nowrap no-underline text-white">
            Research<span className="text-red">DAO</span>
          </div>
        </Link>
      </div>

      <div className="h-[37px] w-[335px] flex flex-row items-center justify-end gap-[16px] max-w-full text-sm text-green-2 mq750:w-[250px]">
        {isConnected && (
          <>
            <Link
              href="/publication"
              className=" text-white text-lg font-body-2-body-2 font-semibold mr-4 ">
              Publications
            </Link>
            <Link
              href="/review"
              className=" text-white text-lg font-body-2-body-2 font-semibold mr-4 ">
              Review
            </Link>
            <Link
              href="/profile"
              className=" text-white text-lg font-body-2-body-2 font-semibold mr-4 ">
              Profile
            </Link>
          </>
        )}
        <ConnectButton chainStatus="none" accountStatus="address" />
      </div>
    </header>
  );
};
