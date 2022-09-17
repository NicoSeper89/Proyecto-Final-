import React from "react";
import Card from "./Card";
import style from "./Cards.module.css";

export default function Cards({ currentHouse }) {
  return (
    <div className={style.container}>
      {/* {loading? <Loading/>} */}
      {currentHouse?.map((r) => {
        return (
          <div key={r.id}>
            <Card
              id={r.id}
              img={r.property.propertyImages}
              precio={r.property.price}
              ciudad={r.property.city.name}
              metros={r.property.surface}
              baño={r.property.bathrooms}
              dormitorio={r.property.rooms}
              ambientes={r.property.environments}
              mascota={r.property.pets}
              premium={r.premium}
            />
          </div>
        );
      })}
    </div>
  );
}
