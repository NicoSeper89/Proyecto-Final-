import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import NavBarForms from "../NavBar/NavBarForms";
import {
  updatedProp,
  getPublicationsDetail,
  getCities,
  getServices,
  getTypesOfProperties,
} from "../../redux/actions";
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
  Box,
} from "@chakra-ui/react";

const UpdatePost = (props) => {
  const dispatch = useDispatch();
  const propertys = useSelector((state) => state.detail);
  const typeOfProperties = useSelector((state) => state.typeOfProperties);
  const cities = useSelector((state) => state.cities);
  const publication = useSelector((state) => state.publication);
  const history = useHistory();
  const [errors, setErrors] = useState({});

  const [inputPropiedad, setInputPropiedad] = useState({
    city: propertys.property.city,
    address: propertys.property.address,
    // propImg: propertys.property.propImg,
    // typeProp: propertys.property.typeProp,
    price: propertys.property.price,
    age: propertys.property.age,
    surface: propertys.property.surface,
    environments: propertys.property.environments,
    bathrooms: propertys.property.bathrooms,
    rooms: propertys.property.rooms,
    garage: propertys.property.garage,
    yard: propertys.property.yard,
    pets: propertys.property.pets,
    // service: propertys.property.service,
  });

  // const [inputPublication, setInputPublication] = useState({
  //   description: publication.description,
  //   status: publication.status,
  //   premium: publication.premium,
  //   report: publication.report,
  //   // id: null,
  // });

  function validate(input) {
    let errors = {};
    if (!input.city) {
      errors.city = "FALTA LA PROVIANCIA";
    }
    if (!input.address) {
      errors.address = "FALTA LA DIRECCION";
    }
    if (!input.price) {
      errors.price = "FALTA EL MONTO";
    }
    if (!input.age) {
      errors.age = "FALTA LA EDAD";
    }
    if (!input.surface) {
      errors.surface = "FALTA LOS METROS";
    }
    if (!input.environments) {
      errors.environments = "FALTA LOS AMBIENTES";
    }
    if (!input.bathrooms) {
      errors.bathrooms = "FALTA LOS BAÑOS";
    }
    if (!input.rooms) {
      errors.rooms = "FALTA LOS CUARTOS";
    }
    if (!input.garage) {
      errors.garage = "FALTA EL GARAGE";
    }
    if (!input.yard) {
      errors.yard = "FALTA LOS YARD";
    }
    if (!input.pets) {
      errors.pets = "ACEPTA ANIMALES?";
    }
    if (!input.typeOfProperties) {
      errors.typeOfProperties = "FALTA EL TIPO DE PROPIEDAD";
    }

    return errors;
  }

  useEffect(() => {
    dispatch(getPublicationsDetail(props.match.params.id, inputPropiedad))
  }, [dispatch]);

  // function handleChangePublicacion(e) {
  //   setInputPublication({
  //     ...inputPublication,
  //     [e.target.name]: e.target.value,
  //   });
  //   setErrors(
  //     validate({
  //       ...inputPublication,
  //       [e.target.value]: e.target.value,
  //     })
  //   );
  // }

  function HandleChangePropiedad(e) {
    setInputPropiedad({
      ...inputPropiedad,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...inputPropiedad,
        [e.target.value]: e.target.value,
      })
    );
  }

  function handleSubmitPublication(e) {
    e.preventDefault();
    dispatch(updatedProp(props.match.params.id), inputPropiedad);
    setInputPropiedad({
      ...inputPropiedad
    });
  }

  return (
    <>
      <Box>
        <NavBarForms />
      </Box>
      <Box>
        <Box>
          <Box
            position={"relative"}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"flex-start"}
            color={"gray.700"}
            p={"1rem 0rem"}
          >
            <Box
              bg={"facebook.300"}
              borderRadius={".2rem"}
              w={"57.7%"}
              p={"1rem"}
            >
              <Heading
                color={"white"}
                textShadow={"gray .1rem .1rem .2rem"}
                textAlign={"left"}
                fontSize="2.5rem"
              >
                Actualizar Propiedad
              </Heading>
            </Box>
          </Box>
          <Box>
            <Box
              position={"relative"}
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              justifyContent={"flex-start"}
              color={"gray.700"}
              p={"1rem 0rem"}
            >
              <FormLabel>
                <Text
                  fontWeight={"semiBold"}
                  fontSize="1.2rem"
                  color="gray.500"
                >
                  Provincia
                </Text>
                <Select
                  color="gray.500"
                  placeholder=""
                  borderColor="gray.200"
                  name={"city"}
                  onChange={HandleChangePropiedad}
                  required
                >
                  {cities.map((city, i) => (
                    <option key={i} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </Select>
              </FormLabel>
              <FormLabel>
                <Text
                  fontWeight={"semiBold"}
                  fontSize="1.2rem"
                  color="gray.500"
                >
                  Dirección
                </Text>
                <Input
                  color="gray.500"
                  autoComplete={"true"}
                  type="text"
                  name={"address"}
                  value={inputPropiedad.address}
                  onChange={HandleChangePropiedad}
                  required
                />
              </FormLabel>
              {/* <FormLabel>
                <Text
                  fontWeight={"semiBold"}
                  fontSize="1.2rem"
                  color="gray.500"
                >
                  Tipo De Inmueble
                </Text>
                <Select
                  color="gray.500"
                  placeholder=" "
                  name={"typProp"}
                  onChange={HandleChangePropiedad}
                >
                  {propertys.typeProp.map((type, i) => (
                    <option key={i} value={type.name}>
                      {type.name}
                    </option>
                  ))}
                </Select>
              </FormLabel> */}
              <FormLabel>
                <Text
                  fontWeight={"semiBold"}
                  fontSize="1.07rem"
                  color="gray.500"
                >
                  Precio
                </Text>
                <Input
                  color="gray.500"
                  value={inputPropiedad.price}
                  onChange={HandleChangePropiedad}
                  min={0}
                  required
                ></Input>
              </FormLabel>
            </Box>
          </Box>

          <Box
            position={"relative"}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"flex-start"}
            color={"gray.700"}
            p={"1rem 0rem"}
          >
            <Box>
              <Text fontWeight={"semiBold"} fontSize="1.2rem" color="gray.500">
                Nueva Provincia
              </Text>
              <Input value={inputPropiedad.cities} />
              {errors.cities && <p>{errors.cities}</p>}

              <Text fontWeight={"semiBold"} fontSize="1.2rem" color="gray.500">
                Nueva Dirección
              </Text>
              <Input value={inputPropiedad.address} required></Input>
              {errors.address && <p>{errors.address}</p>}
            </Box>
          </Box>
        </Box>
      </Box>
      <Button
        alignSelf={"flex-end"}
        colorScheme="blue"
        type="submit"
        value={"enviar"}
        onClick={handleSubmitPublication}
      >
        Enviar
      </Button>
    </>
  );
};

export default UpdatePost;
