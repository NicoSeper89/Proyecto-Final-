import React from "react";
import { useDispatch, useSelector } from "react-redux";
import sty from "./SearchBar.module.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { getPublications } from "../../redux/actions";

// import { searcHouse } from "../../redux/actions";
// import { filter } from "../../redux/actions";
// import { precio } from "../../redux/actions";

// http://localhost:3001/publication/propertyTypes   ruta para traer los tipos de propiedades ya esta lista
// pasar ciudad para que la pueda encontrar esta nos llega desde el input
// para el sort by podemos ordenar por orden alfabetico

const ambientes = [1, 2, 3, 4];

const SearchBar = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);
  const sorting = useSelector((state) => state.sorting);
  const propertys = useSelector((state) => state.typeOfProperties);

  const select = (e) => {
    // dispatch(filter(e.target.name, e.target.value));
  };

  const search_House = (e) => {
    dispatch(getPublications(null, "default", e.target.value));
  };

  const BucarPorPrecio = (e) => {
    // dispatch(precio(e.target.value));
  };
  return (
    <div className={sty.continer}>
      <div>
        <input
          type="text"
          className={sty.Serch}
          placeholder="Buscar Ciudad..."
          onChange={search_House}
        />
        <button className={sty.btn}>Buscar</button>
      </div>
      <div>
        <select name="Propiedad" className={sty.select} onChange={select}>
          <option>Propiedad</option>
          {propertys.map((e) => {
            return <option key={e.id}>{e.name}</option>;
          })}
        </select>
      </div>
      <div>
        <select name="ambientes" className={sty.select} onChange={select}>
          <option>Ambientes</option>
          {ambientes.map((e) => {
            return <option key={e}>{e}</option>;
          })}
          <option>5+</option>
        </select>
      </div>
      <div>
        <select id="3" className={sty.select} onChange={BucarPorPrecio}>
          <option>Precio</option>
          <option>Mayor Precio</option>
          <option>Menor Precio</option>
        </select>
      </div>
      <div>
        <select id="4" className={sty.select}>
          <option>Mascotas</option>
          <option>si</option>
          <option>no</option>
        </select>
      </div>
    </div>
  );
};

export default SearchBar;
