import React from "react";
import { useDispatch, useSelector } from "react-redux";
import sty from "./SearchBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { getPublications, clearFilters, updateFilterProp, updateFilterAmbient, updateFilterPets, updateSortingPrice } from "../../redux/actions";
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
  const [city, setCity] = useState("")

  const changes = (e) => {
    setCity(e.target.value)
  }
  const selectPropType = (e) => {
    dispatch(updateFilterProp(e.target.value));
    dispatch(getPublications(filters, sorting, city));
  };
  const selectAmbients = (e) => {

    dispatch(updateFilterAmbient(e.target.value));
    dispatch(getPublications(filters, sorting, city));
  };
  const selectPets = (e) => {
    dispatch(updateFilterPets(e.target.value));
    dispatch(getPublications(filters, sorting, city));
  };

  const search_House = () => {
    dispatch(getPublications(filters, sorting, city));
  };

  

  const orderByPrice = (e) => {
    var orden 

    if(e.target.value === "Precio") orden  = {name: "default", direccion: 'minMax'}
    else orden = {name: 'price', direccion: e.target.value}
  
    dispatch(getPublications(filters, orden, city))
    ; 
    
  };

  function handleResetFilter(e) {
    e.preventDefault();
    dispatch(clearFilters());
    dispatch(getPublications(filters, sorting, city));
    /* paginado(1); */
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
        <select id="4" className={sty.select} onChange={selectPets}>
          <option value='Mascotas'>Mascotas</option>
          <option value={true}>si</option>
          <option value={false}>no</option>
        </select>
      </div>
      <div>
        <select id="3" className={sty.select} onChange={orderByPrice}>
          <option value='Precio'>Precio</option>
          <option value='maxMin'>Mayor Precio</option>
          <option value='minMax'>Menor Precio</option>
        </select>
        {/* <button className={sty.btn} onClick={() => dispatch(getPublications(filters, sorting, city))}>
          Sort
          </button> */}
      </div>
    </div>
  );
};

export default SearchBar;  
