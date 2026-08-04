"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "./section-heading";
import { education, type Education } from "@/data/profile";
import styles from "./education.module.scss";

function TraceConnector() {
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <div className={styles.connector} aria-hidden>
      <motion.span
        className={styles.flowLine}
        initial={{ scaleX: 0, scaleY: 0 }}
        whileInView={{ scaleX: 1, scaleY: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      />
      <span className={styles.flowGlow} />
      <motion.span
        className={styles.flowDot}
        initial={false}
        animate={
          desktop
            ? { left: ["100%", "0%"], opacity: [0, 1, 1, 0] }
            : { top: ["100%", "0%"], opacity: [0, 1, 1, 0] }
        }
        transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 0.6 }}
      />
    </div>
  );
}

function EducationNode({
  entry,
  index,
}: {
  entry: Education;
  index: number;
}) {
  const running = entry.status === "IN PROGRESS";

  return (
    <motion.article
      className={`${styles.node} ${running ? styles.nodeActive : ""}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={styles.nodeTop}>
        <span className={styles.nodeTag}>{entry.school}</span>
        <span className={styles.nodeTime}>[ {entry.timeline} ]</span>
      </div>

      <h3 className={styles.degree}>{entry.degree}</h3>
      <p className={styles.location}>{entry.location}</p>

      <div className={`${styles.status} ${running ? styles.statusRunning : ""}`}>
        {running ? (
          <>
            <span className={styles.statusPing} aria-hidden />
            <span>active process</span>
          </>
        ) : (
          <>
            <span className={styles.statusCheck} aria-hidden>
              ✓
            </span>
            <span>execution complete</span>
          </>
        )}
      </div>

      {running && (
        <div className={styles.progressTrack}>
          <motion.span
            className={styles.progressFill}
            initial={{ width: 0 }}
            whileInView={{ width: `${entry.progress}%` }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      )}
    </motion.article>
  );
}

export default function Education() {
  return (
    <section id="education" className={`${styles.section} container`}>
      <SectionHeading
        index="04"
        code="education"
        title="Education"
      />

      <div className={styles.trace}>
        {education.flatMap((entry, i) => [
          i > 0 ? <TraceConnector key={`conn-${i}`} /> : null,
          <EducationNode key={entry.id} entry={entry} index={i} />,
        ])}
      </div>
    </section>
  );
}
