import React from "react";
import { useSelector } from "react-redux";
import Card from "./Card";
import style from "./Cards.module.css";

export default function Cards({ currentHouse }) {
  const houses = useSelector((state) => state.houses);

  return (
    <div className={style.container}>
      {currentHouse?.map((r) => {
        console.log(r.property.city.name)
        return (
          <div key={r.id}>
            <Card
               id ={r.id}
              img={r.img}
              precio={r.property.price}
              ciudad={r.property.city.name}
              metros={r.property.surface}
              baño={r.property.bathrooms}
              dormitorio={r.property.rooms}
              ambientes={r.property.environments}
              mascota={r.property.pets} 
            />
          </div>
        );
      })}
    </div>
  );
}
