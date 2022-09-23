import React from "react";
import style from "./Card.module.css";
import imgNotAvailable from "../../Image/Image_not_available.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faToilet,
  faBed,
  faDoorOpen,
  faPaw,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Box, Button, Flex, Image, Tag, Text } from "@chakra-ui/react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useSelector } from "react-redux";

export default function Card({
  id,
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
  const infoUser = useSelector(state => state.infoUser)
  return (
    <Box className={style.container} zIndex={"80"}>
      {/* <Box position={"relative"} height={"230px"} width={"full"} overflow={"hidden"}>
        <Carousel thumbWidth={"13%"} infiniteLoop>
          {img.map((s) => {
            return (
              <Box>
                <Image src={s.url ? s.url : imgNotAvailable} key={s.id} alt="Img not found" />
              </Box>
            );
          })}
        </Carousel>
      </Box> */}
      <Image
        src={img[0] ? img[0].url : imgNotAvailable}
        alt="Img not found"
        className={style.img}
      />
      <Box className={style.container2}>
        <Flex direction={"row"}>
          {premium === true ? (
            <Tag size={"sm"} variant="solid" backgroundColor={"teal"}>
              Destacado
            </Tag>
          ) : (
            // <FontAwesomeIcon className={style.containerIcon} icon={faStar} />
            <></>
          )}
          <FontAwesomeIcon className={style.containerIcon} icon={faHeart} />
        </Flex>
        {/* <Tag size={"sm"} variant="solid" colorScheme="teal"></Tag> */}
        {/* <FontAwesomeIcon className={style.containerIcon} icon={faHeart} /> */}

        <Box>
          <Text as="b" textTransform={"uppercase"} fontSize="l" textAlign={"center"}>
            {ciudad}
          </Text>
          <Text as="samp" fontSize="xl">
            $ {precio}
          </Text>
        </Box>
      </Box>

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
      { infoUser && <Link to={"/details/" + id} textAlign={"center"}>
        Detail
      </Link>}
    </Box>
  );
}
