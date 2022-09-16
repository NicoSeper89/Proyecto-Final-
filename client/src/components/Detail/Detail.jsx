import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {getPublicationsDetail, clean} from "../../redux/actions"
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faToilet, faBed, faDoorOpen, faPaw, faHouse, faCircleUser} from "@fortawesome/free-solid-svg-icons";
// import { faToilet } from "@fortawesome/free-solid-svg-icons";
// import { faBed } from "@fortawesome/free-solid-svg-icons";
// import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
// import { faPaw, faHouse } from "@fortawesome/free-solid-svg-icons";
// import {faCircleUser} from "@fortawesome/free-solid-svg-icons"
import {Link} from "react-router-dom"
import NavBar from "../NavBar/NavBar.jsx";
import SearchBar from "../Search/SearchBar.jsx";
import Footer from "../Footer/Footer.jsx";
import { Box, Image, Text, ListItem, Button, UnorderedList } from '@chakra-ui/react'


export default function Detail(props) {
  const dispatch = useDispatch()
  const miStateDetail = useSelector((state) => state.detail)
  // const miUseerState = useSelector((state) => state.user)
  // const miPublicationState = useSelector((state) => state.publication)
  // console.log(miStateDetail)

  useEffect(() => {
    dispatch(getPublicationsDetail(props.match.params.id))
    dispatch(clean())
  }, [dispatch, props.match.params.id])


  return (
    <Box>
      <NavBar />
      <SearchBar />
     <Link to={"/"}> <Button bg="violet">volver al home </Button></Link>
      {miStateDetail.length > 0 ? (
        <Box >
          <Box> DATOS PUBLICACION
            {/* <Image src ={miStateDetail[0].img}/> */}
            <Text>{miStateDetail[0].property.premium}</Text>
          </Box>

          <Box>
            <FontAwesomeIcon icon={faHeart} />
            <Text>price: {miStateDetail[0].property.price}</Text>
            <Text>typeofProp: {miStateDetail[0].property.typeofProp.name}</Text>
            <FontAwesomeIcon icon={faHouse} />
            <Text>city: {miStateDetail[0].property.city.name}</Text>
            <Text>superficie: {miStateDetail[0].property.surface}</Text>
            <Text>environments: {miStateDetail[0].property.environments}</Text>
            <FontAwesomeIcon icon={faDoorOpen} />
            <Text>garage: {miStateDetail[0].property.garage}</Text>
          </Box>
          <Box>
            <Box>address: {miStateDetail[0].property.address}</Box>
            <UnorderedList>
              <ListItem>surface: {miStateDetail[0].property.yard}</ListItem>
              <ListItem>environments: {miStateDetail[0].property.environments}</ListItem>
              <ListItem>bathrooms: {miStateDetail[0].property.bathrooms}</ListItem>
              <FontAwesomeIcon icon={faToilet} />
              <ListItem>rooms: {miStateDetail[0].property.rooms}</ListItem>
              <FontAwesomeIcon icon={faBed} />
              <ListItem>garage: {miStateDetail[0].property.garage}</ListItem>
              <ListItem>yard: {miStateDetail[0].property.yard}</ListItem>
              <ListItem>pets: {miStateDetail[0].property.pets}</ListItem>
              <FontAwesomeIcon icon={faPaw} />
              <ListItem>age: {miStateDetail[0].property.age}</ListItem>
              <ListItem>{miStateDetail[0].property.service[0].name}</ListItem>
            </UnorderedList>
            <Box>
              <Text>description: {miStateDetail[0].property.description}</Text>
            </Box>
          </Box>
          <Box>DATOS PROPIETARIO
          {/* <FontAwesomeIcon icon={faUser} /> */}
          <FontAwesomeIcon icon={faCircleUser} />
            {/* <h1>{miUseerState[0].name}</h1>
            
            <h3>{miUseerState.mail}</h3>
            <h3>{miUseerState[0].rating}</h3>
            <h3>{miUseerState[0].description}</h3> */}

          </Box>
          <Footer />
        </Box>
        
      ) : (
        <Box bg="red">no hay propiedad</Box>
      )}
    </Box>
  );
}