import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import NavBarForms from "../NavBar/NavBarForms";
import {getPublications, getCities, getServices, getTypesOfProperties} from "../../redux/actions"
import {
    Stack,
    Input,
    Heading,
    Text,
    Textarea,
    Flex,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Checkbox,
    CheckboxGroup,
    Select,
    Button,
    FormLabel,
    Box
  } from "@chakra-ui/react";



const UpdatePost = () => {
  const dispatch = useDispatch();
  const publication = useSelector((state) => state.detail)
  const propertys = useSelector((state) => state.typeOfProperties);
  const cities = useSelector((state) => state.cities);
  const services = useSelector((state) => state.services);
  const history = useHistory();


  const [inputPropiedad, setInputPropiedad] = useState({
    city: "",
    address: "",
    propImg: [],
    typProp: "",
    price: "",
    age: "",
    surface: "",
    environments: "",
    bathrooms: "",
    rooms: "",
    garage: "",
    yard: "",
    pets: false,
    service: [],
  });

  const [inputPublication, setInputPublication] = useState({
    description: "",
    status: "",
    premium: false,
    report: "",
    id: null,
  });

useEffect(() => {
    dispatch(getPublications())
    dispatch(getCities())
    dispatch(getServices())
    dispatch(getTypesOfProperties())
    },[dispatch] )

function HandleChange(e) {
    setInputPropiedad({
        ...inputPropiedad,
        [e.target.name]: e.target.value,
    })
}    

  return (
    <>
    <NavBarForms/>
    <Box position={"relative"} display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"flex-start"} color={"gray.700"} p={"1rem 0rem"}>

        <Box bg={"facebook.300"} borderRadius={".2rem"} w={"57.7%"} p={"1rem"} >
          <Heading color={"white"} textShadow={"gray .1rem .1rem .2rem"} textAlign={"center"} fontSize="2.5rem">
            Actualizar Propiedad
          </Heading>
        </Box>
        
  </Box>
    </>
  )
  
};

export default UpdatePost
