"use client";

import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import SectionHeading from "./section-heading";
import { skillCategories } from "@/data/profile";
import { hueFor } from "@/lib/tech";
import { useFocus } from "./focus-provider";
import styles from "./skills.module.scss";

export default function Skills() {
  const { focused, setFocused } = useFocus();

  return (
    <section id="skills" className={`${styles.section} container`}>
      <SectionHeading
        index="01"
        code="module_registry"
        title="The Module Registry"
        trace={focused ?? "scanning"}
      />

      <div className={styles.bento}>
        {skillCategories.map((cat, ci) => {
          const mod = ci % 2 === 0;
          return (
            <motion.article
              key={cat.id}
              className={`${styles.card} ${mod ? styles.cardWideA : styles.cardWideB}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: ci * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.cardHead}>
                <span className={styles.code}>{cat.code}</span>
                <span className={styles.hint}>{cat.hint}</span>
              </div>
              <h3 className={styles.cardTitle}>{cat.label}</h3>

              <div className={styles.nodes}>
                {cat.items.map((tech) => {
                  const hue = hueFor(tech);
                  const active = focused === tech;
                  const dimmed = focused !== null && focused !== tech;
                  return (
                    <button
                      key={tech}
                      type="button"
                      className={`${styles.node} ${active ? styles.nodeActive : ""} ${
                        dimmed ? styles.nodeDim : ""
                      }`}
                      style={{ "--t-hue": hue } as CSSProperties}
                      onMouseEnter={() => setFocused(tech)}
                      onMouseLeave={() => setFocused(null)}
                      onFocus={() => setFocused(tech)}
                      onBlur={() => setFocused(null)}
                    >
                      <span className={styles.nodeDot} aria-hidden />
                      <span>{tech}</span>
                    </button>
                  );
                })}
              </div>

              <div className={styles.scan} aria-hidden />
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
