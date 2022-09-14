import React from "react";
import NavBar from "../NavBar/NavBar.jsx";
import SearchBar from "../Search/SearchBar.jsx";
import Cards from "../Cards/Cards";
import Footer from "../Footer/Footer.jsx";
import style from "./Home.module.css";

const Home = () => {
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
