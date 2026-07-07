"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button/Button";
import LanguageSwitcher from "./LanguageSwitcher";
import styles from "./header.module.css";
import { dictionaries } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

export default function Header({ locale }: { locale: Locale }) {
  const [scrolled, setScrolled] = useState(false);
  const t = dictionaries[locale].header;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={styles.wrapper}>
      <header
        className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}
      >
        <a href="#home" className={styles.logo}>
          <Image
            src="/images/logo.webp"
            alt="Nick Sitchinava"
            width={36}
            height={36}
            priority
          />
        </a>
        <nav className={styles.nav}>
          <a href="#about">{t.about}</a>
          <a href="#services">{t.services}</a>
          <a href="#projects">{t.projects}</a>
          <a href="#contact">{t.contact}</a>
        </nav>
        <div className={styles.actions}>
          <LanguageSwitcher locale={locale} />
          <Button
            href="#contact"
            className={styles.cta}
            style={
              {
                "--btn-bg": "#fff",
                "--btn-fg": "#050507",
                "--btn-fill": "oklch(83% 0.006 290)",
                "--btn-fill-fg": "#050507",
              } as React.CSSProperties
            }
          >
            {t.cta}
          </Button>
        </div>
      </header>
    </div>
  );
}