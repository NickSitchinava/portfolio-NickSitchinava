import styles from "./contact.module.css";

export default function Contact() {
  return (
    <section id="contact" className={styles.contact}>
      <h2 className={styles.heading}>Contact</h2>
      <p className={styles.text}>
        Have a project in mind? Send me a message and let&apos;s talk about
        it.
      </p>
      <a href="mailto:hello@nicksitchinava.dev" className={styles.email}>
        hello@nicksitchinava.dev
      </a>
    </section>
  );
}