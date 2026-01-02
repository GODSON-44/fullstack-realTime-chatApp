import React from "react";

const ChatLoading = () => {
  return (
    <div className="flex flex-col h-full w-full bg-base-200 animate-pulse">
      {/* ===== Header Skeleton ===== */}
      <div className="h-16 px-4 border-b border-base-300 bg-base-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-base-300"></div>
          <div className="space-y-1">
            <div className="h-3 w-24 bg-base-300 rounded"></div>
            <div className="h-2 w-16 bg-base-300 rounded"></div>
          </div>
        </div>
      </div>

      {/* ===== Messages Skeleton ===== */}
      {[...Array(4)].map((_, i) => (
        <div key = {i} className="flex-1 overflow-hidden px-4 py-6 space-y-5">
           {/* Incoming */}
        <div className="flex items-start gap-2 max-w-[75%]">
          <div className="w-7 h-7 rounded-full bg-base-300"></div>
          <div className="space-y-2">
            <div className="h-3 w-48 bg-base-300 rounded"></div>
            <div className="h-3 w-32 bg-base-300 rounded"></div>
          </div>
        </div>

        {/* Outgoing */}
        <div className="flex justify-end">
          <div className="space-y-2 max-w-[75%]">
            <div className="h-3 w-44 bg-primary/30 rounded"></div>
            <div className="h-3 w-28 bg-primary/30 rounded"></div>
          </div>
        </div>
        
        </div>
      ))}

      {/* ===== Input Skeleton ===== */}
      <div className="px-4 py-3 border-t border-base-300 bg-base-100">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 bg-base-300 rounded-full"></div>
          <div className="flex-1 h-9 bg-base-300 rounded-lg"></div>
          <div className="h-9 w-12 bg-primary/30 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default ChatLoading;
