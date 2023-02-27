import { useState, useEffect } from "react";
import axios from 'axios'
import { TextField } from '@mui/material';
import { CustomButton } from './MyStyle';
import {useNavigate, useParams} from "react-router-dom";
import Api from "../customApi";
import Image from "./Image";


function Write() {

    let navigate = useNavigate();
    let {category} = useParams();

/*   게시글 작성   */
    const [write, setWrite] = useState([{
        title: '', content: '', category: category,
    }]);

    const [button, setButton] = useState(false);

    const [file, setFile] = useState(null);

    let writeHandler = (e) => {
        let { value, name } = e.target;
            setWrite({
                ...write, [name]: value
            })
    };



    useEffect( ()=> {
        const formData = new FormData();
            formData.append("file", file);
            formData.append("title", write.title);
            formData.append("content", write.content);
            formData.append("category", category);


        if (button === true )
             Api.post('/board', formData)
                .then(() => {
                    alert('게시물이 작성되었습니다.');
                    navigate('/board/'+write.category+'/'+1)
                })
                .catch(() => {
                    alert('권한이 없습니다.');
                    navigate('/board/'+write.category+'/'+1)
                });

    },[button])

    console.log(button)
    console.log(write)

        return (

            <div className="write-box">
                <TextField type="text" name="title" placeholder="제목"
                       onChange={writeHandler}
                           multiline rows={1} fullWidth/>
                <TextField type="text" name="content" placeholder="내용"
                       onChange={writeHandler}
                           multiline rows={10} fullWidth/>
                <Image file={file} setFile={setFile}></Image>
                <CustomButton onClick={()=>{
                    if(window.confirm('게시물을 작성하시겠습니까?'))
                    setButton(true);
                }}>확인</CustomButton>
            </div>

        )

}

export default Write;

