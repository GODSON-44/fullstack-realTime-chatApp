import React, { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import SidebarSkeleton from "./SidebarSkeleton";
import { User, Search } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const Sidebar = () => {
  const {
    getUsers,
    users,
    selectedUser,
    setSelectedUser,
    isUsersLoading,
  } = useChatStore();

  const {onlineUsers} = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);



  useEffect(() => {
    getUsers();
  }, [getUsers]);

  // return user accordin to the showOnline enabled or not if yes then filter only online user else give all user
  const filteredUsers = showOnlineOnly?users.filter(user=> onlineUsers.includes(user._id)):users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside
      className="
        w-full
        shrink-0
        h-full
        border-r border-base-300
        bg-base-100
        flex flex-col
      "
    >
      {/* ===== Header ===== */}
      <div className="p-4 border-b border-base-300">
        <div className="flex items-center gap-2 mb-3">
          <User className="size-5 text-primary" />
          <h2 className="font-semibold text-base">Contacts</h2>
        </div>

        {/* Search (UI only, no logic change) */}
        <div className="mt-3 hidden lg:flex items-center gao-2">
          <label className="cursor-pointer flex items-center gap-2">

            <input
              type="checkbox"
              checked = {showOnlineOnly}
              onChange={(e)=>setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
          <span className="text-sm">Show online only&nbsp;</span>
          </label>
          <span className="text-xs text-zinc-500"> ({ onlineUsers.length-1} online)</span>
        </div>
      </div>

      {/* ===== Contact List ===== */}
      <div className="flex-1  overflow-y-auto">
        {filteredUsers.map((user) => {
          const isActive = selectedUser?._id === user._id;
          const isOnline = onlineUsers.includes(user._id);

          return (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`
                w-full flex items-center gap-3 px-4 py-3
                transition-all duration-200
                hover:bg-base-200
                ${isActive ? "bg-base-200 border-l-4 border-primary" : ""}
              `}
            >
              {/* Avatar */}
              <div className="relative shrink-0">
                <img
                  src={user.profilePic || "avatar.png"}
                  alt={user.name}
                  className="size-11 rounded-full object-cover"
                />
                {isOnline && (
                  <span className="absolute bottom-0 right-0 size-3 rounded-full bg-green-500 ring-2 ring-base-100" />
                )}
              </div>

              {/* User Info */}
              <div className=" flex-1 min-w-0 text-left">
                <p className="font-medium truncate leading-tight">
                  {user.fullName}
                </p>
                <p className="text-xs text-base-content/60">
                  {isOnline ? "Online" : "Offline"}
                </p>
              </div>
            </button>
          );
        })}
        {filteredUsers.length === 0 &&(<div className="text-center text-zinc-500 py-4">No online users</div>)}
      </div>
    </aside>
  );
};

export default Sidebar;
