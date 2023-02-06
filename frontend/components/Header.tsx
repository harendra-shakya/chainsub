import { Heading, Avatar, Box, Center, Flex, Text, Stack, Button, useColorModeValue } from "@chakra-ui/react";
import Filecoin from "../public/assets/img/filecoin.png";

import Image from "next/image";
export default function Header() {
  return (
    <div className="pt-36">
      <Center py={6}>
        <Box maxW={"270px"} w={"full"} bg={useColorModeValue("white", "gray.800")} rounded={"md"} overflow={"hidden"}>
          <Flex justify={"center"} mt={2}>
            <Image src={Filecoin} alt={"Author"} width={50} height={50} />
          </Flex>

          <Box p={6}>
            <Stack spacing={0} align={"center"} mb={5}>
              <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
                Example Name
              </Heading>
              <Text color={"gray.500"}>@exmaple</Text>
            </Stack>
          </Box>
        </Box>
      </Center>
    </div>
  );
}
