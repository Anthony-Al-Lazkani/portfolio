import { motion } from "framer-motion";
import styles from "./section-heading.module.scss";

export default function SectionHeading({
  index,
  code,
  title,
  trace,
}: {
  index: string;
  code: string;
  title: string;
  trace?: string;
}) {
  return (
    <motion.div
      className={styles.heading}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={styles.row}>
        <span className={styles.index}>{index}</span>
        <span className={styles.code}>{"// " + code}</span>
        <span className={styles.rule} />
        {trace && <span className={styles.trace}>trace: {trace}</span>}
      </div>
      <h2 className={styles.title}>{title}</h2>
    </motion.div>
  );
}
