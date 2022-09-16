import React from "react";
import axios from 'axios'
import { useState } from "react";

export default function UploadImg() {
    
    const [fileInput, setFileInput] = useState('')
    const upload = (event) => {
        event.preventDefault()
        const formData = new FormData()
        formData.append('file', fileInput)
        formData.append('upload_preset', 'czwgzdiw')

        axios.post("https://api.cloudinary.com/v1_1/petelegant/image/upload", formData)
        .then((resp)=>console.log(resp))
        .catch((err)=>console.log(err))
        .finally(setFileInput(''))
    }
    const handleChange = (event) => {
        setFileInput(event.target.files[0])
    }

    return (
        <fom>
            <input type='file' onChange={handleChange}/>
            <button onClick={upload}>Upload</button>
        </fom>
    )
}