"use client";
import { signOut } from "next-auth/react";

const SignOutBtn = () => {
  return <button className="z-50" onClick={() => signOut()}>Sign Out</button>;
};

export default SignOutBtn;
