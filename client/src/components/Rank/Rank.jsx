import React from "react";
import ReactStars from "react-rating-stars-component";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Flex, Stack, Heading, Text, Button, useColorModeValue, Image, Divider } from "@chakra-ui/react";
import logoImg from "../../Image/LogoMin.png";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {clean} from '../../redux/actions/index.js'

export default function Rank(prop) {
  const history = useHistory();
  const dispatch = useDispatch();

  const [start, setStart] = useState(0);
  const [dataNull, setDataNull] = useState(false)

  const userOwner = useSelector(state => state.detail.user)

  useEffect(() => {
    axios
      .get(
        `/user/requestScore?idUserRank=${prop.userRank[0].id}&idPublication=${prop.match.params.id}`
      )
      .then((res) => (!res.data ? history.push("/*") : null));
  });
  
  useEffect(() => {
   if (userOwner) setDataNull(true)
  }, [userOwner])

  useEffect(() => {
    return () => {
      dispatch(clean());
    };
   }, [dispatch])

  const ratingChanged = (e) => {
    setStart(e);
  };

  const onClickButton = async () => {
    try {
      await axios.put(`/user/rate?publicationId=${prop.match.params.id}&rating=${start}`, {
        userIdRequired: prop.userRank[0].id,
      });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      py={12}
      bg={useColorModeValue("gray.50", "gray.800")}
    > {dataNull?
      <Stack
        boxShadow={"2xl"}
        bg={"gray.50"}
        rounded={"xl"}
        p={5}
        spacing={8}
        align={"center"}
      >
        <Image h={"10rem"} src={logoImg} alt="homeLogo" />
        <Stack spacing={2} alignItems={"center"} w={"full"}>
          <Divider borderColor={"yellow.500"} />
          <Heading
            textTransform={"uppercase"}
            fontSize={"2xl"}
            color={"gray.600"}
          >
            CALIFICAR PROPIETARIO
          </Heading>
          <Divider borderColor={"yellow.500"} />
          <Text pt={"1rem"} fontSize={"1.3rem"} color={"gray.500"} textAlign={"center"} maxW={"400px"}>
             El usuario <Text as='b' display={"inline"} color={"yellow.500"}> {userOwner.name} </Text> solicitó que lo califiques sobre tu experiencia con él en nuestro sitio.
          </Text>
        <Flex>
          <ReactStars
            count={5}
            onChange={ratingChanged}
            size={55}
            activeColor="#F6AD55"
            edit={true}
          />
          </Flex>
          <Button colorScheme="green" onClick={onClickButton}>
            Enviar
          </Button>
        </Stack>
      </Stack>
      : null}
    </Flex>
  );
}
