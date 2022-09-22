import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import style from "./NavBar.module.css";
import { Link } from "react-router-dom";
import logoImg from "../../Image/Logo LookHouse.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../Search/SearchBar";
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
  const history = useHistory();

  const [navbar, setNavbar] = useState(false);

  const cambioColor = () => {
    // console.log(window.scrollY);
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
          <Button colorScheme="orange" bg="orange" variant="outline" onClick={buttonCreatePost}>
            Publicar
          </Button>
          <Menu>
            <MenuButton aria-label="Options" variant="outline" px={"1rem"} py={".5rem"}>
              <FontAwesomeIcon icon={faCircleUser} className={style.img} />
            </MenuButton>
            <MenuList>
              <Link to="/login">
                <MenuItem>Iniciar Sesión</MenuItem>
              </Link>
              <Link to="/checkin">
                <MenuItem>Registrarte</MenuItem>
              </Link>
              <Link to="/perfilPropietario">
                <MenuItem>Perfil Propietario</MenuItem>
              </Link>
              <Link to="/perfilInquilino">
                <MenuItem>Perfil Inquilino</MenuItem>
              </Link>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    </Box>
  );
};

export default NavBar;
