import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import style from "./NavBar.module.css";
import { Link } from "react-router-dom";
import logoImg from "../../Image/Logo LookHouse.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
// import SearchBar from "../Search/SearchBar";
import { useAuth0 } from "@auth0/auth0-react";
import {
  Box,
  Button,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tooltip,
} from "@chakra-ui/react";
import "./NavBar.module.css";
import { getPubs, getUserInfo } from "../../redux/actions";

const NavBar = () => {
  const { loginWithRedirect, /*isAuthenticated,*/ logout } = useAuth0(); // haciendo pruebas
  const history = useHistory();
  const dispatch = useDispatch();
  const publicationsUser = useSelector((state) => state.publicationsUser);
  const infoUser = useSelector((state) => state.infoUser);
  const infoUser2 = useSelector((state) => state.allUserInfo);
  // const [displayMenu, setDisplayMenu] = useState(false);

  // const onClickMenu = (e) => {
  //   e.preventDefault();
  //   setDisplayMenu(!displayMenu);
  // };
  /* const havePublications = async (identificador) => {
    let result = await axios.get(`/user/getPubs/${identificador}`);
    result = result.data.length ? true : false;
    console.log('result',result)
    return result
  } */

  const user = window.localStorage.getItem("User");
  const user2 = JSON.parse(user);

  useEffect(() => {
    if (user2) {dispatch(getPubs(user2[0].id))
    dispatch(getUserInfo(user2[0].id));}
  }, [dispatch]);

  const closeUser = () => {
    window.localStorage.removeItem("User"); // me elimina el user de localStorage, cierra sesion
    logout();
  };

  const [navbar, setNavbar] = useState(false);
  const cambioColor = () => {
    /* console.log(window.scrollY); */
    if (window.scrollY > 150) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  window.addEventListener("scroll", cambioColor);

  const buttonCreatePost = (e) => {
    e.preventDefault();
    history.push("/createPost");
  };

  const buttonAdmin = (e) => {
    e.preventDefault();
    history.push("/admin");
  };

  const detallesUser = () => {
    history.push("/perfilPropietario");
  };

  const activeColor = "green.500";
  const inactiveColor = "gray.400";

  return (
    <div className={`${navbar ? style.containerBg : style.containerBgTop}`}>
      <Flex
        // bg={useColorModeValue("gray.50", "gray.900")}
        // color={useColorModeValue("gray.700", "gray.200")}
        alignItems={"center"}
        justifyContent={"space-between"}
        p={"0rem 0.2rem"}
        w={"100%"}
        h={"60px"}
        // backgroundColor={"gray.100"}
        overflow={"hidden"}
      >
        <Link to="/">
          <Image h={"200px"} marginTop={"35px"} src={logoImg} alt="homeLogo" />
        </Link>

        <Box display={"flex"} alignItems={"center"} marginRight={"10px"}>
          {/* me oculta el boton si no esta logueado o es propietario */}
          {user2 && user2[0].admin && (
            <Button
              colorScheme="orange"
              variant="outline"
              onClick={buttonAdmin}
              marginRight={"10px"}
            >
              Admin
            </Button>
          )}

          {user2 && (infoUser2.approved || !publicationsUser.length) && (
            <Button
              colorScheme="orange"
              bg="orange"
              variant="outline"
              // onClick={() => history.push("/createPost")}>
              onClick={(e) => buttonCreatePost(e)}
            >
              Publicar
            </Button>
          )}

          {/* <Box direction={"row"} spacing={6}> */}
          {/* <Box
            marginRight={"10px"}
            px={"1rem"}
            py={".5rem"}
            transition="all 0.2s"
            borderRadius="md"
            borderWidth="1px"
            borderColor={"black"}
            variant="link"
            _hover={{ bg: "white" }}
            _expanded={{ bg: "white" }}
            _focus={{ boxShadow: "outline" }}
          >
            <Link name="property" _hover={{ bg: "#D9D9D9" }} _focus={{ bg: "#D9D9D9" }} to={"/"}>
              Inicio
            </Link>
          </Box>
          <Box
            marginRight={"10px"}
            px={"1rem"}
            py={".5rem"}
            transition="all 0.2s"
            borderRadius="md"
            borderWidth="1px"
            borderColor={"black"}
            variant="link"
            _hover={{ bg: "white" }}
            _expanded={{ bg: "white" }}
            _focus={{ boxShadow: "outline" }}
          >
            <Link
              color={"black"}
              _hover={{ bg: "#D9D9D9" }}
              _focus={{ bg: "#D9D9D9" }}
              to={"/about"}
            >
              Conocenos
            </Link>
          </Box>
          <Box
            marginRight={"10px"}
            px={"1rem"}
            py={".5rem"}
            transition="all 0.2s"
            borderRadius="md"
            borderWidth="1px"
            borderColor={"black"}
            variant="link"
            _hover={{ bg: "white" }}
            _expanded={{ bg: "white" }}
            _focus={{ boxShadow: "outline" }}
          >
            <Link
              color={"black"}
              _hover={{ bg: "#D9D9D9" }}
              _focus={{ bg: "#D9D9D9" }}
              to={"/help"}
            >
              Ayuda
            </Link>
          </Box>
          <Box
            marginRight={"10px"}
            px={"1rem"}
            py={".5rem"}
            transition="all 0.2s"
            borderRadius="md"
            borderWidth="1px"
            borderColor={"black"}
            variant="link"
            _hover={{ bg: "white" }}
            _expanded={{ bg: "white" }}
            _focus={{ boxShadow: "outline" }}
          >
            <Link
              color={"black"}
              _hover={{ bg: "#D9D9D9" }}
              _focus={{ bg: "#D9D9D9" }}
              to={"mailto:lookhousepf@gmail.com"}
            >
              Contactanos
            </Link>
          </Box> */}
          {/* </Box> */}
          {/* <SearchBar /> */}

          <Menu>
            <Box position={"relative"} display="flex" alignItems="flex-end">
              <MenuButton aria-label="Options" variant="outline" px={"1rem"} py={".5rem"}>
                {!user2 && (
                  <Box position={"relative"} display="flex" alignItems="flex-end">
                    <FontAwesomeIcon icon={faCircleUser} className={style.img} />
                    <Tooltip label={`Status: Inactive`} textTransform="capitalize">
                      <Box
                        as="div"
                        h="12px"
                        w="12px"
                        position="absolute"
                        bgColor={inactiveColor}
                        borderRadius="50%"
                      />
                    </Tooltip>
                  </Box>
                )}
                {user2 && (
                  <Box position={"relative"} display="flex" alignItems="flex-end">
                    <FontAwesomeIcon icon={faCircleUser} className={style.img} />
                    <Tooltip label={`Status: Active`} textTransform="capitalize">
                      <Box
                        as="div"
                        h="12px"
                        w="12px"
                        position="absolute"
                        bgColor={activeColor}
                        borderRadius="50%"
                      // _before={{
                      //   content: "''",
                      //   position: 'relative',
                      //   display: 'block',
                      //   width: '300%',
                      //   height: '300%',
                      //   boxSizing: 'border-box',
                      //   marginLeft: '-100%',
                      //   marginTop: '-100%',
                      //   borderRadius: '50%',
                      //   bgColor: activeColor,
                      //   animation: `2.25s ${pulseRing} cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite`,
                      // }}
                      // _after={{
                      //   animation: `2.25s ${pulseDot} cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite`,
                      // }}
                      />
                    </Tooltip>
                  </Box>
                )}
              </MenuButton>
            </Box>
            <MenuList color={"black"}>
              {!user2 && <MenuItem onClick={() => loginWithRedirect()}>Iniciar Sesion</MenuItem>}
              {user2 && <MenuItem onClick={() => detallesUser()}>Informacion de Usuario</MenuItem>}
              {user2 && <MenuItem onClick={() => closeUser()}>Cerrar Sesion</MenuItem>}
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    </div>
  );
};

export default NavBar;
