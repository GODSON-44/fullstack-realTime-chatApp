// it is a global state handler that is used in different route/component using <zustand>
// here we will have different states and function to use in different component globally
import {create} from "zustand"
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import {io} from "socket.io-client";

const BASE_URL = import.meta.end.MODE === "development"?"http://localhost:5001":"/";


export const useAuthStore = create((set, get)=>({

    authUser:null,

    // they are used in loading images or animation etc mainly or say while they are loading do this
    isSigningUp:false,
    isLoggingIn:false,
    isUpdatingProfile:false,
    isCheckingAuth:true,
    onlineUsers:[],
    socket:null,

    checkAuth:async()=>{
        try {
            //send req to our end points of backend file in auth.route ka /check me to see if it is online or not
            const res = await axiosInstance.get("/auth/check") //http://localhost:5001/api this is already include in axios file
            set({authUser:res.data})
            get().connectSocket();


        } catch (error) {
            console.log("Error in useAuthStore!", error.message);
            set({authUser:null})
        }finally{
            set({isCheckingAuth:false})
        }
    },

    signup: async (data)=>{

        set({isSigningUp:true})

        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({authUser: res.data});

            toast.success("Account created successfully");
            get().connectSocket()
            console.log(authUser)


        } catch (error) {
            console.log("Error in the signup-useAuthStore", error.message);
            toast.error(error.response.data.message)
        }
        finally{
            set({isSigningUp:false})
        }

    },


    login:async(data)=>{
        set({isLoggingIn:true})
        try {
            console.log("came in authStore");
            const res = await axiosInstance.post("/auth/login", data);
            set({authUser:res.data});
            toast.success("Logged in successfully");

            get().connectSocket();
            
        } catch (error) {
            toast.error(error.response.data.message)
        }
        finally{
            set({isLoggingIn:false})
        }
    },

    logout: async ()=>{
        try {
            await axiosInstance.post("/auth/logout");
            set({authUser:null});
            toast.success("Logged out successfully");
            get().disconnectSocket();
            
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },

    updateProfile:async (data)=>{
        set({isUpdatingProfile:true})
        try {
            const res = await axiosInstance.put("/auth/update-profile", data)
            set({authUser:res.data})
            toast.success("Profile updated successfully!");

            
        } catch (error) {
            console.log("Error in update profile");
            toast.error(error.response.data.message);
        }
        finally{
            set({isUpdatingProfile:false})
        }
    },

    connectSocket:()=>{
        const {authUser} = get()

        if(!authUser || get().socket?.connected) return;

        const socket = io(BASE_URL, { query:{userId:authUser._id},})//establish the connection with the socket io and give the userId of current authUser ot the server
        socket.connect();
        set({socket:socket})

        //listen for online user updates
        socket.on("getOnlineUsers", (userIds)=>{
            console.log("✅ FRONTEND RECEIVED: in AUthStore", socket.id);
            set({onlineUsers:userIds})
        })
    },
    disconnectSocket:()=>{
        if(get().socket?.connected) get().socket.disconnect();

    }

    

}));