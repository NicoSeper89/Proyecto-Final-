import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPublicationsDetail, clean } from "../../redux/actions";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import imgNotAvailable from "../../Image/Image_not_available.png";
import {
  faHeart,
  faToilet,
  faBed,
  faDoorOpen,
  faPaw,
  faHouse,
  faCircleUser,
  faCalendar,
  faCheck,
  faX,
  faStar,
  faPhone,
  faComment,
  faCity,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import NavBarForms from "../NavBar/NavBarForms";
import Footer from "../Footer/Footer.jsx";
import Loading from "../Loading/Loading"
import { Box, Image, Text, ListItem, UnorderedList } from "@chakra-ui/react";

export default function Detail(props) {
  const dispatch = useDispatch();
  const miStateDetail = useSelector((state) => state.detail);
  // const miUseerState = useSelector((state) => state.user)
  // const miPublicationState = useSelector((state) => state.publication)

  useEffect(() => {
    dispatch(getPublicationsDetail(props.match.params.id));
    dispatch(clean());
  }, [dispatch, props.match.params.id]);

  useEffect(() => {
    dispatch(getPublicationsDetail(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  return (
    <Box
      gap={"2rem"}
      position="relative"
      m={"1rem"}
      p={"1rem"}
      justifyContent={"center"}
      wrap="wrap"
      borderWidth="1px"
      borderRadius="14px"
      overflow="hidden"
    >
      <Box w={"100%"} textAlign={"center"} fontSize="1.2em">
        <Box w={"100%"} textAlign={"center"} fontSize="1.2em">
          <NavBarForms w={"100%"} textAlign={"center"} fontSize="1.2em" />
        </Box>

        {Object.entries(miStateDetail).length > 0 ? (
          <Box>
            <Box
              display={"flex"}
              flexDirection={"column"}
              p={"1rem"}
              w={"45%"}
              gap=".5rem"
              borderWidth="1px"
              borderRadius="14px"
              overflow="hidden"
            >
              {" "}
              DATOS PUBLICACION
              <Image 
                src={
                  miStateDetail.property.propertyImages[0] 
                    ? miStateDetail.property.propertyImages[0].url
                    : imgNotAvailable
                }
                
              />
             {miStateDetail.property.propertyImages?.map((e, i)=> ((i !== 0)?<Image w={"15rem"} key={i} src={ e.url}/>: null))}  
              <Text>{miStateDetail.property.premium}</Text>
            </Box>

            <Box
              display={"flex"}
              flexDirection={"column"}
              p={"1rem"}
              w={"45%"}
              gap=".5rem"
              borderWidth="1px"
              borderRadius="14px"
              overflow="hidden"
            >
              <FontAwesomeIcon icon={faHeart} />
              {/* <ListItem>premium: {miStateDetail.premium === true? (
                <FontAwesomeIcon icon={faCheck} />
                ) : (
                  <FontAwesomeIcon icon={faX} />
        )}</ListItem> */}
              <Text>Precio: {miStateDetail.property.price} $</Text>
              <Text>
                Tipo De Propiedad: {miStateDetail.property.TypeOfProp.name}{" "}
                <FontAwesomeIcon icon={faHouse} />
              </Text>
              <Text>
                Provincia: {miStateDetail.property.city.name}, Argentina{" "}
                <FontAwesomeIcon icon={faCity} />
              </Text>
              <Text>Superficie: {miStateDetail.property.surface}m²</Text>
              <Text>
                Dormitorios: {miStateDetail.property.environments}{" "}
                <FontAwesomeIcon icon={faDoorOpen} />
              </Text>
              <Text>Garage: {miStateDetail.property.garage}</Text>
            </Box>
            <Box
              display={"flex"}
              flexDirection={"column"}
              p={"1rem"}
              w={"45%"}
              gap=".5rem"
              borderWidth="1px"
              borderRadius="14px"
              overflow="hidden"
            >
              <Box>
                Dirección: {miStateDetail.property.address}{" "}
                <FontAwesomeIcon icon={faLocationDot} />
              </Box>
              <UnorderedList>
                <ListItem>
                  Dormitorios: {miStateDetail.property.environments}{" "}
                  <FontAwesomeIcon icon={faDoorOpen} />
                </ListItem>
                <ListItem>
                  Baños: {miStateDetail.property.bathrooms}{" "}
                  <FontAwesomeIcon icon={faToilet} />
                </ListItem>
                <ListItem>
                  Cuartos: {miStateDetail.property.rooms}{" "}
                  <FontAwesomeIcon icon={faBed} />
                </ListItem>
                <ListItem>
                  Mascotas:{" "}
                  {miStateDetail.property.pets === true ? (
                    <FontAwesomeIcon icon={faCheck} />
                  ) : (
                    <FontAwesomeIcon icon={faX} />
                  )}
                  <FontAwesomeIcon icon={faPaw} />
                </ListItem>

                <ListItem>Garage: {miStateDetail.property.garage}</ListItem>
                {/* <FontAwesomeIcon icon={faGarage} /> */}
                <ListItem>
                  Antigüedad: {miStateDetail.property.age}{" "}
                  <FontAwesomeIcon icon={faCalendar} />
                </ListItem>
                <ListItem>
                  Servicios:{" "}
                  {miStateDetail.property.services.map((e) => e.name + ", ")}{" "}
                  <FontAwesomeIcon icon={faCheck} />
                </ListItem>
              </UnorderedList>
              <Box>
                <Text>Descripcion: {miStateDetail.description}</Text>
              </Box>
            </Box>
            <FontAwesomeIcon icon={faStar} />
            <Box>
              DATOS PROPIETARIO
              {/* <FontAwesomeIcon icon={faUser} /> */}
              <FontAwesomeIcon icon={faCircleUser} />
              <FontAwesomeIcon icon={faPhone} />
              <FontAwesomeIcon icon={faComment} />
              {/* <Text>{miUseerState[0].name}</Text>
            
            <Text>{miUseerState.mail}</Text>
            <Text>{miUseerState[0].rating}</Text>
            <Text>{miUseerState[0].description}</Text> */}
              {/* <Text>service: {miStateDetail.property.service.name}</Text> */}
            </Box>
          </Box>
        ) : (
          <Loading/>
        )}
      </Box>
      <Footer />
    </Box>
  );
}
