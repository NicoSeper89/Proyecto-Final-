import React from "react";
import NavBarForms from "../NavBar/NavBarForms";
import Footer from "../Footer/Footer";
import style from "./Help.module.css";
import { Box, Flex, Text } from "@chakra-ui/react";

export default function Help() {
  return (
    <Box backgroundColor={"#EDEDED"}>
      <NavBarForms />
      <Flex
        direction={"column"}
        justifyContent={"space-evenly"}
        alignItems={"center"}
        textAlign={"justify"}
        p={"50px"}
        paddingTop={"100px"}
        // className={style.containerText}
      >
        <Text as="b" textTransform={"uppercase"} fontSize="2xl">
          Ayuda
        </Text>
        <Text as="samp" fontSize="xl">
          ¿Cómo me registro en LookHouse?
        </Text>
        <Text w={"400px"} h={"100%"}>
          El registro lo podes realizar muy facilmente ingresando con tu cuenta de Google, o
          registrándote con tu email. Y así es como podés formar parte de nuestra comunidad!
        </Text>
        <br />
        <Text as="samp" fontSize="xl">
          ¿Cómo puedo realizar una publicación?
        </Text>
        <Text w={"400px"} h={"100%"}>
          Proximamente te explicamos...
        </Text>
        <br />
        <Text as="samp" fontSize="xl">
          ¿Cómo puedo solicitar una cita para visitar la propiedad?
        </Text>
        <Text w={"400px"} h={"100%"}>
          Proximamente te explicamos...
        </Text>
      </Flex>
      <Footer />
    </Box>
  );
}
