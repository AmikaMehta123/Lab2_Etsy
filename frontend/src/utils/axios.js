import axios from "axios"

//const baseURL = "https://sharansantosh-etsyprototype.herokuapp.com";
const baseURL = 'http://localhost:3001'
let headers = {}

if (localStorage.token) {
  headers.Authorization = `${localStorage.token}`
}

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers,
})

export default axiosInstance
