import React, { useState } from "react";
import {
  SimpleGrid,
  Stack,
  Heading,
  Button,
  Box,
  chakra,
  GridItem,
  Text,
  FormControl,
  Input,
  FormLabel,
  Flex,
  Icon,
  Avatar,
  Textarea,
} from "@chakra-ui/react";

import { ProfileIcon } from "../components/Icons/Icons";
import Sidebar from "~~/components/Sidebar/Sidebar";
import { Web3Storage } from "web3.storage";

export default function Account() {
  // redirect to user page
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState(null);
  const [ipfsCid, setIpfsCid] = useState(); //ipfs cid
  const [json, setJson] = useState(); //json to be uploaded
  const [profilepictureURI, setProfilePictureURI] = useState(); //profile picture uri
  const [name, setName] = useState(); //name of the user
  const [description, setDescription] = useState(); //description of the user


  //get the token from the .env file
  const client = new Web3Storage({ token: process.env.NEXT_PUBLIC_REACT_APP_WEB3STORAGE_API_KEY });
  console.log(client);


  
  const uploadProfilePicture = async () => {
    const client = new Web3Storage({ token: process.env.NEXT_PUBLIC_REACT_APP_WEB3STORAGE_API_KEY });
    console.log(client);
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
    const client = new Web3Storage({ token: process.env.NEXT_PUBLIC_REACT_APP_WEB3STORAGE_API_KEY });
    //create a JSON file the will be uploaded to ipfs
    const fileA = new File([JSON.stringify(json)], `${name}.json`, {
      type: "application/json",
    });

    const cid = await client.put([fileA]);
    setIpfsCid(cid);
    console.log(cid);
    setStatus("Uploaded cid", ipfsCid);
  };
  
  return (

    <div className="p-36 min-h-[calc(100vh-163px)] flex flex-col justify-between">
      <Sidebar />
      <Box
        bg="#ffffff"
        _dark={{
          bg: "#111",
        }}
        p={10}
      >
        <Box>
          <SimpleGrid
            display={{
              base: "initial",
              md: "grid",
            }}
            columns={{
              md: 3,
            }}
            spacing={{
              md: 6,
            }}
          >
            <GridItem
              colSpan={{
                md: 1,
              }}
            ></GridItem>
            <GridItem
              mt={[5, null, 0]}
              colSpan={{
                md: 2,
              }}
            >
              <chakra.form
                method="POST"
                shadow="base"
                rounded={[null, "md"]}
                overflow={{
                  sm: "hidden",
                }}
              >
                <Stack
                  px={4}
                  py={5}
                  bg="white"
                  _dark={{
                    bg: "#141517",
                  }}
                  spacing={6}
                  p={{
                    sm: 6,
                  }}
                >
                  <Box px={[4, 0]}>
                    <Heading fontSize="lg" fontWeight="md" lineHeight="6">
                      Profile
                    </Heading>
                    <Text
                      mt={1}
                      fontSize="sm"
                      color="gray.600"
                      _dark={{
                        color: "gray.400",
                      }}
                    >
                      This information will be displayed publicly so be careful what you share.
                    </Text>
                  </Box>
                  <SimpleGrid columns={6} spacing={6}>
                    <FormControl as={GridItem} colSpan={[6, 3]}>
                      <FormLabel
                        htmlFor="first_name"
                        fontSize="sm"
                        fontWeight="md"
                        color="gray.700"
                        _dark={{
                          color: "gray.50",
                        }}
                      >
                        Name
                      </FormLabel>
                      <Input
                        type="text"
                        name="first_name"
                        id="first_name"
                        autoComplete="given-name"
                        mt={1}
                        focusBorderColor="brand.400"
                        shadow="sm"
                        size="sm"
                        w="full"
                        rounded="md"
                        onChange={e => setName(e.target.value)}
                      />
                    </FormControl>

                  </SimpleGrid>

                  <div>
                    <FormControl id="email" mt={1}>
                      <FormLabel
                        fontSize="sm"
                        fontWeight="md"
                        color="gray.700"
                        _dark={{
                          color: "gray.50",
                        }}
                      >
                        About
                      </FormLabel>
                      <Textarea
                        placeholder="Brief description for your profile. URLs are hyperlinked"
                        mt={1}
                        rows={3}
                        shadow="sm"
                        focusBorderColor="brand.400"
                        onChange={e => setDescription(e.target.value)}
                        fontSize={{
                          sm: "sm",
                        }}
                        
                      />
                    </FormControl>
                  </div>

                  <FormControl>
                    <FormLabel
                      fontSize="sm"
                      fontWeight="md"
                      color="gray.700"
                      _dark={{
                        color: "gray.50",
                      }}
                    >
                      Photo
                    </FormLabel>
                    <Flex alignItems="center" mt={1}>
                      <Avatar
                        boxSize={12}
                        bg="gray.100"
                        _dark={{
                          bg: "gray.800",
                        }}
                        icon={
                          <Icon
                            as={ProfileIcon}
                            boxSize={9}
                            mt={3}
                            rounded="full"
                            color="gray.300"
                            _dark={{
                              color: "gray.700",
                            }}
                          />
                        }
                      />
                      <Input
                        type="file"
                        name="Select a file"
                        id="file"
                        autoComplete="file"
                        mt={1}
                        focusBorderColor="brand.400"
                        shadow="sm"
                        size="sm"
                        w="full"
                        rounded="md"
                        onChange={e => setFile(e.target.files[0])}
                      />
                      <Button
                        type="button"
                        ml={5}
                        variant="outline"
                        size="sm"
                        fontWeight="medium"
                        _focus={{
                          shadow: "none",
                        }}
                        onClick={uploadProfilePicture}

                        
                      >
                        Upload Profile Picture to IPFS
                      </Button>
                      <Button

                        type="button"
                        ml={5}
                        variant="outline"
                        size="sm"
                        fontWeight="medium"

                        _focus={{
                          shadow: "none",
                        }}
                        onClick={createJSON}
                      > Create JSON
                      </Button>
                      <Button
                        type="button"
                        ml={5}
                        variant="outline"
                        size="sm"
                        fontWeight="medium"
                        _focus={{
                          shadow: "none",
                        }}
                        onClick={handleUpload}
                      > Upload JSON to IPFS
                      </Button>
                      
                    </Flex>
                  </FormControl>
                </Stack>
              </chakra.form>
            </GridItem>
          </SimpleGrid>
        </Box>
      </Box>
      ;
    </div>
  );

}
