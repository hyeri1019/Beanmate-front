import { useState } from "react";
import axios from 'axios'
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";



function Login(props) {

    const [accessToken, setAccessToken] = useState(sessionStorage.getItem('accessToken'));
    const [userInfo, setUserInfo] = useState([{
        email: '', password: ''
    }]);

    let navigate = useNavigate();

    
    const login = (e) => {
        e.preventDefault();
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('accessToken');
        axios
            .post('http://localhost:8080/auth/login', { // 로그인 요청
                email: userInfo.email,
                password: userInfo.password
            })
            .then(response => {
                    setAccessToken(response.data.accessToken);
                    sessionStorage.setItem("accessToken",response.data.accessToken)
                    sessionStorage.setItem("refreshToken",response.data.refreshToken)
                    console.log(sessionStorage.getItem('accessToken'))
                    console.log(sessionStorage.getItem('refreshToken'))
                    console.log('???='+accessToken);
                navigate('/');}
                );
    };



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