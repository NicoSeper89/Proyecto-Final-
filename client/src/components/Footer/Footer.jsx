import React from "react";
import style from "./Footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareInstagram } from "@fortawesome/free-brands-svg-icons";
import { faSquareTwitter } from "@fortawesome/free-brands-svg-icons";
import { faSquareGithub } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <div className={style.container}>
      <div className={style.containerIcons}>
        <a href="https://github.com/TomasTinto1234/Proyecto-Final-">
          <FontAwesomeIcon icon={faSquareGithub} />
        </a>
        <FontAwesomeIcon icon={faSquareInstagram} />
        <FontAwesomeIcon icon={faSquareTwitter} />
      </div>
      <div className={style.containerItems}>
        <a href="/about">
          <h3>About</h3>
        </a>
        <a href="/help">
          <h3>Help</h3>
        </a>
        <h3>Contact</h3>
      </div>
    </div>
  );
}
