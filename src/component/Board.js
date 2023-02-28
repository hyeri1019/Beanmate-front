import {useState, useEffect, useCallback, useContext} from "react";
import axios from 'axios'
import {useLocation, useNavigate, useParams} from "react-router-dom";
import SearchBar from './Search.js';
import Api from "../customApi";
import "../fade.css"

import "./css/Board.css";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import {CustomButton, CustomCategoryButton, CustomList, CustomListItemButton, CustomPaper} from './MyStyle';
import {TransitionGroup, CSSTransition} from "react-transition-group";

import LoginButton from "./LoginButton";
import {CategoryContext} from "../CategoryContext";
import {Drawer, ListItemText} from "@mui/material";


function Board() {

    const location = useLocation();


    let {pages} = useParams();
    console.log('pages='+pages)

    const [page, setPage] = useState(0);

    let navigate = useNavigate();



    const options = ['제목', '제목+내용', '작성자'];
    const [option, setOption] = useState();
    const [keyword, setKeyword] = useState();



    const [boardList, setBoardList] = useState([{
        pno: '', title: '', writer: '', viewCnt: '', category: '',
    }])

    const [paging, setPaging] = useState([{
        totalPages: 0, startPage: 0, endPage: 0, hasNext: false, hasPrev: false, prevIndex: 0, nextIndex: 0
    }])

    const { category, setCategory } = useContext(CategoryContext);
    const { categories } = useContext(CategoryContext);

    const arr = [];
        for (let i = paging.startPage; i <= paging.endPage; i++) {
            arr.push(i);
        }

        /* useCallback 으로 최적화
           서버에 1번만 요청하며, 같은 값은 재요청 하지 않음 */
    const handleSearch = useCallback(async (category, option, keyword, page) => {
        console.log('*******')

        setOption(option)
        setKeyword(keyword)

       await Api.get('/boards?category='+category+'&page='+page+'&option='+option+'&keyword='+keyword)
             .then(res => { setBoardList(res.data.posts);
                            setPaging(res.data.pagination);
                            })
                .catch(error => console.log('board error'))

    },[])


    /* page,option, keyword 가 변경될 때마다 handleSearch() 실행 */
    useEffect(() => {
        handleSearch(category, option, keyword, page);
    }, [handleSearch, page, option, keyword, category]);



    return (
    <div className="board">
            <header className="head">
                <a href={`/`} onClick={(e) => {
                e.preventDefault();
                navigate('/')}}>
                    <img src={process.env.PUBLIC_URL + '/head.png'} alt="head" /></a>
            </header>

        <LoginButton></LoginButton>

        {/*<div className="category-menu">*/}
        {/*    <Drawer className="menu-bar"*/}
        {/*            variant="permanent">*/}
        {/*        <CustomPaper>*/}
        {/*        <div>*/}
        {/*            <CustomList className="menu-line">*/}
        {/*                {categories.map((a, i) => (*/}
        {/*                    <CustomListItemButton button onClick={async()=>{*/}
        {/*                        setCategory(a);*/}
        {/*                        await navigate(`/board/${a}/1`);*/}
        {/*                    }}>*/}
        {/*                        <ListItemText primary={a}></ListItemText>*/}
        {/*                    </CustomListItemButton>*/}
        {/*                ))}*/}
        {/*            </CustomList>*/}
        {/*        </div>*/}
        {/*        </CustomPaper>*/}
        {/*    </Drawer>*/}
        {/*</div>*/}



        <div className="board">


            <TransitionGroup>
                <CSSTransition key={location.key} classNames="fade" timeout={200}>
                <div className="boardContainer">
                    {boardList.map((post, i) => (
                        <div key={i} className="boardPost">
                            <div className="postImage">
                                <a href={`/`} onClick={(e) => {
                                    e.preventDefault();
                                    navigate('/board/'+category+'/'+pages+'/'+post.pno);}}>
                                    <img src={`http://localhost:8080/uploads/${post.imageName}`} alt="이미지" /></a>
                            </div>
                            <div className="postInfo">
                                <div className="postTitle" onClick={() =>
                                    navigate('/board/' +category+'/' + pages + '/' + post.pno)}>
                                    {post.title}
                                </div>
                                <div className="postWriter">
                                    작성자: {post.writer.split('@')[0]}
                                </div>
                                <div className="postViewCnt">
                                    조회수: {post.viewCnt}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                </CSSTransition>
            </TransitionGroup>


            <div className="pagination">
                <ButtonGroup variant="outlined" color="secondary" aria-label="medium secondary button group">
                    <Button  onClick={()=>{
                    setPage(1)
                    navigate('/board/'+category+'/'+1)
                }}>
                    &lt;&lt;
                    </Button>

                    <Button  onClick={()=>{
                    if(paging.hasNext!==false){
                        setPage(paging.prevIndex);
                        navigate('/board/'+category+'/'+paging.prevIndex)
                    }

                }}>
                    &lt;
                    </Button>


                {arr.map((a,i)=>{
                    return(
                    <CustomButton onClick={async ()=>{
                             setPage(a)
                             navigate('/board/'+category+'/'+a)
                        }}>
                            {a}
                    </CustomButton>
                    )
                })}

                    <Button onClick ={()=>{
                    if(paging.hasPrev!==false) {
                        setPage(paging.nextIndex);
                        navigate('/board/'+category+'/'+paging.nextIndex)
                    }
                }}>
                    &gt;
                    </Button>

                    <Button onClick={()=>{
                    setPage(paging.totalPages);
                    navigate('/board/'+category+'/'+paging.totalPages)
                }}>
                    &gt;&gt;
                    </Button>
                </ButtonGroup>
            </div>

                <div className="writeButton">
                    <Button onClick={()=>{
                        navigate('/board/'+category)
                    }}>글쓰기
                    </Button>
            </div>

            <div className="SearchBar">
                <SearchBar options={options} page={page} setPage={setPage} onSearch={handleSearch}/>
            </div>

        </div>
    </div>
    )
}

export default Board;