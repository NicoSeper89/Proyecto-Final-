 import React, {isValidElement} from "react";
 import {HStack,Radio,FormHelperText,FormControl,FormLabel,RadioGroup} from "@chakra-ui/react"
 import {useAuth0, User} from "@auth0/auth0-react"
 import {Link} from "react-router-dom"
 import axios from "axios"
 const Select = () => {

const{isAuthenticated , user} = useAuth0()
    const crearUsuario = async(e) => { 
      const user2 = await axios.post("http://localhost:3001/user/LoginOrCreate", {name: user.nickname, password: user.sub, mail: user.email, typUser:"Inquilino"})

      if(user2.data.loguear){
        console.log(user2.data.loguear)
       window.localStorage.setItem("User",JSON.stringify(user2.data.userInfo))


      } else{
        console.log(user2.data.loguear)
        console.log(user2.data.mensage)
      }
        
    }

    return (  
        user !== undefined ?
        <FormControl as='fieldset'>
        <FormLabel as='legend'>Favorite Naruto Character</FormLabel>
        <RadioGroup defaultValue='Itachi'>
          
          <HStack spacing='24px' onChange={crearUsuario}>
              
            <Radio value='Propietario'>Logueado</Radio>
            
          </HStack>
          
        </RadioGroup>
        <FormHelperText>Select only if you're a fan.</FormHelperText>
      </FormControl> : <h1>Cargando</h1>
    )
 }

 export default Select