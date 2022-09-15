import React from "react";
import { useDispatch, useSelector } from "react-redux";
import sty from "./SearchBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { searcHouse } from "../../redux/actions";
import { filter } from "../../redux/actions";

const SearchBar = () => {
  const dispatch = useDispatch();

  const select = (e) => {
    dispatch(filter(e.target.name, e.target.value));
  };

  const search_House = (e) => {
    dispatch(searcHouse(e.target.value));
  };
  return (
    <div className={sty.continer}>
      <div>
        <input
          type="text"
          className={sty.Serch}
          placeholder="Buscar Ciuedad..."
          onChange={search_House}
        />
        <button className={sty.btn}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
      <div>
        <select name="Propiedad" className={sty.select} onChange={select}>
          <option>Propiedad</option>
        </select>
      </div>
      <div>
        <select name="ambientes" className={sty.select} onChange={select}>
          <option>Ambientes</option>
          <option>4</option>
          <option>5</option>
        </select>
      </div>
      <div>
        <select id="3" className={sty.select}>
          <option>Precio</option>
        </select>
      </div>
      <div>
        <select id="4" className={sty.select}>
          <option>Sort By</option>
        </select>
      </div>
    </div>
  );
};

export default SearchBar;
