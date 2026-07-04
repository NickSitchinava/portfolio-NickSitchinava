import styles from "./services.module.css";
import { dictionaries } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

export default function Services({ locale }: { locale: Locale }) {
  const t = dictionaries[locale].services;

  return (
    <section id="services" className={styles.services}>
      <h2 className={styles.heading}>{t.heading}</h2>
      <div className={styles.list}>
        {t.items.map((service) => (
          <div key={service.title} className={styles.item}>
            <h3 className={styles.itemTitle}>{service.title}</h3>
            <p className={styles.itemText}>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}