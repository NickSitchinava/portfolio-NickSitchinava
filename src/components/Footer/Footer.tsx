import styles from "./footer.module.css";
import { dictionaries } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

export default function Footer({ locale }: { locale: Locale }) {
  const year = new Date().getFullYear();
  const t = dictionaries[locale].footer;

  return (
    <footer className={styles.footer}>
      <p>
        &copy; {year} Nick Sitchinava. {t.rights}
      </p>
    </footer>
  );
}