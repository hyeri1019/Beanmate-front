import axios, { AxiosRequestConfig } from "axios";
import moment from "moment";

const refresh = async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {

    const refreshToken = localStorage.getItem("refreshToken");
    const expireAt = moment(parseInt(localStorage.getItem('accessTokenExpiresIn')))
                        .format("YYYY-MM-DD HH:mm:ss");

    console.log('만료시간 : '+expireAt)
    var accessToken = localStorage.getItem("accessToken");


    // accessToken 만료 && refreshToken 이 저장되어 있는 경우
    if (moment(expireAt).diff(moment()) < 0 && refreshToken) {
        console.log('expired')

        const body = {
            accessToken,
            refreshToken,
        };

        const { data } = await
            axios.post("http://localhost:8080/auth/reissue",
                body);

        accessToken = data.data.accessToken;
        localStorage.setItem("accessToken", data.data.accessToken);
        localStorage.setItem("accessTokenExpiresIn",
            moment().add(1, "hour").format("YYYY-MM-DD HH:mm:ss")
        );
    }

        config.headers["Authorization"] = `Bearer ${accessToken}`; // 새로운 accessToken을 사용하여 요청 보내기
        return config;
    }

export { refresh };