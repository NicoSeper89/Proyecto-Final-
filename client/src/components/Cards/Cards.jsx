import React from "react";
import { useSelector } from "react-redux";
import Card from "./Card";
import style from "./Cards.module.css";

export default function Cards({ currentHouse }) {
  const houses = useSelector((state) => state.houses);

  return (
    <div className={style.container}>
      {currentHouse?.map((r) => {
        return (
          <div key={r.id}>
            <Card
              id ={r.id}
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
