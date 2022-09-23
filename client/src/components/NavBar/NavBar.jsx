import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import style from "./NavBar.module.css";
import { Link } from "react-router-dom";
import logoImg from "../../Image/Logo LookHouse.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../Search/SearchBar";
import {useAuth0} from "@auth0/auth0-react"
import {
  Box,
  Button,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorModeValue,
} from "@chakra-ui/react";
import "./NavBar.module.css";


const NavBar = () => {
  const {loginWithRedirect, user, isAuthenticated, logout} = useAuth0()  // haciendo pruebas 
  const dispatch = useDispatch()
  const history = useHistory();
  const user2 = useSelector(state => state.infoUser)
  // const [displayMenu, setDisplayMenu] = useState(false);

  // const onClickMenu = (e) => {
  //   e.preventDefault();
  //   setDisplayMenu(!displayMenu);
  // };
  const closeUser = () => {
      window.localStorage.removeItem("User")      // me elimina el user de localStorage y cierra sesion
      dispatch(setInfoUser(null)) 
      logout()
  }
  const [navbar, setNavbar] = useState(false);

  const cambioColor = () => {
    /* console.log(window.scrollY); */
    if (window.scrollY > 100) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
    // var header = document.querySelector("container");
    // header.classList.toggle("bg", window.scrollY > 0);
  };

  window.addEventListener("scroll", cambioColor);

  const buttonCreatePost = (e) => {
    e.preventDefault();
    history.push("/createPost");
  };

  return (
    <Box className={navbar ? "container bg" : "container"}>
      <Flex
        // bg={useColorModeValue("gray.50", "gray.900")}
        // color={useColorModeValue("gray.700", "gray.200")}
        // alignItems={"center"}
        // justifyContent={"space-between"}
        // p={"0rem 0.2rem"}
        // w={"100%"}
        // h={"60px"}
        // position={"fixed"}
        // zIndex={"10"}
        // backgroundColor={"gray.100"}
        className={style.container}
      >
        <Link to="/">
          <Image h={"140px"} marginTop={"20px"} src={logoImg} alt="homeLogo" />
        </Link>

        <Box display={"flex"} alignItems={"center"} marginRight={"10px"}>
          <SearchBar />
          {/* me oculta el boton si no esta logueado o es propietario */}
          { user2 && user2[0].typeOfUserId === 1
           &&    
           <Button colorScheme="orange" bg="orange" variant="outline" onClick={buttonCreatePost}>
            Publicar
          </Button>}

          <Menu>
            <MenuButton aria-label="Options" variant="outline" px={"1rem"} py={".5rem"}>
              <FontAwesomeIcon icon={faCircleUser} className={style.img} />
            </MenuButton>
            <MenuList>
              { !user2 && 
                <MenuItem onClick={() => null}>Iniciar Sesión</MenuItem>
                }
              { !isAuthenticated && 
                <MenuItem onClick={() => loginWithRedirect()}>Registrarte</MenuItem> 
              }
              { isAuthenticated && 
              <MenuItem onClick={() => closeUser()}>Cerrar Sesion</MenuItem>
             }
             <MenuItem onClick={() => console.log(user)}>Info de User</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    </Box>
  );
};

export default NavBar;
