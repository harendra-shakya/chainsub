

import React, { useState } from "react";
import { Web3Storage } from "web3.storage/dist/bundle.esm.min.js";

const Web3Upload = () => {
  const [file, setFile] = useState(null);

  const [status, setStatus] = useState(null);
  const [ipfsCid, setIpfsCid] = useState(); //ipfs cid
  const [json, setJson] = useState(); //json to be uploaded
  const [profilepictureURI, setProfilePictureURI] = useState(); //profile picture uri
  const [name, setName] = useState(); //name of the user
  const [description, setDescription] = useState(); //description of the user

  //create a JSON file the will be uploaded to ipfs

  const uploadProfilePicture = async (name, description, profilepictureURI) => {
    const client = new Web3Storage({ token: process.env.REACT_APP_WEB3STORAGE_API_KEY });
    const profilePic = new File([file], "profilepicture", {
      type: "image",
    });

    const cid = await client.put([profilePic]);
    setProfilePictureURI(cid);
    console.log(cid);
  };


  const createJSON = () => {
    const json = {
      "name": `${name}`,
      "description": `${description}`,
      "image": `https://ipfs.io/ipfs/${profilepictureURI}`,
      "attributes":[{"traitType":"type","value":"profile"}]
    };

    setJson(json);
    console.log(json);

    return json;
  };


  const handleUpload = async () => {
    setStatus("Uploading...");
    const client = new Web3Storage({ token: process.env.REACT_APP_WEB3STORAGE_API_KEY });
    //create a JSON file the will be uploaded to ipfs
    const fileA = new File([JSON.stringify(json)], `${name}.json`, {
      type: "application/json",
    });
  

    const cid = await client.put([fileA]);
    setIpfsCid(cid);
    console.log(cid);
    setStatus("Uploaded cid", ipfsCid);
  };
//RENDER INPUT TO change the name of the user, the state is saved
  return (
    <div>
            <input type="file" onChange={e => setFile(e.target.files[0])} />
            <button onClick={uploadProfilePicture}>Upload a photo</button>
            <button onClick={createJSON}>Set the JSON</button>
            <input type="text" onChange={e => setName(e.target.value)} />
            <input type="text" onChange={e => setDescription(e.target.value)} />


      <button onClick={handleUpload}>Upload</button>
      <div>Status: {status}</div>
    </div>
  );
};

export default Web3Upload;
