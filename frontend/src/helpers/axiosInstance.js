import { configure } from "@testing-library/react";
import axios from "axios";
import backendURL from "../config"; 

let headers = {};



const axiosInstance = axios.create({

    baseURL : backendURL,
    headers,
});

export default axiosInstance;