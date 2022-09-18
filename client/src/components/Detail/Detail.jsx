import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPublicationsDetail, clean } from "../../redux/actions";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faToilet,
  faBed,
  faDoorOpen,
  faPaw,
  faHouse,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";
// import { faToilet } from "@fortawesome/free-solid-svg-icons";
// import { faBed } from "@fortawesome/free-solid-svg-icons";
// import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
// import { faPaw, faHouse } from "@fortawesome/free-solid-svg-icons";
// import {faCircleUser} from "@fortawesome/free-solid-svg-icons"
import NavBarForms from "../NavBar/NavBarForms";
import Footer from "../Footer/Footer.jsx";
import { Box, Image, Text, ListItem, UnorderedList } from "@chakra-ui/react";

export default function Detail(props) {
  const dispatch = useDispatch();
  const miStateDetail = useSelector((state) => state.detail);
  // const miUseerState = useSelector((state) => state.user)
  // const miPublicationState = useSelector((state) => state.publication)

  useEffect(() => {
    dispatch(getPublicationsDetail(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  console.log(miStateDetail, "estado");

  return (
    <Box>
      <Box>
        <NavBarForms />
      </Box>
      {Object.entries(miStateDetail).length > 0 ? (
        <Box>
          <Box>
            {" "}
            DATOS PUBLICACION
            {/* <Image src ={miStateDetail[0].img}/> */}
            <UnorderedList>
              {miStateDetail.property.propertyImages?.map((e, i) => <ListItem key={i} ><Image src={e.url} /></ListItem>)}
            </UnorderedList>
            <Text>{miStateDetail.property.premium}</Text>
          </Box>

          <Box>
            <FontAwesomeIcon icon={faHeart} />
            <Text>price: {miStateDetail.property.price}</Text>
            <Text>typeofProp: {miStateDetail.property.TypeOfProp.name}</Text>
            <FontAwesomeIcon icon={faHouse} />
            <Text>city: {miStateDetail.property.city.name}</Text>
            <Text>superficie: {miStateDetail.property.surface}</Text>
            <Text>environments: {miStateDetail.property.environments}</Text>
            <FontAwesomeIcon icon={faDoorOpen} />
            <Text>garage: {miStateDetail.property.garage}</Text>
          </Box>
          <Box>
            <Box>address: {miStateDetail.property.address}</Box>
            <UnorderedList>
              <ListItem>surface: {miStateDetail.property.yard}</ListItem>
              <ListItem>environments: {miStateDetail.property.environments}</ListItem>
              <ListItem>bathrooms: {miStateDetail.property.bathrooms}</ListItem>
              <FontAwesomeIcon icon={faToilet} />
              <ListItem>rooms: {miStateDetail.property.rooms}</ListItem>
              <FontAwesomeIcon icon={faBed} />
              <ListItem>yard: {miStateDetail.property.yard}</ListItem>
              <ListItem>pets: {miStateDetail.property.pets}</ListItem>
              <FontAwesomeIcon icon={faPaw} />
              <ListItem>garage: {miStateDetail.property.garage}</ListItem>
              <ListItem>age: {miStateDetail.property.age}</ListItem>
              <ListItem>{miStateDetail.property.services.map((e) => e.name + ", ")}</ListItem>
            </UnorderedList>
            <Box>
              <Text>description: {miStateDetail.property.description}</Text>
            </Box>
          </Box>
          <Box>
            DATOS PROPIETARIO
            {/* <FontAwesomeIcon icon={faUser} /> */}
            <FontAwesomeIcon icon={faCircleUser} />
            {/* <Text>{miUseerState[0].name}</Text>
            
            <Text>{miUseerState.mail}</Text>
            <Text>{miUseerState[0].rating}</Text>
            <Text>{miUseerState[0].description}</Text> */}
            {/* <Text>service: {miStateDetail.property.service.name}</Text> */}
          </Box>
        </Box>
      ) : (
        <Box bg="red">no hay propiedad</Box>
      )}

      <Footer />
    </Box>
  );
}
