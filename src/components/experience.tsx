"use client";

import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import SectionHeading from "./section-heading";
import { experiences } from "@/data/profile";
import { hueFor } from "@/lib/tech";
import { useFocus } from "./focus-provider";
import styles from "./experience.module.scss";

function ExperienceNode({
  exp,
  index,
  last,
}: {
  exp: (typeof experiences)[number];
  index: number;
  last: boolean;
}) {
  const { setFocused } = useFocus();

  return (
    <motion.li
      className={styles.node}
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={styles.rail}>
        <span className={styles.marker}>
          <i className={styles.markerCore} />
          <i className={styles.markerRing} />
        </span>
        {!last && <span className={styles.railLine} />}
      </div>

      <article className={styles.card}>
        <div className={styles.cardTop}>
          <span className={styles.nodeTag}>{exp.node}</span>
          <span className={styles.period}>{exp.period}</span>
        </div>
        <h3 className={styles.role}>{exp.role}</h3>
        <p className={styles.company}>
          {exp.company}
          <span className={styles.sep}>·</span>
          {exp.location}
        </p>

        <ul className={styles.points}>
          {exp.points.map((p) => (
            <li key={p}>
              <span className={styles.pointArrow}>›</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>

        <div className={styles.tags}>
          {exp.tags.map((t) => (
            <button
              key={t}
              type="button"
              className={styles.tag}
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
      </article>
    </motion.li>
  );
}

export default function Experience() {
  return (
    <section id="experience" className={`${styles.section} container`}>
      <SectionHeading
        index="01"
        code="experience"
        title="Experience"
      />

      <div className={styles.pipeline}>
        <ul className={styles.nodes}>
          {experiences.map((exp, i) => (
            <ExperienceNode
              key={exp.id}
              exp={exp}
              index={i}
              last={i === experiences.length - 1}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
