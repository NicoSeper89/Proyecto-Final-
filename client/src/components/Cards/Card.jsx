import React from "react";
import style from "./Card.module.css";
import imgNotAvailable from "../../Image/Image_not_available.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faToilet } from "@fortawesome/free-solid-svg-icons";
import { faBed } from "@fortawesome/free-solid-svg-icons";
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import { faPaw } from "@fortawesome/free-solid-svg-icons";

export default function Card({
  img,
  precio,
  ciudad,
  metros,
  baño,
  dormitorio,
  ambientes,
  mascota,
}) {
  return (
    <div className={style.contenedor}>
      <img src={img || imgNotAvailable} alt="Img not found" />
      <div className={style.contenedor2}>
        <FontAwesomeIcon className={style.contenedorIcon} icon={faHeart} />
        <h2>{ciudad}</h2>
        <h3>$ {precio}</h3>
      </div>
      <div className={style.contenedorInfo}>
        <h4>{metros} m²</h4>
        <FontAwesomeIcon className={style.contenedorIcon} icon={faToilet} />
        <h4>{baño}</h4>
        <FontAwesomeIcon className={style.contenedorIcon} icon={faBed} />
        <h4>{dormitorio}</h4>
        <FontAwesomeIcon className={style.contenedorIcon} icon={faDoorOpen} />
        <h4>{ambientes}</h4>
        {mascota === true ? (
          <FontAwesomeIcon className={style.contenedorIcon} icon={faPaw} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
