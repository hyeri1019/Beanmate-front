import './App.css';
import {useCallback, useEffect, useState} from "react";
import {Routes, Route, Link, useNavigate, Outlet, Router, BrowserRouter} from 'react-router-dom'
import Board from './component/Board.js'
import Post from './component/Post.js'
import Main from './component/Main.js'
import Write from './component/Write.js'
import SignUp from "./SignUp";
import Login from "./component/Login";
import axios  from "axios";



function App() {

    const [accessToken, setAccessToken] = useState(sessionStorage.getItem("accessToken"));
    const [refreshToken, setRefreshToken] = useState(sessionStorage.getItem("refreshToken"));
    console.log('1 accessToken='+accessToken);

    useCallback(() => {
        console.log('login check')

        //  JSON 형식으로 변환하여 Request Header 에 토큰정보를 담아 보냄
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
            axios.post('http://localhost:8080/auth/reissue',
               {
                     accessToken: accessToken,
                     refreshToken: refreshToken

                })
                .then(res => {
                    console.log('2 access token = '+accessToken)
                })

    },[accessToken])

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main></Main>}></Route>
                <Route path="/board/:pages" element={<Board></Board>}></Route>
                <Route path="/board/:pages/:pno" element={<Post></Post>}></Route>
                <Route path="/board" element={<Write></Write>}></Route>
                <Route path="/sign-up" element={<SignUp></SignUp>}></Route>
                <Route path="/login" element={<Login accessToken={accessToken} setAccessToken={setAccessToken} setRefreshToken={setRefreshToken}></Login>}></Route>
            </Routes>
        </BrowserRouter>

    )
}


export default App;
