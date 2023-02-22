import { useState, useEffect } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";


function Login({refreshToken, accessToken, setAccessToken, setRefreshToken}) {


    const [userInfo, setUserInfo] = useState([{
        email: '', password: ''
    }]);

    let navigate = useNavigate();

    
    const login = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:8080/auth/login', { // 로그인 요청
                email: userInfo.email,
                password: userInfo.password
            })
            .then(response => {
                    sessionStorage.setItem("accessToken", response.data.accessToken);
                    sessionStorage.setItem("refreshToken", response.data.refreshToken);
                    setAccessToken(response.data.accessToken);
                    setRefreshToken(response.data.refreshToken);
                    navigate('/');}
                );
    };

    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('accessToken')}`;
    }, [accessToken,refreshToken]);


    return (

        <form onSubmit={login}>
            <label>
                Email:
                <input type="email" value={userInfo.email}
                       onChange={e => setUserInfo({...userInfo, email: e.target.value})}/>
            </label>
            <br/>
            <label>
                비밀번호:
                <input type="password" value={userInfo.password}
                       onChange={e => setUserInfo({...userInfo, password: e.target.value})}/>
            </label>
            <br/>
            <button type="submit">로그인</button>
        </form>


    );

}

export default Login;