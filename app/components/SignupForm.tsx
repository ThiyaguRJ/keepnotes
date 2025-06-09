"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const SignupForm = ({
  setShowLogin,
}: {
  setShowLogin: (show: boolean) => void;
}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Registration successful!");
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setTimeout(() => {
          setShowLogin(true);
        }, 1000);
      } else {
        setMessage(data.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setMessage("An unexpected error occurred.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-50">
      <motion.div
        initial={{ x: 200, rotate: 180, opacity: 0 }}
        animate={{ x: 0, rotate: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 80,
          damping: 14,
          duration: 0.8,
        }}
        className="bg-white transition-colors p-8 rounded-lg shadow-md w-96 border-2 border-purple-400">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Sign up
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-gray-400"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-gray-400"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline border-gray-400"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="confirm-password"
              className="block text-gray-700 text-sm font-bold mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline border-gray-400"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="cursor-pointer bg-gradient-to-br from-green-400 to-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline border border-gray-600">
              Register
            </button>
            <button
              type="button"
              onClick={() => setShowLogin(true)}
              className="cursor-pointer bg-gradient-to-br from-violet-300 to-violet-700 hover:from-purple-300 hover:to-purple-700 transition-colors duration-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline border border-gray-600">
              Login
            </button>
          </div>
        </form>
        {message && (
          <p className="text-center mt-4 text-sm text-red-500">{message}</p>
        )}
      </motion.div>
    </div>
  );
};

export default SignupForm;
