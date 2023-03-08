import './App.css';
import {useCallback, useEffect, useState} from "react";
import {Routes, Route, Link, useNavigate, Outlet, Router, BrowserRouter, useLocation} from 'react-router-dom'
import {TransitionGroup, CSSTransition, Transition} from 'react-transition-group';
import Board from './component/Board.js'
import Post from './component/Post.js'
import Write from './component/Write.js'
import SignUp from "./SignUp";
import Login from "./component/Login";
import MyPage from "./component/MyPage";
import Main from "./component/Main";
import "./App.css"
import "./fade.css"

import { Drawer, Paper, List, ListItem, ListItemIcon, ListItemText, ToggleButton, ToggleButtonGroup, Slide, useScrollTrigger } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import axios from "axios";
import {CategoryProvider} from "./CategoryContext";
import Chat from "./Chat";


function App() {


    /*    토큰      */
    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refreshToken"));
    const [accessTokenExpiresIn, setAccessTokenExpiresIn] = useState(localStorage.getItem("accessTokenExpiresIn"));

    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
    }, [accessToken,refreshToken]);


    useEffect(() => {
        const updateTokens = () => {
            setAccessToken(localStorage.getItem('accessToken'));
            setRefreshToken(localStorage.getItem('refreshToken'));
            setAccessTokenExpiresIn(localStorage.getItem("accessTokenExpiresIn"));
        }

        window.addEventListener('storage', updateTokens);

        console.log('1 accessToken='+accessToken);
        console.log('1 refreshToken='+refreshToken);
        console.log('1 accessTokenExpiresIn='+accessTokenExpiresIn);

        return () => {
            window.removeEventListener('storage', updateTokens);
        };
    }, [accessToken, refreshToken, accessTokenExpiresIn]);



    return (
        <>

        <BrowserRouter>
                <Routes>
                    <Route path="/" element={<CategoryProvider><Main></Main></CategoryProvider>}></Route>
                    <Route path="/board/:category/:pages" element={<CategoryProvider><Board></Board></CategoryProvider>}></Route>
                    <Route path="/board/:category/:pages/:pno" element={<Post></Post>}></Route>
                    <Route path="/board/:category" element={<Write></Write>}></Route>
                    <Route path="/sign-up" element={<SignUp></SignUp>}></Route>
                    <Route path="/me" element={<MyPage></MyPage>}></Route>
                    <Route path="/chat" element={<Chat></Chat>}></Route>
                    <Route path="/login" element={<Login accessToken={accessToken} refreshToken={refreshToken} setAccessToken={setAccessToken} setRefreshToken={setRefreshToken}></Login>}></Route>

                </Routes>
        </BrowserRouter>



        </>

    );
}

export default App;
