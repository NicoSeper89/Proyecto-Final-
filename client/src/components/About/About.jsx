import React from "react";
import NavBarForms from "../NavBar/NavBarForms";
import Footer from "../Footer/Footer";
import style from "./About.module.css";
import { Box, Flex, Icon, Image, Link, Stack, Text } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareJs, faReact, faNodeJs } from "@fortawesome/free-brands-svg-icons";
import logoMySql from "../../Image/icons8-logo-de-mysql-50.png";

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
        <Flex direction={"column"} alignItems="center" alignSelf={"flex-start"} p={"30px"}>
          <Text as="b" textTransform={"uppercase"} fontSize="2xl">
            Acerca de LookHouse
          </Text>
          <br />
          <Text w={"400px"} h={"100%"}>
            LookHouse es una App Web creada por un pequeño grupo de alumnos de SoyHenry en el año
            2022. La visión de este proyecto es la de, como intermediario, conectar a usuarios
            interesados en ofrecer o adquirir temporalmente un inmueble.
          </Text>
        </Flex>
        <Flex
          direction={"column"}
          background={"rgba(216, 158, 26, 0.35)"}
          p={"30px"}
          borderRadius="md"
        >
          <Flex direction={"column"} alignItems="center" alignSelf={"flex-start"} as={Stack}>
            <Text as="b" textTransform={"uppercase"} fontSize="2xl">
              Colaboradores
            </Text>
            <br />
            <Stack>
              <Link href="https://github.com/gabrielTor">Gabriel Torres</Link>
              <Link href="https://github.com/ELJG">Jose Garcia</Link>
              <Link href="https://github.com/MelHellrigl">Melissa Hellrigl</Link>
              <Link href="https://github.com/NicoSeper89">Nicolás Sepertino</Link>
              <Link href="https://github.com/rojebastidas">Rodrigo Bastidas</Link>
              <Link href="https://github.com/thomneuhaus2">Thomas Neuhaus</Link>
              <Link href="https://github.com/TomasTinto1234">Tomas Tinto</Link>
            </Stack>
          </Flex>
          <Stack direction={"row"} spacing={6} marginTop={"30px"}>
            <FontAwesomeIcon icon={faSquareJs} fontSize="30px" />
            <FontAwesomeIcon icon={faReact} fontSize="30px" />
            <FontAwesomeIcon icon={faNodeJs} fontSize="30px" />
            <Icon icon={logoMySql} fontSize="30px" />
          </Stack>
        </Flex>
      </Flex>
      <Footer />
    </Flex>
  );
}
