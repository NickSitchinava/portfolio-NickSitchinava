"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./logo-square.module.css";
import type { Locale } from "@/i18n/config";

export default function LogoSquare({ locale }: { locale: Locale }) {
  return (
    <motion.div
      className={styles.wrapper}
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <a href={`/${locale}#home`} className={styles.square} aria-label="Nick Sitchinava">
        <Image src="/images/logo.webp" alt="Nick Sitchinava" width={28} height={28} priority />
      </a>
    </motion.div>
  );
}