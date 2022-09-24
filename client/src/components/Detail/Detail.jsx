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
  // faCircleUser,
  // faPhone,
  // faComment,
  // faCity,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import NavBarForms from "../NavBar/NavBarForms";
import Footer from "../Footer/Footer.jsx";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import { Box, Text, Flex, Button, Heading, Image, IdProvider } from "@chakra-ui/react";
import ImageSlider from "./ImageSlider";
import { useHistory } from "react-router-dom";
import AlertDelete from "./AlertDeletePubli";

export default function Detail(props, id) {
  const dispatch = useDispatch();
  const history = useHistory();
  const miStateDetail = useSelector((state) => state.detail);
  const myUser = useSelector((state) => state.infoUser)
  const [alertSubmit, setAlertSubmit] = useState([false, false])

  useEffect(() => {

    dispatch(getPublicationsDetail(props.match.params.id));

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
          <Box w={"100%"} p={"1rem"}>
            <Flex alignItems={"flex-start"} justifyContent={"flex-start"} >
              <Flex
                flexDirection={"column"}
                gap={".7rem"}
                alignItems={"flex-start"}
                justifyContent={"space-between"}
                p={"0rem .8rem"}
                position={"relative"}
              >
                {miStateDetail.property.propertyImages.length > 0 ?
                  <Box position={"relative"} width={"50rem"}>
                    <ImageSlider slides={miStateDetail.property.propertyImages} />
                  </Box> :
                  <Image src={imgNotAvailable} />
                }
              </Flex>
              <Flex
                w={"100%"}
                gap={"1rem"}
                justifyContent="flex-start"
                flexDirection={"column"}
                alignItems={"center"}
              >
                {/* <Box fontSize={"2rem"}>{(miStateDetail.property.premium) ? <Text color={"yellowgreen"}>{"Usuario Premium"}</Text> : <Text color={"gray.400"}>{"Usuario Free"}</Text>}</Box> */}

                <Flex
                  w={"100%"}
                  justifyContent="flex-start"
                  flexDirection={"column"}
                  alignItems={"center"}
                >
                  <Box
                    borderRadius={"0.5rem 0.5rem 0rem 0rem"}
                    width={"90%"}
                    p={".3rem 0rem"}
                    textAlign={"center"}
                    bg={"facebook.300"}
                  >
                    <Heading color={"white"}>Descripción</Heading>
                  </Box>

                  <Box
                    borderRadius={"0rem 0rem 0.5rem 0.5rem"}
                    flexDirection={"column"}
                    gap={".5rem"}
                    color={"gray.600"}
                    width={"90%"}
                    display={"flex"}
                    p={"1rem"}
                    borderWidth="1px"
                    borderColor="gray.200"
                  >
                    <Text>{miStateDetail.description}</Text>
                  </Box>
                </Flex>

                <Flex
                  w={"100%"}
                  justifyContent="flex-start"
                  flexDirection={"column"}
                  alignItems={"center"}
                >
                  <Box
                    borderRadius={"0.5rem 0.5rem 0rem 0rem"}
                    width={"90%"}
                    p={".3rem 0rem"}
                    textAlign={"center"}
                    bg={"facebook.300"}
                  >
                    <Heading color={"white"}>Detalles</Heading>
                  </Box>

                  <Box
                    borderRadius={"0rem 0rem 0.5rem 0.5rem"}
                    flexDirection={"column"}
                    gap={".5rem"}
                    color={"gray.600"}
                    width={"90%"}
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

                    <Flex alignItems={"center"} gap={".4rem"}>
                      <FontAwesomeIcon icon={faRulerCombined} />
                      <Text>Superficie: {miStateDetail.property.surface}m²</Text>
                    </Flex>

                    <Flex alignItems={"center"} gap={".4rem"}>
                      <FontAwesomeIcon icon={faCalendar} />
                      <Text>Antigüedad: {miStateDetail.property.age} Años</Text>
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

                    <Box bg={"gray.200"} h={"1px"} w={"100%"}></Box>

                    <Flex alignItems={"center"} gap={".4rem"}>
                      <FontAwesomeIcon icon={faDoorOpen} />
                      <Text>Ambientes: {miStateDetail.property.environments}</Text>
                    </Flex>

                    <Flex alignItems={"center"} gap={".4rem"}>
                      <FontAwesomeIcon icon={faBed} />
                      <Text>Habitaciones: {miStateDetail.property.rooms}</Text>
                    </Flex>

                    <Flex alignItems={"center"} gap={".4rem"}>
                      <FontAwesomeIcon icon={faToilet} />
                      <Text>Baños: {miStateDetail.property.bathrooms}</Text>
                    </Flex>

                    <Flex alignItems={"center"} gap={".4rem"}>
                      <FontAwesomeIcon icon={faWarehouse} />
                      <Text>Garage: {miStateDetail.property.garage}</Text>
                    </Flex>

                    <Box bg={"gray.200"} h={"1px"} w={"100%"}></Box>

                    {miStateDetail.property.services.map((e, i) => (
                      <Flex key={i} alignItems={"center"} gap={".4rem"}>
                        <FontAwesomeIcon icon={faCheck} /> <Text>{e.name}</Text>
                      </Flex>
                    ))}
                  </Box>
                </Flex>

                {/* <Box>
                DATOS PROPIETARIO
                <FontAwesomeIcon icon={faUser} />
                <FontAwesomeIcon icon={faCircleUser} />
                <FontAwesomeIcon icon={faPhone} />
                <FontAwesomeIcon icon={faComment} />
                <Text>{miUseerState[0].name}</Text>
                <Text>{miUseerState.mail}</Text>
                <Text>{miUseerState[0].rating}</Text>
                <Text>{miUseerState[0].description}</Text>
                <Text>service: {miStateDetail.property.service.name}</Text>
              </Box> */}
              </Flex>

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
          </Box>
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