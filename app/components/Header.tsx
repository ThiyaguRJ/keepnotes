"use client";

import React from "react";

const Header = ({
  onLogout,
}: {
  isLoggedIn: boolean;
  onLogout: () => void;
}) => {
  return (
    <header className="bg-gradient-to-r from-purple-400 to-violet-200 transition-colors  p-4 shadow-md flex justify-between items-center">
      <div className="text-gray-800 text-xl font-bold">KeepNotes</div>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <a href="#" className="text-gray-800 font-bold hover:text-white hidden md:inline">
              About
            </a>
          </li>
          <li>
            <a href="/keepnotes" className="text-gray-800 font-bold hover:text-white">
              Notes
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-800 font-bold hover:text-white">
              Account
            </a>
          </li>
          <li>
            <button
              onClick={onLogout}
              className="text-gray-800  font-bold hover:text-xl hover:text-2xl hover:text-red-600 transition-all duration-700  focus:outline-none cursor-pointer">
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
