"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { bootLines } from "@/data/profile";
import { useHydrated } from "./use-hydrated";
import styles from "./boot-screen.module.scss";

export default function BootScreen() {
  const mounted = useHydrated();
  const [shown, setShown] = useState(0);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (!mounted) return;
    if (shown >= bootLines.length) {
      const t = setTimeout(() => setGone(true), 500);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setShown((s) => s + 1), 170);
    return () => clearTimeout(t);
  }, [mounted, shown]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          onClick={() => setGone(true)}
        >
          <div className={styles.term}>
            <div className={styles.bar}>
              <span className={styles.dot} />
              <span className={styles.dot} />
              <span className={styles.dot} />
              <span className={styles.title}>anthony@lazkani — boot</span>
            </div>
            <div className={styles.body}>
              {bootLines.slice(0, shown).map((line, i) => (
                <motion.p
                  key={i}
                  className={`${styles.line} ${styles[line.tone ?? "out"]}`}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <span className={styles.prompt}>{line.prompt}</span>
                  <span>{line.text}</span>
                </motion.p>
              ))}
              {shown < bootLines.length && (
                <motion.span
                  className={styles.cursor}
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ repeat: Infinity, duration: 0.7 }}
                >
                  ▊
                </motion.span>
              )}
            </div>
          </div>
          <p className={styles.hint}>click to skip</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
