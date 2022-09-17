import React from "react";
import axios from 'axios'
import './uploadImg.css'
import { useState } from "react";
import { useDispatch } from "react-redux";
import { imgUpload } from "../../redux/actions/index"

export default function UploadImg() {
    
    const [fileInput, setFileInput] = useState('')
    const [image, setImage] = useState([])
    const [preview, setPreview] = useState('')
    const [successMsg, setSuccessMsg] = useState('')
    const dispatch = useDispatch()
    
    const previewFile = (file) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        setPreview(reader.result)
      }
    }
    const upload = () => {
        const formData = new FormData()
        formData.append('file', infoFormProp)
        formData.append('upload_preset', 'czwgzdiw')

        axios.post("https://api.cloudinary.com/v1_1/lookhouse/image/upload", formData)
        .then((resp)=>{
          dispatch(imgUpload(resp.data.secure_url))
          setImage([...image, resp.data.secure_url])
        })
        .catch((err)=>console.log(err))
        .finally(
          setFileInput(''),
          setPreview(''),
          setSuccessMsg('Image uploaded successfully'),
          setTimeout(()=>{setSuccessMsg('')},2000),
        )
    }
    const handleChange = (event) => {
      const file = event.target.files[0]
      previewFile(file)
      setFileInput(event.target.files[0])
    }

    return (
        <>
          <div id="seletedImgs">{image?.map((img, index) => (
            <img src={img} alt={index} key={index} className="uploadedImg"/>
          ))}</div>
          <input type='file' onChange={(e)=>handleChange(e)}/>
          <button onClick={()=>upload()}>Upload</button>
          {preview && <img src={preview} alt="chosen" className="uploadedImg"/>}
          {successMsg && <p>{successMsg}</p>}
        </>       
    )
}