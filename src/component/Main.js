import {useEffect, useState} from "react";
import { useNavigate, Outlet } from 'react-router-dom'

function Main() {
    let navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = sessionStorage.getItem("accessToken");
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);


    return (
        <div className="main-page">
            <p>nyangnyang.com</p>
            {
                isLoggedIn ? (
                    <button onClick={() => {
                        sessionStorage.removeItem("accessToken");
                        setIsLoggedIn(false);
                        navigate("/");
                    }}>
                        로그아웃
                    </button>
                ) : (
                    <>
                        <button onClick={() => navigate('/login')}>로그인</button>
                        <button onClick={() => navigate('/sign-up')}>회원가입</button>
                    </>
                )
            }
            <button onClick={() => navigate('/board/1')}>게시판</button>
        </div>
    )
}


export default Main;