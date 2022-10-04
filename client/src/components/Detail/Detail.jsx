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
  clean,
  getUserInfo,
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
  faMessage,
  faComment,
  faComments,
  faPersonSwimming,
  faFireBurner,
  faHandHolding,
  faHandHoldingDollar,
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
  useToast,
  InputGroup,
  InputRightElement,
  Badge,
  AspectRatio,
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
import emailjs from "emailjs-com";
import AlertRestoration from "./AlertRestoration";
import { getTotalUsers } from "../../redux/actions";
import axios from "axios";
import ResponseComment from "./ResponseComment";
import StarRatings from 'react-star-ratings';

export default function Detail(props, id) {
  const dispatch = useDispatch();
  const history = useHistory();
  const miStateDetail = useSelector((state) => state.detail);
  const [alertSubmit, setAlertSubmit] = useState([false, false]);
  const [alertAdminApprove, setAlertAdminApprove] = useState([false, false]);
  const [alertAdminDelete, setAlertAdminDelete] = useState([false, false]);
  const commentState = useSelector((state) => state.comments);
  const [comentarios, setComments] = useState("");
  const [borradoComent, setBorrado] = useState(false);
  const [alertComent, setAlertCommet] = useState([false, false]);
  const [requestRestoration, setRequestRestoration] = useState(false);
  const totalUsers = useSelector((state) => state.totalUsers);

  const toast = useToast();

  const myUser = JSON.parse(window.localStorage.getItem("User"));
  useEffect(() => {
    myUser && dispatch(getUserInfo(myUser[0].id));
    dispatch(getPublicationsDetail(props.match.params.id));

    dispatch(getInfoUser(myUser));
    dispatch(getComment(props.match.params.id));
    dispatch(getTotalUsers);
    return () => {
      dispatch(clean());
    };
  }, [dispatch, props.match.params.id, borradoComent]);


  function handleDelete() {
    setAlertSubmit([true, true]);
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
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
    // setAlertCommet([true, true]);
    // window.scroll({
    //   top: 0,
    //   left: 0,
    //   behavior: "smooth",
    // });
    toast({
      title: "El comentario se borró correctamente.",
      status: "success",
      isClosable: true,
    });
    setBorrado(!borradoComent);
  }

  const onSubmitComent = async (e) => {
    e.preventDefault();
    try {
      if (comentarios !== "") {
        /* dispatch(postComment(comentarios, props.match.params.id)); */
        let rta = await axios.post(`/publication/comment`, {
          message: comentarios,
          publicationId: props.match.params.id,
          userId: myUser[0].name,
        });
        dispatch(getComment(props.match.params.id));
        setComments("");
        toast({
          title: "Comentario enviado.",
          status: "success",
          isClosable: true,
        });
        await emailjs.sendForm("service_4xqps7g", "template_8suw4hd", e.target, "cF426xv2uIUBSdta_")
      } else {
        toast({
          title: "Debes escribir algo para enviar un mensaje!",
          status: "error",
          isClosable: true,
        });
        // alert("you must complete the comment to send message");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onClickRestoration = (e) => {
    setRequestRestoration(true);
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const viewUser = (id) => {
    const userAdmin = totalUsers.filter((e) => e.id === id);
    window.localStorage.setItem("ViewUser", JSON.stringify(userAdmin));

    // window.localStorage.setItem("adminId", `${p.id}`)
    history.push(`/viewUser`);
  };

  return (
    <Box position={"relative"}>
      <Box>
        <NavBarForms />
      </Box>
      <Flex
        position={"relative"}
        backgroundColor={"#EDEDED"}
        // pt={"50px"}
        pb={"50px"}
        direction={"row"}
        justifyContent={"space-around"}
      >
        {Object.entries(miStateDetail).length > 0 ? (
          <Box>
            {/* <Flex mt={"1rem"} justifyContent={"center"}>
              {miStateDetail.deleted === true ? (
                <Badge colorScheme="red" variant="solid" fontSize="1.5em">
                  Publicacion Eliminada, solicita su restauración más abajo
                  
                </Badge>
              ) : null}
              {miStateDetail.approved === false ? (
                <Badge colorScheme="red" variant="solid" fontSize="1.5em">
                  
                  Publicacion pendiente de aprobación
                </Badge>
              ) : null}
            </Flex> */}
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"flex-start"}
              alignItems={"flex-start"}
              w={"100%"}
              h={"100%"}
              // p={"1rem"}
              gap={"2rem"}
            >
              <Box
                display={"flex"}
                justifyContent="space-evenly"
                flexDirection={"column"}
                m={"3rem"}
              >
                <Flex
                  flexDirection={"row"}
                  justifyContent={"center"}
                  // p={"0rem .8rem"}
                  border={"1px solid"}
                  borderColor={"gray.300"}
                  borderRadius={"0.5rem"}
                >
                  {miStateDetail.property.propertyImages.length > 0 ? (
                    <Box w={"42rem"} h={"42rem"}>
                      <ImageSlider slides={miStateDetail.property.propertyImages} />
                    </Box>
                  ) : (
                    <Image src={imgNotAvailable} />
                  )}
                </Flex>

                  {/* {miStateDetail.property.propVideo && (
                  <AspectRatio maxW='560px' ratio={1}>
                    <iframe
                    title='naruto'
                    src={miStateDetail.property.propVideo}
                    allowFullScreen
                    />
                  </AspectRatio>
                  )} */}

                <Box mt={"3rem"}>
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
                      <Tab fontWeight={600} color={"gray.500"} mb={"5px"}>
                        Comentarios
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
                      <TabPanel w={"100%"}>
                        <Flex
                          h={"300px"}
                          // boxShadow="dark-lg"
                          p="7px"
                          border="1px solid grey.600"
                          borderRadius={"0.5rem"}
                          justifyContent="center"
                          alignItems="center"
                        >
                          <Datos position={miStateDetail} />
                        </Flex>
                      </TabPanel>
                      <TabPanel w={"100%"}>
                        {/* <Box>Breve descripción de la publicación:</Box> */}
                        <Flex
                          direction={"column"}
                          alignItems="flex-start"
                          h={"300px"}
                          // boxShadow="dark-lg"
                          p="10px"
                          border="1px solid #D9D9D9"
                          borderRadius={"0.5rem"}
                          // bg={"#D9D9D9"}
                        >
                          <Text
                            fontWeight={"Bold"}
                            fontSize="1rem"
                            color="gray.600"
                            as="em"
                            mb={"1rem"}
                          >
                            Breve descripción de la publicación:
                          </Text>
                          <Text fontWeight={"semiBold"} fontSize="1rem" color="gray.600">
                            {miStateDetail.description}
                          </Text>
                        </Flex>
                      </TabPanel>
                      <TabPanel w={"100%"}>
                        <Box
                          alignItems="flex-start"
                          h={"300px"}
                          // boxShadow="dark-lg"
                          p="10px"
                          border="1px solid grey.300"
                          borderRadius={"0.5rem"}
                          variant="soft-rounded"
                          overflow={"scroll"}
                        >
                          <FormControl>
                          {(myUser[0].id !== miStateDetail.userId)?
                            <form onSubmit={onSubmitComent}>
                              <InputGroup
                                mb={"1rem"}
                                border="1px solid rgba(217, 217, 217, 0.80)"
                                borderRadius={"0.4rem"}
                              >
                                <Input
                                  placeholder="Escriba su comentario..."
                                  onChange={onChangeInputComment}
                                  value={comentarios}
                                  name={"coment_publication"}
                                />
                                <Input
                                  display={"none"}
                                  value={miStateDetail.user.contactInfo.mail}
                                  name={"user_owner"}
                                  readOnly
                                />
                                <Input
                                  display={"none"}
                                  value={myUser[0].name}
                                  name={"user_comment"}
                                  readOnly
                                />
                                <Input
                                  display={"none"}
                                  value={`https://look-house.vercel.app/details/${props.match.params.id}`}
                                  name={"url_publication"}
                                  readOnly
                                />
                                <Button
                                  type="submit"
                                  cursor={"pointer"}
                                  p={"1rem"}
                                  _hover={{ bg: "#5e5d5d", color: "white" }}
                                  borderRadius={"0.5rem"}
                                >
                                  <FontAwesomeIcon icon={faComments} />
                                </Button>
                              </InputGroup>
                            </form>
                                :
                                null}
                            {commentState.map((e, i) => (
                              <Box
                                key={i}
                                mb={"1rem"}
                                border="1px solid rgba(217, 217, 217, 0.80)"
                                borderRadius={"0.4rem"}
                              >
                                <Box ml={"5px"}>
                                  <Flex justifyContent={"space-between"}>
                                    <Text
                                      fontWeight={"Bold"}
                                      fontSize="1rem"
                                      color="gray.600"
                                      border="gray.500"
                                      as="em"
                                    >
                                      {e.userId} :
                                    </Text>
                                    {myUser[0].admin ? (
                                      <Button
                                        cursor={"pointer"}
                                        size="xs"
                                        // m={"5px"}
                                        bg="#5e5d5d"
                                        color="white"
                                        _hover={{ bg: "#FF8181", color: "white" }}
                                        onClick={() => {
                                          deleteComments(e.id);
                                        }}
                                      >
                                        X
                                      </Button>
                                    ) : null}
                                  </Flex>
                                  <Text fontWeight={"semiBold"} fontSize="1.2rem" color="gray.600">
                                    {e.message}
                                  </Text>
                                </Box>
                                {myUser[0].id === miStateDetail.user.id ? (
                                  <ResponseComment
                                    idPublication={props.match.params.id}
                                    mId={e.id}
                                    enabledResponse={!e.response}
                                  />
                                ) : null}
                                <Box bg={"#D9D9D9"}>
                                  {e.response ? (
                                    <Box ml={"15px"}>
                                      <Text
                                        fontWeight={"Bold"}
                                        fontSize="1rem"
                                        color="gray.600"
                                        border="gray.500"
                                        as="em"
                                      >
                                        Propiertario :
                                      </Text>
                                      <Text
                                        fontWeight={"semiBold"}
                                        fontSize="1.2rem"
                                        color="gray.600"
                                      >
                                        {e.response}
                                      </Text>
                                    </Box>
                                  ) : null}
                                </Box>
                              </Box>
                            ))}
                          </FormControl>
                        </Box>
                      </TabPanel>
                      <TabPanel w={"100%"}>
                        <Flex
                          alignItems="flex-start"
                          h={"300px"}
                          // boxShadow="dark-lg"
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
              </Box>

              <Flex
                display={"flex"}
                justifyContent="space-between"
                flexDirection={"column"}
                m={"3rem"}
                h={"100%"}
              >
                <Flex
                  direction={"column"}
                  alignItems="center"
                  justifyContent="space-evenly"
                  bg={"rgba(216, 158, 26, 0.35)"}
                >
                  <Flex direction={"column"} w={"400px"} h={"35rem"}>
                  <Flex>
                      {miStateDetail.deleted === true ? (
                        <Badge w={"100%"} colorScheme="red" variant="solid" fontSize="1.5em">
                          {/* Publicacion Eliminada, solicita su restauración más abajo */}
                          Publicacion Eliminada
                        </Badge>
                      ) : null}
                      {miStateDetail.approved === false ? (
                        <Badge w={"100%"} colorScheme="red" variant="solid" fontSize="1.5em">
                          {/* Publicacion Eliminada, solicita su restauración más abajo */}
                          Pendiente de aprobación
                        </Badge>
                      ) : null}
                    </Flex>
                    <Box
                      w={"400px"}
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

                      {/* <Flex alignItems={"center"} m="10px" justifyContent={"space-between"}>
                        <Text>Ubicación: {miStateDetail.property.city.name}, Argentina </Text>
                        <FontAwesomeIcon icon={faEarthAmericas} />
                      </Flex> */}

                      <Flex alignItems={"center"} m="10px" justifyContent={"space-between"}>
                        <Text>Precio: ${miStateDetail.property.price}</Text>
                        <FontAwesomeIcon icon={faHandHoldingDollar} />
                      </Flex>

                      <Flex alignItems={"center"} m="10px" justifyContent={"space-between"}>
                        <Text>Ubicación: {miStateDetail.property.address}</Text>
                        <FontAwesomeIcon icon={faLocationDot} />
                      </Flex>

                      <Flex alignItems={"center"} m="10px" justifyContent={"space-between"}>
                        <Text>Tipo de propiedad: {miStateDetail.property.TypeOfProp.name}</Text>
                        <FontAwesomeIcon icon={faHouse} />
                      </Flex>

                      <Flex alignItems={"center"} m="10px" justifyContent={"space-between"}>
                        <Text>Ambientes: {miStateDetail.property.environments}</Text>
                        <FontAwesomeIcon icon={faDoorOpen} />
                      </Flex>

                      <Flex alignItems={"center"} m="10px" justifyContent={"space-between"}>
                        <Text>Superficie: {miStateDetail.property.surface}m²</Text>
                        <FontAwesomeIcon icon={faRulerCombined} />
                      </Flex>

                      <Flex alignItems={"center"} m="10px" justifyContent={"space-between"}>
                        <Text>Habitaciones: {miStateDetail.property.rooms}</Text>
                        <FontAwesomeIcon icon={faBed} />
                      </Flex>

                      <Flex alignItems={"center"} m="10px" justifyContent={"space-between"}>
                        <Text>
                          Antigüedad: {miStateDetail.property.age}{" "}
                          {miStateDetail.property.age === 1 ? "Año" : "Años"}
                        </Text>
                        <FontAwesomeIcon icon={faCalendar} />
                      </Flex>

                      <Flex alignItems={"center"} m="10px" justifyContent={"space-between"}>
                        <Text>Baños: {miStateDetail.property.bathrooms}</Text>
                        <FontAwesomeIcon icon={faToilet} />
                      </Flex>

                      <Flex alignItems={"center"} m="10px" justifyContent={"space-between"}>
                        <Flex alignItems={"center"}>
                          Mascotas:
                          <Box paddingLeft={"10px"}>
                            {miStateDetail.property.pets === true ? (
                              <FontAwesomeIcon icon={faCheck} />
                            ) : (
                              <FontAwesomeIcon icon={faX} />
                            )}
                          </Box>
                        </Flex>
                        <FontAwesomeIcon icon={faPaw} />
                      </Flex>

                      <Flex alignItems={"center"} m="10px" justifyContent={"space-between"}>
                        <Text> Tamaño del garage: {miStateDetail.property.garage} autos</Text>
                        <FontAwesomeIcon icon={faWarehouse} />
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

                  <Flex direction="column" alignItems="center" mt={"1rem"}>
                    <Box
                      w={"400px"}
                      borderRadius={"0.5rem"}
                      p={".3rem 0rem"}
                      textAlign={"center"}
                      bg={"#F6AD55"}
                    >
                      <Heading color={"white"}>Datos del Propietario</Heading>
                    </Box>
                    <Box
                      w={"350px"}
                      h={"200px"}
                      boxShadow="dark-lg"
                      p="10px"
                      border="1px solid grey.600"
                      // bg={"rgba(216, 158, 26, 0.35)"}
                      borderRadius={"0.5rem"}
                      mt={"1.5rem"}
                      mb={"1rem"}
                    >
                      <Box alignItems="flex-start" p={"1rem"}>
                        <Flex justifyContent={"center"} alignItems={"center"} mb={"10px"}>
                          {/* <ReactStars
                            count={5}
                            size={34}
                            activeColor="#F6AD55"
                            edit={false}
                            value={miStateDetail.user.rating}
                            isHalf={true}
                            /> */}
                          <StarRatings
                            starDimension={"1.5rem"}
                             rating={miStateDetail.user.rating}
                             starRatedColor="#F6AD55"
                             numberOfStars={5}
                             name='rating'
                           />
                          <Text ml={"10px"}>{miStateDetail.user.rating}</Text>
                        </Flex>

                        {/* ACA ESTARIA BUENO QUE EL ADMIN HAGA CLICK EN EL NOMBRE Y LO LLEVE AL PERFIL DEL USUARIO */}
                        {myUser[0].admin ? (
                          <Text
                            fontSize="lg"
                            mb={"10px"}
                            onClick={() => viewUser(miStateDetail.userId)}
                            cursor="pointer"
                          >
                            <FontAwesomeIcon icon={faCircleUser} /> {miStateDetail.user.name}
                          </Text>
                        ) : (
                          <Text fontSize="lg" mb={"10px"}>
                            <FontAwesomeIcon icon={faCircleUser} /> {miStateDetail.user.name}
                          </Text>
                        )}

                        <Box alignItems="center" fontSize="lg">
                          <FontAwesomeIcon icon={faAt} />
                          <Link href={`mailto:${miStateDetail.user.contactInfo.mail}`}>
                            {miStateDetail.user.contactInfo.mail}
                          </Link>
                        </Box>
                      </Box>
                    </Box>
                    <Box>
                      {myUser[0].id === miStateDetail.userId && !miStateDetail.deleted ? (
                        <Flex direction={"column"} mb={"1rem"}>
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
                            onClick={onClickRestoration}
                            cursor={"pointer"}
                          >
                            Pedir restauración
                          </Button>
                        </Flex>
                      ) : myUser[0].admin && !miStateDetail.approved ? (
                        <Flex direction={"column"}>
                          <Button
                            w={"350px"}
                            colorScheme="green"
                            m="8px"
                            fontSize="xl"
                            as="b"
                            cursor={"pointer"}
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
                            cursor={"pointer"}
                            onClick={(e) => {
                              handleDeleteAdmin(e);
                            }}
                          >
                            Borrar publicación
                          </Button>
                        </Flex>
                      ) : myUser[0].admin && miStateDetail.approved ? (
                        <Flex direction={"column"}>
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
                            {!miStateDetail.deleted
                              ? "Borrar publicación"
                              : "Restaurar publicación"}
                          </Button>
                        </Flex>
                      ) : (
                        <Flex></Flex>
                      )}
                    </Box>
                  </Flex>
                </Flex>
              </Flex>
            </Box>
            <AlertDelete
              alertSubmit={alertSubmit}
              setAlertSubmit={setAlertSubmit}
              id={props.match.params.id}
              deleted={miStateDetail.deleted}
            />
            <AlertAdminDelete
              alertAdminDelete={alertAdminDelete}
              setAlertAdminDelete={setAlertAdminDelete}
              emailUser={miStateDetail.user.contactInfo.mail}
              pubId={props.match.params.id}
              deleted={miStateDetail.deleted}
            />
            <AlertRestoration
              requestRestoration={requestRestoration}
              setRequestRestoration={setRequestRestoration}
              pubId={props.match.params.id}
              emailUser={miStateDetail.user.contactInfo.mail}
            />
            <AlertAdminApprove
              alertSubmit={alertAdminApprove}
              setAlertAdminApprove={setAlertAdminApprove}
              pubId={props.match.params.id}
              userId={miStateDetail.userId}
              emailUser={miStateDetail.user.contactInfo.mail}
            />
          </Box>
        ) : (
          <Loading />
        )}
      </Flex>

      <AlertDeleteComent alertComent={alertComent} id={id} />

      <Footer />
    </Box>
  );
}
