import React from "react";
import NavBarForms from "../NavBar/NavBarForms";
import Footer from "../Footer/Footer";
import style from "./About.module.css";
import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareJs } from "@fortawesome/free-brands-svg-icons";

export default function About() {
  return (
    <Flex direction={"column"} backgroundColor={"#EDEDED"}>
      <NavBarForms />
      <Flex
        direction={"row"}
        alignItems="center"
        justifyContent={"space-evenly"}
        textAlign="justify"
        p="50px"
        paddingTop={"100px"}
      >
        <Flex direction={"column"} alignItems="center" alignSelf={"flex-start"}>
          <Text>Acerca de LookHouse</Text>
          <Text w={"500px"} h={"100%"}>
            LookHouse es una App Web creada por un pequeño grupo de alumnos de SoyHenry en el año
            2022. La visión de este proyecto es la de, como intermediario, conectar a usuarios
            interesados en ofrecer o adquirir temporalmente un inmueble.
          </Text>
        </Flex>
        <Flex direction={"column"}>
          <Flex direction={"column"} alignItems="center" alignSelf={"flex-start"}>
            <Text>Colaboradores</Text>
            <a href="https://github.com/MelHellrigl">Melissa Hellrigl</a>
            <a href="https://github.com/thomneuhaus2">Thomas Neuhaus</a>
            <a href="https://github.com/NicoSeper89">Nicolás Sepertino</a>
            <a href="https://github.com/ELJG">Jose Garcia</a>
            <a href="https://github.com/TomasTinto1234">Tomas Tinto</a>
            <a href="https://github.com/rojebastidas">Rodrigo Bastidas</a>
            <a href="https://github.com/gabrielTor">Gabriel Torres</a>
          </Flex>
          <Stack direction={"row"} spacing={6}>
            <FontAwesomeIcon icon={faSquareJs} fontSize="30px" />
          </Stack>
        </Flex>
      </Flex>
      <div className={style.containerFooter}>
        <Footer />
      </div>
    </Flex>
  );
}
