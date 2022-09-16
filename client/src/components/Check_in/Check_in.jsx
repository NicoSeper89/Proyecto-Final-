import React from "react";
import style from "./Check_in.module.css"
import { Input, Box, InputGroup, Button, InputRightElement, Stack, Checkbox } from '@chakra-ui/react'


const NewUser = () => {
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
    return (
        <form className={style.form}>
            <Box className={style.titulo}>
                <h1>Crear Usuario</h1>
            </Box>

            <Box className={style.input}>
                <label htmlFor="">Nombre</label>
                <Input placeholder='Nombre...' />
            </Box>
            <Box className={style.input}>
                <label htmlFor="">E-mail</label>
                <Input placeholder='E-mail...' />
            </Box>

            <Box className={style.input}>
                <label htmlFor="">Contraseña</label>
                <InputGroup size='md'  >
                    <Input
                        pr='4.5rem'
                        type={show ? 'text' : 'password'}
                        placeholder='Contraseña..'
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                            {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </Box>

            <Box className={style.titulo}>
                <label htmlFor="">Tipo De Usuario</label>
            </Box>

            <Box className={style.input}>
                <Stack spacing={5} direction='row'>
                    <Checkbox colorScheme='red' defaultChecked>
                        Propietario
                    </Checkbox>
                    <Checkbox colorScheme='green' defaultChecked>
                        Inquilino
                    </Checkbox>
                </Stack>
            </Box>
        </form>
    )
}

export default NewUser