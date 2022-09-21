import React from "react";
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

const NavBar = () => {
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
    <Box>
      <Flex
        // bg={useColorModeValue("gray.50", "gray.900")}
        // color={useColorModeValue("gray.700", "gray.200")}
        alignItems={"center"}
        justifyContent={"space-between"}
        p={"0rem 0.2rem"}
        w={"100%"}
        h={"60px"}
        position={"fixed"}
        zIndex={"10"}
        // backgroundColor={"gray.100"}
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
              <Link to="/perfil">
                <MenuItem>Perfil</MenuItem>
              </Link>
            </MenuList>
          </Menu>
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
        </Box>
      </Flex>
    </Box>
  );
};

export default NavBar;
