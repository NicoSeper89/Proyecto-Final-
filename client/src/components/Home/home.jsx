import React from "react";
import NavBar from "../NavBar/NavBar.jsx";
import SearchBar from "../Search/SearchBar";
import Cards from "../Cards/Cards";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { searcHouse } from "../../redux/actions/index.js";

const Home = () => {
  const dispatch = useDispatch()
  useEffect(() => dispatch(searcHouse("")),[dispatch])
  return (
    <>
      <NavBar />
      <SearchBar />
      <Cards />
    </>
  );
};

export default Home;
