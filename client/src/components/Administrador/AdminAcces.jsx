import { Box, InputGroup, Input, InputRightElement, Button } from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useState , } from "react";
import {useSelector,useDispatch} from "react-redux"
import { getInfoUser } from "../../redux/actions";
const AdminAcces = () => {
  const dispatch = useDispatch()

 const [password ,setPassword] = useState("")
  const user = useSelector(state => state.infoUser)

    const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

  useEffect(() => {
    const dataUser = window.localStorage.getItem("User");
    dataUser && dispatch(getInfoUser(JSON.parse(dataUser))) 
  }, []);


   const acces = () => {
    console.log(user, password)
    setPassword("")
   }
  return (
    <Box maxWidth="400px" textAlign="center" >

      <h1>Password Admin</h1>
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
    <Button colorScheme='teal' variant='solid' onClick={() => acces()}>Enviar</Button>
   </Box>
  )
}

export default AdminAcces