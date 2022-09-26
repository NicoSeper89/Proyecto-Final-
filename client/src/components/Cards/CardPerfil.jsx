import { Badge, Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import style from "./Card.module.css";
import React from "react";
import imgNotAvailable from "../../Image/Image_not_available.png";
import { useHistory } from "react-router-dom";

export default function CardPerfil({ id, img, precio, ciudad, premium }) {
  const history = useHistory();

  const handleDetalle = (e) => {
    e.preventDefault();
    history.push("/details/" + id);
  };

  // const data = {
  //   id: 1,
  //   img: "",
  //   precio: "10.000",
  //   ciudad: "Ciudad Autonoma de Buenos Aires, la chuchaaa aaaaaaaa asdasdsd",
  //   premium: true,
  // };

  return (
    <Box
      position={"relative"}
      display="flex"
      flexDirection="row"
      flexWrap="wrap"
      w="500px"
      h="200px"
      zIndex={"2"}
      className={style.container}
      borderRadius={"0px"}
      m="0px"
      marginBottom={"15px"}
      justifyContent={"space-between"}
      alignContent={"space-around"}
      p={"10px"}
    >
      <Box h="180px" w="300px" overflow={"hidden"}>
        <Image
          src={img[0] ? img[0].url : imgNotAvailable}
          alt="Img not found"
          // border={"1px solid"}
          // borderColor="black"
        />
      </Box>
      <Box display={"flex"} justifyContent={"flex-star"} position="absolute">
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
          <></>
        )}
      </Box>
      <Box
        alignItems="flex-end"
        justifyContent="space-between"
        padding="5px 5px 5px 15px"
        display="flex"
        flexDirection="column"
        w={"180px"}
      >
        <Text as="b" fontSize="xl" marginBottom={"0px"}>
          $ {precio}
        </Text>
        <Text as="samp" fontSize="l" textAlign={"center"} width="150px">
          {ciudad}
        </Text>
        {/* {premium === true ? (
          <FontAwesomeIcon className={style.containerIcon} icon={faStar} />
        ) : (
          <></>
        )} */}
        <Button colorScheme="orange" variant="outline" onClick={handleDetalle}>
          Detalles
        </Button>
      </Box>
    </Box>
  );
}
