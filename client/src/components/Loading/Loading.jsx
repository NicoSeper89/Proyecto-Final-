import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";
import style from "./Loading.module.css";
import gif from "../../Image/1490.gif";

export default function Loading() {
  return (
    <Box
      position="relative"
      className={style.container}
      zIndex={"1"}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Text>AAAAAAAA</Text>
      {/* <Image src={gif} alt="CARGANDO..." /> */}
    </Box>
  );
}
