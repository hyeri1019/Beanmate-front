import Api from "../customApi";
import { useState } from "react"

function Image({file, setFile}) {

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };


    return (
        <>
        <input type="file" onChange={handleFileChange} />
            {file && <img src={URL.createObjectURL(file)} alt={file.name} />}
    </>
    );
}

export default Image;