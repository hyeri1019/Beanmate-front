import {useEffect, useState} from "react";

function LoginButton() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);


    return (
        <div className="loginButton">
            {
                isLoggedIn ? (
                    <button onClick={() => {
                        localStorage.removeItem("accessToken");
                        localStorage.removeItem("refreshToken");
                        localStorage.removeItem("accessTokenExpiresIn");
                        setIsLoggedIn(false);
                        window.location.href = '/';
                    }}>
                        로그아웃
                    </button>
                ) : (
                    <>
                    </>
                )
            }
        </div>
    )
}


export default LoginButton;