"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import ThemeToggle from "./theme-toggle";
import { profile } from "@/data/profile";
import styles from "./nav.module.scss";

const links = [
  { href: "#skills", label: "skills" },
  { href: "#projects", label: "projects" },
  { href: "#experience", label: "experience" },
];

export default function Nav() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <header className={styles.header}>
      <motion.span
        className={styles.progress}
        style={{ scaleX: progress }}
        aria-hidden
      />
      <nav className={styles.nav}>
        <a href="#top" className={styles.brand}>
          <span className={styles.brandPrompt}>~</span>
          <span className={styles.brandName}>{profile.handle}</span>
          <span className={styles.brandCursor}>▊</span>
        </a>

        <ul className={styles.links}>
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className={styles.link}>
                <span className={styles.linkIndex}>0{links.indexOf(l) + 1}</span>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <ThemeToggle />
      </nav>
    </header>
  );
}
