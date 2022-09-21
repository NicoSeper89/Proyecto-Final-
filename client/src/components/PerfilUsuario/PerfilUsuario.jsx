import React from "react";
import {
  Avatar,
  Box,
  Button,
  Center,
  Collapse,
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
import Publicaciones from "./Publicaciones";

export default function PerfilUsuario() {
  const { isOpen, onToggle } = useDisclosure();

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

            <Stack mt={8} direction={"column"} spacing={4}>
              {/* <Button
                flex={1}
                fontSize={"sm"}
                rounded={"full"}
                _focus={{
                  bg: "gray.200",
                }}
              >
                Message
              </Button> */}
              <Button
                p="10px"
                onClick={onToggle}
                flex={1}
                fontSize={"sm"}
                rounded={"full"}
                bg={"gray.500"}
                color={"white"}
                boxShadow={
                  "0px 1px 25px -5px rgb(216, 158, 26, 0.43), 0 10px 10px -5px rgb(216, 158, 26, 0.43)"
                }
                _hover={{
                  bg: "gray.600",
                }}
                _focus={{
                  bg: "gray.600",
                }}
              >
                Mis Publicaciones o Mis Favoritos
              </Button>
              <Collapse in={isOpen} animateOpacity>
                <Box
                  p="40px"
                  color="black"
                  mt="4"
                  bg={"rgba(216, 158, 26, 0.35)"}
                  rounded="md"
                  shadow="md"
                >
                  <Publicaciones />
                </Box>
              </Collapse>
            </Stack>
          </Box>
        </Center>
        {/* <Box
          maxW={"320px"}
          w={"full"}
          bg={useColorModeValue("white", "gray.900")}
          boxShadow={"2xl"}
          rounded={"lg"}
          p={6}
          textAlign={"center"}
        >
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
        </Box> */}
      </Stack>
      <Footer />
    </Box>
  );
}
