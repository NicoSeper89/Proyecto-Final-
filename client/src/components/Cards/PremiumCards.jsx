import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "./Card";
// import style from "./Card.module.css";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { setCurrentCarrusel } from "../../redux/actions/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight /*faCircle*/ } from "@fortawesome/free-solid-svg-icons";

export default function PremiumCards() {
  const dispatch = useDispatch();
  const housePrem = useSelector((state) => state.housePrem);
  const currentCarrusel = useSelector((state) => state.currentCarrusel);

  const houseCarrusel = 3;
  const pages = [];
  for (let i = 1; i <= Math.ceil(housePrem.length / houseCarrusel); i++) {
    pages.push(i);
  }

  const lastPage = currentCarrusel * houseCarrusel;
  const firstPage = lastPage - houseCarrusel;
  const currentHouse = housePrem.slice(firstPage, lastPage);
  // const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentCarrusel === pages.length) {
        dispatch(setCurrentCarrusel(1));
      } else {
        dispatch(setCurrentCarrusel(currentCarrusel + 1));
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [dispatch, currentCarrusel, pages.length]);

  // const handleClick = (e) => {
  //   dispatch(setCurrentCarrusel(Number(e.target.id)));
  // };

  const handleNext = (e) => {
    if (currentCarrusel === pages.length) {
      dispatch(setCurrentCarrusel(1));
    } else {
      dispatch(setCurrentCarrusel(currentCarrusel + 1));
    }
  };

  const handlePrev = (e) => {
    if (currentCarrusel === 1) {
      dispatch(setCurrentCarrusel(pages.length));
    } else {
      dispatch(setCurrentCarrusel(currentCarrusel - 1));
    }
  };

  // const renderPaginado = pages.map((number) => {
  //   return (
  //     <Box
  //       cursor={"pointer"}
  //       m={"3px"}
  //       key={number}
  //       id={number}
  //       // onClick={handleClick}
  //       className={currentCarrusel === number ? style.active : null}
  //     >
  //       <FontAwesomeIcon icon={faCircle} color={"#bebcbc"} />
  //     </Box>
  //   );
  // });

  const slides = currentHouse?.map((r) => {
    if (r.premium && r.approved) {
      return (
        <Box key={r.id}>
          <Card
            id={r.id}
            idUser={r.userId}
            img={r.property.propertyImages}
            precio={r.property.price}
            ciudad={r.property.address}
            metros={r.property.surface}
            baño={r.property.bathrooms}
            dormitorio={r.property.rooms}
            ambientes={r.property.environments}
            mascota={r.property.pets}
            premium={r.premium}
          />
        </Box>
      );
    }
  });

  /* **************** RENDER CARDS **************** */
  return (
    <Box
      display={"flex"}
      justifyContent="center"
      marginTop="5rem"
      minHeight="100%"
      zIndex={"3"}
      marginBottom={"5rem"}
    >
      <Box>
        {/* <Text
          display={"flex"}
          justifyContent={"center"}
          fontSize={"2xl"}
          fontFamily={"body"}
          as="samp"
          textTransform={"uppercase"}
        >
          Publicaciones Destacadas
        </Text> */}

        <Flex direction={"row"} alignItems="center" w={"1500px"} justifyContent="space-between">
          {/* {currentCarrusel !== 1 ? <Button onClick={handlePrev}>Prev</Button> : null} */}
          <Button
            m={"0px"}
            color="black"
            colorScheme="transparent"
            onClick={handlePrev}
            marginLeft={"100px"}
            borderRadius="full"
          >
            <FontAwesomeIcon icon={faChevronLeft} fontSize="30px" />
          </Button>
          <Flex direction={"column"} alignItems="center">
            <Box display={"flex"} flexWrap={"wrap"} justifyContent="space-evenly" m={"0px"}>
              {slides.map((a, index) => {
                return <Box key={index}>{a}</Box>;
              })}
            </Box>
            {/* <Flex className={style.paginadoBtn}>{renderPaginado}</Flex> */}
          </Flex>
          <Button
            m={"0px"}
            color="black"
            colorScheme="transparent"
            onClick={handleNext}
            marginRight={"100px"}
            borderRadius="full"
          >
            <FontAwesomeIcon icon={faChevronRight} fontSize="30px" />
          </Button>
          {/* {currentCarrusel !== pages.length ? <Button onClick={handleNext}>Next</Button> : null} */}
        </Flex>
      </Box>
    </Box>
  );
}
