import React from "react";
import style from "./Card.module.css";
import imgNotAvailable from "../../Image/Image_not_available.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faToilet, faBed, faDoorOpen, faPaw } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Badge, Box, Button, Flex, Image, Tag, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { getFavsUser, setFav } from "../../redux/actions";
import Select from "../SelectTypeUser/Select";
import AlertCard from "./AlertCard";
import { useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function Card({
  id,
  idUser,
  img,
  precio,
  ciudad,
  metros,
  baño,
  dormitorio,
  ambientes,
  mascota,
  premium,
}) {
  // const property = {};
  const dispatch = useDispatch();
  const infoUser = useSelector((state) => state.infoUser);
  const publicationsUser = useSelector((state) => state.publicationsUser);
  const favoritesUser = useSelector((state) => state.favoritesUser);
  const user = window.localStorage.getItem("User");
  const user2 = JSON.parse(user);

  useEffect(() => {
    dispatch(getFavsUser(infoUser[0].id));
  }, [dispatch]);

  const handleClickFav = () => {
    dispatch(setFav(infoUser[1].userId, id));
  };

  const isFav = favoritesUser.some((fav) => fav.id === id);

  return (
    <Box className={style.container} zIndex={"2"}>
      <Box position="relative" overflow={"hidden"} w={"100%"} h={"230px"}>
        {/* <Box position={"relative"} height={"230px"} width={"full"} overflow={"hidden"}> */}
        <Carousel
          thumbWidth={"13%"}
          h={"230px"}
          infiniteLoop
          borderBottom={"0.2px solid rgb(126, 125, 125)"}
        >
          {img.map((s) => {
            return (
              <Box>
                <Image
                  src={s.url ? s.url : imgNotAvailable}
                  key={s.id}
                  alt="Img not found"
                  h={"230px"}
                  backgroundSize={"cover"}
                  backgroundRepeat={"no-repeat"}
                  backgroundPosition={"center"}
                />
              </Box>
            );
          })}
        </Carousel>
        {/* </Box> */}
        <Box display={"flex"} justifyContent={"flex-end"}>
          {premium === true ? (
            <Badge
              display={"flex"}
              size={"sm"}
              variant="solid"
              borderRadius={"5px 0px 5px 5px"}
              backgroundColor="rgba(216, 158, 26, 0.85)"
              paddingRight={"15px"}
              position="absolute"
              w={"6rem"}
            >
              Destacado
            </Badge>
          ) : (
            // <FontAwesomeIcon className={style.containerIcon} icon={faStar} />
            <></>
          )}
        </Box>
        <Image
          src={img[img.length-1] ? img[img.length-1].url : imgNotAvailable}
          alt="Img not found"
          // className={style.img}
          borderBottom={"0.2px solid rgb(126, 125, 125)"}
        /> */}
      </Box>
      <Flex direction={"row"} justifyContent={"space-between"} p={"5px"} h={"30px"}>
        {/* que el corazon aparezca solo en las publicaciones que no son mias */}
        {/* <Link to={"/"} p={"0"}> */}
        {/* {idUser === infoUser[1].userId ? (
          <FontAwesomeIcon className={style.containerFav} h={"20px"} icon={faHeart} />
        ) : ( */}

        <Button p={"0"} m={"0"} h={"30px"} onClick={handleClickFav}>
          {isFav ? (
            <FontAwesomeIcon
              className={style.containerFav}
              h={"20px"}
              icon={faHeart}
              color={"orange"}
            />
          ) : (
            <FontAwesomeIcon className={style.containerFav} h={"20px"} icon={faHeart} />
          )}
          {/* <FontAwesomeIcon className={style.containerFav} h={"20px"} icon={faHeart} /> */}
        </Button>
        {/* )} */}
        {/* </Link> */}

        <Link to={infoUser ? `/details/${id}` : "/redirectRegister"} display={"flex"}>
          <Tag size={"sm"} variant="solid" backgroundColor={"teal"} marginLeft={"15px"} w={"5rem"}>
            + Detalles
          </Tag>
        </Link>
      </Flex>
      {/* <Tag size={"sm"} variant="solid" colorScheme="teal"></Tag> */}
      {/* <FontAwesomeIcon className={style.containerIcon} icon={faHeart} /> */}
      <Box className={style.container2}>
        <Flex direction={"column"}>
          <Text as="b" textTransform={"uppercase"} fontSize="xl">
            $ {precio}
          </Text>
          <Text as="samp" fontSize="l">
            {ciudad}
          </Text>
        </Flex>
      </Box>

      <Box>
        <Box className={style.containerInfo}>
          <Text as="samp" color={"rgb(87, 87, 87)"} marginRight={"30px"}>
            {metros} m²
          </Text>
          <FontAwesomeIcon className={style.containerIcon} icon={faToilet} />
          <Text as="samp" color={"rgb(87, 87, 87)"} marginRight={"30px"}>
            {baño}
          </Text>
          <FontAwesomeIcon className={style.containerIcon} icon={faBed} />
          <Text as="samp" color={"rgb(87, 87, 87)"} marginRight={"30px"}>
            {dormitorio}
          </Text>
          <FontAwesomeIcon className={style.containerIcon} icon={faDoorOpen} />
          <Text as="samp" color={"rgb(87, 87, 87)"} marginRight={"30px"}>
            {ambientes}
          </Text>
          {mascota === true ? (
            <FontAwesomeIcon className={style.containerIcon} icon={faPaw} />
          ) : (
            <></>
          )}
        </Box>
        {/* <Link to={"/details/" + id}>
          <Text
            textTransform={"uppercase"}
            textAlign={"center"}
            display={"flex"}
            justifyContent="center"
            w={"100%"}
            transition="all 0.2s"
            borderRadius="md"
            borderWidth="1px"
            variant="link"
            background={"#bebcbc"}
            _hover={{ bg: "#5e5d5d", color: "white" }}
            // _expanded={{ bg: "#5e5d5d" }}
            _focus={{ boxShadow: "outline" }}
          >
            Detalle
          </Text>
        </Link> */}
      </Box>
    </Box>
  );
}
