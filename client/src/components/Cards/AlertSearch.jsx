import React from "react";
import { useHistory } from "react-router-dom";
import { Box, Text, Image } from "@chakra-ui/react";
import imgSearch from "../../Image/18058225_888_search_houseasdad.png";

export default function AlertSearch() {
  return (
    <Box position="relative" zIndex={"2"} display={"flex"} justifyContent={"center"}>
      {/* <Text
        justifyContent={"center"}
        textAlign={"center"}
        w={"100%"}
        position="absolute"
        top={"80px"}
        color="gray"
        as="b"
        fontSize="3xl"
      >
        No se encontró la búsqueda...
      </Text> */}
      <Image src={imgSearch} alt="imgSearch" w={"50%"} />
    </Box>
  );
}
