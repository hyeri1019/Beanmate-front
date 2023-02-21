import { useState, useEffect } from "react";
import axios from 'axios'

function Write() {

/*   게시글 작성   */
    const [write, setWrite] = useState([{
        title: '', content: ''
    }]);

    // let { title, content } = write;

    let writeHandler = (e) => {
        let { value, name } = e.target;
            setWrite({
                ...write, [name]: value
            })
    };

    const [button, setButton] = useState(false)

    useEffect(()=> {
        if (button === true)
            axios.post('http://localhost:8080/board',
                {
                    title: write.title, content: write.content
                })
    },[button])

    console.log(button)
    console.log(write)

        return (

            <div className="write-box">
                <input type="text" name="title" placeholder="제목" 
                       onChange={writeHandler}/>
                <input type="text" name="content" placeholder="내용"
                       onChange={writeHandler}/>
                <button onClick={()=>{
                    setButton(true)
                }}>확인</button>
            </div>

        )

}

export default Write;

