import React from "react";
import NavBar from "../NavBar/NavBar.jsx";
import Cards from "../Cards/Cards";
import Footer from "../Footer/Footer.jsx";
import Header from "../Header/Header.jsx";
// import style from "./Home.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPublications,
  getPublicationsPremium,
  getInfoUser,
  // getFavsUser,
  allDates,
  allUserDates,
  getFavsUser,
} from "../../redux/actions/index.js";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
// import Loading from "../Loading/Loading.jsx";
// import gif from "../../Image/1490.gif";
import PremiumCards from "../Cards/PremiumCards.jsx";
import SearchBar from "../Search/SearchBar.jsx";
import { useHistory } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const filters = useSelector((state) => state.filters);
  const sorting = useSelector((state) => state.sorting);
  const cities = useSelector((state) => state.cities);
  const dates = useSelector((state) => state.dates);
  const userDates = useSelector((state) => state.userDates);
  sessionStorage.setItem("dates", JSON.stringify([dates, userDates]));
  const infoUser = useSelector((state) => state.infoUser);
  // const services = useSelector((state) => state.services);
  // const typeOfProperties = useSelector((state) => state.typeOfProperties);
  useEffect(() => {
    const dataUser = window.localStorage.getItem("User");
    dataUser && dispatch(getInfoUser(JSON.parse(dataUser)));

    // if (dataUser) {
    //   dispatch(getFavsUser(infoUser[0].id));
    // }
  }, [dispatch]);

  useEffect(() => {
    dispatch(getPublications(filters, sorting, ""));
    dispatch(getPublicationsPremium());
    dispatch(allDates());
    dispatch(allUserDates());
    if (infoUser) {
      dispatch(getFavsUser(infoUser[0].id));
    }
  }, [dispatch, filters, sorting, cities]);

  const handleClick = () => {
    history.push("/help");
  };

  return (
    <Box backgroundColor={"#EDEDED"}>
      <NavBar />
      <Box zIndex={"100px"}>
        <Header />
        <PremiumCards />
        <Box mb={"4rem"} border={"2px solid #D89E1A"} p={"2rem"}>
          <Text
            display={"flex"}
            justifyContent={"center"}
            w={"100%"}
            color="#D89E1A"
            as="b"
            fontSize="2xl"
            textTransform={"uppercase"}
          >
            Podés Destacar tus publicaciones
          </Text>
          <Flex direction={"row"}>
            <Text
              display={"flex"}
              justifyContent={"center"}
              w={"100%"}
              color="#D89E1A"
              fontSize="2xl"
            >
              Si te interesa saber más, ¡Hacé click en más info!
              <Button fontSize="2xl" onClick={() => handleClick()}>
                Más info
              </Button>
            </Text>
          </Flex>
        </Box>
        <SearchBar />
        <Cards />
        <Footer />
      </Box>
    </Box>
  );
};

export default Home;
