import styles from "./projects.module.css";
import { dictionaries } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

export default function Projects({ locale }: { locale: Locale }) {
  const t = dictionaries[locale].projects;

  return (
    <section id="projects" className={styles.projects}>
      <h2 className={styles.heading}>{t.heading}</h2>
      <div className={styles.list}>
        {t.items.map((project) => (
          <div key={project.title} className={styles.item}>
            <h3 className={styles.itemTitle}>{project.title}</h3>
            <p className={styles.itemText}>{project.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}