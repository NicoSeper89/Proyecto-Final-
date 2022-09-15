import React from "react";
import style from "./Card.module.css";
import imgNotAvailable from "../../Image/Image_not_available.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faToilet } from "@fortawesome/free-solid-svg-icons";
import { faBed } from "@fortawesome/free-solid-svg-icons";
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom"

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
}) {
  return (
    <div className={style.container}>
      <img src={img || imgNotAvailable} alt="Img not found" />
      <Link to={"/details/" + id} >
      <div className={style.container2}>
        <FontAwesomeIcon className={style.containerIcon} icon={faHeart} />
        <h3>{ciudad}</h3>
        <h3>$ {precio}</h3>
      </div>
        </Link>
      <div className={style.containerInfo}>
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
      </div>
    </div>
  );
}
