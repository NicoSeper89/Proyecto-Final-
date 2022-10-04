import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";
import NavBarForms from "../NavBar/NavBarForms";
import { updatedProp, getPublicationsDetail } from "../../redux/actions";
import AlertSubmitUpdate from "./AlertUpdate.jsx";
import UpdateImgPub from "../UploadImg/UpdateImgPub";
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
import Places from "../CreatePost/Places";
/* import { faArrowTrendUp } from "@fortawesome/free-solid-svg-icons"; */

const UpdatePost = (props) => {
  const dispatch = useDispatch();
  const publication = useSelector((state) => state.detail);
  const cities = useSelector((state) => state.cities);
  const typeOfProperties = useSelector((state) => state.typeOfProperties);
  const typeServices = useSelector((state) => state.services);
  const [alertSubmit, setAlertSubmit] = useState([false, false]);
  const [disabledButton, setDisabledButton] = useState(false);
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
    /* city: "", */
    service: [],
    typProp: "",
    propImg: [],
    description: "",
    status: "",
    premium: "",
    propertyId: "",
  });

  useEffect(() => {
    if (!Object.entries(publication).length) {
      dispatch(getPublicationsDetail(props.match.params.id));
    } else {

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
       /*  city: publication.property.city.name, */
        service: publication.property.services.map((s) => s.name),
        typProp: publication.property.TypeOfProp.name,
        propImg: [...publication.property.propertyImages],
        description: publication.description,
        status: publication.status,
        premium: publication.premium,
        propertyId: publication.propertyId,
      });
    }
  }, [dispatch, props.match.params.id, publication]);

  useEffect(()=> {

    (!inputPropiedad.address || !inputPropiedad.description || /^[\s]+$/i.test(inputPropiedad.address) || (/^[\s]+$/i.test(inputPropiedad.description)))? 
    setDisabledButton(true) : setDisabledButton(false)

  }, [inputPropiedad.address, inputPropiedad.description])

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

  function handleSubmitPublication(e) {
    e.preventDefault();

    dispatch(updatedProp(publication.id, inputPropiedad));
    
    setAlertSubmit([true, true])
    window.scroll({
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
     });

  }

  const selectCheckBoxService = (e) => {
    if (e.target.checked === false) {
      setInputPropiedad({
        ...inputPropiedad,
        service: inputPropiedad.service.filter((s) => s !== e.target.name),
      });
    } else {
      setInputPropiedad({
        ...inputPropiedad,
        service: [...inputPropiedad.service, e.target.name],
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
        bg={"blackAlpha.200"}
      >
        <Box bg={"#F6AD55"} borderRadius={".2rem"} w={"70%"} p={"1rem 0rem"} m={"1rem"}>
          <Heading
            color={"white"}
            textShadow={"gray .1rem .1rem .2rem"}
            textAlign={"center"}
            fontSize="2.0rem"
          >ACTUALIZAR DATOS DE PUBLICACIÓN
            {/* Actualizar datos de publicación */}
          </Heading>
        </Box>

        <Flex
          position="relative"
          flexDirection={"column"}
          justifyContent={"center"}
          alignContent={"center"}
          wrap="wrap"
          overflow="hidden"
          w={"90%"}>
          <Box
            p={"1rem"}
            w={"80%"}
            overflow="hidden"
          >
            <Box
              display={"flex"}
              flexDirection="column"
              p=".9rem"
              border="1px"
              borderColor="gray.200"
              bg={"white"}
            >
              {/* <FormLabel>
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
                  
                  {cities.map((city, i) => (
                    <option key={i} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </Select>
              </FormLabel> */}

              <FormLabel >
                <Text
                  fontWeight={"semiBold"}
                  fontSize="1.2rem"
                  color="gray.500"
                >
                  Dirección
                </Text>
                {!inputPropiedad.address ?
                <Places infoFormProp={inputPropiedad} setInfoFormProp={setInputPropiedad} /> :
                <Input 
                  color="gray.500"
                  autoComplete={"true"}
                  type="text"
                  name={"address"}
                  value={inputPropiedad.address}
                  onChange={HandleChangePropiedad}
                  required
                />
                }
              </FormLabel>

              <FormLabel>
                <Text fontWeight={"semiBold"} fontSize="1.2rem" color="gray.500">
                  Tipo De Inmueble
                </Text>
                <Select
                  color="gray.500"
                  name={"typProp"}
                  value={inputPropiedad.typProp}
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
                p=".2rem"
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
                          price: (value === "") ? 0 : parseInt(value),
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
                          age: (value === "") ? 0 : parseInt(value),
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
                  <Text fontWeight={"semiBold"} fontSize="1.07rem" color="gray.500">Superficie</Text>
                  <NumberInput
                    value={inputPropiedad.surface}
                    onChange={(value) =>
                      /^[0-9]+$/i.test(value) || value === ""
                        ? setInputPropiedad({
                          ...inputPropiedad,
                          surface: (value === "") ? 0 : parseInt(value),
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
                    Ambientes
                  </Text>
                  <NumberInput
                    color="gray.500"
                    value={inputPropiedad.environments}
                    onChange={(value) =>
                      /^[0-9]+$/i.test(value) || value === ""
                        ? setInputPropiedad({
                          ...inputPropiedad,
                          environments: (value === "") ? 0 : parseInt(value),
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
                          bathrooms: (value === "") ? 0 : parseInt(value),
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
                          rooms: (value === "") ? 0 : parseInt(value),
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
                          garage: (value === "") ? 0 : parseInt(value),
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
                          yard: (value === "") ? 0 : parseInt(value),
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

              <FormLabel display={"flex"} flexDirection="column" p=".9rem" gap={".7rem"} >
                <Text fontWeight={"semiBold"} fontSize="1.15rem" color="gray.500">Servicios</Text>
                <CheckboxGroup colorScheme="green">
                  <Stack display={"flex"} justifyContent={"flex-start"} gap={".6rem"} flexWrap={"wrap"} spacing={[1, 5]} direction={["column", "row"]} fontWeight={"semiBold"} fontSize="1.15rem" color="GrayText">
                    {typeServices?.map((serv, i) => (
                      <Checkbox isChecked={inputPropiedad.service?.some((elem) => elem === serv.name)} fontWeight={"semiBold"} fontSize="1.15rem" color="GrayText" key={i} name={serv.name} onChange={selectCheckBoxService}>
                        {serv.name[0].toUpperCase() + serv.name.substring(1)}
                      </Checkbox>
                    ))}
                  </Stack>
                </CheckboxGroup>
              </FormLabel>

              <FormLabel display={"flex"} flexDirection="column" p="0rem .9rem" gap={".7rem"} >
                <Text fontWeight={"semiBold"} fontSize="1.15rem" color="gray.500">Permite</Text>
                <CheckboxGroup colorScheme="green">
                  <Stack display={"flex"} justifyContent={"flex-start"} gap={".6rem"} flexWrap={"wrap"} spacing={[1, 5]} direction={["column", "row"]} fontWeight={"semiBold"} fontSize="1.15rem" color="GrayText">
                      <Checkbox isChecked={inputPropiedad.pets} fontWeight={"semiBold"} fontSize="1.15rem" color="GrayText" name={"pets"}
                                                                                            onChange={(e) =>
                                                                                              setInputPropiedad({ 
                                                                                                ...inputPropiedad,
                                                                                                [e.target.name]: e.target.checked === true,
                                                                                              })
                                                                                            }>
                        Mascotas
                      </Checkbox>
                  </Stack>
                </CheckboxGroup>
              </FormLabel>

              <Box
                display={"flex"}
                flexDirection={"column"}
                p={"1rem"}
                w={"100%"}
                alignItems={"center"}
                gap=".5rem"
                overflow="hidden"
              >
                
              <FormLabel display={"flex"} flexDirection="column" w={"100%"} >
                    <Text
                      fontWeight={"semiBold"}
                      fontSize="1.2rem"
                      color="gray.500"
                    >
                      Descripcion
                    </Text>
                    <Textarea color="gray.500"
                      name={"description"}
                      value={inputPropiedad.description}
                      size="sm"
                      resize={"none"}
                      onChange={HandleChangePropiedad}
                      borderRadius={"2px"}
                    />
              </FormLabel>
               
              <Box w={"100%"}>
                  <UpdateImgPub
                    setInfoFormProp={setInputPropiedad}
                    infoFormProp={inputPropiedad}
                  />
              </Box>

                <Button
                  alignSelf={"flex-end"}
                  colorScheme="blue"
                  type="submit"
                  value={"enviar"}
                  onClick={handleSubmitPublication}
                  disabled={disabledButton}
                >
                  Actualizar
                </Button>

              </Box>
              
            </Box>
          </Box>
        </Flex>
        <Box position={"absolute"}display={!alertSubmit[0] ? "none" : "flex"} bg={"blackAlpha.100"} w={"full"} h={"full"}>
          <AlertSubmitUpdate premium={publication.premium} alertSubmit={alertSubmit} />
        </Box>
      </Box>
    </>
  );
};

export default UpdatePost;
