import React from 'react'
import { useChatStore } from '../store/useChatStore'
import { useAuthStore } from '../store/useAuthStore';
import { MoreVertical, Phone, Video, X} from 'lucide-react';

const ChatHeader = () => {
    const {selectedUser, setSelectedUser} = useChatStore();
    const {onlineUsers} = useAuthStore();
  return (
    <div className="h-16 px-4 border-b border-base-300 bg-base-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium">
            <img
                  src={selectedUser.profilePic || "avatar.png"}
                  alt={selectedUser.fullName}
                  className="size-11 rounded-full object-cover"
              />
          </div>
          <div className="leading-tight">
            <p className="font-medium">{selectedUser.fullName[0].toUpperCase() + selectedUser.fullName.slice(1,)}</p>
            <p className="text-xs text-base-content/60">{onlineUsers.includes(selectedUser._id)?"Online":"Offline"}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="btn btn-ghost btn-sm">
            <Phone className="w-4 h-4" />
          </button>
          <button className="btn btn-ghost btn-sm">
            <Video className="w-4 h-4" />
          </button>
          <button className="btn btn-ghost btn-sm" onClick={()=>{setSelectedUser(false)}}>
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
  )
}

export default ChatHeader
