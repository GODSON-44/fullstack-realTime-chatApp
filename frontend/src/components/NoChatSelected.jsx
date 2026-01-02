import React from "react";
import { MessageSquareDashed } from "lucide-react";

const NoChatSelected = () => {
  return (
    <section className="flex flex-1 items-center justify-center bg-base-200">
      <div className="w-full px-6 sm:max-w-lg sm:mx-auto lg:px-12 text-center">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 animate-bounce">
          <MessageSquareDashed className="h-8 w-8 text-primary" />
        </div>

        <h2 className="text-xl font-semibold text-base-content">
          No conversation selected
        </h2>

        <p className="mt-3 text-sm text-base-content/70 leading-relaxed">
          Select a contact from the sidebar to start a new conversation.
        </p>

        <div className="mt-6 text-xs text-base-content/50">
          Your messages are protected with end-to-end encryption
        </div>
      </div>
    </section>
  );
};

export default NoChatSelected;
