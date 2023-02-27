import axios, { AxiosRequestConfig } from "axios";
import moment from "moment";

const refresh = async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {

    var refreshToken = await localStorage.getItem("refreshToken");
    console.log('기존 rt '+refreshToken);
    const expireAt = moment(parseInt(localStorage.getItem('accessTokenExpiresIn')))
        .format("YYYY-MM-DD HH:mm:ss");

    console.log('만료시간 : '+expireAt)
    var token = await localStorage.getItem("accessToken");
    console.log('기존 at '+token)


    // accessToken 만료 && refreshToken 이 저장되어 있는 경우
    if (moment(expireAt).diff(moment()) < 0 && refreshToken) {


        const { data } = await
            axios.post("http://localhost:8080/auth/reissue",
                { accessToken: token,
                       refreshToken: refreshToken })
                .then(res => {
         localStorage.setItem("accessToken", res.data.accessToken);
         console.log('new at : '+res.data.accessToken);
         console.log('new at set : '+localStorage.getItem("accessToken"))
         localStorage.setItem("refreshToken", res.data.refreshToken);
         console.log('new rt : '+res.data.refreshToken);
         console.log('new at set : '+localStorage.getItem("refreshToken"));
         localStorage.setItem("accessTokenExpiresIn",res.data.accessTokenExpiresIn);
         console.log(res.data.accessTokenExpiresIn)

                    window.location.reload()
       }
    )

    }
    /* 새로운 accessToken 으로 요청 */
    config.headers["Authorization"] = `Bearer ${localStorage.getItem("accessToken")}`;
    return config;
}

export { refresh };