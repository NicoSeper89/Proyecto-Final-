import React from "react";
import {  Box, Input } from '@chakra-ui/react';

export default function UploadImg({setInfoFormProp, infoFormProp}) {

  /*   const upload = (event) => {
        event.preventDefault()
        const formData = new FormData()
        formData.append('file', infoFormProp)
        formData.append('upload_preset', 'czwgzdiw')

        axios.post("https://api.cloudinary.com/v1_1/petelegant/image/upload", formData)
        .then((resp)=>console.log(resp))
        .catch((err)=>console.log(err))
        .finally(setInfoFormProp({...infoFormProp, propImg: ''}))
    } */

    const handleChange = (event) => {
        setInfoFormProp({...infoFormProp, propImg: event.target.files[0] })
    }

    return (
        
        <Box borderWidth='1px' borderRadius='14px' p={"1rem"} borderColor={"gray.200"}>
            <Input accept="image/png, .jpeg, .jpg" type='file' onChange={handleChange}/>
        </Box>
         
    )
}