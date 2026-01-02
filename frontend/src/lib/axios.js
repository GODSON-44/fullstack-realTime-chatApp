import axios from "axios";

//for handling the api calls
export const axiosInstance = axios.create({
    baseURL: import.meta.end.MODE === "development"?"http://localhost:5001/api":"/api", 
    withCredentials:true, // used to send the cookies with the also
})