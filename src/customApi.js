import axios from "axios";
import { refresh } from "./refresh";

const Api = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 10000,
    params: {},
});

Api.interceptors.request.use(refresh);

export default Api;