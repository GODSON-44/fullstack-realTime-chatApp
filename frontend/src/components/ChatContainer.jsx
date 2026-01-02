import React, { useEffect, useRef } from "react";
import { useChatStore,  } from "../store/useChatStore.js";
import ChatLoading from "./ChatLoading.jsx";
import ChatHeader from "./ChatHeader.jsx";
import MessageInput from "./MessageInput.jsx";
import { useAuthStore } from "../store/useAuthStore.js";
import { formatMessageTime } from "../lib/utils.js";

const ChatContainer = () => {
  // const {socket} = useAuthStore();
  const {
    selectedUser,
    messages,
    
    isMessagesLoading,
    getMessages,
    subscribeMessages,
    unsubscribeMessages,
  } = useChatStore();

  const { authUser, socket } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    // if (!selectedUser) return;
    if (!selectedUser || !socket) return;

    getMessages(selectedUser._id);
    subscribeMessages();

    return () => unsubscribeMessages();
  }, [selectedUser, socket]); // if any real time error occurs then remove the submess, unsubmess, ._id form the dependency from this useEffect

  if (!selectedUser) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        Select a chat to start messaging
      </div>
    );
  }

  useEffect(()=>{
    if(messageEndRef.current && messages)
      messageEndRef.current.scrollIntoView({behavior:"auto"});// in chat box whenever a new message comes scroll to that new message
  },[messages])

  if (isMessagesLoading) return <ChatLoading />;

  return (
    <div className="flex flex-col h-full w-full bg-base-200">
      {/* ===== Header ===== */}
      <ChatHeader />

      {/* ===== Messages ===== */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${
              message.senderId === authUser._id
                ? "chat-end"
                : "chat-start"
            }`}
            ref = {messageEndRef}
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || "/avatar.png"
                      : selectedUser.profilePic || "/avatar.png"
                  }
                  alt="profile"
                />
              </div>
            </div>

            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>

            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="attachment"
                  className="sm:max-w-50 rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>

      {/* ===== Input ===== */}
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
