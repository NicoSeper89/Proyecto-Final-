import React from "react";
import { useDispatch, useSelector } from "react-redux";
import sty from "./SearchBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import {
  getPublications,
  clearFilters,
  updateFilterProp,
  updateFilterAmbient,
  updateFilterPets,
  setCurrentPage,
} from "../../redux/actions";
import { faFilterCircleXmark } from "@fortawesome/free-solid-svg-icons";
import style from "./SearchBar.module.css";
import { useState } from "react";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

// import { searcHouse } from "../../redux/actions";
// import { filter } from "../../redux/actions";
// import { precio } from "../../redux/actions";

// http://localhost:3001/publication/propertyTypes   ruta para traer los tipos de propiedades ya esta lista
// pasar ciudad para que la pueda encontrar esta nos llega desde el input
// para el sort by podemos ordenar por orden alfabetico

// const ambientes = [1, 2, 3, 4, "5+"];

const SearchBar = () => {
  const dispatch = useDispatch();

  const filters = useSelector((state) => state.filters);
  const sorting = useSelector((state) => state.sorting);
  const propertys = useSelector((state) => state.typeOfProperties);
  const [city, setCity] = useState("");

  const changes = (e) => {
    setCity(e.target.value);
  };
  const selectPropType = (e) => {
    dispatch(updateFilterProp(e.target.value));
    dispatch(setCurrentPage(1));
    dispatch(getPublications(filters, sorting, city));
  };
  const selectAmbients = (e) => {
    dispatch(updateFilterAmbient(e));
    dispatch(setCurrentPage(1));
    dispatch(getPublications(filters, sorting, city));
  };
  const selectPets = (e) => {
    dispatch(updateFilterPets(e.target.value));
    dispatch(setCurrentPage(1));
    dispatch(getPublications(filters, sorting, city));
  };

  const search_House = () => {
    dispatch(setCurrentPage(1));
    dispatch(getPublications(filters, sorting, city));
    setCity(""); /* esto es para que se setee el estado del input */
  };

  const orderByPrice = (e) => {
    var orden;

    if (e.target.value === "Precio") orden = { name: "default", direccion: "minMax" };
    else orden = { name: "price", direccion: e.target.value };
    dispatch(setCurrentPage(1));
    dispatch(getPublications(filters, orden, city));
  };

  function handleResetFilter(e) {
    e.preventDefault();
    dispatch(clearFilters());
    dispatch(getPublications(filters, sorting, city));
    dispatch(setCurrentPage(1));
    /* esto del paginado sirve para que vuelva a la pagina 1 cuando se ejecuta el evento. Mel*/
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
          value={city}
        />
        {/* agregué este value. Mel */}
        <button className={sty.btn} onClick={search_House}>
          Buscar
        </button>
      </div>
      <div>
        <select name="property" className={sty.select} onChange={selectPropType}>
          {/* volví a agregar el handle selectPropType, se ve que se borró sin querer y no andaba ese filtro. Mel */}
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
      <NumberInput defaultValue={""} min={1} max={20} onChange={selectAmbients}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <div>
        <select id="4" className={sty.select} onChange={selectPets}>
          <option value="Mascotas">Mascotas</option>
          <option value={true}>si</option>
          <option value={false}>no</option>
        </select>
      </div>
      <div>
        <select id="3" className={sty.select} onChange={orderByPrice}>
          <option value="Precio">Precio</option>
          <option value="maxMin">Mayor Precio</option>
          <option value="minMax">Menor Precio</option>
        </select>
      </div>
    </div>
  );
};

export default SearchBar;
