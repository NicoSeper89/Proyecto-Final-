import React from "react";
import NavBarForms from "../NavBar/NavBarForms";
import Footer from "../Footer/Footer";
// import style from "./About.module.css";
import { Flex, Icon, Image, Link, Stack, Text } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareJs, faReact, faNodeJs } from "@fortawesome/free-brands-svg-icons";
import logoMySql from "../../Image/icons8-logo-de-mysql-50.png";

export default function About() {
  return (
    <Flex direction={"column"} backgroundColor={"#EDEDED"} w={"100%"} h={"100%"}>
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
            2022.
          </Text>
          <Text w={"400px"} h={"100%"}>
            Fue creada con la intención de brindar una plataforma intuitiva y de facil acceso para
            el alquiler de inmuebles a dueño directo.
          </Text>
          <Text w={"400px"} h={"100%"}>
            Desde LookHouse buscamos brindar un puente entre inquilinos y propietarios al igual que
            los modelos tradicionales de alquiler pero sin las tarifas y cargos intermedios, asi
            pudiendo ser accesible a un mercado más amplio.
          </Text>
        </Flex>
        <Flex
          direction={"column"}
          background={"rgba(216, 158, 26, 0.35)"}
          p={"30px"}
          borderRadius="md"
        >
          <Flex
            direction={"column"}
            alignItems="center"
            alignSelf={"flex-start"}
            as={Stack}
            w={"250px"}
          >
            <Text as="b" textTransform={"uppercase"} fontSize="2xl">
              Colaboradores
            </Text>
            <br />
            <Stack>
              <Link Target="_blank" href="https://github.com/gabrielTor">
                Gabriel Torres
              </Link>
              <Link Target="_blank" href="https://github.com/ELJG">
                Jose Garcia
              </Link>
              <Link Target="_blank" href="https://github.com/MelHellrigl">
                Melissa Hellrigl
              </Link>
              <Link Target="_blank" href="https://github.com/NicoSeper89">
                Nicolás Sepertino
              </Link>
              <Link Target="_blank" href="https://github.com/rojebastidas">
                Rodrigo Bastidas
              </Link>
              <Link Target="_blank" href="https://github.com/thomneuhaus2">
                Thomas Neuhaus
              </Link>
              <Link Target="_blank" href="https://github.com/TomasTinto1234">
                Tomas Tinto
              </Link>
            </Stack>
          </Flex>
          <Flex
            direction={"row"}
            spacing={6}
            marginTop={"30px"}
            w={"250px"}
            flexWrap="wrap"
            justifyContent="space-between"
          >
            <FontAwesomeIcon icon={faSquareJs} fontSize="30px" />
            <FontAwesomeIcon icon={faReact} fontSize="30px" />
            <FontAwesomeIcon icon={faNodeJs} fontSize="30px" />
            <Image
              src={"https://cdn.icon-icons.com/icons2/2148/PNG/512/redux_icon_132038.png"}
              alt={"redux"}
              w="30px"
              m={"5px"}
            />
            <Image
              src={
                "https://cdn.icon-icons.com/icons2/512/PNG/512/dbs-postgresql_icon-icons.com_50907.png"
              }
              alt={"postgresql"}
              w="30px"
              m={"5px"}
            />
            <Image
              src={"https://cdn.icon-icons.com/icons2/2389/PNG/512/auth_logo_icon_145471.png"}
              alt={"auth0"}
              w="30px"
              m={"5px"}
            />
            <Image
              src={
                "https://cdn.icon-icons.com/icons2/2428/PNG/512/figma_black_logo_icon_147134.png"
              }
              alt={"figma"}
              w="30px"
              m={"5px"}
            />
            <Image
              src={"https://cdn.icon-icons.com/icons2/2148/PNG/512/sequelize_icon_132004.png"}
              alt={"sequelize"}
              w="30px"
              m={"5px"}
            />
            <Image
              src={"https://cdn.icon-icons.com/icons2/2248/PNG/512/google_maps_icon_138521.png"}
              alt={"googleMaps"}
              w="30px"
              m={"5px"}
            />
            <Image
              src={
                "https://cdn.discordapp.com/attachments/650434022429950012/1027283245554995371/rzylUjaf_400x400.png"
              }
              alt={"chakra"}
              w="30px"
              m={"5px"}
            />
            <Image
              src={
                "https://cdn.discordapp.com/attachments/650434022429950012/1027286855533723788/0IR57HDN_400x400.png"
              }
              alt={"mercado pago"}
              w="40px"
              m={"5px"}
            />
            <Image
              src={
                "https://cdn.discordapp.com/attachments/650434022429950012/1027286880137510912/2182976911536207307-512.png"
              }
              alt={"cloudinary"}
              w="40px"
              m={"5px"}
            />
          </Flex>
        </Flex>
      </Flex>
      <Footer />
    </Flex>
  );
}
