"use client";

import type { CSSProperties, ReactNode } from "react";
import { useCallback, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { IconMapPin } from "@tabler/icons-react";
import MicroCanvas from "./micro-canvas";
import { profile } from "@/data/profile";
import styles from "./hero.module.scss";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 2.0 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const contacts = [
  { label: profile.email, href: `mailto:${profile.email}`, icon: "✉" },
  { label: profile.githubLabel, href: profile.github, icon: "⌘" },
  { label: profile.linkedinLabel, href: profile.linkedin, icon: "◎" },
];

const badges: { k: string; v: string; icon?: ReactNode }[] = [
  { k: "status", v: "online" },
  {
    k: "location",
    v: profile.location,
    icon: (
      <span className={styles.badgeKeyIcon} aria-hidden>
        <IconMapPin size={14} />
      </span>
    ),
  },
  { k: "focus", v: "software / AI" },
];

export default function Hero() {
  const [pos, setPos] = useState({ x: "50%", y: "30%" });

  const onMove = useCallback((e: React.PointerEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({
      x: `${e.clientX - rect.left}px`,
      y: `${e.clientY - rect.top}px`,
    });
  }, []);

  return (
    <section
      id="top"
      className={styles.hero}
      onPointerMove={onMove}
      style={{ "--mx": pos.x, "--my": pos.y } as CSSProperties}
    >
      <div className={styles.canvasWrap}>
        <MicroCanvas density={1} />
      </div>
      <div className={styles.spotlight} aria-hidden />

      <motion.div
        className={styles.content}
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.p variants={item} className={styles.prompt}>
          <span className={styles.promptSign}>$</span>
          whoami --context=software-ai
        </motion.p>

        <motion.h1 variants={item} className={styles.name}>
          Anthony&nbsp;Lazkani
        </motion.h1>

        <motion.div variants={item} className={styles.role}>
          <span className={styles.roleTag}>[</span>
          <span className={styles.roleText}>software engineer</span>
          <span className={styles.roleTag}>]</span>
        </motion.div>

        <motion.p variants={item} className={styles.statement}>
          I am fascinated by how complex systems operate at the{" "}
          <span className={styles.statementAccent}>micro level</span>.
        </motion.p>

        <motion.p variants={item} className={styles.bio}>
          {profile.bio}
        </motion.p>

        <motion.div variants={item} className={styles.badges}>
          {badges.map((b) => (
            <span key={b.k} className={styles.badge}>
              <span className={styles.badgeKey}>{b.icon ?? b.k}</span>
              <span className={styles.badgeVal}>
                <span className={styles.dot} />
                {b.v}
              </span>
            </span>
          ))}
        </motion.div>

        <motion.div variants={item} className={styles.ctas}>
          <a href="#experience" className={`${styles.btn} ${styles.btnPrimary}`}>
            <span className={styles.btnArrow}>▶</span>
            view_system
          </a>
          <a href="#projects" className={`${styles.btn} ${styles.btnGhost}`}>
            inspect_modules
          </a>
        </motion.div>

        <motion.ul variants={item} className={styles.contacts}>
          {contacts.map((c) => (
            <li key={c.label}>
              <a
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className={styles.contact}
              >
                <span className={styles.contactIcon} aria-hidden>
                  {c.icon}
                </span>
                <span>{c.label}</span>
              </a>
            </li>
          ))}
        </motion.ul>
      </motion.div>

      <div className={styles.scrollCue} aria-hidden>
        <span className={styles.scrollText}>scroll</span>
        <span className={styles.scrollLine} />
        <span className={styles.scrollArrow}>▸</span>
      </div>
    </section>
  );
}
