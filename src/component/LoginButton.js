import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {CustomCurrentLoginButton} from "./MyStyle";

function LoginButton() {
    const navigate = useNavigate();
    const location = useLocation();

    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("accessTokenExpiresIn"));


    return (
        <div className="loginButton">
            {isLoggedIn ? (
                <CustomCurrentLoginButton
                    onClick={() => {
                        localStorage.removeItem("accessToken");
                        localStorage.removeItem("refreshToken");
                        localStorage.removeItem("accessTokenExpiresIn");
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