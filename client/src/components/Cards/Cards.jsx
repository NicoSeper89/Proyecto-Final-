import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../redux/actions";
import Loading from "../Loading/Loading";
import Card from "./Card";
import style from "./Cards.module.css";

export default function Cards() {
  const dispatch = useDispatch();
  const houses = useSelector((state) => state.houses);
  const loading = useSelector((state) => state.loading);
  const currentPage = useSelector((state) => state.currentPage);

  /* **************** PAGINADO **************** */
  const housePage = 2;
  const pages = [];
  for (let i = 1; i <= Math.ceil(houses.length / housePage); i++) {
    pages.push(i);
  }

  const lastPage = currentPage * housePage;
  const firstPage = lastPage - housePage;
  const currentHouse = houses.slice(firstPage, lastPage);

  const handleClick = (e) => {
    dispatch(setCurrentPage(Number(e.target.id)));
  };

  const handleNext = (e) => {
    dispatch(setCurrentPage(currentPage + 1));
  };

  const handlePrev = (e) => {
    dispatch(setCurrentPage(currentPage - 1));
  };

  const renderPaginado = pages.map((number) => {
    return (
      <li
        key={number}
        id={number}
        onClick={handleClick}
        className={currentPage === number ? style.active : null}
      >
        {number}
      </li>
    );
  });

  /* **************** RENDER CARDS **************** */
  return (
    <div className={style.containerAll}>
      {loading ? (
        <Loading />
      ) : (
        <div className={style.paginado}>
          <ul className={style.paginadoBtn}>
            {currentPage !== 1 ? <li onClick={handlePrev}>Prev</li> : null}
            {renderPaginado}
            {currentPage !== pages.length && renderPaginado ? (
              <li onClick={handleNext}>Next</li>
            ) : null}
          </ul>
          <div className={style.container}>
            {currentHouse?.map((r) => {
              return (
                <div key={r.id}>
                  <Card
                    id={r.id}
                    img={r.img}
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
        </div>
      )}
    </div>
  );
}
