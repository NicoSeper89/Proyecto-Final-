import React from "react";
import { useHistory } from "react-router-dom";
import style from "./NavBar.module.css";
import { Link } from "react-router-dom";
import logoImg from "../../Image/Logo LookHouse.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../Search/SearchBar";

const NavBar = ({ paginado }) => {
  const history = useHistory();
  // const [displayMenu, setDisplayMenu] = useState(false);

  // const onClickMenu = (e) => {
  //   e.preventDefault();
  //   setDisplayMenu(!displayMenu);
  // };

  const buttonCreatePost = (e) => {
    e.preventDefault();
    history.push("/createPost");
  };

  return (
    <>
      <div className={style.container}>
        <Link to="/">
          <img src={logoImg} alt="homeLogo" />
        </Link>
        <div className={style.buttons}>
          <SearchBar />
          <button onClick={buttonCreatePost}>Publicar</button>
          <Link to="/checkin">
            <button>Registro</button>
          </Link>
          <Link to="/login">
            <FontAwesomeIcon icon={faCircleUser} className={style.img} />
          </Link>
          {/* <div>
            <button onClick={onClickMenu}>Menu</button>
            {displayMenu ? (
              <div className={style.displayMenu}>
                <button>Link 1</button>
                <button>Link 2</button>
                <button>Link 3</button>
                <button>Link 4</button>
              </div>
            ) : null}
          </div> */}
        </div>
      </div>
    </>
  );
};

export default NavBar;
