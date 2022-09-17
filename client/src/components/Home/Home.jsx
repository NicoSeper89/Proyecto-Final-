import React from "react";
import NavBar from "../NavBar/NavBar.jsx";
import Cards from "../Cards/Cards";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPublications } from "../../redux/actions/index.js";
import Footer from "../Footer/Footer.jsx";
import style from "./Home.module.css";
import Paginado from "../Paginado/Paginado.jsx";
import { Box } from "@chakra-ui/react";
import Header from "../Header/Header.jsx";
import Loading from "../Loading/Loading.jsx";

const Home = () => {
  const dispatch = useDispatch();
  const houses = useSelector((state) => state.houses);
  const filters = useSelector((state) => state.filters);
  const sorting = useSelector((state) => state.sorting);
  const loading = useSelector((state) => state.loading);
  // const cities = useSelector((state) => state.cities);
  // const services = useSelector((state) => state.services);
  // const typeOfProperties = useSelector((state) => state.typeOfProperties);

  // useEffect(() => dispatch(searcHouse("")), [dispatch]);
  useEffect(() => {
    dispatch(getPublications(filters, sorting, ""));
  }, [dispatch]);

  /* ************ PAGINADO ************ */
  const [page, setPage] = useState(1);
  const housePage = 9;
  const lastPage = page * housePage;
  const firstPage = lastPage - housePage;
  const currentHouse = houses.slice(firstPage, lastPage);
  const paginado = (numPage) => {
    setPage(numPage);
  };

  //
  return (
    <>
      <Box className={style.header}>
        <NavBar paginado={paginado} />
      </Box>
      <Box className={style.paginado}>
        <Paginado
          housePage={housePage} //el nº de recetas por pagina
          house={houses.length} //el total de recipes
          paginado={paginado} //setea el estado de page
          page={page} //la pagina
        />
      </Box>
      <Box className={style.container}>
        {loading ? <Loading /> : <Cards currentHouse={currentHouse} />}
      </Box>
      <Box className={style.footer}>
        <Footer />
      </Box>
    </>
  );
};

export default Home;
