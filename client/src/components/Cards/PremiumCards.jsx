import React from "react";
import { useSelector } from "react-redux";
import Card from "./Card";
// import style from "./Cards.module.css";
import { Box, Text } from "@chakra-ui/react";

export default function PremiumCards() {
  const houses = useSelector((state) => state.houses);

  /* **************** RENDER CARDS **************** */
  return (
    <Box display={"flex"} justifyContent="center" marginTop="5rem" minHeight="100%" zIndex={"90"}>
      <Box>
        <Text textAlign={"center"} fontSize={"2xl"} fontFamily={"body"}>
          Publicaciones Destacadas
        </Text>
        <Box display={"flex"} flexWrap={"wrap"} justifyContent="space-evenly" m={"60px"}>
          {houses?.map((r) => {
            if (r.premium) {
              return (
                <Box key={r.id}>
                  <Card
                    id={r.id}
                    img={r.property.propertyImages}
                    precio={r.property.price}
                    ciudad={r.property.city.name}
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
          })}
        </Box>
      </Box>
    </Box>
  );
}
