import React from "react";
import { THEMES } from "../constants/index.js";
import { useThemeStore } from "../store/useThemeStore";

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="h-full overflow-y-auto bg-base-200">
      <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-16 pt-10 pb-24">
        <div className="space-y-10">
          {/* ===== Themes Header ===== */}
          <div className="space-y-1">
            <h2 className="text-lg font-semibold">Themes</h2>
            <p className="text-sm text-base-content/70">
              Choose a theme:
            </p>
          </div>

          {/* ===== Theme Grid ===== */}
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
            {THEMES.map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`
                  flex flex-col items-center gap-2 p-2 rounded-lg
                  transition-colors
                  ${
                    theme === t
                      ? "bg-base-200 ring-1 ring-base-300"
                      : "hover:bg-base-200/60"
                  }
                `}
              >
                <div
                  className="relative h-8 w-full rounded-md overflow-hidden"
                  data-theme={t}
                >
                  <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                    <div className="rounded bg-primary" />
                    <div className="rounded bg-secondary" />
                    <div className="rounded bg-accent" />
                    <div className="rounded bg-neutral" />
                  </div>
                </div>

                <span className="text-[11px] font-medium truncate w-full text-center">
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </span>
              </button>
            ))}
          </div>

          {/* ===== Preview Section ===== */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Preview</h3>

            <div className="rounded-xl border border-base-300 bg-base-100 shadow-lg">
              <div className="p-6 bg-base-200">
                <div className="max-w-lg mx-auto">
                  <div className="bg-base-100 rounded-xl shadow-sm overflow-hidden">
                    {/* Header */}
                    <div className="px-4 py-3 border-b border-base-300">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium">
                          W
                        </div>
                        <div>
                          <h3 className="font-medium text-sm">
                            Willie Jackson
                          </h3>
                          <p className="text-xs text-base-content/70">
                            Online
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Messages */}
                    <div className="p-4 space-y-4 bg-base-200">
                      <div className="flex items-start gap-2">
                        <div className="w-7 h-7 rounded-full bg-neutral text-neutral-content flex items-center justify-center text-xs">
                          W
                        </div>
                        <div className="bg-base-100 border border-base-300 rounded-xl px-3 py-2 text-sm max-w-xs">
                          Hey 👋 How’s the new theme looking?
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <div className="bg-primary text-primary-content rounded-xl px-3 py-2 text-sm max-w-xs">
                          Looks great! Colors and contrast feel clean ✨
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <div className="w-7 h-7 rounded-full bg-neutral text-neutral-content flex items-center justify-center text-xs">
                          W
                        </div>
                        <div className="bg-base-100 border border-base-300 rounded-xl px-3 py-2 text-sm max-w-xs">
                          Nice! Dark mode works well too?
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <div className="bg-primary text-primary-content rounded-xl px-3 py-2 text-sm max-w-xs">
                          Yep 👍 Typography and spacing look solid.
                        </div>
                      </div>
                    </div>

                    {/* Input */}
                    <div className="px-4 py-3 border-t border-base-300">
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          disabled
                          placeholder="Type a message..."
                          className="input input-bordered w-full text-sm"
                        />
                        <button className="btn btn-primary btn-sm rounded-2xl">
                          Send
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ===== End Preview ===== */}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
