import React from "react";
import MembershipCard from "~~/components/Card/MembershipCard";
import Sidebar from "~~/components/Sidebar/Sidebar";
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
import Header from "../Header";

import { useState, useEffect, useContext } from "react";
import { ethers, BigNumber } from "ethers";
import { toast } from "react-hot-toast";

import Image from "next/image";
import { SiCoffeescript } from "react-icons/si";
import RainbowKitCustomConnectButton from "~~/components/scaffold-eth/RainbowKitCustomConnectButton";

export default function Membership() {
  let isConnected = null;
  isConnected = useAccount();
  const [memo, setMemo] = useState("...just bought you a coffee.");
  const [numOfCoffee, setNumOfCoffee] = useState(1);
  const [newPrice, setNewPrice] = useState(numOfCoffee);

  const bgProfile = useColorModeValue(
    "hsla(0,0%,100%,.8)",
    "linear-gradient(112.83deg, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0) 110.84%)",
  );

  const [chainSymbol, setChainSybol] = useState("");
  const [txLoading, setTxLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const user = "Harendra";

  return (
    <div className="pt-36 mx-auto">
      <Sidebar />
      <div className="mt-1 text-center mx-4 shadow-xl  md:w-[400px] h-[550px] flex flex-col justify-center  ring-1 ring-slate-50 dark:ring-zinc-900 bg-white dark:bg-zinc-800 rounded-3xl ">
        <h4 className="font-CircularMedium text-2xl">Change Membership Price</h4>
        <div className="mt-4 py-4 m-4">
          <p className="font-Montserrat text-gray-500">
            <span className="text-5xl -mr-1 align-middle">☕</span> x
            <button
              disabled={numOfCoffee === 1}
              onClick={() => {
                setNumOfCoffee(1);
              }}
              className="ml-2 px-4 text-black bg-white disabled:ring-2 disabled:ring-yellow-400 py-2 mx-1 border-2 border-zinc-500 rounded-full hover:scale-105 transition-all"
            >
              1
            </button>
            <button
              disabled={numOfCoffee === 2}
              onClick={() => {
                setNumOfCoffee(2);
              }}
              className=" px-4 text-black bg-white disabled:ring-2 disabled:ring-yellow-400 py-2 mx-1 border-2 border-zinc-500 rounded-full hover:scale-105 transition-all"
            >
              2
            </button>
            <button
              disabled={numOfCoffee === 5}
              onClick={() => {
                setNumOfCoffee(5);
              }}
              className=" px-4 text-black bg-white disabled:ring-2 disabled:ring-yellow-400 py-2 mx-1 border-2 border-zinc-500 rounded-full hover:scale-105 transition-all"
            >
              5
            </button>
          </p>
          <p>PER MONTH</p>
        </div>

        <form
          onSubmit={e => {
            e.preventDefault();
          }}
        >
          <div className="mx-10">
            <input
              className="min-w-full mt-1 p-2 ring-1 ring-zinc-400 text-zinc-500 dark:bg-zinc-800 rounded-lg"
              placeholder="New Price"
              onChange={e => setNewPrice(e.target.value)}
              value="New Price"
              maxLength={33}
            />
          </div>

          <div className="mt-4 mx-4">
            <RainbowKitCustomConnectButton />
          </div>
          {isConnected && (
            <button
              disabled={txLoading || isLoading}
              type="submit"
              className="font-CircularMedium bg-yellow-500 rounded-full mt-3 py-3 w-72 text-center disabled:bg-gray-200 md:max-w-xs md:mx-auto hover:scale-105 transition-all dark:text-black disabled:scale-100"
            >
              {isConnecting && (
                <>
                  <div role="status">
                    <SiCoffeescript className="inline text-2xl animate-spin -mt-1 mr-3 text-orange-600" />
                    <span className="">Waiting for wallet...</span>
                  </div>
                </>
              )}
              {txLoading && (
                <>
                  <div role="status">
                    <SiCoffeescript className="inline text-2xl animate-spin -mt-1 mr-3 text-orange-600" />
                    <span className="">Changing Price</span>
                  </div>
                </>
              )}
              {!chainSymbol && `Change Price`}
              {!txLoading &&
                chainSymbol &&
                `Support $${numOfCoffee} 
                `}
            </button>
          )}
          {/* <div className="relative inline-block tooltip">
                <p className="mt-4 uppercase text-xs font-CircularMedium text-yellow-800">
                  Tip {user} ${numOfCoffee} & receive {numOfCoffee} ☕ Coffee Token
                </p>
              </div> */}
        </form>
      </div>
    </div>
  );
}
