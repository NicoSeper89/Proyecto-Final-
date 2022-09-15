import React from "react";
import { useState } from "react";
import style from "./Login.module.css"


const Login = () => {
    const[login,setLogin] = useState({nombre: "", gmail: "", contraseña: ""})

const changes = (e) => {
  setLogin({...login, [e.target.name]:e.target.value})
  console.log(login)
}
    
    return (
        <form action=""className={style.continer}>

            <div className={style.div}>
       <label htmlFor=""> Nombre</label>  
       <input type="text" placeholder="Nombre..." name="nombre" onChange={changes}/> 
            </div>
            <div className={style.div}>
       <label htmlFor="" > Gmail</label>  
       <input type="text" placeholder="Gmail..." name="gmail" /> 
            </div>
            <div className={style.div}>
       <label htmlFor=""> Contraseña</label>  
       <input type="text" placeholder="Contraseña..."name="contraseña"/> 
            </div>
            <div className={style.btn} >
        <input type="submit" className={style.btn}  />
            </div>

        

        </form>
        
    )

}

export default Login