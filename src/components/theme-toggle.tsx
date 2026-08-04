"use client";

import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import { useHydrated } from "./use-hydrated";
import styles from "./theme-toggle.module.scss";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useHydrated();

  const dark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      className={styles.toggle}
      aria-label="Toggle color theme"
      onClick={() => setTheme(dark ? "light" : "dark")}
    >
      <span className={styles.ico} aria-hidden>
        <AnimatePresence mode="wait" initial={false}>
          <motion.svg
            key={dark ? "moon" : "sun"}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ opacity: 0, rotate: -60, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 60, scale: 0.6 }}
            transition={{ duration: 0.25 }}
          >
            {dark ? (
              <>
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </>
            ) : (
              <>
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
              </>
            )}
          </motion.svg>
        </AnimatePresence>
      </span>
      <span className={styles.label}>{dark ? "dark" : "light"}</span>
    </button>
  );
}
