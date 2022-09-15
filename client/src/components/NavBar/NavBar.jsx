import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import style from './NavBar.module.css';
import logoImg from '../../Image/Logo LookHouse.png'

const NavBar = () => {

  const history = useHistory();
  const [displayMenu, setDisplayMenu] = useState(false);

  const onClickMenu = (e) => {
    e.preventDefault();
    setDisplayMenu(!displayMenu);
  };

  const buttonCreatePost = (e) => {
    e.preventDefault();
    history.push("/createPost")
  }

  return (
    <>
      <div className={style.container}>
        <img src={logoImg} alt="homeLogo" />
        <div className={style.buttons}>
          <button onClick={buttonCreatePost}>Publicar</button>
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
