import React from "react";
import imgHeader from "../../Image/imgHeader.jpg";
import style from "./Header.module.css";
import { Box, Image, Text } from "@chakra-ui/react";

export default function Header() {
  return (
    <Box position="relative" className={style.container} zIndex={"1"}>
      <Text
        justifyContent={"center"}
        textAlign={"center"}
        w={"100%"}
        position="absolute"
        bottom={"10px"}
        color="#D89E1A"
        as="b"
        fontSize="3xl"
      >
        ENCONTRA TU PROXIMO HOGAR
      </Text>
      <Image src={imgHeader} alt="imgHeader" />
    </Box>
  );
}
