import axios from "axios";

const http = axios.create({
    baseURL: process.env.REACT_APP_BASEURL
});

export default http;