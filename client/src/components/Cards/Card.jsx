import React from "react";
import style from "./Card.module.css";
import imgNotAvailable from "../../Image/Image_not_available.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faToilet,
  faBed,
  faDoorOpen,
  faPaw,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Box, Image, Text } from "@chakra-ui/react";

export default function Card({
  id,
  img,
  precio,
  ciudad,
  metros,
  baño,
  dormitorio,
  ambientes,
  mascota,
  premium,
}) {
  // const property = {};

  return (
    <Box className={style.container} zIndex={"80"}>
      <Link to={"/details/" + id}>
        <Image src={img[0] ? img[0].url : imgNotAvailable} alt="Img not found" />
        <Box className={style.container2}>
          {/* <FontAwesomeIcon className={style.containerIcon} icon={faHeart} /> */}
          <Text as="b" textTransform={"uppercase"} fontSize="2xl">
            {ciudad}
          </Text>
          <Text as="samp" fontSize="xl">
            $ {precio}
          </Text>
          {/* {premium === true ? (
            <FontAwesomeIcon className={style.containerIcon} icon={faStar} />
          ) : (
            <></>
          )} */}
        </Box>

        <Box className={style.containerInfo}>
          <h4>{metros} m²</h4>
          <FontAwesomeIcon className={style.containerIcon} icon={faToilet} />
          <h4>{baño}</h4>
          <FontAwesomeIcon className={style.containerIcon} icon={faBed} />
          <h4>{dormitorio}</h4>
          <FontAwesomeIcon className={style.containerIcon} icon={faDoorOpen} />
          <h4>{ambientes}</h4>
          {mascota === true ? (
            <FontAwesomeIcon className={style.containerIcon} icon={faPaw} />
          ) : (
            <></>
          )}
        </Box>
      </Link>
    </Box>
  );
}
