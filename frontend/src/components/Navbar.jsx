import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { LogOut, User, Settings } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <nav className="w-full  shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        
        {/* LEFT SIDE */}
        <Link to="/">
        <div className="text-lg font-semibold tracking-wide ">
          Connect
        </div>
        </Link>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">
          {authUser && (
            <>
              {/* settings */}

              <Link
                to="/settings"
                className="flex items-center gap-2 px-4 py-2 rounded-xl
                            hover:transition
                           shadow-sm "
              >
                <Settings className="size-5" />
                <span className="hidden sm:inline font-medium">
                  Settings
                </span>
              </Link>


              {/* PROFILE */}
              <Link
                to="/profile"
                className="flex items-center gap-2 px-4 py-2 rounded-xl
                            hover:transition
                           shadow-sm "
              >
                <User className="size-5" />
                <span className="hidden sm:inline font-medium">
                  Profile
                </span>
              </Link>

              {/* LOGOUT */}
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 rounded-xl
                           hover:transition cursor-pointer"
              >
                <LogOut className="size-5" />
                <span className="hidden sm:inline font-medium">
                  Logout
                </span>
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
