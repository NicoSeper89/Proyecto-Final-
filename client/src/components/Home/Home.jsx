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
} from "../../redux/actions/index.js";
import { Box } from "@chakra-ui/react";
// import Loading from "../Loading/Loading.jsx";
// import gif from "../../Image/1490.gif";
import PremiumCards from "../Cards/PremiumCards.jsx";
import SearchBar from "../Search/SearchBar.jsx";

const Home = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);
  const sorting = useSelector((state) => state.sorting);
  const cities = useSelector((state) => state.cities);
  // const infoUser = useSelector((state) => state.infoUser);;
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
  }, [dispatch, filters, sorting, cities]);

  return (
    <Box backgroundColor={"#EDEDED"}>
      <NavBar />
      <Box zIndex={"100px"}>
        <Header />
        <PremiumCards />
        <SearchBar />
        <Cards />
        <Footer />
      </Box>
    </Box>
  );
};

export default Home;
