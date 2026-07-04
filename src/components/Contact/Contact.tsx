import styles from "./contact.module.css";
import { dictionaries } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

export default function Contact({ locale }: { locale: Locale }) {
  const t = dictionaries[locale].contact;

  return (
    <section id="contact" className={styles.contact}>
      <h2 className={styles.heading}>{t.heading}</h2>
      <p className={styles.text}>{t.text}</p>
      <a href="mailto:hello@nicksitchinava.dev" className={styles.email}>
        hello@nicksitchinava.dev
      </a>
    </section>
  );
}