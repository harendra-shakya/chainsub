import { useContext, useEffect } from "react";
import { MdIosShare } from "react-icons/md";
import Link from "next/link";
import Image from "next/image";

import { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
// import { getEarnings } from "../lib/moralis";

// import PolygonLogo from "../public/polygon.png";
// import BinanceLogo from "../public/binance.png";
// import FantomLogo from "../public/fantom.png";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { toast } from "react-hot-toast";
import Filecoin from "../public/assets/img/filecoin.png";

import { usePrepareContractWrite, useContractWrite, useWaitForTransaction, useAccount, useNetwork } from "wagmi";
import RainbowKitCustomConnectButton from "~~/components/scaffold-eth/RainbowKitCustomConnectButton";

import { Flex, Grid, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
// Custom icons
import { CartIcon, DocumentIcon, GlobeIcon, WalletIcon } from "../components/Icons/Icons";
import React from "react";
import MiniStatistics from "../components/MiniStatistics";
import { Card, CardHeader, CardBody, CardFooter, Stack, Heading, Button, Center, Box, chakra } from "@chakra-ui/react";

export default function Dashboard({}) {
  const [earnings, setEarnings] = useState(0);

  const [share, setShare] = useState(false);
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const iconBoxInside = useColorModeValue("white", "white");

  const callShare = () => {
    setShare(true);
    setTimeout(() => {
      setShare(false);
    }, 2000);
  };

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: "ADDRESS",
    abi: [
      {
        inputs: [],
        name: "withdraw",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
    ],
    functionName: "withdraw",
    enabled: true,
  });

  let { data, isLoading, error, isError, write } = useContractWrite(config);

  let { isSuccess, isLoading: txLoading } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess(data) {
      toast.success(`Withdrawn ${chain?.name} tips successfully!`, {
        duration: 3000,
      });
    },
  });

  const username = "Harendra"; // TODO: change this

  return (
    <main className="p-36 min-h-[calc(100vh-163px)] flex flex-col justify-between">
      <div className="hidden left-[5%] pt-24 text-2xl scale-150 md:scale-130 md:mx-auto top-24 lg:block lg:absolute ">
        <Sidebar username={username} page="dashboard" />
      </div>

      <div className="md:w-[600px] md:mx-auto md:left-0">
        <div className="mt-8 m-5 flex justify-between ">
          <div>
            <h2 className="font-semibold text-2xl">Hello, @{username}</h2>
            <Link className="hover:text-orange-600" href={`/${username}`}>
              <p className="hover:text-orange-600 hover:cursor-pointer">
                {process.env.NEXT_PUBLIC_PUBLIC_URL}/{username}
              </p>
            </Link>
          </div>

          <div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_PUBLIC_URL}/${username}`);
                callShare();
              }}
              className="m-auto flex font-CircularMedium bg-gray-300 rounded-full py-3 w-32 text-center md:max-w-xs md:mx-auto hover:scale-105 transition-all dark:text-black"
            >
              <MdIosShare className="text-xl ml-5 mr-2" /> {share ? "Copied!" : "Share"}
            </button>
          </div>
        </div>
        <hr />
        <Flex
          bg="white"
          _dark={{
            bg: "#3e3e3e",
          }}
          p={50}
          w="full"
          alignItems="center"
          justifyContent="center"
        >
          <Box w="md" mx="auto" py={4} px={8} bg="white" shadow="lg" rounded="lg">
            <chakra.p
              mt={2}
              color="gray.600"
              _dark={{
                color: "gray.200",
              }}
            >
              Total Earnings
            </chakra.p>

            <chakra.h2
              color="gray.800"
              _dark={{
                color: "white",
              }}
              fontSize={{
                base: "2xl",
                md: "3xl",
              }}
              mt={{
                base: 2,
                md: 0,
              }}
              fontWeight="bold"
            >
              21, 000 FIL
            </chakra.h2>
            <Flex
              justifyContent={{
                base: "end",
                md: "end",
              }}
              mt={-16}
            >
              <Image
                width={70}
                height={70}
                rounded="full"
                borderStyle="solid"
                borderWidth={2}
                color="brand.500"
                _dark={{
                  color: "brand.400",
                }}
                alt="Testimonial avatar"
                src={Filecoin}
              />
            </Flex>

            <Flex justifyContent="start" mt={4}>
              <p
                color="brand.500"
                _dark={{
                  color: "brand.300",
                }}
              >
                Donations: 20k
              </p>
              <p
                className="pl-2"
                color="brand.500"
                _dark={{
                  color: "brand.300",
                }}
              >
                Membership: 20k
              </p>
            </Flex>
          </Box>
        </Flex>
        <div className="text-center mb-4">
          <button
            disabled={!write || isLoading || txLoading || earnings === 0}
            className=" font-CircularMedium bg-yellow-600 rounded-full mt-3 py-3 h-[50px]  w-72 text-center disabled:bg-gray-300 md:max-w-xs md:mx-auto disabled:hover:scale-100 hover:scale-105 transition-all dark:text-black"
          >
            {isLoading && (
              <>
                <div role="status">
                  <span className="">Waiting for wallet...</span>
                </div>
              </>
            )}
            {txLoading && (
              <>
                <div role="status">
                  <span className="">Withdrawing</span>
                </div>
              </>
            )}
            {!isLoading && !txLoading && "Withdraw"}
          </button>
        </div>
        <div className="text-center mb-4">
          <RainbowKitCustomConnectButton />
        </div>
      </div>
    </main>
  );
}
