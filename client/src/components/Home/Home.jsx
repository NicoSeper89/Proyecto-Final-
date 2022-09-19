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
import Loading from "../Loading/Loading.jsx";
// import { Box } from "@chakra-ui/react";
import gif from "../../Image/1490.gif";

const Home = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);
  const sorting = useSelector((state) => state.sorting);
  const cities = useSelector((state) => state.cities);
  const loading = useSelector((state) => state.loading);
  const houses = useSelector((state) => state.houses);
  // const services = useSelector((state) => state.services);
  // const typeOfProperties = useSelector((state) => state.typeOfProperties);

  useEffect(() => {
    dispatch(getPublications(filters, sorting, ""));
  }, [dispatch, filters, sorting, cities]);

  //
  {
    /* {Object.entries(houses).length > 0 ? ( */
  }
  return (
    <Box backgroundColor={"#EDEDED"}>
      <NavBar />
      <Box zIndex={"100px"}>
        <Header />
        <Cards />
        <Footer />
      </Box>
    </Box>
    // ) : (
    //   <Loading />
    // )}
  );
};

export default Home;
