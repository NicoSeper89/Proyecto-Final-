import React, { useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import NavBarForms from "../NavBar/NavBarForms";
import Footer from "../Footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faAt, faUserPen } from "@fortawesome/free-solid-svg-icons";
import Rating from "./Rating";
import { useSelector } from "react-redux";

import CardPerfil from "../Cards/CardPerfil";
import Cards from "../Cards/Cards";
import { useHistory } from "react-router-dom";

export default function PerfilPropietario() {
  const history = useHistory();
  const houses = useSelector((state) => state.houses);
  const infoUser = useSelector((state) => state.infoUser);

  const user = window.localStorage.getItem("User");
  const user2 = JSON.parse(user);

  const handleEdit = () => {
    history.push("/updatePerfil/" + "id");
  };

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
            h={"500px"}
            bg={useColorModeValue("white", "gray.900")}
            boxShadow={"2xl"}
            rounded={"lg"}
            p={6}
            textAlign={"center"}
          >
            <Flex>
              <Button onClick={() => handleEdit()}>
                <FontAwesomeIcon icon={faUserPen} fontSize="30px" p={"0"} />
              </Button>
            </Flex>
            <Avatar size={"2xl"} src={infoUser[0].img} alt={"Avatar Alt"} mb={4} pos={"relative"} />
            <Heading fontSize={"2xl"} fontFamily={"body"}>
              {infoUser[0].name}
            </Heading>
            {/* <Text fontWeight={600} color={"gray.500"} mb={4}>
              @lindsey_jam3s
            </Text> */}
            <Flex justifyContent="center" alignContent="center">
              <Rating rating={infoUser[0].rating} numReviews={""} />
            </Flex>
            <br />
            <Flex direction={"column"} alignItems="flex-start" p={6}>
              <Text textAlign={"center"} color={useColorModeValue("gray.700", "gray.400")} px={3}>
                Ciudad: {infoUser[0].city}
              </Text>
              <Text textAlign={"center"} color={useColorModeValue("gray.700", "gray.400")} px={3}>
                Descripción: {infoUser[0].description}
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
            </Stack>
          </Box>
        </Center>
        <Box
          maxW={"600px"}
          w={"600px"}
          h={"500px"}
          bg={useColorModeValue("white", "gray.900")}
          boxShadow={"2xl"}
          rounded={"lg"}
          p={6}
          textAlign={"center"}
          overflowY={"scroll"}
        >
          <Tabs variant="soft-rounded" colorScheme="green">
            <TabList>
              <Tab fontWeight={600} color={"gray.500"} mb={4}>
                Mis Publicaciones
              </Tab>
              <Tab fontWeight={600} color={"gray.500"} mb={4}>
                Mis Favoritos
              </Tab>
            </TabList>
            <TabPanels display={"flex"} justifyContent="center">
              <TabPanel>
                <CardPerfil />
                <CardPerfil />
                <CardPerfil />
                <CardPerfil />
                <CardPerfil />
              </TabPanel>
              <TabPanel>
                {infoUser[0].favorites?.map((f) => {
                  return (
                    <Box>
                      <CardPerfil
                        id={f.id}
                        img={f.propertyImages}
                        precio={f.price}
                        ciudad={f.city.name}
                        premium={f.premium}
                      />
                    </Box>
                  );
                })}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Stack>
      <Footer />
    </Box>
  );
}
