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
    
    const login = (e) => {
        e.preventDefault();

        if (!userInfo.email || !userInfo.password) {
            alert('아이디 또는 비밀번호를 입력해주세요.');
            return;
        }

        Api
            .post('/auth/login', { // 로그인 요청
                email: userInfo.email,
                password: userInfo.password
            })
            .then(res => {
                    localStorage.setItem("email",userInfo.email);

                    localStorage.setItem("accessToken", res.data.accessToken);
                    localStorage.setItem("refreshToken", res.data.refreshToken);
                    localStorage.setItem("accessTokenExpiresIn", res.data.accessTokenExpiresIn);
                    setAccessToken(res.data.accessToken);
                    setRefreshToken(res.data.refreshToken);
                    navigate('/');
            })
            .catch(error => {
                alert('아이디 또는 비밀번호가 일치하지 않습니다.');
        });
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