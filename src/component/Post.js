import {useState, useEffect, useCallback} from "react";
import axios from 'axios'
import {useNavigate, useParams} from "react-router-dom";
import Api from "../customApi";

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
        pno: '', title: '', writer: '', content:'', viewCnt: '', imagePath: '', imageName: ''
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
    console.log('postNo='+post.pno)

    /*   선택한 게시물 읽기   */
    useEffect(  ()=>{
          Api.get('http://localhost:8080/board?pno='+Number(pno))
            .then(res=>setPost(res.data))
    },[pno])


    /*    게시물 삭제   */
    useEffect(()=>{
        if(delBtn === true) {
            Api.delete(`http://localhost:8080/board?pno=${pno}`)
                .then(() => {
                    alert('게시물이 삭제되었습니다.');
                    navigate('/board/1');
                })
                .catch(() => {
                    alert('작성자만 삭제 할 수 있습니다.');
                });
        }
    },[delBtn])


    /*    게시물 수정    */
    useEffect(()=>{
        if(modBtn===true)
        Api.patch('http://localhost:8080/board?pno=' + pno,
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

        <img src={`http://localhost:8080/uploads/${post.imageName}`} alt="이미지" />



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
                    if(window.confirm('게시물을 삭제하시겠습니까?'))
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