import axios from "axios";
import {useEffect} from "react";
import {Container} from "@mui/material";
import {useNavigate} from "react-router-dom";

const KakaoAuthHandle = (props) => {
    let navigate = useNavigate();

    useEffect(() => {
        let code = new URL(window.location.href).searchParams.get('code')
        const kakaoLogin = async () => {
            await axios
                .get(`http://localhost:8080/auth/kakao/callback?code=${code}`)
                .then((res) => {
                    localStorage.setItem("accessToken", res.data.accessToken);
                    localStorage.setItem("refreshToken", res.data.refreshToken);
                    localStorage.setItem("accessTokenExpiresIn",res.data.accessTokenExpiresIn);
                    navigate("/");
                })
        }
        kakaoLogin()
    }, [props.history])

    return (
        <>
            <Container></Container>
        </>
    )
}

export default KakaoAuthHandle