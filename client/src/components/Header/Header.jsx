import React from "react";
import imgHeader from "../../Image/imgHeader.jpg";
import style from "./Header.module.css";
import { Box, Image, Text } from "@chakra-ui/react";

export default function Header() {
  return (
    <Box zIndex={"1"} className={style.container} position='relative'>
      <Text  justifyContent={'center'} width={'100%'} textAlign={'center'} position='absolute' bottom = {'10px'}>
           ENCONTRA TU PROXIMO HOGAR 
        </Text>
      <Image src={imgHeader} alt="imgHeader" />
      
    </Box>
  );
}
