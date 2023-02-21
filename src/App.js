import './App.css';
import {useCallback, useEffect, useState} from "react";
import { Button, Navbar, Container, Nav } from 'react-bootstrap';
import {Routes, Route, Link, useNavigate, Outlet, Router, BrowserRouter} from 'react-router-dom'
import Board from './component/Board.js'
import Post from './component/Post.js'
import Main from './component/Main.js'
import Write from './component/Write.js'
import SignUp from "./SignUp";
import Login from "./component/Login";
import LoginCheck from "./component/LoginCheck";
import Mypage from "./component/MyPage";
import { CookiesProvider } from 'react-cookie';
import axios  from "axios";



function App() {

    const loginCheck = useCallback(() => {
        console.log('login check')

        //  JSON 형식으로 변환하여 Request Header 에 토큰정보를 담아 보냄
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('accessToken');
            axios.post('http://localhost:8080/auth/reissue',
               {
                     refreshToken: sessionStorage.getItem("refreshToken"),
                     accessToken: sessionStorage.getItem("accessToken")
                })
                .then(res => {console.log('token='+res.data)})

    })

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main></Main>}></Route>
                <Route path="/board/:pages" element={<Board></Board>}></Route>
                <Route path="/board/:pages/:pno" element={<Post></Post>}></Route>
                <Route path="/board" element={<Write></Write>}></Route>
                <Route path="/sign-up" element={<SignUp></SignUp>}></Route>
                <Route path="/login" element={<Login></Login>}></Route>
                <Route path="/me" element={<LoginCheck></LoginCheck>}></Route>
            </Routes>
            {loginCheck()}
        </BrowserRouter>
    )
}


export default App;
