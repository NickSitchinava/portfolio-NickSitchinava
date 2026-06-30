import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section id="home" className={styles.hero}>
      <h1 className={styles.heading}>
        Web developer building fast websites and landing pages
      </h1>
      <p className={styles.subtext}>
        I&apos;m Nick Sitchinava. I design and build custom websites and
        landing pages focused on speed, clarity, and results.
      </p>
      <a href="#contact" className={styles.cta}>
        Start a Project
      </a>
    </section>
  );
}