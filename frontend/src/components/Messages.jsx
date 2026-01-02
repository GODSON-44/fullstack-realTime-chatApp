import React from 'react'

const Messages = () => {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {/* Incoming */}
        <div className="flex items-start gap-2 max-w-[75%]">
          <div className="w-7 h-7 rounded-full bg-neutral text-neutral-content flex items-center justify-center text-xs">
            W
          </div>
          <div className="bg-base-100 border border-base-300 rounded-2xl px-4 py-2 text-sm">
            Hey 👋 How’s the new chat interface looking?
          </div>
        </div>

        {/* Outgoing */}
        <div className="flex justify-end">
          <div className="bg-primary text-primary-content rounded-2xl px-4 py-2 text-sm max-w-[75%]">
            Looks clean and professional! ✨
          </div>
        </div>

        {/* Incoming */}
        <div className="flex items-start gap-2 max-w-[75%]">
          <div className="w-7 h-7 rounded-full bg-neutral text-neutral-content flex items-center justify-center text-xs">
            W
          </div>
          <div className="bg-base-100 border border-base-300 rounded-2xl px-4 py-2 text-sm">
            Nice! Does it support image upload too?
          </div>
        </div>

        {/* Outgoing */}
        <div className="flex justify-end">
          <div className="bg-primary text-primary-content rounded-2xl px-4 py-2 text-sm max-w-[75%]">
            Yep 👍 Fully supported.
          </div>
        </div>
      </div>
  )
}

export default Messages
