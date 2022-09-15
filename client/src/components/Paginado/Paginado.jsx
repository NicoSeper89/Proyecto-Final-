import React from "react";
import style from "./Paginado.module.css";

export default function Paginado({ housePage, house, paginado, page }) {
  const pages = [];
  for (let i = 1; i <= Math.ceil(house / housePage); i++) {
    pages.push(i);
  }

  return (
    <div className={style.paginado}>
      <button type="button" onClick={() => paginado(page === 1 ? page : page - 1)}>
        {"<"}
      </button>
      <div className={style.paginadoBtn}>
        {pages?.map((n) => {
          return (
            <div key={n}>
              <button type="button" onClick={() => paginado(n)}>
                {page === n ? "*" : n}
              </button>
            </div>
          );
        })}
      </div>
      <button type="button" onClick={() => paginado(page === pages.length ? page : page + 1)}>
        {">"}
      </button>
    </div>
  );
}
