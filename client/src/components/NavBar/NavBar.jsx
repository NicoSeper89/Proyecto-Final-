import React, { useState } from "react";
import style from "./NavBar.module.css";

const NavBar = () => {
  const [displayMenu, setDisplayMenu] = useState(false);

  const onClickMenu = (e) => {
    e.preventDefault();

    setDisplayMenu(!displayMenu);
  };

  return (
    <>
      <div className={style.container}>
        <img src="https://i.postimg.cc/K8TW0jTZ/Logo-Look-House.png" alt="homeLogo" />
        <div className={style.buttons}>
          <button>Publicar</button>
          <button>Ingresar</button>
          <button>Registrarse</button>
          <div>
            <button onClick={onClickMenu}>Menu</button>
            {displayMenu ? (
              <div className={style.displayMenu}>
                <button>Link 1</button>
                <button>Link 2</button>
                <button>Link 3</button>
                <button>Link 4</button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
