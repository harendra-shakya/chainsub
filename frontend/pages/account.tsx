import React from "react";
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

export default function Account() {
  // redirect to user page
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
                        First name
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
                      />
                    </FormControl>

                    <FormControl as={GridItem} colSpan={[6, 3]}>
                      <FormLabel
                        htmlFor="last_name"
                        fontSize="sm"
                        fontWeight="md"
                        color="gray.700"
                        _dark={{
                          color: "gray.50",
                        }}
                      >
                        Last name
                      </FormLabel>
                      <Input
                        type="text"
                        name="last_name"
                        id="last_name"
                        autoComplete="family-name"
                        mt={1}
                        focusBorderColor="brand.400"
                        shadow="sm"
                        size="sm"
                        w="full"
                        rounded="md"
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
                      <Button
                        type="button"
                        ml={5}
                        variant="outline"
                        size="sm"
                        fontWeight="medium"
                        _focus={{
                          shadow: "none",
                        }}
                      >
                        Change
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
