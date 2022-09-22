import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "./Card";
import style from "./Card.module.css";
import { Box, Button, List, Text } from "@chakra-ui/react";
import { setCurrentCarrusel } from "../../redux/actions/index";

export default function PremiumCards() {
  const dispatch = useDispatch();
  const housePrem = useSelector((state) => state.housePrem);
  const currentCarrusel = useSelector((state) => state.currentCarrusel);

  const houseCarrusel = 3;
  const pages = [];
  for (let i = 1; i <= Math.ceil(housePrem.length / houseCarrusel); i++) {
    pages.push(i);
  }

  const lastPage = currentCarrusel * houseCarrusel;
  const firstPage = lastPage - houseCarrusel;
  const currentHouse = housePrem.slice(firstPage, lastPage);

  const handleClick = (e) => {
    dispatch(setCurrentCarrusel(Number(e.target.id)));
  };

  const handleNext = (e) => {
    dispatch(setCurrentCarrusel(currentCarrusel + 1));
  };

  const handlePrev = (e) => {
    dispatch(setCurrentCarrusel(currentCarrusel - 1));
  };

  const renderPaginado = pages.map((number) => {
    return (
      <li
        key={number}
        id={number}
        onClick={handleClick}
        className={currentCarrusel === number ? style.active : null}
      >
        {number}
      </li>
    );
  });

  const slides = currentHouse?.map((r) => {
    if (r.premium) {
      return (
        <Box key={r.id}>
          <Card
            id={r.id}
            img={r.property.propertyImages}
            precio={r.property.price}
            ciudad={r.property.city.name}
            metros={r.property.surface}
            baño={r.property.bathrooms}
            dormitorio={r.property.rooms}
            ambientes={r.property.environments}
            mascota={r.property.pets}
            premium={r.premium}
          />
        </Box>
      );
    }
  });

  /* **************** RENDER CARDS **************** */
  return (
    <Box display={"flex"} justifyContent="center" marginTop="5rem" minHeight="100%" zIndex={"3"}>
      <Box>
        <Text textAlign={"center"} fontSize={"2xl"} fontFamily={"body"}>
          Publicaciones Destacadas
        </Text>
        <List className={style.paginadoBtn}>
          {currentCarrusel !== 1 ? <Button onClick={handlePrev}>Prev</Button> : null}
          {renderPaginado}
          {currentCarrusel !== pages.length ? <Button onClick={handleNext}>Next</Button> : null}
        </List>
        <Box display={"flex"} flexWrap={"wrap"} justifyContent="space-evenly" m={"60px"}>
          {slides.map((a, index) => {
            return <Box key={index}>{a}</Box>;
          })}
        </Box>
      </Box>
    </Box>
  );
}
