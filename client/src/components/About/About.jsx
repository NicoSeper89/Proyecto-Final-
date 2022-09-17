import React from "react";
import NavBarForms from "../NavBar/NavBarForms";
import Footer from "../Footer/Footer";
import style from "./About.module.css";

export default function About() {
  return (
    <div className={style.container}>
      <NavBarForms />
      <div className={style.containerText}>
        <div>
          <h1>Acerca de LookHouse</h1>
          <p>
            LookHouse es una App Web creada por un pequeño grupo de alumnos de SoyHenry en el año
            2022. La visión de este proyecto es la de, como intermediario, conectar a usuarios
            interesados en ofrecer o adquirir temporalmente un inmueble.
          </p>
        </div>
        <div>
          <h4>Colaboradores</h4>
          <a href="https://github.com/MelHellrigl">Melissa Hellrigl</a>
          <a href="https://github.com/thomneuhaus2">Thom Neuhaus</a>
          <a href="https://github.com/NicoSeper89">Nicolás Sepertino</a>
          <a href="https://github.com/ELJG">Jose Garcia</a>
          <a href="https://github.com/TomasTinto1234">Tomas Tinto</a>
          <a href="https://github.com/rojebastidas">Rodrigo Bastidas</a>
          <a href="https://github.com/gabrielTor">Gabriel Torres</a>
        </div>
      </div>
      <div className={style.containerFooter}>
        <Footer />
      </div>
    </div>
  );
}
