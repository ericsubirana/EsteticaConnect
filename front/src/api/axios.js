import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:5000/api", //server /api
    withCredentials: true,
})

export default instance;