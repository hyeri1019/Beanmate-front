import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {CustomCurrentLoginButton} from "./MyStyle";

function LoginButton() {
    const navigate = useNavigate();
    const location = useLocation();

    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("accessTokenExpiresIn"));

    useEffect(() => {
        if (isLoggedIn) {
            const oneHourInMilliseconds = 1000 * 60 * 60;

            const timer = setTimeout(() => {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("accessTokenExpiresIn");
                localStorage.removeItem("email");
                setIsLoggedIn(false);
                navigate("/");
            }, oneHourInMilliseconds);

            return () => clearTimeout(timer);
        }
    }, [isLoggedIn, navigate]);


    return (
        <div className="loginButton">
            {isLoggedIn ? (
                <CustomCurrentLoginButton
                    onClick={() => {
                        localStorage.removeItem("accessToken");
                        localStorage.removeItem("refreshToken");
                        localStorage.removeItem("accessTokenExpiresIn");
                        localStorage.removeItem("email");
                        setIsLoggedIn(false);
                        navigate("/");
                    }}
                >
                    로그아웃
                </CustomCurrentLoginButton>
            ) : (
                <CustomCurrentLoginButton
                    onClick={() => {
                        navigate("/login", { state: { from: location.pathname } });
                    }}
                >
                    로그인
                </CustomCurrentLoginButton>
            )}
        </div>
    );
}

export default LoginButton;