"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { IconBrandGithub, IconBrandLinkedin, IconMail } from "@tabler/icons-react";
import ThemeToggle from "./theme-toggle";
import { profile } from "@/data/profile";
import styles from "./nav.module.scss";

const links = [
  { href: "#skills", label: "skills" },
  { href: "#experience", label: "experience" },
  { href: "#projects", label: "projects" },
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

        <div className={styles.socials}>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className={styles.social}
          >
            <IconBrandLinkedin size={18} />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className={styles.social}
          >
            <IconMail size={18} />
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className={styles.social}
          >
            <IconBrandGithub size={18} />
          </a>
        </div>
      </nav>
    </header>
  );
}
