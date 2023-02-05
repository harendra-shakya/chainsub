import { Button, Col, Menu, Row, List } from "antd";

import "antd/dist/antd.css";
import {
  useBalance,
  useContractLoader,
  useContractReader,
  // useOnBlock,
  useUserProviderAndSigner,
} from "eth-hooks";
import { useExchangeEthPrice } from "eth-hooks/dapps/dex";
import React, { useCallback, useEffect, useState } from "react";
import { Link, Route, Switch, useLocation } from "react-router-dom";
import "./App.css";
import {
  Account,
  Contract,
  Faucet,
  GasGauge,
  Header,
  Ramp,
  ThemeSwitch,
  NetworkDisplay,
  FaucetHint,
  NetworkSwitch,
  Events,
} from "./components";
import { NETWORKS, ALCHEMY_KEY } from "./constants";
import externalContracts from "./contracts/external_contracts";
// contracts
import deployedContracts from "./contracts/hardhat_contracts.json";
import { getRPCPollTime, Transactor, Web3ModalSetup } from "./helpers";
import { Home, ExampleUI, Hints, Subgraph } from "./views";
import { useStaticJsonRPC, useGasPrice } from "./hooks";
import ChainSub from "./contracts/ChainSub.json";
import Factory from "./contracts/Factory.json";
import { useEventListener } from "eth-hooks/events/useEventListener";
import Address from "./components/Address";
import Web3Upload from "./components/Web3Upload";
import FirebaseUI from "./components/Firebase";
import Profile from "./components/Profile";

const { ethers } = require("ethers");

/*
    Welcome to 🏗 scaffold-eth !

    Code:
    https://github.com/scaffold-eth/scaffold-eth

    Support:
    https://t.me/joinchat/KByvmRe5wkR-8F_zz6AjpA
    or DM @austingriffith on twitter or telegram

    You should get your own Alchemy.com & Infura.io ID and put it in `constants.js`
    (this is your connection to the main Ethereum network for ENS etc.)


    🌏 EXTERNAL CONTRACTS:
    You can also bring in contract artifacts in `constants.js`
    (and then use the `useExternalContractLoader()` hook!)
*/

/// 📡 What chain are your contracts deployed to?
const initialNetwork = NETWORKS.hyperspace; // <------- select your target frontend network (localhost, goerli, xdai, mainnet)

// 😬 Sorry for all the console logging
const DEBUG = true;
const NETWORKCHECK = true;
const USE_BURNER_WALLET = true; // toggle burner wallet feature
const USE_NETWORK_SELECTOR = false;

const web3Modal = Web3ModalSetup();

// 🛰 providers
const providers = [
  "https://api.hyperspace.node.glif.io/rpc/v1/",
  "https://eth-mainnet.gateway.pokt.network/v1/lb/611156b4a585a20035148406",
  `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_KEY}`,
  "https://rpc.scaffoldeth.io:48544",
];

