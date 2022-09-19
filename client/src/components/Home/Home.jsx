import React from "react";
import NavBar from "../NavBar/NavBar.jsx";
import Cards from "../Cards/Cards";
import Footer from "../Footer/Footer.jsx";
import Header from "../Header/Header.jsx";
// import style from "./Home.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPublications } from "../../redux/actions/index.js";
import { Box, Image, Text } from "@chakra-ui/react";
// import { Box } from "@chakra-ui/react";

const Home = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);
  const sorting = useSelector((state) => state.sorting);
  const cities = useSelector((state) => state.cities);
  // const services = useSelector((state) => state.services);
  // const typeOfProperties = useSelector((state) => state.typeOfProperties);

  useEffect(() => {
    dispatch(getPublications(filters, sorting, ""));
  }, [dispatch, filters, sorting, cities]);

  //
  return (
    <Box backgroundColor={"#EDEDED"}>
      <NavBar />
      <Box zIndex={"100px"}>
        <Header />
        {/* <Text zIndex={"90"} display="flex" justifyContent={"center"}>
          ENCONTRA TU PROXIMO HOGAR
        </Text> */}
        <Cards />
        <Footer />
      </Box>
    </Box>
  );
};

export default Home;
