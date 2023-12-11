"use client";
import { signOut } from "next-auth/react";

const SignOutBtn = () => {
  return (
    <button className="" onClick={() => signOut()}>
      Sign Out
    </button>
  );
};

export default SignOutBtn;
