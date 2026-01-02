import { MessageCircle } from 'lucide-react'
import React from 'react'

function SidebarSkeleton() {
  return (
      <aside className="w-80 border-r border-base-300 bg-base-100 p-4">
      {/* Header skeleton */}
      <div className="mb-4 flex items-center gap-2">
        <MessageCircle className="h-5 w-5 text-base-content/40" />
        <div className="h-4 w-24 rounded bg-base-300 animate-pulse" />
      </div>

      {/* Chat list skeleton */}
      <div className="space-y-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-3 rounded-lg p-3 hover:bg-base-200"
          >
            {/* Avatar skeleton */}
            <div className="h-10 w-10 rounded-full bg-base-300 animate-pulse" />

            {/* Text skeleton */}
            <div className="flex-1 space-y-2">
              <div className="h-3 w-3/4 rounded bg-base-300 animate-pulse" />
              <div className="h-2 w-1/2 rounded bg-base-300 animate-pulse" />
            </div>

            {/* Time skeleton */}
            <div className="h-2 w-8 rounded bg-base-300 animate-pulse" />
          </div>
        ))}
      </div>
    </aside>
  )
}

export default SidebarSkeleton
