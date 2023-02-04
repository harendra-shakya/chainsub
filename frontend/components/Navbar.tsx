// Chakra imports
import { Box, Button, Flex, HStack, Link, Text, useColorModeValue } from "@chakra-ui/react";
import Logo from "../public/logo.png";
import React from "react";
import Image from "next/image";
import RainbowKitCustomConnectButton from "~~/components/scaffold-eth/RainbowKitCustomConnectButton";

export default function Navbar() {
  const [open, setOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setOpen(!open);
  };
  // Chakra color mode
  let mainText = useColorModeValue("gray.700", "gray.200");
  let navbarBg = useColorModeValue(
    "linear-gradient(112.83deg, rgba(255, 255, 255, 0.82) 0%, rgba(255, 255, 255, 0.8) 110.84%)",
    "linear-gradient(112.83deg, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0) 110.84%)",
  );
  let navbarBorder = useColorModeValue("1.5px solid #FFFFFF", "1.5px solid rgba(255, 255, 255, 0.31)");
  let navbarShadow = useColorModeValue("0px 7px 23px rgba(0, 0, 0, 0.05)", "none");
  let navbarFilter = useColorModeValue("none", "drop-shadow(0px 7px 23px rgba(0, 0, 0, 0.05))");
  let navbarBackdrop = "blur(21px)";

  var brand = (
    <Link
      href={`/`}
      target="_blank"
      display="flex"
      lineHeight="100%"
      fontWeight="bold"
      justifyContent="center"
      alignItems="center"
      color={mainText}
    >
      <Image src={Logo} width="180" height="180" alt="logo"></Image>
    </Link>
  );
  var linksAuth = <HStack display={{ sm: "none", lg: "flex" }}></HStack>;
  return (
    <Flex
      position="fixed"
      top="16px"
      left="50%"
      transform="translate(-50%, 0px)"
      background={navbarBg}
      border={navbarBorder}
      boxShadow={navbarShadow}
      filter={navbarFilter}
      backdropFilter={navbarBackdrop}
      borderRadius="15px"
      px="16px"
      py="22px"
      mx="auto"
      width="1044px"
      maxW="90%"
      alignItems="center"
    >
      <Flex w="100%" justifyContent={{ sm: "start", lg: "space-between" }}>
        {brand}
        <Box ms={{ base: "auto", lg: "0px" }} display={{ base: "flex", lg: "none" }}></Box>
        {linksAuth}
        <RainbowKitCustomConnectButton />
      </Flex>
    </Flex>
  );
}

// AuthNavbar.propTypes = {
//   color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
//   brandText: PropTypes.string,
// };
