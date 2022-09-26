import React, { useEffect,useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Link,
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
import { useDispatch, useSelector } from "react-redux";
import foto from "../../Image/Image_not_available.png";
import CardPerfil from "../Cards/CardPerfil";
import { useHistory } from "react-router-dom";
import { getFavsUser, getInfoUser, getPubs, getUserImage, getUserInfo } from "../../redux/actions";

export default function PerfilPropietario() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.infoUser);
  const allUserInfo = useSelector(state => state.allUserInfo)
  const publicationsUser = useSelector((state) => state.publicationsUser);
  const favoritesUser = useSelector((state) => state.favoritesUser);
  const imageUser = useSelector((state) => state.imageUser);
  /* const [infoUser,setInfoUser] = useState(user) */
  const infoUser = JSON.parse(window.localStorage.getItem("User"));


  const handleEdit = () => {
    history.push("/updatePerfil/" + infoUser[0].id);
  };

  useEffect(() => {
    console.log('soy',infoUser)
    dispatch(getPubs(infoUser[0].id));
    dispatch(getFavsUser(infoUser[0].id));
    dispatch(getUserImage(infoUser[0].id));
    if (!infoUser) {
      const user = JSON.parse(window.localStorage.getItem("User"));
      dispatch(getInfoUser(user));
      dispatch(getUserInfo(infoUser[0].id))
    }
  }, [dispatch]);

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
            <Avatar
              size={"2xl"}
              src={imageUser? imageUser : foto}
              alt={"Avatar Alt"}
              mb={4}
              pos={"relative"}
            />
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
              <Link href={`mailto:${infoUser[1].mail}`} p={0}>
                <FontAwesomeIcon icon={faAt} fontSize="30px" />
              </Link>
              {/* <Button label={"WhatsApp"} href={infoUser.whatsapp} p={0}>
                <FontAwesomeIcon icon={faWhatsapp} fontSize="30px" />
              </Button> */}
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
                {publicationsUser?.map((f, index) => {
                  return (
                    <Box key={index}>
                      <CardPerfil
                        id={f.id}
                        img={f.property.propertyImages}
                        precio={f.property.price}
                        ciudad={f.property.city.name}
                        premium={f.premium}
                      />
                    </Box>
                  );
                })}
              </TabPanel>
              <TabPanel>
                {favoritesUser?.map((f, index) => {
                  return (
                    <Box key={index}>
                      <CardPerfil
                        id={f.id}
                        img={f.property.propertyImages}
                        precio={f.property.price}
                        ciudad={f.property.city.name}
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
