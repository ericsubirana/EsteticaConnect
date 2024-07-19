import React from "react"
import { useState, useEffect } from "react"
import DropZone from 'react-dropzone'
import { Container } from 'reactstrap'
import axios from "axios"
import './multipleImages.css' 

const MultiplesImages = (props) => {

    const [image, setImage] = useState({ array: {} })
    const [loading, setLoading] = useState("")

    const handleDrop = (files) => {
        const uploaders = files.map((file,inx)=> {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("tags", `codeinfuse, medium, gist`);
            formData.append("upload_preset", "EsteticaConnect");
            formData.append("api_key", process.env.API_IMAGE_KEY);
            formData.append("timesamp", (Date.now()/1000) | 0);
            setLoading("true")
            //canviar peticio!!
            console.log(formData)
            return axios.post("https://api.cloudinary.com/v1_1/dp95x4ep2/image/upload", formData, {
                headers: {"X-Requested-With":"XMLHttpsRequest"},
            })
            .then((response)=> {
                const data = response.data
                const fileURL = data.secure_url;
                console.log(fileURL)
                props.changeImage(fileURL);
            })
        })
        axios.all(uploaders).then(() => {
            setLoading("false")
        })
    }

    return (
        <div className={props.type == 'service' ? "multipleImagesAbsService" : "multipleImagesAbs"}>
            <Container className={props.type == 'service' ? "multipleImagesAbsService" : "multipleImagesAbs"}>
                <DropZone 
                    classname={props.type == 'service' ? "dropzoneService" : "dropzone"}
                    onDrop = {handleDrop}
                    onChange={(e) => { setImage(e.target.value) }}
                    value={image}
                >
                    {({getRootProps, getInputProps}) => (
                        <section>
                            <div {...getRootProps({className:props.type == 'service' ? "dropzoneService" : "dropzone"})}>
                                <input {...getInputProps()}/>
                                <p>Elige tu imagen aquí</p>
                            </div>
                        </section>
                    )}
                </DropZone>
            </Container>
        </div>
    )
}

export default MultiplesImages