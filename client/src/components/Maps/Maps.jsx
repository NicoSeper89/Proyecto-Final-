import React, { useEffect } from "react";
import "./maps.css";
import { Map, TileLayer, Popup, Marker } from "react-leaflet";
import { useState } from "react";
import { Box } from "@chakra-ui/react";

export default function Maps(props) {
  const [cityPos, setCityPos] = useState([-24.792028, -65.413284]);
  const map = {
    Salta: [-24.792028, -65.413284],
    Mendoza: [-32.889458, -68.84584],
    "Entre Ríos": [-32.056789, -59.201801],
    "Buenos Aires": [-34.603683, -58.381557],
    "Ciudad Autónoma de Buenos Aires": [-34.603683, -58.381557],
    Misiones: [-27.357894, -55.885206],
    "San Luis": [-33.295068, -66.333096],
    "San Juan": [-31.5316976, -68.5676963],
    "Santa Cruz": [-47.97412, -69.83688],
    Chubut: [-44.001759, -67.885567],
    "Río Negro": [-40.417734, -67.593204],
    Córdoba: [-31.399084, -64.3344313],
    "La Rioja": [-29.4141291, -66.9258179],
    Catamarca: [-28.4643652, -65.8452007],
    "Santa Fe": [-31.6179774, -60.7762978],
    "La Pampa": [-37.107439, -66.09409],
    "Santiago del Estero": [-27.8015453, -64.3370892],
    Corrientes: [-28.361996, -58.058177],
    Tucumán: [-26.8326885, -65.2926345],
    Neuquén: [-38.9410801, -68.1854412],
    Chaco: [-26.053312, -60.870353],
    Formosa: [-26.1719849, -58.2650108],
    Jujuy: [-24.2051671, -65.3755963],
    "Tierra del Fuego, Antártida e Islas del Atlántico Sur": [-53.83674, -68.4440534],
  };
  useEffect(() => {
    if (props.position) {
      setCityPos(map[props.position.property.city.name]);
    }
  }, [props]);

  return (
    <Box>
      <Map
        center={cityPos}
        zoom={5}
        scrollWheelZoom={true}
        // style={{ height: "400px", width: "400px" }}
        style={{ height: "250px", width: "500px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={cityPos}>
          <Popup>{props.position.property.city.name}</Popup>
        </Marker>
      </Map>
    </Box>
  );
}
