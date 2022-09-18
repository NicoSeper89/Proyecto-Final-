import React from "react";
import axios from 'axios';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { imgUpload } from "../../redux/actions/index";
import { Flex, Input, Button, Image, Text, FormLabel, Box } from "@chakra-ui/react";
import { useEffect } from "react";

export default function UploadImg({ setInfoFormProp, infoFormProp }) {

  const [fileInput, setFileInput] = useState('');
  const [preview, setPreview] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const dispatch = useDispatch();
  const [disableButtonUploadImg, setDisableButtonUploadImg] = useState(true);

  useEffect(() => {

    if (infoFormProp.propImg.length >= 7) {
      setDisableButtonUploadImg(true)
    } else {
      setDisableButtonUploadImg(false)
    }
  }, [infoFormProp.propImg.length, setDisableButtonUploadImg])

  const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreview(reader.result)
    }
  }

  const upload = () => {
    const formData = new FormData()
    formData.append('file', fileInput)
    formData.append('upload_preset', 'czwgzdiw')

    axios.post("https://api.cloudinary.com/v1_1/lookhouse/image/upload", formData)
      .then((resp) => {
        dispatch(imgUpload({ url: resp.data.secure_url }))
        setInfoFormProp({ ...infoFormProp, propImg: [...infoFormProp.propImg, resp.data.secure_url] })
      })
      .catch((err) => console.log(err))
      .finally(
        setFileInput(''),
        setPreview(''),
        setSuccessMsg('Image uploaded successfully'),
        setTimeout(() => { setSuccessMsg('') }, 2000),

      )
  }
  const handleChange = (event) => {
    const file = event.target.files[0]
    if(file){
    previewFile(file)
    setFileInput(event.target.files[0])
    }
  }
  const handleDelete = (id) => {
    // dispatch(deletePropImg(id))
    axios.post("https://api.cloudinary.com/v1_1/lookhouse/image/destroy", id)
    .catch((err) => console.log(err))
  }

  return (
    <Flex border={"2px"}
      gap={"0.6rem"}
      borderColor={"gray.200"}
      display={"flex"}
      flexDirection={"column"}
      position={'relative'}
      p=".9rem">

      <Text fontWeight={"semiBold"} fontSize="1.2rem" color="yellowgreen">Imágenes</Text>

      <Flex flexDirection={"column"} border={"2px"} gap={"2rem"} borderColor={"gray.200"} p={"1.4rem"} >
        <Flex justifyContent={'center'} alignItems={"center"} w={"100%"} h={"20rem"} p={"0.9rem"}>
          {(preview) ? <Image maxH={"100%"} src={preview} alt="chosen" /> : (successMsg) ? <Text>{successMsg}</Text> : <Text>Click aqui para cargar imagen</Text>}
        </Flex>
      </Flex>

      <FormLabel display="none" justifyContent={"center"} alignItems={"center"}>
        <Input id={"inputFile"} display="flex" justifyContent={"center"} alignItems={"center"} accept=".jpg, .jpeg, .png, .webp" border={"none"} type='file' onChange={(e) => handleChange(e)} />
      </FormLabel>

      <Box ml={"4%"} justifyContent={"space-between"} alignItems={"center"} p={".5rem"} display={"flex"}>
        {(!preview)? <Box></Box> :  <Text color={"gray.300"}>Para cargar la imagen presione el siguiente boton</Text> }  
        <Button disabled={disableButtonUploadImg}
          alignSelf={"flex-end"}
          colorScheme="blue"
          value={"Cargar"}
          onClick={upload}>Cargar
        </Button>
      </Box>


      <Flex id="seletedImgs" flexWrap={"wrap"} justifyContent={"flex-start"} gap={"0.8rem"}>
        {infoFormProp.propImg?.map((img, index) => (<Image src={img}
          alt={index}
          key={index}
          w={"6rem"}
        />))}
      </Flex>

    </Flex>
  )
}