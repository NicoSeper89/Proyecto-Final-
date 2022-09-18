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
import { Box, Image } from "@chakra-ui/react";

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
  const property = {};

  return (
    <Box className={style.container}>
      <Link to={"/details/" + id}>
        {/* <img src={img[0] ? img[0].url : imgNotAvailable} alt="Img not found" /> */}
        <Image src={img ? img.url : imgNotAvailable} alt="Img not found" />
        <Box className={style.container2}>
          <FontAwesomeIcon className={style.containerIcon} icon={faHeart} />
          <h3>{ciudad}</h3>
          <h3>$ {precio}</h3>
          {premium === true ? (
            <FontAwesomeIcon className={style.containerIcon} icon={faStar} />
          ) : (
            <></>
          )}
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
