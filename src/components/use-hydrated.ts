"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

// Hydration-safe "is client mounted" flag that satisfies
// react-hooks/set-state-in-effect (avoids synchronous setState in effects).
export function useHydrated(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}
