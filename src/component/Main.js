import  { useState, useEffect, useRef, useCallback } from 'react';
import Api from "../customApi";



import "../component/css/Main.css"
import {useLocation, useNavigate} from "react-router-dom";
import LoginButton from "./LoginButton";
import PostModal from "./PostModal";


import {Drawer, List, ListItem, ListItemText, Toolbar} from "@mui/material";
import {CustomButton, CustomCategoryButton, CustomDrawer, CustomList, CustomListItemButton} from './MyStyle';
import MenuIcon from "@mui/icons-material/Menu";
import Board from "./Board";

function Main() {

    const navigate = useNavigate();
    const location = useLocation();



    const [list, setList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const obsRef = useRef(null);

    useEffect(() => {
        setIsLoading(true);
        getPosts(currentPage).then((data) => {
            setList((prevList) => [...prevList, ...data.posts]);
            setHasMore(data.pagination.hasPrev);
            setIsLoading(false);
        });
    }, [currentPage]);

    const handleObserver = async (entries) => {
        const target = entries[0];
        console.log(target);
        if (target.isIntersecting && hasMore && !isLoading) {
            console.log("1++");
            await setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(handleObserver, {threshold: 1});
        if (obsRef.current) observer.observe(obsRef.current);
        return () => observer.disconnect();
    }, [currentPage, hasMore, isLoading]);

    const getPosts = useCallback(async (page) => {
        setIsLoading(true);
        const response = await Api.get(`/feeds?page=${page}`);
        setIsLoading(false);
        return response.data;
    }, []);

    /*    모달창    */
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState({});


    const openModal = (post) => {
        setSelectedPost(post);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handlePostClick = (post) => {
        openModal(post);
    };


    const [categories, setCategories] = useState(['main','healthy','sand','toy']);
    const [category, setCategory] = useState('main');


    return (
        <>

            <header className="head">
                <a href={`/`} onClick={(e) => {
                    e.preventDefault();
                    navigate('/')
                }}>
                    <img src={process.env.PUBLIC_URL + '/head.png'} alt="head"/></a>
            </header>

            <div className="login-button">
            <LoginButton />
            </div>


            <div className="menu">
                    <Drawer className="menu-bar"
                        variant="permanent">
                        <div>
                            <CustomList className="menu-line">
                                {categories.map((a, i) => (
                                <CustomListItemButton button onClick={async()=>{
                                    setCategory(a);
                                    await navigate(`/board/${a}/1`);
                                }}>
                                    <ListItemText primary={a}></ListItemText>
                                </CustomListItemButton>
                                    ))}
                            </CustomList>
                        </div>
                    </Drawer>
            </div>


                <div className="post-container">
                    {list.map((post) => (
                        <div key={post.pno} className="post" onClick={() => handlePostClick(post)}>
                            <img src={`http://localhost:8080/uploads/${post.imageName}`} alt="이미지"/>
                        </div>
                    ))}
                </div>

            {isLoading && (
                <img src={process.env.PUBLIC_URL + '/loading.png'} alt="loading"/>
            )}
            {!isLoading && hasMore && (
                <div ref={obsRef} className="py-3 bg-red-500 text-white text-center">옵저버 Element</div>
            )}


            <PostModal post={selectedPost} isOpen={modalIsOpen} onRequestClose={closeModal}/>

        </>
    );
}
export default Main;