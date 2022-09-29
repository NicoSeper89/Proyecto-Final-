import { Box, InputGroup, Input, InputRightElement, Button, Center } from "@chakra-ui/react";
import React from "react";
import { useState , } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import style from "./AdminAcces.module.css"
import swal from 'sweetalert';

const AdminAcces = () => {
  const{logout, loginWithRedirect} = useAuth0()
  
 const [password ,setPassword] = useState("")
  // const user = useSelector(state => state.infoUser)


  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)


const dataUser = window.localStorage.getItem("User");
const user =  JSON.parse(dataUser)
  
   const acces = async () => {
    if(password === "12345"){
    await axios.put(`http://localhost:3001/admin/acces?id=${user[0].id}`)
    setPassword("")

    window.localStorage.removeItem("User")
    ;
    logout()
    loginWithRedirect()
  }else(
    swal("Contraseña incorrecta", "Por favor vuelve a intentarlo", "error")
  )

  
   }
   

   if(user) return (<Center h="500px">
    <Box className={style.continer}  >
      <Box className={style.title}>
        <h1>Password Admin:</h1>
      </Box>
      
      <Box>  
    <InputGroup size='md'>
      <Input
        pr='4.5rem'
        type={show ? 'text' : 'password'}
        placeholder='Enter password'
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <InputRightElement width='4.5rem'>
        <Button h='1.75rem' size='sm' onClick={handleClick}>
          {show ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>
    </InputGroup>
    </Box>
    <Box className={style.btn}>
    <Button colorScheme='teal' variant='solid'  onClick={() => acces()}>Enviar</Button>
    </Box>
   </Box>
   </Center>
  )
  else return(<h1>no existe user </h1>)
}

export default AdminAcces