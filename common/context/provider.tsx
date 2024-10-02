"use client";

import { useState, useContext } from "react";

import AppContext from "@/common/context/app-context";

export default function Provider({ children }: { children: React.ReactNode }) {
  const [showMenu, setShowMenu] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const value = {
    showMenu,
    setShowMenu,
    name,
    setName,
    email,
    setEmail,
    message,
    setMessage,
    submitting,
    setSubmitting,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useHooks() {
  return useContext(AppContext);
}
