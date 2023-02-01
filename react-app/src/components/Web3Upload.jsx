//create a component that will upload a file to IPFS and return the hash using web3storage
//the api key is stored in the .env file located at react-app/.env
//the component is imported in App.jsx and rendered in the browser
//the user should be able to select a file from their computer and set its path with the setFile function
//the hash will be displayed in the browser
//the status will be displayed in the browser
//use medusa sdk to encrypt the data towards medusa before uploading to ipfs, use base64 encoding
// At this point, the encryptedKey should be submitted to Medusa as ciphertext.
// The encryptedData should be stored in a public store like ipfs / Filecoin / Arweave / AWS s3 etc.

// At a later point, another user would request the encryptedKey to be reencrypted towards themself
// If that request is valid according to the application's access control policy,
// the user will fetch the reencrypted key as ciphertext
// The application should also fetch the encryptedContents from the data store

// Decrypt encryptedContents using reencrypted ciphertext from Medusa
// If a user has not signed a message for Medusa yet,
// this will prompt them to sign a message in order to retrieve their Medusa private key

//encrypt the file before uploading to ipfs

//use userSigner from app.jsx to sign a message for medusa

import React, { useState } from "react";
import { Web3Storage } from "web3.storage/dist/bundle.esm.min.js";
import { Medusa, EVMG1Point, SuiteType, HGamalEVMCipher } from "@medusa-network/medusa-sdk";
import { Base64 } from "js-base64";
import { ethers } from "ethers";
import ChainSub from "../contracts/ChainSub.json";

const Web3Upload = ({ userSigner }) => {
  const [file, setFile] = useState(null);
  const [hash, setHash] = useState(null);
  const [status, setStatus] = useState(null);
  const [encryptedData64, setEncryptedData64] = useState(null);
  const [pubKey, setPubKey] = useState(); //medusa public key
  const [medusa, setMedusa] = useState(); //medusa sdk
  const [encryptedKeyState, setEncryptedKeyState] = useState(); //encrypted key from medusa
  const [ipfsCid, setIpfsCid] = useState(); //ipfs cid

  //export HGamalEVMCipher from medusa sdk as an interface

  const medusaOracleAddress = "0xd466a3c66ad402aa296ab7544bce90bbe298f6a0";
  const applicationContractAddress = "0x1792FFE3E317520F81DFBf86fEB0CCBFD9Ea5DFC";

  //async function to fetch the public key from medusa
  const fetchMedusaPublicKey = async () => {
    const medusa = await Medusa.init(medusaOracleAddress, userSigner);
    const medPubKey = await medusa.fetchPublicKey();
    setPubKey(medPubKey);
    console.log(medPubKey);
  };

  const handleEncrypt = async () => {
    setStatus("Encrypting...");
    const medusa = await Medusa.init(medusaOracleAddress, userSigner);
    const key = await medusa.signForKeypair();
    const { encryptedData, encryptedKey } = await medusa.encrypt(
      new TextEncoder().encode(file),
      applicationContractAddress,
    );
    setHash(encryptedData);
    setStatus("Encrypted");
    const b64EncryptedData = Base64.fromUint8Array(encryptedData);
    setEncryptedData64(b64EncryptedData);
    console.log("data", encryptedData);
    console.log("key", encryptedKey);
    console.log("b64", b64EncryptedData);
    setMedusa(medusa);

    console.log("This is medusa", medusa);

    //create a tupule of the encrypted data it should look like this,
    //((encryptedData.encryptedKey.random.x._hex, encryptedData.encryptedKey.random.y._hex), encryptedData.encryptedKey.cipher._hex, (encryptedData.encryptedKey.random2.x._hex, encryptedData.encryptedKey.random2.y._hex), (encryptedData.encryptedKey.dleq.e._hex, encryptedData.encryptedKey.dleq.f._hex))

    const encryptedKeyTupule = [
      [encryptedKey.random.x._hex, encryptedKey.random.y._hex],
      encryptedKey.cipher._hex,
      [encryptedKey.random2.x._hex, encryptedKey.random2.y._hex],
      [encryptedKey.dleq.e._hex, encryptedKey.dleq.f._hex],
    ];

    setEncryptedKeyState(encryptedKey);

    //log the encrypted data tuple

    console.log(encryptedKeyTupule);
  };

  const handleEncryptToMedusa = async () => {
    setStatus("Encrypting to Medusa...");
    const medusa = await Medusa.init(medusaOracleAddress, userSigner);
    const chainSub = await new ethers.Contract("0x1792FFE3E317520F81DFBf86fEB0CCBFD9Ea5DFC", ChainSub, userSigner);
    const chainSubWithSigner = await chainSub.connect(userSigner);

    try {
      const cipherID = await chainSubWithSigner.submitEntry(encryptedKeyState);
      console.log(cipherID);
      setStatus("Encrypted to Medusa");
    } catch (error) {
      console.log(error);
    }
  };

  //handle decrypting the file

  const handleDecrypt = async () => {
    setStatus("Decrypting...");
    //log big number from hash.encryptedKey.cipher._hex as a number

    console.log(String(hash.encryptedKey.cipher._hex));

    //use HGamalEVMCipher to decrypt the file it is an interface for the data found in the encryptedKey

    //use medusa sdk to decrypt the file
  };

  //handle uploading the encrypted file to ipfs

  const handleUpload = async () => {
    setStatus("Uploading...");
    const client = new Web3Storage({ token: process.env.REACT_APP_WEB3STORAGE_API_KEY });
    console.log("64", encryptedData64);
    console.log("file", file);

    const fileA = new File([encryptedData64], "beans", { type: "text/plain" });

    const cid = await client.put([fileA]);
    setIpfsCid(cid);
    console.log(cid);
    setStatus("Uploaded");
  };

  return (
    <div>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
      <button onClick={handleEncrypt}>Encrypt</button>
      <button onClick={fetchMedusaPublicKey}>Fetch Medusa Public Key</button>
      <button onClick={handleEncryptToMedusa}>Encrypt to Medusa</button>
      <div>Status: {status}</div>
    </div>
  );
};

export default Web3Upload;
