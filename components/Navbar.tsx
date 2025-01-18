"use client";

import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    // Clear the user's token from localStorage to log them out
    localStorage.removeItem("token");

    // Redirect the user to the homepage
    router.push("/");
  };

  return (
    <nav className="w-full bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <button
          onClick={handleLogout}
          className="text-white font-semibold text-lg px-6 py-2 bg-teal-500 rounded-full hover:bg-teal-600 transition-all focus:outline-none focus:ring-4 focus:ring-teal-300"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
