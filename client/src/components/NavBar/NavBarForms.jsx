import React from "react";
import { Link } from "react-router-dom";
import style from "./NavBarForms.module.css";
import logoImg from "../../Image/Logo LookHouse.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

export default function NavBarForms() {
  return (
    <>
      <div className={style.container}>
        <Link to="/">
          <img src={logoImg} alt="homeLogo" />
        </Link>
        <div className={style.buttons}>
          <Link to="/">
            <button>Atras</button>
          </Link>
          <Link to="/login">
            <FontAwesomeIcon icon={faCircleUser} className={style.img} />
          </Link>
        </div>
      </div>
    </>
  );
}
