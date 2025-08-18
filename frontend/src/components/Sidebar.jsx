import React from "react";
import { LogOut, X } from "lucide-react";
import userImg from "../userImg.png"; // Make sure this path is correct
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Sidebar() {
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const [, setAuthUser] = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4002/api/v1/user/logout",
        {
          withCredentials: true,
        }
      );

      localStorage.removeItem("user");
      localStorage.removeItem("token");

      alert(data.message);

      setAuthUser(null);
      navigate("/login");
    } catch (error) {
      alert(error?.response?.data?.errors || "Logout Failed");
    }
  };

  // ✅ Add onClose to prevent runtime error
  const onClose = () => {
    console.log("Sidebar close button clicked!");
    // Add actual sidebar close logic here if needed
  };

  return (
    <div className="h-full flex flex-col justify-between p-4">
      {/* Header */}
      <div>
        <div className="flex border-b border-gray-600 p-2 justify-between items-center mb-4">
          <div className="text-2xl font-bold text-gray-200">deepseek</div>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-gray-400 md:hidden" />
          </button>
        </div>

        {/* History */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
          <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl mb-4">
            + New Chat
          </button>
          <div className="text-gray-500 text-sm mt-20 text-center">
            No chat history yet
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 cursor-pointer">
            <img className="rounded-full w-8 h-8" src={userImg} alt="Profile" />
            <span className="text-gray-300">
              {loggedInUser?.firstName || "My Profile"}
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center text-sm gap-2 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
