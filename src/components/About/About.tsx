import styles from "./about.module.css";

export default function About() {
  return (
    <section id="about" className={styles.about}>
      <h2 className={styles.heading}>About</h2>
      <p className={styles.text}>
        I&apos;m a web developer focused on building clean, fast websites
        and landing pages for businesses and startups. I care about
        performance, structure, and making sure every site is easy to
        find on Google.
      </p>
    </section>
  );
}