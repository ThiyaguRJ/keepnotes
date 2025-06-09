"use client";

import React, { useState } from "react";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";

export default function Home() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="bg-purple-50">
      <div className="flex flex-col items-center justify-center">
        {showLogin ? (
          <LoginForm setShowLogin={setShowLogin} />
        ) : (
          <SignupForm setShowLogin={setShowLogin} />
        )}
      </div>
    </div>
  );
}
