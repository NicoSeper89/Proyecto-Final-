import React from "react";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import style from "./Help.module.css";

export default function Help() {
  return (
    <div className={style.container}>
      <NavBar />
      <div className={style.containerText}>
        <h1>Ayuda</h1>
        <h2>¿Cómo me registro en LookHouse?</h2>
        <p>
          El registro lo podes realizar muy facilmente ingresando con tu cuenta de Google, o
          registrándote con tu email. Y así es como podés formar parte de nuestra comunidad!
        </p>
        <br />
        <h2>¿Cómo puedo realizar una publicación?</h2>
        <p>Proximamente te explicamos...</p>
        <h2>¿Cómo puedo solicitar una cita para visitar la propiedad?</h2>
        <p>Proximamente te explicamos...</p>
      </div>
      <div className={style.containerFooter}>
        <Footer />
      </div>
    </div>
  );
}
