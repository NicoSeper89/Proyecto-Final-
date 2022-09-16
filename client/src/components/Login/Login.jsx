
import React from "react";
import { useState } from "react";
import style from "./Login.module.css"
import { Link } from "react-router-dom";
import { Input, Box, InputGroup, Button, InputRightElement, Stack, Checkbox } from '@chakra-ui/react'


const Login = () => {

    const [login, setLogin] = useState({ gmail: "", contraseña: "" })
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
    
    

    const changes = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value })
    }
    const log_in = (e) => {
        e.preventDefault()
        // ruta para loguearme **********************************
        alert("Iniciando Sesion") // alerta que sera lo que me responda el Back
        setLogin({ gmail: "", contraseña: "" })
    }
     var si_no = true
     
    if (login.gmail.length > 4 && login.contraseña.length > 4) si_no = false
        else si_no = true
    

    return (
        <form action="" className={style.continer} >

            <Box className={style.input}>
                <label htmlFor=""> Usuario / e-mail</label>
                <Input placeholder='...' name="gmail" onChange={changes} value={login.gmail} />
            </Box>
            <Box className={style.input}>
                <label htmlFor="">Contraseña</label>
                <InputGroup size='md'  >
                    <Input pr='4.5rem' type={show ? 'text' : 'password'} placeholder='Contraseña..' name="contraseña" onChange={changes} value={login.contraseña} />

                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                            {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </Box>
            <Box className={style.btn}>
                <Button colorScheme='teal' variant='outline' onClick={log_in} disabled={si_no}>Entrar</Button>
            </Box>
            <Box>
                <p>Si no tenes una cuenta, podes {<Link to="checkin">REGISTRARTE</Link>}</p>
            </Box>


        </form>

    )

}

export default Login