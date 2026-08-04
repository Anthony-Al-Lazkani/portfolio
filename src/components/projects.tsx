"use client";

import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import SectionHeading from "./section-heading";
import { projects, type Project, type TermLine } from "@/data/profile";
import { hueFor } from "@/lib/tech";
import { useFocus } from "./focus-provider";
import styles from "./projects.module.scss";

function Terminal({ lines }: { lines: TermLine[] }) {
  return (
    <div className={styles.terminal}>
      {lines.map((line, i) => (
        <motion.p
          key={i}
          className={`${styles.termLine} ${styles[line.tone ?? "out"]}`}
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.3, delay: 0.35 + i * 0.22 }}
        >
          <span className={styles.termPrompt}>{line.prompt}</span>
          <span>{line.text}</span>
        </motion.p>
      ))}
      <motion.span
        className={styles.cursor}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0, 1] }}
        transition={{ delay: 0.35 + lines.length * 0.22, repeat: Infinity, duration: 0.9 }}
      >
        ▊
      </motion.span>    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { focused, setFocused } = useFocus();

  const rel = focused !== null && project.tech.includes(focused);
  const dimmed = focused !== null && !rel;

  return (
    <motion.article
      className={`${styles.card} ${rel ? styles.cardRel : ""} ${
        dimmed ? styles.cardDim : ""
      }`}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={styles.chrome}>
        <span className={styles.dots}>
          <i />
          <i />
          <i />
        </span>
        <span className={styles.cmd}>{project.cmd}</span>
      </div>

      <div className={styles.body}>
        <div className={styles.head}>
          <h3 className={styles.name}>{project.name}</h3>
          {project.status === "NEW" && <span className={styles.badge}>NEW</span>}
        </div>

        <p className={styles.desc}>{project.description}</p>

        <div className={styles.tech}>
          {project.tech.map((t) => (
            <button
              key={t}
              type="button"
              className={`${styles.techChip} ${
                focused === t ? styles.techChipActive : ""
              }`}
              style={{ "--t-hue": hueFor(t) } as CSSProperties}
              onMouseEnter={() => setFocused(t)}
              onMouseLeave={() => setFocused(null)}
              onFocus={() => setFocused(t)}
              onBlur={() => setFocused(null)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <Terminal lines={project.lines} />
    </motion.article>
  );
}

export default function Projects() {
  const { focused } = useFocus();

  return (
    <section id="projects" className={`${styles.section} container`}>
      <SectionHeading
        index="02"
        code="deployed_modules"
        title="Deployed Modules"
        trace={focused ?? "idle"}
      />
      <div className={styles.grid}>
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
