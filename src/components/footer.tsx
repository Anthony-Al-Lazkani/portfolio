import { profile } from "@/data/profile";
import styles from "./footer.module.scss";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`${styles.inner} container`}>
        <div className={styles.status}>
          <span className={styles.prompt}>$</span>
          <span>system_idle</span>
          <span className={styles.dot} />
          <span className={styles.muted}>all systems nominal</span>
        </div>

        <div className={styles.meta}>
          <div className={styles.links}>
            <a href={`mailto:${profile.email}`}>email</a>
            <a href={profile.github} target="_blank" rel="noreferrer">
              github
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              linkedin
            </a>
          </div>
          <p className={styles.copy}>
            © {year} {profile.name} · engineered with next.js · framer-motion ·
            sass
          </p>
        </div>
      </div>
    </footer>
  );
}
