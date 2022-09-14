import React from "react";
import sty from "./SearchBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const SearchBar = () => {
  return (
    <div className={sty.continer}>
      <div>
        <input type="text" className={sty.Serch} placeholder="Buscar Ciuedad..." />
        <button className={sty.btn}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
      <div>
        <select id="1" className={sty.select}>
          <option>Propiedad</option>
        </select>
      </div>
      <div>
        <select id="2" className={sty.select}>
          <option>Ambientes</option>
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

      {/* "holaaaaa" */}
    </div>
  );
};

export default SearchBar;
