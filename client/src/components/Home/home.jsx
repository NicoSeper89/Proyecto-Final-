import React from "react";
import NavBar from "../NavBar/NavBar.jsx";
import SearchBar from "../Search/SearchBar.jsx";
import Cards from "../Cards/Cards";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { searcHouse } from "../../redux/actions/index.js";
import Footer from "../Footer/Footer.jsx";
import style from "./Home.module.css";

const Home = () => {
  const dispatch = useDispatch()
  useEffect(() => dispatch(searcHouse("")),[dispatch])
  return (
    <>
      <NavBar />
      <SearchBar />
      <div className={style.container}>
        <Cards />
      </div>
      <Footer />
    </>
  );
};

export default Home;
