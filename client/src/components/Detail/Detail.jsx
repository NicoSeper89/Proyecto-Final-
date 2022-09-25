import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPublicationsDetail, clean, deletePublicaction, getInfoUser } from "../../redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import imgNotAvailable from "../../Image/Image_not_available.png";
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
  // faTelegram,
  // faFacebook,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp} from "@fortawesome/free-brands-svg-icons"
import { faAt} from "@fortawesome/free-solid-svg-icons";
import NavBarForms from "../NavBar/NavBarForms";
import Footer from "../Footer/Footer.jsx";
import Loading from "../Loading/Loading";
/* import { Link } from "react-router-dom"; */
import { Box, Text, Flex,Link, Button, Heading, Image, SimpleGrid } from "@chakra-ui/react";
import ImageSlider from "./ImageSlider";
import { useHistory } from "react-router-dom";
import AlertDelete from "./AlertDeletePubli";
import Maps from "../Maps/Maps";
import { faFacebook, faTelegram } from "@fortawesome/free-brands-svg-icons";

export default function Detail(props, id) {
  const dispatch = useDispatch();
  const history = useHistory();
  const miStateDetail = useSelector((state) => state.detail);
  const myUser = useSelector((state) => state.infoUser)
  const [showMap, setShowMap] = useState(false)
  const [alertSubmit, setAlertSubmit] = useState([false, false])

  useEffect(() => {

    dispatch(getPublicationsDetail(props.match.params.id));
    setTimeout(() => {
      setShowMap(true)
    }, 1000)

    if (!myUser) {
      const user = JSON.parse(window.localStorage.getItem("User"));
      dispatch(getInfoUser(user))
    }

  }, [dispatch, props.match.params.id]);

  function handleDelete() {
    dispatch(deletePublicaction(props.match.params.id));
    setAlertSubmit([true, true]);
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }

  return (
    <>
      <NavBarForms />
      <Flex
        w={"100%"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"flex-start"}
        p={".5rem"}
        position="relative"
      >
        {Object.entries(miStateDetail).length > 0 ? (
          <Flex flexDirection={"column"} justifyContent={"flex-start"} alignItems={"flex-start"} w={"100%"} p={"1rem"} gap={"2rem"} >
            <Flex alignItems={"flex-start"} justifyContent={"flex-start"} >
              <Flex
                flexDirection={"column"}
                gap={".7rem"}
                alignItems={"flex-start"}
                justifyContent={"space-between"}
                p={"0rem .8rem"}
                w={"45rem"}
                position={"relative"}
              >
                {miStateDetail.property.propertyImages.length > 0 ?
                  <Box w={"42rem"} h={"42rem"} position={"relative"} >
                    <ImageSlider slides={miStateDetail.property.propertyImages} />
                  </Box> :
                  <Image src={imgNotAvailable} />
                }
              </Flex>
              <Flex
                justifyContent="flex-start"
                flexDirection={"column"}
                alignItems={"center"}
                gap={"15px"}
                w={"500px"}
              >
                <Flex width={"100%"} justifyContent="flex-start" flexDirection={"column"} alignItems={"center"}>
                  <Box width={"100%"}
                    borderRadius={"0.5rem 0.5rem 0rem 0rem"}

                    p={".3rem 0rem"}
                    textAlign={"center"}
                    bg={"#F6AD55"}
                  >
                    <Heading color={"white"}>Detalles</Heading>
                  </Box>
                  <Box
                    borderRadius={"0rem 0rem 0.5rem 0.5rem"}
                    flexDirection={"column"}
                    gap={".5rem"}
                    color={"gray.600"}
                    width={"100%"}
                    display={"flex"}
                    p={"1rem"}
                    borderWidth="1px"
                    borderColor="gray.200"
                  >
                    {/* <FontAwesomeIcon icon={faHeart}  /> */}
                    {/* <ListItem>premium: {miStateDetail.premium === true? (
                  <FontAwesomeIcon icon={faCheck} />
                  ) : (
                    <FontAwesomeIcon icon={faX} />
                  }</ListItem> */}
                    <Flex alignItems={"center"} gap={".4rem"}>
                      <FontAwesomeIcon icon={faEarthAmericas} />

                      <Text>Ubicación: {miStateDetail.property.city.name}, Argentina </Text>
                    </Flex>

                    <Flex alignItems={"center"} gap={".4rem"}>
                      <FontAwesomeIcon icon={faLocationDot} />
                      <Text>Dirección: {miStateDetail.property.address}</Text>
                    </Flex>

                    <Flex alignItems={"center"} gap={".4rem"}>
                      <FontAwesomeIcon icon={faLandmark} />
                      <Text>Precio: ${miStateDetail.property.price}</Text>
                    </Flex>

                    <Flex alignItems={"center"} gap={".4rem"}>
                      <FontAwesomeIcon icon={faHouse} />
                      <Text>Tipo de propiedad: {miStateDetail.property.TypeOfProp.name}</Text>
                    </Flex>

                    <Box bg={"gray.200"} h={"1px"} w={"100%"}></Box>

                    <SimpleGrid columns={2} flexWrap={"wrap"} rowGap={"2px"}>
                      <Flex alignItems={"center"} gap={".4rem"}>
                        <FontAwesomeIcon icon={faDoorOpen} />
                        <Text>Ambientes: {miStateDetail.property.environments}</Text>
                      </Flex>

                      <Flex alignItems={"center"} gap={".4rem"}>
                        <FontAwesomeIcon icon={faRulerCombined} />
                        <Text>Superficie: {miStateDetail.property.surface}m²</Text>
                      </Flex>

                      <Flex alignItems={"center"} gap={".4rem"}>
                        <FontAwesomeIcon icon={faBed} />
                        <Text>Habitaciones: {miStateDetail.property.rooms}</Text>
                      </Flex>

                      <Flex alignItems={"center"} gap={".4rem"}>
                        <FontAwesomeIcon icon={faCalendar} />
                        <Text>Antigüedad: {miStateDetail.property.age} {(miStateDetail.property.age === 1) ? "Año" : "Años"}</Text>
                      </Flex>

                      <Flex alignItems={"center"} gap={".4rem"}>
                        <FontAwesomeIcon icon={faToilet} />
                        <Text>Baños: {miStateDetail.property.bathrooms}</Text>
                      </Flex>

                      <Flex alignItems={"center"} gap={".4rem"}>
                        <FontAwesomeIcon icon={faPaw} />
                        Mascotas:
                        {miStateDetail.property.pets === true ? (
                          <FontAwesomeIcon icon={faCheck} />
                        ) : (
                          <FontAwesomeIcon icon={faX} />
                        )}
                      </Flex>

                      <Flex alignItems={"center"} gap={".4rem"}>
                        <FontAwesomeIcon icon={faWarehouse} />
                        <Text>Garage: {miStateDetail.property.garage}</Text>
                      </Flex>

                    </SimpleGrid>

                    <Box bg={"gray.200"} h={"1px"} w={"100%"}></Box>

                    <Flex gap={"10px"}>
                      {miStateDetail.property.services.map((e, i) => (
                        <Flex key={i} alignItems={"center"} gap={".2rem"}>
                          <FontAwesomeIcon icon={faCheck} /> <Text>{e.name}</Text>
                        </Flex>
                      ))}
                    </Flex>
                  </Box>
                </Flex>
                <Flex justifyContent="flex-start" flexDirection={"column"} alignItems={"center"}>
                  <Box
                    width={"100%"}
                    boxShadow='dark-lg' p='6' rounded='md'
                    textAlign={"center"}
                    bg={"#F6AD55"}
                    borderRadius={"0.5rem 0.5rem 0rem 0rem"}
                  >
                    <Heading color={"white"}>Datos del Propietario</Heading>
                  </Box>
                  <Box
                    borderRadius={"0rem 0rem 0.5rem 0.5rem"}
                    flexDirection={"column"}
                    gap={".5rem"}
                    color={"gray.600"}
                    width={"100%"}
                    display={"flex"}
                    p={"1rem"}
                    borderWidth="1px"
                    borderColor="gray.200"
                    bg={"yellow.50"}
                  >
                    <Text><FontAwesomeIcon icon={faCircleUser} /> {miStateDetail.user.name}</Text>
                    <Text><FontAwesomeIcon icon={faStar} /> {miStateDetail.user.rating}</Text>

                    <Flex gap='5px' alignItems='center'><FontAwesomeIcon icon={faAt} /><Link href={`mailto:${miStateDetail.user.contactInfo.mail}`} >{miStateDetail.user.contactInfo.mail}</Link></Flex>
                    {/* <Text><FontAwesomeIcon icon={faCity}/> {miStateDetail.user.city}</Text>
                <Text><FontAwesomeIcon icon={faMailBulk}/> {miStateDetail.user.contactInfo.mail}</Text> */}

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
                </Flex>
              </Flex>
            </Flex>
            <Flex gap={"3rem"} justifyContent={"flex-start"} alignItems={"flex-start"} >
              <Flex w={"45rem"}
                  justifyContent="flex-start"
                  flexDirection={"column"}
                  alignItems={"center"}>

                  <Box
                    borderRadius={"0.5rem 0.5rem 0rem 0rem"}
                    width={"100%"}
                    p={".3rem 0rem"}
                    textAlign={"center"}
                    bg={"#F6AD55"}
                  >
                    <Heading color={"white"}>Descripción</Heading>
                  </Box>

                  <Box
                    borderRadius={"0rem 0rem 0.5rem 0.5rem"}
                    flexDirection={"column"}
                    gap={".5rem"}
                    color={"gray.600"}
                    width={"100%"}
                    display={"flex"}
                    p={"1rem"}
                    borderWidth="1px"
                    borderColor="gray.200"
                  >
                    <Text>{miStateDetail.description}</Text>
                  </Box>
                </Flex>
              {
                showMap &&
                <Maps position={miStateDetail} />
              }
            </Flex>
            {(myUser[0].id === miStateDetail.userId) ?
              <Flex>
                <Button
                  onClick={() => history.push("/updatePublicaction/" + props.match.params.id)}
                >
                  Actualizar datos
                </Button>
                <Button
                  onClick={(e) => {
                    handleDelete(e);
                  }}
                >
                  Borrar publicación
                </Button>
              </Flex> : null}
          </Flex>
        ) : (
          <Loading />
        )}
      </Flex>
      <AlertDelete alertSubmit={alertSubmit} />
      <Footer />
    </>
  );
}


/* 
              */


/*        */