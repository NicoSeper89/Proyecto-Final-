import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import UploadImg from "../UploadImg/UploadImg";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {
  Stack,
  Input,
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
import NavBarForms from "../NavBar/NavBarForms";

const CreatePost = () => {
  const propertys = useSelector((state) => state.typeOfProperties);
  const cities = useSelector((state) => state.cities);
  const services = useSelector((state) => state.services);
  const history = useHistory();
  const [infoFormProp, setInfoFormProp] = useState({
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

  const [infoFormPub, setInfoFormPub] = useState({
    description: "",
    status: "",
    premium: false,
    report: "",
    id: null,
  });

  const [disableBUttonSubmit, setDisableButtonSubmit] = useState(true);
  const [disableButtonUploadImg, setDisableButtonUploadImg] = useState(true);

  useEffect(() => {
    const { city, address, surface, price, environments, bathrooms, rooms, garage, yard, age, typProp, propImg } =
      infoFormProp;

    if (
      !city || 
      (city === "default") ||
      !address ||
      (/^[\s]+$/i.test(address)) ||
      !surface ||
      !typProp ||
      (typProp === "default") ||
      !price ||
      !environments ||
      !bathrooms ||
      !rooms ||
      !garage ||
      !yard ||
      !age ||
      !infoFormPub.description ||
      (/^[\s]+$/i.test(infoFormPub.description)) 
    ) {
      setDisableButtonSubmit(true);
    } else {
      setDisableButtonSubmit(false);
    }
    
    if(propImg.length >= 5) {
      setDisableButtonUploadImg(true)
    } else {
      setDisableButtonUploadImg(false)
    }

  }, [setDisableButtonSubmit, infoFormProp, infoFormPub.description]);

  const onChangeInputProp = (e) => {
    e.preventDefault();

    setInfoFormProp({
      ...infoFormProp,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeInputPropNumber = (e) => {
    e.preventDefault();

    setInfoFormProp({
      ...infoFormProp,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeInputPub = (e) => {
    e.preventDefault();

    setInfoFormPub({
      ...infoFormPub,
      [e.target.name]: e.target.value,
    });
  };

  const selectCheckBoxService = (e) => {
    if (e.target.checked === false) {
      setInfoFormProp({
        ...infoFormProp,
        service: infoFormProp.service.filter((s) => s !== e.target.value),
      });
    } else {
      setInfoFormProp({
        ...infoFormProp,
        service: [...infoFormProp.service, e.target.value],
      });
    }
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      
      let res = await axios.post("http://localhost:3001/publication/createProperty", {
        ...infoFormProp,
      });

      await axios.post("http://localhost:3001/publication/postProperty", {
        ...infoFormPub,
        id: res.data,
      });

      window.alert("Publicacion creada");
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NavBarForms />
      <Box>
        <Flex 
          gap={"2rem"}
          position="relative"
          m={"1rem"}
          p={"1rem"}
          justifyContent={"center"}
          wrap="wrap"
          borderWidth="1px"
          borderRadius="14px"
          overflow="hidden"
        >
          <Text w={"90%"} textAlign={"center"} fontSize="2em">
            Formulario de Creación de Propiedad
          </Text>

          <Box
            display={"flex"}
            flexDirection={"column"}
            p={"1rem"}
            w={"45%"}
            gap=".5rem"
            borderWidth="1px"
            borderRadius="14px"
            overflow="hidden"
          >
            <FormLabel>Provincia
              <Select name={"city"} onChange={onChangeInputProp}>
                <option value="default" >Default</option>
                {cities.map((type, i) => (
                  <option key={i} value={type.name}>
                    {type.name}
                  </option>
                ))}
              </Select>
            </FormLabel>

            <FormLabel>Dirección
              <Input
                type="text"
                name={"address"}
                value={infoFormProp.address}
                onChange={onChangeInputProp}
              />
            </FormLabel>

            <FormLabel>Tipo de propiedad
              <Select name={"typProp"} onChange={onChangeInputProp}>
                <option value="default" >Default</option>
                {propertys.map((type, i) => (
                  <option key={i} value={type.name}>
                    {type.name}
                  </option>
                ))}
              </Select>
            </FormLabel>

            <FormLabel>Precio
              <NumberInput
                value={infoFormProp.price}
                onChange={(value) => (((/^[0-9]+$/i.test(value)) || (value === ""))? setInfoFormProp({ ...infoFormProp, price:value}) : null )}
                min={0}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormLabel>

            <FormLabel>Antigüedad
              <NumberInput
                value={infoFormProp.age}
                onChange={(value) => (((/^[0-9]+$/i.test(value)) || (value === ""))? setInfoFormProp({ ...infoFormProp, age:value}) : null )}
                min={0}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormLabel>

            <FormLabel>Superficie
              <NumberInput
                value={infoFormProp.surface}
                onChange={(value) => (((/^[0-9]+$/i.test(value)) || (value === ""))? setInfoFormProp({ ...infoFormProp, surface:value}) : null )}
                min={0}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormLabel>

            <FormLabel>Ambientes
              <NumberInput
                value={infoFormProp.environments}
                onChange={(value) => (((/^[0-9]+$/i.test(value)) || (value === ""))? setInfoFormProp({ ...infoFormProp, environments:value}) : null )}
                min={0}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormLabel>

            <FormLabel>Baños
              <NumberInput
                value={infoFormProp.bathrooms}
                onChange={(value) => (((/^[0-9]+$/i.test(value)) || (value === ""))? setInfoFormProp({ ...infoFormProp, bathrooms:value}) : null )}
                min={0}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormLabel>

            <FormLabel>Habitaciones
              <NumberInput
                value={infoFormProp.rooms}
                onChange={(value) => (((/^[0-9]+$/i.test(value)) || (value === ""))? setInfoFormProp({ ...infoFormProp, rooms:value}) : null )}
                min={0}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormLabel>

            <FormLabel>Garage
              <NumberInput
                value={infoFormProp.garage}
                onChange={(value) => (((/^[0-9]+$/i.test(value)) || (value === ""))? setInfoFormProp({ ...infoFormProp, garage:value}) : null )}
                min={0}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormLabel>

            <FormLabel>Patios
              <NumberInput
                value={infoFormProp.yard}
                onChange={(value) => (((/^[0-9]+$/i.test(value)) || (value === ""))? setInfoFormProp({ ...infoFormProp, yard:value}) : null )}
                min={0}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormLabel>

            <CheckboxGroup colorScheme="green">
              <Stack spacing={[1, 5]} direction={["column", "row"]}>
                <Checkbox
                  name={"pets"}
                  onChange={(e) =>
                    setInfoFormProp({
                      ...infoFormProp,
                      [e.target.name]: e.target.checked === true,
                    })
                  }
                >
                  Mascotas
                </Checkbox>
              </Stack>
            </CheckboxGroup>

            <CheckboxGroup colorScheme="green">
              <Stack spacing={[1, 5]} direction={["column", "row"]}>
                {services.map((s, i) => (
                  <Checkbox key={i} name={s.name} value={s.name} onChange={selectCheckBoxService}>
                    {s.name[0].toUpperCase() + s.name.substring(1)}
                  </Checkbox>
                ))}
              </Stack>
            </CheckboxGroup>
          </Box>

          <Box
            display={"flex"}
            flexDirection={"column"}
            p={"1rem"}
            w={"45%"}
            gap=".5rem"
            borderWidth="1px"
            borderRadius="14px"
            overflow="hidden"
          >
            <FormLabel borderWidth="1px" borderRadius="14px" p={"1rem"} borderColor={"gray.200"}>
              <Text mb="8px">Descripcion</Text>
              <Textarea
                borderRadius="8px"
                name={"description"}
                value={infoFormPub.description}
                size="sm"
                resize={"none"}
                onChange={onChangeInputPub}
              />
            </FormLabel>

            {/* <FormLabel >Estado
                    <Input type="text" name={"status"} value={infoFormPub.status} onChange={onChangeInputPub} />
                </FormLabel>

                <FormLabel >Reporte
                    <Input type="text" name={"report"} value={infoFormPub.report} onChange={onChangeInputPub} />
                </FormLabel> */}

            <CheckboxGroup colorScheme="green">
              <Stack spacing={[1, 5]} direction={["column", "row"]}>
                <Checkbox
                  name={"premium"}
                  onChange={(e) =>
                    setInfoFormPub({
                      ...infoFormPub,
                      [e.target.name]: e.target.checked === true,
                    })
                  }
                >
                  Premium
                </Checkbox>
              </Stack>
            </CheckboxGroup>
            
            <FormLabel  >
              Imagen
              <UploadImg setInfoFormProp={setInfoFormProp} infoFormProp={infoFormProp} />
            </FormLabel>
            
            <Button
            disabled={disableBUttonSubmit}
            alignSelf={"flex-end"}
            colorScheme="blue"
            type="submit"
            value={"enviar"}
            onClick={onSubmitForm}
          >
            Enviar
          </Button>

          </Box>

        </Flex>
      </Box>
    </>
  );
};

export default CreatePost;
