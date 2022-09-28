import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPublicationsDetail,
  clean,
  deletePublicaction,
  getInfoUser,
  getComment,
  postComment,
} from "../../redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import imgNotAvailable from "../../Image/Image_not_available.png";
import axios from "axios";
import {
  /* faHeart, */
  faRulerCombined,
  faWarehouse,
  faEarthAmericas,
  faLandmark,
  faToilet,
  faBed,
  faDoorOpen,
  faPaw,
  faHouse,
  faCalendar,
  faCheck,
  faX,
  faUser,
  faCircleUser,
  faPhone,
  faComment,
  faCity,
  faLocationDot,
  faStar,
  faMailBulk,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faAt } from "@fortawesome/free-solid-svg-icons";
import NavBarForms from "../NavBar/NavBarForms";
import Footer from "../Footer/Footer.jsx";
import Loading from "../Loading/Loading";
/* import { Link } from "react-router-dom"; */
import {
  Box,
  Text,
  Flex,
  Link,
  Button,
  Heading,
  Image,
  SimpleGrid,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Tabs,
  Textarea,
  Input,
  FormControl,
} from "@chakra-ui/react";
import ImageSlider from "./ImageSlider";
import { useHistory } from "react-router-dom";
import AlertDelete from "./AlertDeletePubli";
// import Maps from "../Maps/Maps";
import FormReport from "./FormReport";
import Datos from "../Maps/Datos";
import RequestScore from "./requestScore";
// import Comentarios from "./Comentarios"
// import { Carousel, } from "react-responsive-carousel";

