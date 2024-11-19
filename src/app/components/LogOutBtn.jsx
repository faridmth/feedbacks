"use client"; // Ensure this is a client component

import { signOut } from "next-auth/react";

const LogOutBtn = () => {
  const handleLogout = async () => {
    try {
      // This assumes you're using NextAuth.js
      await signOut({ redirect: true, callbackUrl: "/" });
    } catch (error) {
      console.error("Error during sign-out:", error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="underline"
    >
      LogOut
    </button>
  );
};

export default LogOutBtn;
