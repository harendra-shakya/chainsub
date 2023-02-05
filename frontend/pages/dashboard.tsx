// Chakra imports
import { Flex, Grid, Image, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
// Custom icons
import { CartIcon, DocumentIcon, GlobeIcon, WalletIcon } from "../components/Icons/Icons";
import React from "react";
import MiniStatistics from "../components/MiniStatistics";
import DashboardLayout from "../components/DashboardLayout";

export default function Dashboard() {
  const iconBoxInside = useColorModeValue("white", "white");

  return (
    <DashboardLayout>
      <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }}>
        <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing="24px">
          <MiniStatistics
            title={"Total Earnings"}
            amount={"$53,000"}
            percentage={55}
            icon={<WalletIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
          />
          <MiniStatistics
            title={"Members"}
            amount={"2,300"}
            percentage={5}
            icon={<GlobeIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
          />
        </SimpleGrid>
      </Flex>
    </DashboardLayout>
  );
}
