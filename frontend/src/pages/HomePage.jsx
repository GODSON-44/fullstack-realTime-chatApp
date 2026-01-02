import React from "react";
import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";
import NoChatSelected from "../components/NoChatSelected";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-full w-full flex overflow-hidden p-0">
      {/* Sidebar — ALWAYS visible, full width on mobile */}
      <aside className={`
  ${selectedUser ? "hidden md:block" : "block"}
  w-full md:w-72 h-full shrink-0 border-r border-base-300
`}
>
        <Sidebar />
      </aside>

      {/* Chat / Empty — DESKTOP ONLY */}
      <section className="md:flex flex-1 overflow-hidden">
        {selectedUser ? <ChatContainer /> : <NoChatSelected />}
      </section>
    </div>
  );
};

export default HomePage;
