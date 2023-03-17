import {KAKAO_AUTH_URL} from "./KaKaoAuth";

function kakaoLogin() {

    const login = () => {
        window.location.href = KAKAO_AUTH_URL;
    }

    return (
        <div>
            <div className="kakao-login" onClick={login}>
                <img src={process.env.PUBLIC_URL + '/kakao_login_medium.png'} alt="kakao-login"/>
            </div>
        </div>
    );
}

export default kakaoLogin;