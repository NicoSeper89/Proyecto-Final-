import React from "react";
import NavBar from "../NavBar/NavBar.jsx";
import Cards from "../Cards/Cards";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPublications } from "../../redux/actions/index.js";
import Footer from "../Footer/Footer.jsx";
import style from "./Home.module.css";
import { Box } from "@chakra-ui/react";

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
    <>
      <Box className={style.header}>
        <NavBar />
      </Box>
      <Box className={style.paginado}></Box>
      <Box className={style.container}>
        <Cards />
      </Box>
      <Box className={style.footer}>
        <Footer />
      </Box>
    </>
  );
};

export default Home;
