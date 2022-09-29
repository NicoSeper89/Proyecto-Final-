import React from "react";
import { Link } from "react-router-dom";
import style from "./NavBarForms.module.css";
import logoImg from "../../Image/Logo LookHouse.png";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { Box, Button, Flex, Image, useColorModeValue } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearFilters, getInfoUser, getPublicationsDetail } from "../../redux/actions";

export default function NavBarForms() {
  const history = useHistory();
  const dispatch = useDispatch();

  const detailsPub = useSelector((state) => state.detail);
  const infoUser = useSelector((state) => state.infoUser);

  function handleClick(e) {
    e.preventDefault();
    dispatch(clearFilters());
    const rutaArr = history.location.pathname.split("/");
    if (rutaArr[1] === "updatePublicaction") {
      if (!detailsPub) dispatch(getPublicationsDetail(rutaArr[2]));
      return history.push(`/details/${rutaArr[2]}`);
    }
    if (rutaArr[1] === "updatePerfil") {
      if (!infoUser) dispatch(getInfoUser());
      return history.push(`/perfilPropietario`);
    }
    if (rutaArr[1] === "details") {
      if (!infoUser) dispatch(getInfoUser());
      return history.goBack();
    }

    history.push("/");
  }

  return (
    <>
      <Box
        className={style.container}
        /* bg={useColorModeValue("gray.50", "gray.900")} */
        color={useColorModeValue("gray.700", "gray.200")}
        overflow={"hidden"}
      >
        <Flex
          alignItems={"center"}
          justifyContent={"space-between"}
          p={"0rem 0.2rem"}
          w={"100%"}
          h={"60px"}
        >
          <Link to="/">
            <Image src={logoImg} alt="homeLogo" h={"200px"} marginTop={"35px"} />
          </Link>
          <Box>
            <Button
              onClick={(e) => {
                handleClick(e);
              }}
              mr={"10px"}
              transition="all 0.2s"
              borderColor={"#BEBCBC"}
              borderRadius="md"
              borderWidth="1px"
              _hover={{ bg: "#D9D9D9" }}
              _expanded={{ bg: "white" }}
              _focus={{ bg: "#D9D9D9" }}
              color={"black"}
            >
              Atras
            </Button>
          </Box>
        </Flex>
      </Box>
    </>
  );
}
