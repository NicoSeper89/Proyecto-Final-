import React from "react";
import { useSelector } from "react-redux";
import Card from "./Card";
import style from "./Cards.module.css";

export default function Cards() {
  const houses = useSelector(state => state.houses)
  //Data moqueada
  
  return (
    <div>
      {houses.map((r) => {
        return (
          <div className={style.contenedor}>
            <Card
              img={r.img}
              precio={r.precio}
              ciudad={r.ciudad}
              metros={r.metros}
              baño={r.baño}
              dormitorio={r.dormitorio}
              ambientes={r.ambientes}
              mascota={r.mascota}
            />
          </div>
        );
      })}
    </div>
  );
}
