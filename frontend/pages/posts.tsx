import React from "react";
import { Box, Flex, Image, Link, chakra } from "@chakra-ui/react";
import PostFeed from "~~/components/PostFeed";
import Sidebar from "~~/components/Sidebar/Sidebar";

export default function Posts() {
  return (
    <div className="pt-36">
      <Sidebar />
      <PostFeed />
    </div>
  );
}
