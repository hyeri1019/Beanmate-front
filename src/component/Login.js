import { useState, useEffect } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import Api from "../customApi";
import { TextField } from '@mui/material';
import "./Login.css"
import { CustomLoginButton } from "./MyStyle";


function Login({refreshToken, accessToken, setAccessToken, setRefreshToken}) {


    const [userInfo, setUserInfo] = useState([{
        email: '', password: ''
    }]);

    let navigate = useNavigate();


    console.log(localStorage.getItem("email"));

    
    const login = (e) => {
        e.preventDefault();
        Api
            .post('/auth/login', { // 로그인 요청
                email: userInfo.email,
                password: userInfo.password
            })
            .then(response => {
                    localStorage.setItem("email",userInfo.email);

                    localStorage.setItem("accessToken", response.data.accessToken);
                    localStorage.setItem("refreshToken", response.data.refreshToken);
                    localStorage.setItem("accessTokenExpiresIn", response.data.accessTokenExpiresIn);
                    setAccessToken(response.data.accessToken);
                    setRefreshToken(response.data.refreshToken);
                    navigate('/');}
                );
    };



    return (
        <>
        <form onSubmit={login}>
            <br/>
            <div className="login-box">
                <TextField label="email" type="email" value={userInfo.email}
                       onChange={e => setUserInfo({...userInfo, email: e.target.value})}/>
            <br/>
                <TextField label="password" type="password" value={userInfo.password}
                       onChange={e => setUserInfo({...userInfo, password: e.target.value})}/>
            </div>
            <br/>
            <CustomLoginButton type="submit">로그인</CustomLoginButton>
        </form>

        </>


    );

}

export default Login;