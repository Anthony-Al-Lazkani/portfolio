"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";
import { animate, motion, useInView } from "framer-motion";
import SectionHeading from "./section-heading";
import { experiences, metrics, type Metric } from "@/data/profile";
import { hueFor } from "@/lib/tech";
import { useFocus } from "./focus-provider";
import styles from "./experience.module.scss";

function Counter({ metric }: { metric: Metric }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const controls = animate(0, metric.value, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (v) => {
        if (ref.current) {
          ref.current.textContent = `${v.toFixed(metric.decimals)}${metric.suffix}`;
        }
      },
    });
    return () => controls.stop();
  }, [inView, metric]);

  return <span ref={ref}>0{metric.suffix}</span>;
}

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
        index="03"
        code="experience"
        title="Experience"
      />

      <div className={styles.layout}>
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

        <aside className={styles.side}>
          <motion.div
            className={styles.statsCard}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.cardTop}>
              <span className={styles.nodeTag}>METRICS</span>
              <span className={styles.hint}>live telemetry</span>
            </div>
            <ul className={styles.metrics}>
              {metrics.map((m) => (
                <li key={m.key} className={styles.metric}>
                  <div className={styles.metricRow}>
                    <span className={styles.metricKey}>{m.key}</span>
                    <span
                      className={`${styles.metricValue} ${
                        m.tone === "ok"
                          ? styles.valueOk
                          : m.tone === "accent2"
                            ? styles.valueAccent2
                            : styles.valueAccent
                      }`}
                    >
                      <Counter metric={m} />
                    </span>
                  </div>
                  <span className={styles.metricLabel}>{m.label}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </aside>
      </div>
    </section>
  );
}
