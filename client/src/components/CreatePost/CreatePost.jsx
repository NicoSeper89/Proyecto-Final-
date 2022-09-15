import React, { useState } from "react";
import style from './CreatePost.module.css';
import axios from 'axios';


const CreatePost = () => {

    const [infoForm, setInfoForm] = useState({
        address: "",                  //
        surface: "",                  //        
        price: "",                    //
        environments: "",             //
        bathrooms: "",                //
        rooms: "",                    //
        garage: "",                   //
        yard: "",                     //
        pets: false,                  //
        age: "",                      //
        propImg: "",                  //
        typProp: "",                  //
        service: "",                  //
        city: ""                      //
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
            
            return await axios.post('http://localhost:3001/publication/createProperty', {...infoForm})

        } catch (err) {
            
            console.log(err)

        }

    }


    return (

        <div className={style.container}> 

            <h1>Formulario de Creación de Propiedad</h1>

            <form onSubmit={onSubmitForm}>

                <label >Dirección:
                    <input type="text" name={"address"} value={infoForm.address} onChange={onChangeInput} />
                </label>

                <label >Superficie:
                    <input type="text" name={"surface"} value={infoForm.surface} onChange={onChangeInput} />
                </label>

                <label >Precio:
                    <input type="number" name={"price"} value={infoForm.price} onChange={onChangeInput} />
                </label>

                <label >Ambientes:
                    <input type="number" name={"environments"} value={infoForm.environments} onChange={onChangeInput} />
                </label>

                <label >Baños:
                    <input type="number" name={"bathrooms"} value={infoForm.bathrooms} onChange={onChangeInput} />
                </label>

                <label >Habitaciones:
                    <input type="number" name={"rooms"} value={infoForm.rooms} onChange={onChangeInput} />
                </label>

                <label >Garage:
                    <input type="number" name={"garage"} value={infoForm.garage} onChange={onChangeInput} />
                </label>

                <label >Patios:
                    <input type="number" name={"yard"} value={infoForm.yard} onChange={onChangeInput} />
                </label>

                <label >Mascotas:
                    <input name={"pets"} type="checkbox"
                        onChange={selectCheckBox} />
                </label>

                <label >Antigüedad:
                    <input type="number" name={"age"} value={infoForm.age} onChange={onChangeInput} />
                </label>

                <label >Imagen
                    <input type="text" name={"propImg"} value={infoForm.propImg} onChange={onChangeInput} />
                </label>

                <label >Tipo
                    <select name={"typProp"} onChange={onChangeInput} >
                        {types.map((type, i) => <option key={i}
                            value={type}
                        >{type}
                        </option>)}
                    </select>
                </label>

                <label >Servicios
                    <input type="text" name={"service"} value={infoForm.service} onChange={onChangeInput} />
                </label>

                <label >Ciudad
                    <input type="text" name={"city"} value={infoForm.city} onChange={onChangeInput} />
                </label>

                <input type="submit" value={"enviar"} />

            </form>

        </div>
    );
};

export default CreatePost;
