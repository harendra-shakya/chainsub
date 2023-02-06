import { ConnectButton, connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useNetwork,
  useContractRead,
} from "wagmi";
import { Flex, Grid, useColorModeValue, Box, chakra, Link, Input } from "@chakra-ui/react";
import FileCoin from "../public/assets/img/filecoin.png";
import ProfileBgImage from "../public/assets/img/ProfileBackground.png";
import Header from "../components/Header";

import { useState, useEffect, useContext } from "react";
import debounce from "lodash.debounce";
import { ethers, BigNumber } from "ethers";
import { toast } from "react-hot-toast";

import Image from "next/image";
import { SiCoffeescript } from "react-icons/si";
import RainbowKitCustomConnectButton from "~~/components/scaffold-eth/RainbowKitCustomConnectButton";
import BuyCoffee from "~~/components/BuyCoffee";
import PostFeed from "~~/components/PostFeed";
import BuyMembership from "~~/components/BuyMembership";

export default function Profile() {
  let isConnected = null;
  isConnected = useAccount();
  const bgProfile = useColorModeValue(
    "hsla(0,0%,100%,.8)",
    "linear-gradient(112.83deg, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0) 110.84%)",
  );
  const [page, setPage] = useState("HOME");

  return (
    <Flex direction="column">
      <Header
        backgroundHeader={ProfileBgImage}
        backgroundProfile={bgProfile}
        avatarImage={FileCoin}
        name={"Esthera Jackson"}
        email={"esthera@simmmple.com"}
      />
      <nav className="pt-4 pb-2 lg:pb-6">
        <ul className="flex mx-6 justify-center">
          <li
            onClick={() => setPage("HOME")}
            className="mx-4 font-CircularMedium text-xl text-gray-500 cursor-pointer hover:underline hover:underline-offset-8 active:underline "
          >
            Home
          </li>
          <li
            onClick={() => setPage("MEMBERSHIP")}
            className="mx-4 font-CircularMedium text-xl text-gray-500 cursor-pointer hover:underline hover:underline-offset-8 active:underline "
          >
            Membership
          </li>
          <li
            onClick={() => setPage("POSTS")}
            className="mx-4 font-CircularMedium text-xl text-gray-500 cursor-pointer hover:underline hover:underline-offset-8 active:underline"
          >
            Posts
          </li>
        </ul>
      </nav>
      <div className="text-center mx-auto">
        {/** ------------------------------------------------- */}

        {page === "HOME" ? (
          <Grid templateColumns={{ sm: "1fr", xl: "repeat(2, 1fr)" }} gap="22px">
            <div>
              <BuyCoffee />
            </div>
            <div>
              <div className=" mt-1 mx-4 shadow-xl p-4 text-left ring-1 ring-slate-50 dark:ring-zinc-900 bg-white dark:bg-zinc-800 rounded-2xl ">
                <p className="mx-2">User about section</p>
                <br />
                {/* <Link target="_blank" href="">
                    <a target="_blank" className="mx-2 text-orange-600 cursor-pointer">
                      {`Twitterlink`}
                    </a>
                  </Link> */}
              </div>
            </div>
          </Grid>
        ) : page === "MEMBERSHIP" ? (
          <BuyMembership />
        ) : (
          <div className="md:flex md:mx-auto justify-center">
            <div className="">
              <PostFeed />
            </div>
            {/* <BuyCoffee className="w-full" /> */}
          </div>
        )}
      </div>
    </Flex>
  );
}
