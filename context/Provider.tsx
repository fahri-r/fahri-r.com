"use client";

import { useState, useContext } from "react";

import AppContext from "@/context/AppContext";

export default function Provider({ children }: { children: React.ReactNode }) {
  const [showMenu, setShowMenu] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const value = {
    showMenu,
    setShowMenu,
    name,
    setName,
    email,
    setEmail,
    message,
    setMessage,
    visible,
    setVisible,
    submitting,
    setSubmitting,
    isVisible,
    setIsVisible,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useHooks() {
  return useContext(AppContext);
}
