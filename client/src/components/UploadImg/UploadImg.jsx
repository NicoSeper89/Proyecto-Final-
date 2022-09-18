import React from "react";
import axios from 'axios';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { imgUpload } from "../../redux/actions/index";
import { Flex, Input, Button, Image, Text } from "@chakra-ui/react";
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
    previewFile(file)
    setFileInput(event.target.files[0])
  }

  return (
    <Flex border={"2px"}
      gap={"2rem"}
      borderColor={"gray.200"}
      borderRadius={"10px"} display={"flex"}
      flexDirection={"column"}
      position={'relative'}
      p={"1.4rem"}>

      <Flex flexDirection={"column"} border={"2px"} gap={"2rem"} borderColor={"gray.200"} borderRadius={"10px"} p={"1.4rem"} >
        <Flex justifyContent={'center'} w={"100%"} h={"20rem"} p={"0.9rem"}>
          {(preview) ? <Image maxH={"100%"} src={preview} alt="chosen" /> : (successMsg) ? <Text>{successMsg}</Text> : <Text>Click aqui para cargar imagen</Text>}
        </Flex>

        <Flex>
          <Input border={"none"} type='file' onChange={(e) => handleChange(e)} />

          <Button disabled={disableButtonUploadImg}
            alignSelf={"flex-end"}
            colorScheme="blue"
            value={"Cargar"}
            onClick={upload}>Upload
          </Button>
        </Flex>

      </Flex>

      <Flex id="seletedImgs" flexWrap={"wrap"} justifyContent={"flex-start"} /* alignItems={"center"}  */ gap={"0.8rem"}>
        {infoFormProp.propImg?.map((img, index) => (<Image src={img}
          alt={index}
          key={index}
          w={"6rem"}
        />))}
      </Flex>

    </Flex>
  )
}