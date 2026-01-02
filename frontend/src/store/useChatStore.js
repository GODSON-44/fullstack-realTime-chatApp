import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore.js";

export const useChatStore = create((set, get) => ({
    // ================= STATE =================
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    // ================= USERS =================
    getUsers: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get("/message/user");
            set({ users: res.data });
        } catch (error) {
            toast.error(
                error?.response?.data?.message || "Failed to load users"
            );
        } finally {
            set({ isUsersLoading: false });
        }
    },

    // ================= MESSAGES =================
    getMessages: async (userId) => {
        set({ isMessagesLoading: true });
        try {
            const res = await axiosInstance.get(`/message/${userId}`);
            set({ messages: res.data });
        } catch (error) {
            toast.error(
                error?.response?.data?.message || "Failed to load messages"
            );
        } finally {
            set({ isMessagesLoading: false });
        }
    },

    sendMessage: async (messageData) => {
        const { selectedUser } = get();
        if (!selectedUser) return;

        try {
            const res = await axiosInstance.post(
                `/message/send/${selectedUser._id}`,
                messageData
            );

            // append sent message
            set((state) => ({
                messages: [...state.messages, res.data],
            }));
        } catch (error) {
            toast.error(
                error?.response?.data?.message || "Failed to send message"
            );
        }
    },

    // ================= SOCKET =================
    subscribeMessages: () => {
        const { selectedUser } = get();
        if (!selectedUser) return;

        const socket = useAuthStore.getState().socket;
        console.log("Socket in subscribe:", socket?.id);

        if (!socket) return;

        // 🔥 prevent duplicate listeners
        // socket.off("newMessage");

        socket.on("newMessages", (newMessages)=>{
            // optimization that only send to the selected user if the message is for him other wise only update in databse
            if(newMessages.senderId !== selectedUser._id) return; 

            // console.log("✅ FRONTEND RECEIVED in ChatStore:", newMessages);
            set({
                messages:[...get().messages, newMessages]
            });
        });
    },

    unsubscribeMessages: () => {
        const socket = useAuthStore.getState().socket;
        if (!socket) return;

        socket.off("newMessages");
    },

    // ================= UI =================
    setSelectedUser: (selectedUser) =>
        set({
            selectedUser,
            messages: [], // clear old chat messages
        }),
}));
