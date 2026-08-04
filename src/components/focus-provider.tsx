"use client";

import { createContext, useContext, useState } from "react";

type FocusCtx = {
  focused: string | null;
  setFocused: (tech: string | null) => void;
};

const Ctx = createContext<FocusCtx>({
  focused: null,
  setFocused: () => {},
});

export function FocusProvider({ children }: { children: React.ReactNode }) {
  const [focused, setFocused] = useState<string | null>(null);
  return <Ctx.Provider value={{ focused, setFocused }}>{children}</Ctx.Provider>;
}

export const useFocus = () => useContext(Ctx);
