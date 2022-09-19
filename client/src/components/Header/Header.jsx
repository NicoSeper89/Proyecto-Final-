import React from "react";
import imgHeader from "../../Image/imgHeader.jpg";
import style from "./Header.module.css";
import { Box, Image, Text } from "@chakra-ui/react";

export default function Header() {
  return (
    <Box className={style.container}>
      <Image src={imgHeader} alt="imgHeader" />
    </Box>
  );
}
