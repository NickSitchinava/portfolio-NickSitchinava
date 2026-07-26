"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./language-toggle.module.css";
import type { Locale } from "@/i18n/config";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function LanguageToggle({ locale }: { locale: Locale }) {
  return (
    <motion.div
      className={styles.wrapper}
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE }}
    >
      <div className={styles.pill}>
        <Link
          href="/en"
          className={styles.segment}
          data-active={locale === "en"}
          aria-current={locale === "en" ? "true" : undefined}
        >
          EN
        </Link>

        <span className={styles.divider} aria-hidden="true" />

        <Link
          href="/ka"
          className={styles.segment}
          data-active={locale === "ka"}
          aria-current={locale === "ka" ? "true" : undefined}
        >
          KA
        </Link>
      </div>
    </motion.div>
  );
}