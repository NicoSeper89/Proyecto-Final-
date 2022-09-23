import React, { useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import NavBarForms from "../NavBar/NavBarForms";
import Footer from "../Footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookMessenger, faTelegram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faAt } from "@fortawesome/free-solid-svg-icons";
import Rating from "./Rating";
import { useSelector } from "react-redux";

import CardPerfil from "../Cards/CardPerfil";
import Cards from "../Cards/Cards";

export default function PerfilPropietario() {
  const houses = useSelector((state) => state.houses);

  const handleDestacar = () => {};

  return (
    <Box>
      <NavBarForms />
      <Stack
        align={"start"}
        justify={"center"}
        direction={"row"}
        py={10}
        backgroundColor={"#EDEDED"}
      >
        <Center px={6}>
          <Box
            maxW={"400px"}
            w={"600px"}
            bg={useColorModeValue("white", "gray.900")}
            boxShadow={"2xl"}
            rounded={"lg"}
            p={6}
            textAlign={"center"}
          >
            <Avatar
              size={"2xl"}
              //   src={}
              alt={"Avatar Alt"}
              mb={4}
              pos={"relative"}
            />
            <Heading fontSize={"2xl"} fontFamily={"body"}>
              Nombre del Usuario
            </Heading>
            {/* <Text fontWeight={600} color={"gray.500"} mb={4}>
              @lindsey_jam3s
            </Text> */}
            <Flex justifyContent="center" alignContent="center">
              <Rating rating={""} numReviews={""} />
            </Flex>
            <br />
            <Flex direction={"column"} alignItems="flex-start" p={6}>
              <Text textAlign={"center"} color={useColorModeValue("gray.700", "gray.400")} px={3}>
                Ciudad: {""}
              </Text>
              <Text textAlign={"center"} color={useColorModeValue("gray.700", "gray.400")} px={3}>
                Descripción: {""}
              </Text>
            </Flex>
            <br />
            <Text fontWeight={600} color={"gray.500"} mb={4}>
              Medios de Contacto:
            </Text>
            <Stack direction={"row"} justify={"center"} spacing={4}>
              <Button label={"Gmail"} href={"#"} p={0}>
                <FontAwesomeIcon icon={faAt} fontSize="30px" />
              </Button>
              <Button label={"WhatsApp"} href={"#"} p={0}>
                <FontAwesomeIcon icon={faWhatsapp} fontSize="30px" />
              </Button>
              <Button label={"Telegram"} href={"#"} p={0}>
                <FontAwesomeIcon icon={faTelegram} fontSize="30px" />
              </Button>
              <Button label={"FacebookMessenger"} href={"#"} p={0}>
                <FontAwesomeIcon icon={faFacebookMessenger} fontSize="30px" />
              </Button>
            </Stack>
          </Box>
        </Center>
        <Box
          maxW={"600px"}
          w={"600px"}
          bg={useColorModeValue("white", "gray.900")}
          boxShadow={"2xl"}
          rounded={"lg"}
          p={6}
          textAlign={"center"}
        >
          <Text fontWeight={600} color={"gray.500"} mb={4}>
            Publicaciones:
          </Text>
          <Stack direction={"row"} justify={"center"} spacing={4}>
            <Box display={"flex"} flexWrap={"wrap"} justifyContent="space-evenly" m={"60px"}>
              <Button onClick={handleDestacar}>Destacar publicación</Button>
              <Cards />
              {/* {houses?.map((r) => {
                console.log("AAAAA: ", houses);
                return (
                  <Box key={r.id}>
                    <CardPerfil
                      id={r.id}
                      img={r.property.propertyImages}
                      precio={r.property.price}
                      ciudad={r.property.city.name}
                      premium={r.premium}
                    />
                  </Box>
                );
              })} */}
            </Box>
          </Stack>
        </Box>
      </Stack>
      <Footer />
    </Box>
  );
}
