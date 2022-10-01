import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPublicationsDetail,
  // clean,
  // deletePublicaction,
  getInfoUser,
  getComment,
  postComment,
  deleteComment,
} from "../../redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import imgNotAvailable from "../../Image/Image_not_available.png";
// import axios from "axios";
import {
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
  faCircleUser,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
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
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Tabs,
  Input,
  FormControl,
} from "@chakra-ui/react";
import ImageSlider from "./ImageSlider";
import { useHistory } from "react-router-dom";
import AlertDelete from "./AlertDeletePubli";
import AlertDeleteComent from "./AlertDeletComent";
import AlertAdminApprove from "./AlertAdminApprove";
import AlertAdminDelete from "./AlertAdminDelete";
import FormReport from "./FormReport";
import Datos from "../Maps/Datos";
import RequestScore from "./requestScore";
// import Comentarios from "./Comentarios"
import ReactStars from "react-rating-stars-component";

export default function Detail(props, id) {
  const dispatch = useDispatch();
  const history = useHistory();
  const miStateDetail = useSelector((state) => state.detail);
  
  const [showMap, setShowMap] = useState(false);
  const [alertSubmit, setAlertSubmit] = useState([false, false]);
  const [alertAdminApprove, setAlertAdminApprove] = useState([false, false]);
  const [alertAdminDelete, setAlertAdminDelete] = useState([false, false]);
  const commentState = useSelector((state) => state.comments);
  const [comentarios, setComments] = useState("");
  const [borradoComent, setBorrado] = useState(false);
  const [alertComent, setAlertCommet] = useState([false, false]);

   const myUser = JSON.parse(window.localStorage.getItem("User"));
  useEffect(() => {
    dispatch(getPublicationsDetail(props.match.params.id));
    setTimeout(() => {
      setShowMap(true);
    }, 1000);

      dispatch(getInfoUser(myUser));
    
    dispatch(getComment(props.match.params.id));
    return () => {
      dispatch(clean())
    }
  }, [dispatch, props.match.params.id, borradoComent]);

  function handleDelete() {
    setAlertSubmit([true, true]);
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  function handleReclaim() {
    console.log("mail");
  }

  function handleApprove() {
    setAlertAdminApprove([true, true]);
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  function handleDeleteAdmin() {
    setAlertAdminDelete([true, true]);
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  const onChangeInputComment = (e) => {
    e.preventDefault();
    setComments(e.target.value);
  };

  function deleteComments(id) {
    dispatch(deleteComment(id));
    setAlertCommet([true, true]);
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    setBorrado(!borradoComent);
  }

  const onSubmitComent = async (e) => {
    e.preventDefault();
    if (comentarios !== "") {
      dispatch(postComment(comentarios, props.match.params.id));
      dispatch(getComment(props.match.params.id));
      setComments("");
    } else {
      alert("you must complete the comment to send message");
    }
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
        justifyContent={"flex-start"}
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
                <Flex flexDirection={"row"} justifyContent={"center"} p={"0rem .8rem"}>
                  {miStateDetail.property.propertyImages.length > 0 ? (
                    <Box w={"42rem"} h={"42rem"}>
                      <ImageSlider slides={miStateDetail.property.propertyImages} />
                    </Box>
                  ) : (
                    <Image src={imgNotAvailable} />
                  )}
                </Flex>

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
                      <Text> Tamaño del garage: {miStateDetail.property.garage} autos</Text>
                    </Flex>

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
                      <ReactStars
                        count={5}
                        size={34}
                        activeColor="#F6AD55"
                        edit={false}
                        value={miStateDetail.user.rating}
                        isHalf={true}
                      />
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
                  </Box>
                  <Box>
                    {myUser[0].id === miStateDetail.userId && !miStateDetail.deleted ? (
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

                        <RequestScore publicationsId={props.match.params.id} />
                      </Flex>
                    ) : myUser[0].id === miStateDetail.userId && miStateDetail.deleted ? (
                      <Flex>
                        <Button
                          w={"350px"}
                          colorScheme="green"
                          m="8px"
                          fontSize="xl"
                          as="b"
                          onClick={(e) => {
                            handleReclaim(e);
                          }}
                        >
                          Pedir restauración
                        </Button>
                      </Flex>
                    ) : myUser[0].admin && !miStateDetail.approved ? (
                      <Flex>
                        <Button
                          w={"350px"}
                          colorScheme="green"
                          m="8px"
                          fontSize="xl"
                          as="b"
                          onClick={(e) => {
                            handleApprove(e);
                          }}
                        >
                          Aprobar publicación
                        </Button>
                        <Button
                          w={"350px"}
                          colorScheme="green"
                          m="8px"
                          fontSize="xl"
                          as="b"
                          onClick={(e) => {
                            handleDeleteAdmin(e);
                          }}
                        >
                          Borrar publicación
                        </Button>
                      </Flex>
                    ) : myUser[0].admin && miStateDetail.approved ? (
                      <Flex>
                        <Button
                          w={"350px"}
                          colorScheme="green"
                          m="8px"
                          fontSize="xl"
                          as="b"
                          onClick={(e) => {
                            handleDeleteAdmin(e);
                          }}
                        >
                          {!miStateDetail.deleted ? "Borrar publicación" : "Restaurar publicación"}
                        </Button>
                      </Flex>
                    ) : (
                      <Flex></Flex>
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
                      {myUser[0].id !== miStateDetail.userId ? (
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
                          {/* {showMap && <Datos position={miStateDetail} />} */}
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
                  </Tabs>
                </Box>
              </Flex>
            </Box>

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
                {myUser[0].admin
                  ? commentState.map((e) => (
                      <Text
                        fontWeight={"semiBold"}
                        fontSize="1.2rem"
                        color="gray.500"
                        border="gray.500"
                      >
                        {miStateDetail.user.name} :
                        <Text
                          fontWeight={"semiBold"}
                          fontSize="1.2rem"
                          color="gray.500"
                          border="gray.500"
                        >
                          {e.message}{" "}
                          <Button
                            onClick={() => {
                              deleteComments(e.id);
                            }}
                          >
                            borrar
                          </Button>
                        </Text>{" "}
                      </Text>
                    ))
                  : commentState.map((e) => (
                      <Text
                        fontWeight={"semiBold"}
                        fontSize="1.2rem"
                        color="gray.500"
                        border="gray.500"
                      >
                        {miStateDetail.user.name} :
                        <Text
                          fontWeight={"semiBold"}
                          fontSize="1.2rem"
                          color="gray.500"
                          border="gray.500"
                        >
                          {e.message}{" "}
                        </Text>{" "}
                      </Text>
                    ))}
                <Input
                  placeholder="deja tu comentario aqui..."
                  onChange={onChangeInputComment}
                  value={comentarios}
                />
                <Button onClick={onSubmitComent}>enviar</Button>
              </FormControl>
            </Box>
            <AlertAdminDelete alertAdminDelete={alertAdminDelete} setAlertAdminDelete={setAlertAdminDelete} emailUser={miStateDetail.user.contactInfo.mail} pubId={props.match.params.id} deleted={miStateDetail.deleted} />
          </Box>
        ) : (
          <Loading />
        )}
      </Flex>
      <AlertDelete
        alertSubmit={alertSubmit}
        id={props.match.params.id}
        deleted={miStateDetail.deleted}
      />
      <AlertDeleteComent alertComent={alertComent} id={id} />
      <AlertAdminApprove alertSubmit={alertAdminApprove} pubId={props.match.params.id} userId={miStateDetail.userId} />
      <Footer />
      {/* {showMap && <Datos position={miStateDetail} />} */}
    </Box>
  );
}
