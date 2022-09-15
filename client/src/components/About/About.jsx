import React from "react";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import style from "./About.module.css";

export default function About() {
  return (
    <div className={style.container}>
      <NavBar />
      <div className={style.containerText}>
        <div>
          <h2>Acerca de LookHouse</h2>
          <p>
            LookHouse es una App Web creada por un pequeño grupo de alumnos de SoyHenry en el año
            2022. La visión de este proyecto es la de, como intermediario, conectar a usuarios
            interesados en ofrecer o adquirir temporalmente un inmueble.
          </p>
        </div>
        <div>
          <h4>Colaboradores</h4>
          <a href="https://github.com/MelHellrigl">Melissa</a>
          <a>Thomas</a>
          <a>Nicolas</a>
          <a>Jose</a>
          <a>Tomas</a>
          <a>Rodrigo</a>
          <a>Gabriel</a>
        </div>
      </div>
      <div className={style.containerFooter}>
        <Footer />
      </div>
    </div>
  );
}
