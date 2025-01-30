import axios from "axios";

const instance = axios.create({
    baseURL: "/api", // http://localhost:5000/api  /api
    withCredentials: true,
})

export default instance;