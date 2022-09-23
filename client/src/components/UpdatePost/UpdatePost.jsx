import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";
import NavBarForms from "../NavBar/NavBarForms";
import { updatedProp, getPublicationsDetail } from "../../redux/actions";
import AlertSubmitUpdate from "./AlertUpdate.jsx";
import UploadImg from "../UploadImg/UploadImg";
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
import { faArrowTrendUp } from "@fortawesome/free-solid-svg-icons";

const UpdatePost = (props) => {
  const dispatch = useDispatch();
  const publication = useSelector((state) => state.detail);
  const cities = useSelector((state) => state.cities);
  const typeOfProperties = useSelector((state) => state.typeOfProperties);
  const typeServices = useSelector((state) => state.services);
  const [propertyId, setPropertyId] = useState("");
  const [alertSubmit, setAlertSubmit] = useState([false, false]);
  const [continueForm, setContinueForm] = useState(true);
  // const history = useHistory();
  /*   const [errors, setErrors] = useState({}); */

  const [inputPropiedad, setInputPropiedad] = useState({
    address: "",
    surface: "",
    price: "",
    environments: "",
    bathrooms: "",
    rooms: "",
    garage: "",
    yard: "",
    pets: "",
    age: "",
    city: "",
    service: "",
    typProp: "",
    propImg: [],
    description: "",
    status: "",
    premium: "",
    propertyId: "",
  });

  /* function validate(input) {
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
  } */

  useEffect(() => {
    if (!Object.entries(publication).length) {
      dispatch(getPublicationsDetail(props.match.params.id));
    } else {
      console.log("hola")
      setInputPropiedad({
        address: publication.property.address,
        surface: publication.property.surface,
        price: publication.property.price,
        environments: publication.property.environments,
        bathrooms: publication.property.bathrooms,
        rooms: publication.property.rooms,
        garage: publication.property.garage,
        yard: publication.property.yard,
        pets: publication.property.pets,
        age: publication.property.age,
        city: publication.property.city.name,
        services: publication.property.services,
        typProp: publication.property.TypeOfProp.name,
        propImg: publication.property.propertyImages,
        description: publication.description,
        status: publication.status,
        premium: publication.premium,
        propertyId: publication.propertyId,
      });
    }
    console.log(publication);
    console.log(inputPropiedad)
  }, [dispatch, props.match.params.id, publication]);

  function HandleChangePropiedad(e) {
    setInputPropiedad({
      ...inputPropiedad,
      [e.target.name]: e.target.value,
    });
    /* setErrors(
      validate({
        ...inputPropiedad,
        [e.target.value]: e.target.value,
      })
    ); */
  }
  const onContinueForm = () => {

    setContinueForm(false)

  }

  function handleSubmitPublication(e) {
    e.preventDefault();
    dispatch(updatedProp(publication.propertyId, inputPropiedad));
  }

  const selectCheckBoxService = (e) => {
    if (e.target.checked === false) {
      setInputPropiedad({
        ...inputPropiedad,
        service: inputPropiedad.service.filter((s) => s !== e.target.value),
      });
    } else {
      setInputPropiedad({
        ...inputPropiedad,
        service: [...inputPropiedad.service, e.target.value],
      });
    }
  };

  return (
    <>
      <Box>
        <NavBarForms />
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
        <Box bg={"facebook.300"} borderRadius={".2rem"} w={"57.7%"} p={"1rem"}>
          <Heading
            color={"white"}
            textShadow={"gray .1rem .1rem .2rem"}
            textAlign={"center"}
            fontSize="2.5rem"
          >
            {" "}
            Actualizar Propiedad
          </Heading>
        </Box>
        <Flex
          position="relative"
          flexDirection={"column"}
          justifyContent={"center"}
          alignContent={"center"}
          wrap="wrap"
          overflow="hidden"
          minWidth={"57.7%"}
        >
          {(continueForm) ? (
            <Box
              display={"flex"}
              flexDirection={"column"}
              p={"1rem"}
              w={"60%"}
              gap=".5rem"
              overflow="hidden"
            >
              <Box
                display={"flex"}
                flexDirection="column"
                p=".9rem"
                border="1px"
                borderColor="gray.200"
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
                    borderColor="gray.200"
                    name={"city"}
                    onChange={HandleChangePropiedad}
                    required
                    value={inputPropiedad.city}
                  >
                    {/* <option value={inputPropiedad.city}>{inputPropiedad.city}</option> */}
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

                <FormLabel>
              <Text fontWeight={"semiBold"} fontSize="1.2rem" color="gray.500">
              Tipo De Inmueble
              </Text>
              <Select
                color="gray.500"
                name={"typProp"}
                value= {inputPropiedad.typProp}
                onChange={HandleChangePropiedad}
              >
                {typeOfProperties.map((type, i) => (
                  <option key={i} value={type.name}>
                  {type.name}
                  </option>
                  ))}
              </Select>
            </FormLabel>

                <Box
                  display={"flex"}
                  justifyContent={"space-around"}
                  flexWrap={"wrap"}
                  p=".5rem"
                  border="1px"
                  borderColor="gray.200"
                >
                  <FormLabel>
                    <Text
                      fontWeight={"semiBold"}
                      fontSize="1.07rem"
                      color="gray.500"
                    >
                      Precio
                    </Text>
                    <NumberInput
                      color="gray.500"
                      value={inputPropiedad.price}
                      onChange={(value) =>
                        /^[0-9]+$/i.test(value) || value === ""
                          ? setInputPropiedad({
                              ...inputPropiedad,
                              price: parseInt(value),
                            })
                          : null
                      }
                      min={0}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper color={"green.400"} />
                        <NumberDecrementStepper color={"red.400"} />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormLabel>

                  <FormLabel>
                    <Text
                      fontWeight={"semiBold"}
                      fontSize="1.07rem"
                      color="gray.500"
                    >
                      Antigüedad
                    </Text>
                    <NumberInput
                      color="gray.500"
                      value={inputPropiedad.age}
                      onChange={(value) =>
                        /^[0-9]+$/i.test(value) || value === ""
                          ? setInputPropiedad({
                              ...inputPropiedad,
                              age: parseInt(value),
                            })
                          : null
                      }
                      min={0}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper color={"green.400"} />
                        <NumberDecrementStepper color={"red.400"} />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormLabel>

                </Box>
                <Box
                  display={"flex"}
                  justifyContent={"space-around"}
                  flexWrap={"wrap"}
                  p=".5rem"
                  border="1px"
                  borderColor="gray.200"
                >
                <FormLabel><Text fontWeight={"semiBold"} fontSize="1.07rem" color="gray.500">Superficie</Text>
                  <NumberInput
                    value={inputPropiedad.surface}
                    onChange={HandleChangePropiedad}
                    min={0}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper color={"green.400"} />
                      <NumberDecrementStepper color={"red.400"} />
                    </NumberInputStepper>
                  </NumberInput>
                </FormLabel>
                  <FormLabel>
                    <Text
                      fontWeight={"semiBold"}
                      fontSize="1.07rem"
                      color="gray.500"
                    >
                      Ambientes
                    </Text>
                    <NumberInput
                      color="gray.500"
                      value={inputPropiedad.environments}
                      onChange={(value) =>
                        /^[0-9]+$/i.test(value) || value === ""
                          ? setInputPropiedad({
                              ...inputPropiedad,
                              environments: parseInt(value),
                            })
                          : null
                      }
                      min={0}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper color={"green.400"} />
                        <NumberDecrementStepper color={"red.400"} />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormLabel>

                  <FormLabel>
                    <Text
                      fontWeight={"semiBold"}
                      fontSize="1.07rem"
                      color="gray.500"
                    >
                      Baños
                    </Text>
                    <NumberInput
                      color="gray.500"
                      value={inputPropiedad.bathrooms}
                      onChange={(value) =>
                        /^[0-9]+$/i.test(value) || value === ""
                          ? setInputPropiedad({
                              ...inputPropiedad,
                              bathrooms: parseInt(value),
                            })
                          : null
                      }
                      min={0}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper color={"green.400"} />
                        <NumberDecrementStepper color={"red.400"} />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormLabel>

                  <FormLabel>
                    <Text
                      fontWeight={"semiBold"}
                      fontSize="1.07rem"
                      color="gray.500"
                    >
                      Habitaciones
                    </Text>
                    <NumberInput
                      color="gray.500"
                      value={inputPropiedad.rooms}
                      onChange={(value) =>
                        /^[0-9]+$/i.test(value) || value === ""
                          ? setInputPropiedad({
                              ...inputPropiedad,
                              rooms: parseInt(value),
                            })
                          : null
                      }
                      min={0}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper color={"green.400"} />
                        <NumberDecrementStepper color={"red.400"} />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormLabel>

                  <FormLabel>
                    <Text
                      fontWeight={"semiBold"}
                      fontSize="1.07rem"
                      color="gray.500"
                    >
                      Garage
                    </Text>
                    <NumberInput
                      color="gray.500"
                      value={inputPropiedad.garage}
                      onChange={(value) =>
                        /^[0-9]+$/i.test(value) || value === ""
                          ? setInputPropiedad({
                              ...inputPropiedad,
                              garage: parseInt(value),
                            })
                          : null
                      }
                      min={0}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper color={"green.400"} />
                        <NumberDecrementStepper color={"red.400"} />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormLabel>

                  <FormLabel>
                    <Text
                      fontWeight={"semiBold"}
                      fontSize="1.07rem"
                      color="gray.500"
                    >
                      Patios
                    </Text>
                    <NumberInput
                      color="gray.500"
                      value={inputPropiedad.yard}
                      onChange={(value) =>
                        /^[0-9]+$/i.test(value) || value === ""
                          ? setInputPropiedad({
                              ...inputPropiedad,
                              yard: parseInt(value),
                            })
                          : null
                      }
                      min={0}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper color={"green.400"} />
                        <NumberDecrementStepper color={"red.400"} />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormLabel>
                </Box>
                 <FormLabel display={"flex"} flexDirection="column" p=".9rem" gap={".7rem"} border="1px" borderColor="gray.200">
                <Text fontWeight={"semiBold"} fontSize="1.15rem" color="gray.500">Servicios</Text>
                <CheckboxGroup colorScheme="green">
                <Stack display={"flex"} justifyContent={"flex-start"} gap={".6rem"} flexWrap={"wrap"} spacing={[1, 5]} direction={["column", "row"]}>
                {typeServices.map((s, i) => (
                  <Checkbox isChecked={true} fontWeight={"semiBold"} fontSize="1.15rem" color="GrayText" key={i} name={s.name} value={s.name} onChange={selectCheckBoxService}>
                  {s.name[0].toUpperCase() + s.name.substring(1)}
                  </Checkbox>
                      ))}
                      </Stack>
                      </CheckboxGroup>
                    </FormLabel>
                {/* <UploadImg inputPropiedad={inputPropiedad} setInputPropiedad={setInputPropiedad}/> */}

                {/* <CheckboxGroup colorScheme="green">
                  <Stack spacing={[1, 5]} direction={["column", "row"]}>
                    <Checkbox
                      name={"premium"}
                      onChange={(e) =>
                        selectCheckBoxService({
                          ...inputPropiedad,
                          [e.target.name]: e.target.checked === true? e.target.checked : false,
                        })
                      }
                    >
                      <Text fontWeight={"semiBold"} fontSize="1.08rem" color="GrayText">Premium</Text>
                    </Checkbox>
                  </Stack>
                </CheckboxGroup> */}
              </Box>

              <Button
                alignSelf={"flex-end"}
                colorScheme="blue"
                type="submit"
                value={"enviar"}
                onClick={onContinueForm}
              >
                Continuar Formulario
              </Button>
            </Box>
          ) : (
            <Box
              display={"flex"}
              flexDirection={"column"}
              p={"1rem"}
              w={"100%"}
              alignItems={"center"}
              gap=".5rem"
              overflow="hidden"
            >
              <Box
                display={"flex"}
                flexDirection="column"
                p=".9rem"
                w={"100%"}
                border="1px"
                borderColor="gray.200"
              >
                <FormLabel>
                  <Text
                    fontWeight={"semiBold"}
                    fontSize="1.2rem"
                    color="gray.500"
                  >
                    Descripcion
                  </Text>
                  <Textarea
                    name={"description"}
                    value={inputPropiedad.description}
                    size="sm"
                    resize={"none"}
                    onChange={HandleChangePropiedad}
                  />
                </FormLabel>
              </Box>

              {/* <Box w={"100%"}>
                <UploadImg
                  setInputPropiedad={setInputPropiedad}
                  inputPropiedad={inputPropiedad}
                />
              </Box> */}

              <Button
                alignSelf={"flex-end"}
                colorScheme="blue"
                type="submit"
                value={"enviar"}
                onClick={handleSubmitPublication}
              >
                Enviar
              </Button>

            </Box>
          )}
        </Flex>
{/* 
          <AlertSubmitUpdate
              alertSubmit={alertSubmit}
              propertyId={propertyId}
            />{" "} */}
      </Box>
    </>
  );
};

export default UpdatePost;
