import React, { useState } from "react";
// import style from './CreatePost.module.css';
import axios from 'axios';
import {
    Stack, Input, Text, Flex, NumberInput, NumberInputField,
    NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper,
    Checkbox, CheckboxGroup, Select, Button, FormControl, FormLabel, Box
} from '@chakra-ui/react';

const CreatePost = () => {

    const [infoForm, setInfoForm] = useState({
        address: "",
        surface: "",
        price: "",
        environments: "",
        bathrooms: "",
        rooms: "",
        garage: "",
        yard: "",
        pets: false,
        age: "",
        propImg: "",
        typProp: "",
        service: "",
        city: ""
    });

    const types = ["Departamento", "Casa", "Local Comercial", "Garage"]

    const onChangeInput = (e) => {
        e.preventDefault();

        setInfoForm({
            ...infoForm,
            [e.target.name]: e.target.value,
        })
    }

    const selectCheckBox = (e) => {

        return setInfoForm({
            ...infoForm,
            [e.target.name]: (e.target.checked === true)
        });
    }

    const onSubmitForm = async (e) => {
        e.preventDefault();

        try {
            return await axios.post('http://localhost:3001/publication/createProperty', { ...infoForm })
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Flex gap={'2rem'} position='relative' m={'1rem'} p={'1rem'} justifyContent={'center'} wrap='wrap' borderWidth='1px' borderRadius='14px' overflow='hidden'>

            <Text w={'90%'} textAlign={"center"} fontSize='2em'>Formulario de Creación de Propiedad</Text>

            <Box display={'flex'} flexDirection={'column'} p={'1rem'} w={'45%'} gap='.5rem' borderWidth='1px' borderRadius='14px' overflow='hidden' onSubmit={onSubmitForm}>

                <FormLabel >Ciudad
                    <Input type="text" name={"city"} value={infoForm.city} onChange={onChangeInput} />
                </FormLabel>

                <FormLabel >Dirección
                    <Input type="text" name={"address"} value={infoForm.address} onChange={onChangeInput} />
                </FormLabel >

                <FormLabel >Imagen
                    <Input type="text" name={"propImg"} value={infoForm.propImg} onChange={onChangeInput} />
                </FormLabel>

                <FormLabel >Tipo
                    <Select name={"typProp"} onChange={onChangeInput} >
                        {types.map((type, i) => <option key={i}
                            value={type}
                        >{type}
                        </option>)}
                    </Select>
                </FormLabel>

                <FormLabel > Precio
                    <NumberInput>
                        <NumberInputField />
                        <NumberInputStepper type="number" name={"price"} value={infoForm.price} onChange={onChangeInput}>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </FormLabel>

                <FormLabel >Antigüedad
                    <NumberInput>
                        <NumberInputField />
                        <NumberInputStepper type="number" name={"age"} value={infoForm.age} onChange={onChangeInput} >
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </FormLabel>

                <FormLabel > Superficie
                    <NumberInput>
                        <NumberInputField />
                        <NumberInputStepper type="text" name={"surface"} value={infoForm.surface} onChange={onChangeInput}>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </FormLabel>

                <FormLabel > Ambientes
                    <NumberInput>
                        <NumberInputField />
                        <NumberInputStepper type="number" name={"environments"} value={infoForm.environments} onChange={onChangeInput}>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </FormLabel>

                <FormLabel > Baños
                    <NumberInput>
                        <NumberInputField />
                        <NumberInputStepper type="number" name={"bathrooms"} value={infoForm.bathrooms} onChange={onChangeInput}>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </FormLabel>

                <FormLabel > Habitaciones
                    <NumberInput>
                        <NumberInputField />
                        <NumberInputStepper type="number" name={"rooms"} value={infoForm.rooms} onChange={onChangeInput}>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </FormLabel>

                <FormLabel > Garage
                    <NumberInput>
                        <NumberInputField />
                        <NumberInputStepper type="number" name={"garage"} value={infoForm.garage} onChange={onChangeInput} >
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </FormLabel>

                <FormLabel >Patios
                    <NumberInput>
                        <NumberInputField />
                        <NumberInputStepper type="number" name={"yard"} value={infoForm.yard} onChange={onChangeInput} >
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </FormLabel>

                <CheckboxGroup colorScheme='green' >
                    <Stack spacing={[1, 5]} direction={['column', 'row']}>
                        <Checkbox name={"pets"} value='pets' onChange={selectCheckBox}>Mascotas</Checkbox>
                    </Stack>
                </CheckboxGroup>



                <CheckboxGroup colorScheme='green' >
                    <Stack spacing={[1, 5]} direction={['column', 'row']}>
                        <Checkbox name={"agua"} value='agua' >Agua</Checkbox>
                        <Checkbox name={"gas"} value='gas' >Gas</Checkbox>
                        <Checkbox name={"luz"} value='luz' >Luz</Checkbox>
                        <Checkbox name={"internet"} value='internet' >Internet</Checkbox>
                    </Stack>
                </CheckboxGroup>

                <Button alignSelf={'flex-end'} colorScheme='blue' type="submit" value={"enviar"} >Enviar</Button>

            </Box>

            <FormControl w={'45%'} gap='.5rem' borderWidth='1px' borderRadius='14px' overflow='hidden' onSubmit={onSubmitForm}>
            </FormControl>

        </Flex>
    );
};

export default CreatePost;
