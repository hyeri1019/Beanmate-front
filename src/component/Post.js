import {useState, useEffect} from "react";
import axios from 'axios'
import {useNavigate, useParams} from "react-router-dom";

function Post(props) {

    let {pno} = useParams();
    let pages = props.pages;

    const navigate = useNavigate();


    const [delBtn, setDelBtn] = useState(false)

    const [modSubmit, setModSubmit] = useState(false)
    const [modBtn, setModBtn] = useState(false)

    const [showModBtn, setShowModBtn] = useState(true);
    const [showModSubmitBtn, setShowModSubmitBtn] = useState(false);


    const [post, setPost] = useState([{
        pno: '', title: '', writer: '', content:'', viewCnt: ''
}])

    let modifyHandler = (e) => {
        if (modBtn === true) {
            let {value, name} = e.target;
            setPost({
                ...post, [name]: value
            })
        }
    }

    function handleClick(button) {
        if(button === modBtn) {
            setShowModSubmitBtn(!showModSubmitBtn);
            setShowModBtn(!showModBtn);
        }
    }

    function listButton() {
        navigate(-1);
    }

    console.log(modBtn)
    console.log(post)

    /*   선택한 게시물 읽기   */
    useEffect(()=>{
        axios.get('http://localhost:8080/board?pno='+Number(pno))
            .then(res=>setPost(res.data),
            console.log('get'))
    },[])


    /*    게시물 삭제   */
    useEffect(()=>{
        if(delBtn===true)
        axios.delete('http://localhost:8080/board?pno='+pno)
    },[delBtn])


    /*    게시물 수정    */
    useEffect(()=>{
        if(modBtn===true)
        axios.patch('http://localhost:8080/board?pno=' + pno,
            {
                title: post.title, content: post.content
            },
            {
                headers: {'Content-Type': 'application/json'}
            }).then(console.log(post))
    },[modSubmit])

    return (
    <div className="post-area">
            <p>no : {pno}</p>
            <input type="text" name="title" defaultValue = {post.title}
                    onChange={modifyHandler}/>
            <p>작성자 : {post.writer}  조회수: {post.viewCnt}</p>
            <input type="text" name="content" defaultValue ={post.content}
                        onChange={modifyHandler}/>

            <div className="modify-post">

                {showModBtn && <button onClick={()=>{
                    setModBtn(true)
                    handleClick(modBtn)}}
                    >수정하기</button>}

                {showModSubmitBtn && <button onClick={()=>{
                                setModSubmit(true)}}
                            >수정</button>}
            </div>

            <div className="remove-post">
                <button onClick={()=>{
                    setDelBtn(true)
                }}>삭제</button>
            </div>

            <div className="listBtn">
                <button onClick={listButton}>목록</button>
            </div>

        </div>
    )
}


export default Post;