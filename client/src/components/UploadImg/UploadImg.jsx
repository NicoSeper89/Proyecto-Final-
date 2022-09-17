import React from "react";
import {  Box, Input } from '@chakra-ui/react';

export default function UploadImg({setInfoFormProp, infoFormProp}) {

  /*   const upload = (event) => {
        event.preventDefault()
        const formData = new FormData()
        formData.append('file', infoFormProp)
        formData.append('upload_preset', 'zrn7bvte')

        axios.post("https://api.cloudinary.com/v1_1/dwv5z8s5p/image/upload", formData)
        .then((resp)=>console.log(resp))
        .catch((err)=>console.log(err))
        .finally(setInfoFormProp({...infoFormProp, propImg: ''}))
    } */

    const handleChange = (event) => {
        setInfoFormProp({...infoFormProp, propImg: event.target.files })
    }

    return (
        
        <Box borderWidth='1px' borderRadius='14px' p={"1rem"} borderColor={"gray.200"}>
            <Input accept="image/png, .jpeg, .jpg, .webp" type='file' onChange={handleChange}/>
        </Box>
         
    )
}