function App(props) {
  // specify all the chains your app is available on. Eg: ['localhost', 'mainnet', ...otherNetworks ]
  // reference './constants.js' for other networks
  const networkOptions = [initialNetwork.name, "mainnet", "goerli", "hyperspace"];

  const [injectedProvider, setInjectedProvider] = useState();
  const [address, setAddress] = useState();
  const [selectedNetwork, setSelectedNetwork] = useState(networkOptions[0]);
  const [chainSub, setChainSub] = useState();
  const [subContractState, setSubContractState] = useState();

  const location = useLocation();

  //create a variable chainsubConfig that will store the address and abi of chainsub in the format {address: , abi:}
  const ChainSubConfig = {
    address: chainSub,
    abi: ChainSub,
  };

  const targetNetwork = NETWORKS[selectedNetwork];

  // 🔭 block explorer URL
  const blockExplorer = targetNetwork.blockExplorer;

  // load all your providers

  const localProvider = useStaticJsonRPC([
    process.env.REACT_APP_PROVIDER ? process.env.REACT_APP_PROVIDER : targetNetwork.rpcUrl,
  ]);
  console.log(localProvider);
  const mainnetProvider = useStaticJsonRPC(providers);

  // Sensible pollTimes depending on the provider you are using
  const localProviderPollingTime = getRPCPollTime(localProvider);
  const mainnetProviderPollingTime = getRPCPollTime(mainnetProvider);

  if (DEBUG) console.log(`Using ${selectedNetwork} network`);

  // 🛰 providers
  if (DEBUG) console.log("📡 Connecting to Mainnet Ethereum");

  const logoutOfWeb3Modal = async () => {
    await web3Modal.clearCachedProvider();
    if (injectedProvider && injectedProvider.provider && typeof injectedProvider.provider.disconnect == "function") {
      await injectedProvider.provider.disconnect();
    }
    setTimeout(() => {
      window.location.reload();
    }, 1);
  };

  /* 💵 This hook will get the price of ETH from 🦄 Uniswap: */
  const price = useExchangeEthPrice(targetNetwork, mainnetProvider, mainnetProviderPollingTime);

  /* 🔥 This hook will get the price of Gas from ⛽️ EtherGasStation */
  const gasPrice = useGasPrice(targetNetwork, "FastGasPrice", localProviderPollingTime);
  // Use your injected provider from 🦊 Metamask or if you don't have it then instantly generate a 🔥 burner wallet.
  const userProviderAndSigner = useUserProviderAndSigner(injectedProvider, localProvider, USE_BURNER_WALLET);
  const userSigner = userProviderAndSigner.signer;

  useEffect(() => {
    async function getAddress() {
      if (userSigner) {
        const newAddress = await userSigner.getAddress();
        setAddress(newAddress);
      }
    }
    getAddress();
  }, [userSigner]);

  // You can warn the user if you would like them to be on a specific network
  const localChainId = localProvider && localProvider._network && localProvider._network.chainId;
  const selectedChainId =
    userSigner && userSigner.provider && userSigner.provider._network && userSigner.provider._network.chainId;

  // For more hooks, check out 🔗eth-hooks at: https://www.npmjs.com/package/eth-hooks

  // The transactor wraps transactions and provides notificiations
  const tx = Transactor(userSigner, gasPrice);

  // 🏗 scaffold-eth is full of handy hooks like this one to get your balance:
  const yourLocalBalance = useBalance(localProvider, address, localProviderPollingTime);

  // Just plug in different 🛰 providers to get your balance on different chains:
  const yourMainnetBalance = useBalance(mainnetProvider, address, mainnetProviderPollingTime);

  // const contractConfig = useContractConfig();

  const contractConfig = { deployedContracts: deployedContracts || {}, externalContracts: externalContracts || {} };
  console.log(contractConfig);

  // Load in your local 📝 contract and read a value from it:
  const readContracts = useContractLoader(localProvider, contractConfig);

  // If you want to make 🔐 write transactions to your contracts, use the userSigner:
  const writeContracts = useContractLoader(userSigner, contractConfig, localChainId);

  //factory contract
  const factoryContract = new ethers.Contract("0x2C4bDE0374fCBA4B18432338B03DA7D9Ec2B1D57", Factory, userSigner);
  const factoryContractWithSigner = factoryContract.connect(userSigner);
  console.log(factoryContract);
  console.log(factoryContractWithSigner);

  //create a useHook to listen to events
  const useEventListener = (contract, eventName, provider, listenerPollingTime) => {
    const [event, setEvent] = useState();
    useEffect(() => {
      if (contract && provider) {
        const poll = () => {
          contract.on(eventName, result => {
            setEvent(result);
          });
        };
        poll();
        const interval = setInterval(poll, listenerPollingTime);
        return () => clearInterval(interval);

        // return () => {
        //   contract.removeAllListeners(eventName);
        // };
      }
    }, [contract, eventName, provider, listenerPollingTime]);
    return event;
  };

  //use the useEventListener hook to listen to the CreateSubscription events on factoryContract should handle multiple events at once and create an array of events that can be mapped over
  /* const createSubscriptionEvent = useEventListener(factoryContract, "CreateSubscription", userSigner, 1000);
  console.log(createSubscriptionEvent); */

  // EXTERNAL CONTRACT EXAMPLE:
  //
  // If you want to bring in the mainnet DAI contract it would look like:
  const mainnetContracts = useContractLoader(mainnetProvider, contractConfig);

  // If you want to call a function on a new block
  // useOnBlock(mainnetProvider, () => {
  //   console.log(`⛓ A new mainnet block is here: ${mainnetProvider._lastBlockNumber}`);
  // });

  // Then read your DAI balance like:
  const myMainnetDAIBalance = useContractReader(
    mainnetContracts,
    "DAI",
    "balanceOf",
    ["0x34aA3F359A9D614239015126635CE7732c18fDF3"],
    mainnetProviderPollingTime,
  );

  // keep track of a variable from the contract in the local React state:
  const purpose = useContractReader(readContracts, "YourContract", "purpose", [], localProviderPollingTime);

  /*
  const addressFromENS = useResolveName(mainnetProvider, "austingriffith.eth");
  console.log("🏷 Resolved austingriffith.eth as:", addressFromENS)
  */

  //
  // 🧫 DEBUG 👨🏻‍🔬
  //
  useEffect(() => {
    if (
      DEBUG &&
      mainnetProvider &&
      address &&
      selectedChainId &&
      yourLocalBalance &&
      yourMainnetBalance &&
      readContracts &&
      writeContracts &&
      mainnetContracts
    ) {
      console.log("_____________________________________ 🏗 scaffold-eth _____________________________________");
      console.log("🌎 mainnetProvider", mainnetProvider);
      console.log("🏠 localChainId", localChainId);
      console.log("👩‍💼 selected address:", address);
      console.log("🕵🏻‍♂️ selectedChainId:", selectedChainId);
      console.log("💵 yourLocalBalance", yourLocalBalance ? ethers.utils.formatEther(yourLocalBalance) : "...");
      console.log("💵 yourMainnetBalance", yourMainnetBalance ? ethers.utils.formatEther(yourMainnetBalance) : "...");
      console.log("📝 readContracts", readContracts);
      console.log("🌍 DAI contract on mainnet:", mainnetContracts);
      console.log("💵 yourMainnetDAIBalance", myMainnetDAIBalance);
      console.log("🔐 writeContracts", writeContracts);
    }
  }, [
    mainnetProvider,
    address,
    selectedChainId,
    yourLocalBalance,
    yourMainnetBalance,
    readContracts,
    writeContracts,
    mainnetContracts,
    localChainId,
    myMainnetDAIBalance,
  ]);

  const loadWeb3Modal = useCallback(async () => {
    //const provider = await web3Modal.connect();
    const provider = await web3Modal.requestProvider();
    setInjectedProvider(new ethers.providers.Web3Provider(provider));

    provider.on("chainChanged", chainId => {
      console.log(`chain changed to ${chainId}! updating providers`);
      setInjectedProvider(new ethers.providers.Web3Provider(provider));
    });

    provider.on("accountsChanged", () => {
      console.log(`account changed!`);
      setInjectedProvider(new ethers.providers.Web3Provider(provider));
    });

    // Subscribe to session disconnection
    provider.on("disconnect", (code, reason) => {
      console.log(code, reason);
      logoutOfWeb3Modal();
    });
    // eslint-disable-next-line
  }, [setInjectedProvider]);

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      loadWeb3Modal();
    }
    //automatically connect if it is a safe app
    const checkSafeApp = async () => {
      if (await web3Modal.isSafeApp()) {
        loadWeb3Modal();
      }
    };
    checkSafeApp();
  }, [loadWeb3Modal]);

  const faucetAvailable = localProvider && localProvider.connection && targetNetwork.name.indexOf("local") !== -1;


  async function createSubscriptionContract() {
    try {
      const makeSub = await tx(factoryContractWithSigner?.createSubscriptionContract(1, 2, 3));
      console.log(makeSub);
      //log and set the address with setChainSub
      const factoryAddress = await factoryContractWithSigner?.address;
      console.log("FactoryDeploying subscription contract");
      setChainSub(factoryAddress);
      console.log(ChainSubConfig);

      //add the new contract to the config
      ChainSubConfig[factoryAddress] = {
        address: factoryAddress,
        abi: ChainSub.abi,
      };
    } catch (err) {
      console.log({ err });
    }
  }

  //make an async function to initialize subscription contract when createSubscriptionEvent is emitted
  async function initializeSubscriptionContract() {
    try {
      const subContract = new ethers.Contract("0x3F2D75D090387f1d5E0cfbC2b97e9323c98C2deC", ChainSub, userSigner);
      const subContractWithSigner = await subContract.connect(userSigner);

      setSubContractState(subContract);
      console.log("subContract", subContract);
    } catch (err) {
      console.log({ err });
    }
  }

  //call initializeSubscriptionContract when createSubscriptionEvent is emitted
  /*useEffect(() => {
    if (createSubscriptionEvent) {
      initializeSubscriptionContract();
    }
  }, [createSubscriptionEvent]);

  //log the functions of ChainSub using the ABI found in ChainSub.json
  console.log(localProvider);
  const chainSubContracttest = useContractLoader(localProvider, ChainSubConfig);
  */

  return (
    <div className="App">
      {/* ✏️ Edit the header and change the title to your project name */}
      <Header>
        {/* 👨‍💼 Your account is in the top right with a wallet at connect options */}
        <div style={{ position: "relative", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", flex: 1 }}>
            {USE_NETWORK_SELECTOR && (
              <div style={{ marginRight: 20 }}>
                <NetworkSwitch
                  networkOptions={networkOptions}
                  selectedNetwork={selectedNetwork}
                  setSelectedNetwork={setSelectedNetwork}
                />
              </div>
            )}
            <Account
              useBurner={USE_BURNER_WALLET}
              address={address}
              localProvider={localProvider}
              userSigner={userSigner}
              mainnetProvider={mainnetProvider}
              price={price}
              web3Modal={web3Modal}
              loadWeb3Modal={loadWeb3Modal}
              logoutOfWeb3Modal={logoutOfWeb3Modal}
              blockExplorer={blockExplorer}
            />
          </div>
        </div>
      </Header>
      {yourLocalBalance.lte(ethers.BigNumber.from("0")) && (
        <FaucetHint localProvider={localProvider} targetNetwork={targetNetwork} address={address} />
      )}
      <NetworkDisplay
        NETWORKCHECK={NETWORKCHECK}
        localChainId={localChainId}
        selectedChainId={selectedChainId}
        targetNetwork={targetNetwork}
        logoutOfWeb3Modal={logoutOfWeb3Modal}
        USE_NETWORK_SELECTOR={USE_NETWORK_SELECTOR}
      />
      <Menu style={{ textAlign: "center", marginTop: 20 }} selectedKeys={[location.pathname]} mode="horizontal">
        <Menu.Item key="/">
          <Link to="/">App Home</Link>
        </Menu.Item>
        <Menu.Item key="/upload">
          <Link to="/upload">Upload</Link>
        </Menu.Item>
        <Menu.Item key="/Profile">
          <Link to="/Profile">Profile</Link>
        </Menu.Item>
      </Menu>

      <Switch>
        <Route exact path="/">
        
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "10vh" }}>
              {/* 
            {
              <Button onClick={createSubscriptionContract} type="primary">
                Create Subscription Contract
              </Button>
            }
            

            
            {createSubscriptionEvent && subContractState && subContractState.address ? (
              <Contract
                name="ChainSub Contract Instance"
                customContract={subContractState}
                signer={userSigner}
                address={subContractState.address}
                provider={localProvider}
                blockExplorer="https://hyperspace.filfox.info/en/"
                contractConfig={ChainSubConfig}
                chainId={3141}
              />
            ) : (
              <div>Awaiting Contract Deployment</div>
            )}
            */}
          </div>
        </Route>

        <Route path="/upload">
          {/* pass userSigner into the Web3Upload component */}
          <Web3Upload userSigner={userSigner} tx={tx} />
        </Route>

        <Route path="/profile">
          <Profile address={address} userSigner={userSigner}  />
        </Route>
      </Switch>

      <ThemeSwitch />

      {/* 🗺 Extra UI like gas price, eth price, faucet, and support: */}
      {/* */}
      <div style={{ position: "fixed", textAlign: "left", left: 0, bottom: 20, padding: 10 }}>
        <Row align="middle" gutter={[4, 4]}>
          <Col span={8}>
            <Ramp price={price} address={address} networks={NETWORKS} />
          </Col>

          <Col span={8} style={{ textAlign: "center", opacity: 0.8 }}>
            <GasGauge gasPrice={gasPrice} />
          </Col>
          <Col span={8} style={{ textAlign: "center", opacity: 1 }}>
            <Button
              onClick={() => {
                window.open("https://t.me/joinchat/KByvmRe5wkR-8F_zz6AjpA");
              }}
              size="large"
              shape="round"
            >
              <span style={{ marginRight: 8 }} role="img" aria-label="support">
                💬
              </span>
              Support
            </Button>
          </Col>
        </Row>

        <Row align="middle" gutter={[4, 4]}>
          <Col span={24}>
            {
              /*  if the local provider has a signer, let's show the faucet:  */
              faucetAvailable ? (
                <Faucet localProvider={localProvider} price={price} ensProvider={mainnetProvider} />
              ) : (
                ""
              )
            }
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default App;
