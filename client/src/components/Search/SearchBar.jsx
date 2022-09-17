import React from "react";
import { useDispatch, useSelector } from "react-redux";
import sty from "./SearchBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { getPublications, updateFilterProp,updateFilterAmbient } from "../../redux/actions";
import { faFilterCircleXmark } from "@fortawesome/free-solid-svg-icons";
import style from "./SearchBar.module.css";
import { useState } from "react";

// import { searcHouse } from "../../redux/actions";
// import { filter } from "../../redux/actions";
// import { precio } from "../../redux/actions";

// http://localhost:3001/publication/propertyTypes   ruta para traer los tipos de propiedades ya esta lista
// pasar ciudad para que la pueda encontrar esta nos llega desde el input
// para el sort by podemos ordenar por orden alfabetico

const ambientes = [1, 2, 3, 4, "5+"];

const SearchBar = ({ paginado }) => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);
  const sorting = useSelector((state) => state.sorting);
  const propertys = useSelector((state) => state.typeOfProperties);
  const[city, setCity] = useState("")
   
  const changes = (e) => {
   setCity(e.target.value)
  }
  const select = (e) => {
    // dispatch(updateFilter(e.target.value));
    dispatch(getPublications(filters, sorting, ""));
  };
  const selectAmbients = (e) => {
    console.log(e.target.value)
    dispatch(updateFilterAmbient(e.target.value));
    dispatch(getPublications(filters, sorting, ""));
  };

  const search_House = () => {
    dispatch(getPublications("", "", city));
    console.log(city)
  };

  const BucarPorPrecio = (e) => {
    // dispatch(precio(e.target.value));
  };

  function handleResetFilter(e) {
    e.preventDefault();
    dispatch(getPublications());
    paginado(1);
  }

  return (
    <div className={sty.continer}>
      <FontAwesomeIcon
        icon={faFilterCircleXmark}
        onClick={(e) => handleResetFilter(e)}
        className={style.img}
      />
      {/* <button onClick={(e) => handleResetFilter(e)}>Reset</button> */}
      <div>
        <input
          type="text"
          className={sty.Serch}
          placeholder="Buscar Ciudad..."
          onChange={changes}
        />
        <button className={sty.btn} onClick={search_House}>Buscar</button>
      </div>
      <div>
        <select name="property" className={sty.select} >
          <option>Propiedad</option>
          {propertys.map((e) => {
            return (
              <option key={e.id} value={e.name}>
                {e.name}
              </option>
            );
          })}
        </select>
      </div>
      <div>
      <input
          type="number"
          className={sty.Serch}
          placeholder="Ambientes..."
          onChange={selectAmbients}
        />
        <select name="ambientes" className={sty.select} onChange={selectAmbients}>
          <option>Ambientes</option>
          {ambientes.map((e) => {
            return <option key={e}>
              {e}
              </option>;
          })}
        </select>
      </div>
      <div>
        <select id="4" className={sty.select}>
          <option>Mascotas</option>
          <option>si</option>
          <option>no</option>
        </select>
      </div>
      <div>
        <select id="3" className={sty.select} onChange={BucarPorPrecio}>
          <option>Precio</option>
          <option>Mayor Precio</option>
          <option>Menor Precio</option>
        </select>
      </div>
    </div>
  );
};

export default SearchBar;