export default function Detail(props, id) {
  const dispatch = useDispatch();
  const history = useHistory();
  const miStateDetail = useSelector((state) => state.detail);
  const myUser = useSelector((state) => state.infoUser);
  const [showMap, setShowMap] = useState(false);
  const [alertSubmit, setAlertSubmit] = useState([false, false]);
  const commentState = useSelector((state) => state.comments);
  const [comentarios, setComments] = useState("");

  useEffect(() => {
    dispatch(getPublicationsDetail(props.match.params.id));
    setTimeout(() => {
      setShowMap(true);
    }, 1000);

    if (!myUser) {
      const user = JSON.parse(window.localStorage.getItem("User"));
      dispatch(getInfoUser(user));
    }
    dispatch(getComment(props.match.params.id));
    console.log(commentState);
  }, [dispatch, props.match.params.id]);

  function handleDelete() {
    // dispatch(deletePublicaction(props.match.params.id));
    setAlertSubmit([true, true]);
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  function handleReport() {
    window.localStorage.setItem("id", `${props.match.params.id}`);
    history.push("/reportPublication");
  }

  const onChangeInputComment = (e) => {
    e.preventDefault();
    setComments(e.target.value);
  };

  const onSubmitComent = async (e) => {
    e.preventDefault();
    console.log(comentarios);
    console.log(props.match.params.id);
    console.log(e);
    dispatch(postComment(comentarios, props.match.params.id));
    dispatch(getComment(props.match.params.id));
  };

  return (
    <Box zIndex={2}>
      <Box>
        <NavBarForms />
      </Box>
      <Flex
        backgroundColor={"#EDEDED"}
        pt={"50px"}
        pb={"50px"}
        direction={"column"}
        // alignItems={"center"}
        // alignContent={"center"}
        justifyContent={"flex-start"}
        // p={".5rem"}
        // position="relative"
      >
        {Object.entries(miStateDetail).length > 0 ? (
          <Box>
            <Box
            // flexDirection={"column"}
            // justifyContent={"flex-start"}
            // alignItems={"flex-start"}
            // w={"100%"}
            // p={"1rem"}
            // gap={"2rem"}
            >
              <Box display={"flex"} justifyContent="space-evenly">
                <Flex
                  flexDirection={"row"}
                  justifyContent={"center"}
                  p={"0rem .8rem"}
                  // position={"relative"}
                >
                  {miStateDetail.property.propertyImages.length > 0 ? (
                    <Box w={"42rem"} h={"42rem"}>
                      <ImageSlider slides={miStateDetail.property.propertyImages} />
                    </Box>
                  ) : (
                    <Image src={imgNotAvailable} />
                  )}
                </Flex>

                {/* <Flex
            justifyContent="flex-start"
            flexDirection={"column"}
            alignItems={"center"}
            gap={"15px"}
            w={"500px"}
            > */}
                <Flex direction={"column"}>
                  <Box
                    w={"350px"}
                    borderRadius={"0.5rem"}
                    p={".3rem 0rem"}
                    textAlign={"center"}
                    bg={"#F6AD55"}
                  >
                    <Heading color={"white"}>Detalles</Heading>
                  </Box>
                  <Box>
                    {/* <FontAwesomeIcon icon={faHeart}  /> */}
                    {/* <ListItem>premium: {miStateDetail.premium === true? (
                  <FontAwesomeIcon icon={faCheck} />
                  ) : (
                    <FontAwesomeIcon icon={faX} />
                  }</ListItem> */}

                    <Flex alignItems={"center"} m="10px" justifyContent={"space-between"}>
                      <FontAwesomeIcon icon={faEarthAmericas} />
                      <Text>Ubicación: {miStateDetail.property.city.name}, Argentina </Text>
                    </Flex>

                    <Flex alignItems={"center"} m="10px" justifyContent={"space-between"}>
                      <FontAwesomeIcon icon={faLocationDot} />
                      <Text>Dirección: {miStateDetail.property.address}</Text>
                    </Flex>

                    <Flex alignItems={"center"} m="10px" justifyContent={"space-between"}>
                      <FontAwesomeIcon icon={faLandmark} />
                      <Text>Precio: ${miStateDetail.property.price}</Text>
                    </Flex>

                    <Flex alignItems={"center"} m="10px" justifyContent={"space-between"}>
                      <FontAwesomeIcon icon={faHouse} />
                      <Text>Tipo de propiedad: {miStateDetail.property.TypeOfProp.name}</Text>
                    </Flex>

                    {/* <SimpleGrid columns={2} flexWrap={"wrap"} rowGap={"2px"}> */}
                    <Flex alignItems={"center"} m="10px" justifyContent={"space-between"}>
                      <FontAwesomeIcon icon={faDoorOpen} />
                      <Text>Ambientes: {miStateDetail.property.environments}</Text>
                    </Flex>

                    <Flex alignItems={"center"} m="10px" justifyContent={"space-between"}>
                      <FontAwesomeIcon icon={faRulerCombined} />
                      <Text>Superficie: {miStateDetail.property.surface}m²</Text>
                    </Flex>

                    <Flex alignItems={"center"} m="10px" justifyContent={"space-between"}>
                      <FontAwesomeIcon icon={faBed} />
                      <Text>Habitaciones: {miStateDetail.property.rooms}</Text>
                    </Flex>

                    <Flex alignItems={"center"} m="10px" justifyContent={"space-between"}>
                      <FontAwesomeIcon icon={faCalendar} />
                      <Text>
                        Antigüedad: {miStateDetail.property.age}{" "}
                        {miStateDetail.property.age === 1 ? "Año" : "Años"}
                      </Text>
                    </Flex>

                    <Flex alignItems={"center"} m="10px" justifyContent={"space-between"}>
                      <FontAwesomeIcon icon={faToilet} />
                      <Text>Baños: {miStateDetail.property.bathrooms}</Text>
                    </Flex>

                    <Flex alignItems={"center"} m="10px" justifyContent={"space-between"}>
                      <FontAwesomeIcon icon={faPaw} />
                      <Flex>
                        Mascotas:
                        {miStateDetail.property.pets === true ? (
                          <FontAwesomeIcon icon={faCheck} />
                        ) : (
                          <FontAwesomeIcon icon={faX} />
                        )}
                      </Flex>
                    </Flex>

                    <Flex alignItems={"center"} m="10px" justifyContent={"space-between"}>
                      <FontAwesomeIcon icon={faWarehouse} />
                      <Text>Garage: {miStateDetail.property.garage}</Text>
                    </Flex>
                    {/* </SimpleGrid> */}

                    <Flex m="15px" direction={"row"} justifyContent={"center"}>
                      {miStateDetail.property.services.map((e, i) => (
                        <Flex key={i} alignItems={"center"} m="10px">
                          <FontAwesomeIcon icon={faCheck} /> <Text>{e.name}</Text>
                        </Flex>
                      ))}
                    </Flex>
                  </Box>
                </Flex>
              </Box>

              <Flex direction={"row-reverse"} justifyContent="space-evenly">
                <Flex direction={"column"} alignItems="center" justifyContent="space-evenly">
                  <Box
                    w={"350px"}
                    h={"200px"}
                    boxShadow="dark-lg"
                    p="10px"
                    border="1px solid grey.600"
                    bg={"rgba(216, 158, 26, 0.35)"}
                    borderRadius={"0.5rem"}
                  >
                    <Box textAlign={"center"} mb={"5px"}>
                      <Text fontSize="xl" as="b">
                        Datos del Propietario
                      </Text>
                    </Box>
                    <Box alignItems="flex-start" p={"1rem"}>
                      <Text fontSize="lg">
                        <FontAwesomeIcon icon={faStar} /> {miStateDetail.user.rating}
                      </Text>
                      <Text fontSize="lg">
                        <FontAwesomeIcon icon={faCircleUser} /> {miStateDetail.user.name}
                      </Text>

                      <Box alignItems="center" fontSize="lg">
                        <FontAwesomeIcon icon={faAt} />
                        <Link href={`mailto:${miStateDetail.user.contactInfo.mail}`}>
                          {" "}
                          {miStateDetail.user.contactInfo.mail}
                        </Link>
                      </Box>
                    </Box>
                    {/* <Box
                      borderRadius={"0rem 0rem 0.5rem 0.5rem"}
                      flexDirection={"column"}
                      gap={".5rem"}
                      color={"gray.600"}
                      width={"90%"}
                      display={"flex"}
                      p={"1rem"}
                      borderWidth="1px"
                      borderColor="gray.200"
                      bg={"yellow.100"}
                    >
      
                    <Text> <FontAwesomeIcon icon={faComment} /> </Text>
                  </Box> */}
                  </Box>
                  <Box>
                    {myUser[0].id === miStateDetail.userId ? (
                      <Flex direction={"column"}>
                        <Button
                          w={"350px"}
                          colorScheme="green"
                          m="8px"
                          fontSize="xl"
                          as="b"
                          onClick={() =>
                            history.push("/updatePublicaction/" + props.match.params.id)
                          }
                        >
                          Actualizar datos
                        </Button>
                        <Button
                          w={"350px"}
                          colorScheme="green"
                          m="8px"
                          fontSize="xl"
                          as="b"
                          onClick={(e) => {
                            handleDelete(e);
                          }}
                        >
                          Borrar publicación
                        </Button>
                        {/* <Button
                          w={"350px"}
                          colorScheme="green"
                          m="8px"
                          fontSize="xl"
                          as="b"
                          onClick={(e) => {
                            handleReport(e);
                          }}
                        >
                          Reportar publicación
                        </Button> */}
                        <RequestScore myUser={myUser} />
                      </Flex>
                    ) : (
                      <Flex>
                        <Button
                          w={"350px"}
                          colorScheme="green"
                          m="8px"
                          fontSize="xl"
                          as="b"
                          onClick={(e) => {
                            handleReport(e);
                          }}
                        >
                          Reportar publicación
                        </Button>
                      </Flex>
                    )}
                  </Box>
                </Flex>

                <Box>
                  <Tabs
                    variant="soft-rounded"
                    colorScheme="green"
                    w={"42rem"}
                    h={"400px"}
                    boxShadow="dark-lg"
                    p="10px"
                    border="1px solid grey.600"
                    // bg={"rgba(216, 158, 26, 0.35)"}
                    borderRadius={"0.5rem"}
                  >
                    <TabList>
                      <Tab fontWeight={600} color={"gray.500"} mb={"5px"}>
                        Mapa
                      </Tab>
                      <Tab fontWeight={600} color={"gray.500"} mb={"5px"}>
                        Descripción
                      </Tab>
                      {myUser[0].id === miStateDetail.userId ? (
                        <Tab fontWeight={600} color={"red"} mb={"5px"}>
                          Reportar
                        </Tab>
                      ) : (
                        <></>
                      )}
                    </TabList>
                    <TabPanels display={"flex"} justifyContent="center">
                      <TabPanel>
                        <Flex
                          w={"500px"}
                          h={"250px"}
                          boxShadow="dark-lg"
                          p="10px"
                          border="1px solid grey.600"
                          borderRadius={"0.5rem"}
                          justifyContent="center"
                          alignItems="center"
                        >
                          {/* {showMap && <Maps position={miStateDetail} />} */}
                        </Flex>
                      </TabPanel>
                      <TabPanel>
                        <Box
                          alignItems="flex-start"
                          w={"500px"}
                          h={"250px"}
                          boxShadow="dark-lg"
                          p="10px"
                          border="1px solid grey.300"
                          borderRadius={"0.5rem"}
                        >
                          <Text fontSize="lg">{miStateDetail.description}</Text>
                        </Box>
                      </TabPanel>
                      <TabPanel>
                        <Flex
                          alignItems="flex-start"
                          w={"500px"}
                          h={"250px"}
                          boxShadow="dark-lg"
                          p="10px"
                          border="1px solid grey.300"
                          borderRadius={"0.5rem"}
                          justifyContent={"center"}
                        >
                          <FormReport id={props.match.params.id} userId={myUser[0].id} />
                        </Flex>
                      </TabPanel>
                    </TabPanels>
                    {/* <Box textAlign={"center"} mb={"5px"}>
                    <Text fontSize="xl" as="b">
                      Descripción
                    </Text>
                  </Box> */}
                    {/* <Box alignItems="flex-start" p={"1rem"}>
                    <Text fontSize="lg">{miStateDetail.description}</Text>
                  </Box>
                  <Box
                    w={"350px"}
                    h={"200px"}
                    boxShadow="dark-lg"
                    p="10px"
                    border="1px solid grey.600"
                    borderRadius={"0.5rem"}
                    >
                    {showMap && <Maps position={miStateDetail} />}
                  </Box> */}
                  </Tabs>
                </Box>
              </Flex>
            </Box>

            {/* ESTO ES BOTONES */}

            {/* ESTO ES BOTONES */}
            <Box
              variant="soft-rounded"
              /* colorScheme="green" */
              w={"42rem"}
              h={"400px"}
              boxShadow="dark-lg"
              p="10px"
              border="1px solid grey.600"
              // bg={"rgba(216, 158, 26, 0.35)"}
              borderRadius={"0.5rem"}
            >
              <FormControl>
                <Input onChange={onChangeInputComment} value={comentarios} />
                <Button onClick={onSubmitComent}>x</Button>
              </FormControl>
              {commentState.map((e) => (
                <Text>{e.message}</Text>
              ))}
              {/* <Carousel>
                {Object.entries(commentState).length > 0 ? (
                  <Box>
                    <Input
                      onChange={onChangeInputComment}
                      value={comentarios}
                      name="message"
                    ></Input>
                    <Button onClick={onSubmitComent}>x</Button>
                  </Box>
                ) : null}
              </Carousel> */}
            </Box>
          </Box>
        ) : (
          <Loading />
        )}
      </Flex>
      <AlertDelete alertSubmit={alertSubmit} id={props.match.params.id} />
      <Footer />
      {/* {showMap && <Datos position={miStateDetail} />} */}
    </Box>
  );
}
