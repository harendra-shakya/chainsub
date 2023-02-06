import React from "react";
import { Box, Flex, Image, Link, chakra } from "@chakra-ui/react";

export default function PostFeed() {
  return (
    <div className="pt-36">
      <Flex
        bg="#ffffff"
        _dark={{
          bg: "#3e3e3e",
        }}
        p={50}
        w="full"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          mx="auto"
          px={8}
          py={4}
          rounded="lg"
          shadow="lg"
          bg="white"
          _dark={{
            bg: "gray.800",
          }}
          maxW="2xl"
        >
          <Flex justifyContent="space-between" alignItems="center">
            <chakra.span
              fontSize="sm"
              color="gray.600"
              _dark={{
                color: "gray.400",
              }}
            >
              Mar 10, 2019
            </chakra.span>
          </Flex>

          <Box mt={2}>
            <Link
              fontSize="2xl"
              color="gray.700"
              _dark={{
                color: "white",
              }}
              fontWeight="700"
              _hover={{
                color: "gray.600",
                _dark: {
                  color: "gray.200",
                },
                textDecor: "underline",
              }}
            >
              Accessibility tools for designers and developers
            </Link>
            <chakra.p
              mt={2}
              color="gray.600"
              _dark={{
                color: "gray.300",
              }}
            >
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora expedita dicta totam aspernatur
              doloremque. Excepturi iste iusto eos enim reprehenderit nisi, accusamus delectus nihil quis facere in modi
              ratione libero!
            </chakra.p>
          </Box>

          <Flex justifyContent="space-between" alignItems="center" mt={4}>
            <Link
              color="brand.600"
              _dark={{
                color: "brand.400",
              }}
              _hover={{
                textDecor: "underline",
              }}
            >
              Read more
            </Link>
          </Flex>
        </Box>
      </Flex>
    </div>
  );
}
