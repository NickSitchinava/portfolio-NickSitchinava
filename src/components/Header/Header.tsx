"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button/Button";
import styles from "./header.module.css";
import { dictionaries } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

type Theme = "light" | "dark";

export default function Header({ locale }: { locale: Locale }) {
  const [scrolled, setScrolled] = useState(false);
  const [overHero, setOverHero] = useState(true);
  const [activeTheme, setActiveTheme] = useState<Theme>("light");
  const [revealTheme, setRevealTheme] = useState<Theme | null>(null);
  const [coverSize, setCoverSize] = useState(0);
  const headerRef = useRef<HTMLElement>(null);
  const revealId = useRef(0);
  const t = dictionaries[locale].header;
  const otherLocale: Locale = locale === "en" ? "ka" : "en";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const heroEl = document.getElementById("home");
    if (!heroEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => setOverHero(entry.isIntersecting),
      { rootMargin: "-80px 0px 0px 0px", threshold: 0 }
    );

    observer.observe(heroEl);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const desired: Theme = overHero ? "light" : "dark";
    if (desired === activeTheme) return;

    const node = headerRef.current;
    if (!node) {
      setActiveTheme(desired);
      return;
    }

    const rect = node.getBoundingClientRect();
    const diameter = 2 * Math.hypot(rect.width / 2, rect.height / 2);

    revealId.current += 1;
    setCoverSize(diameter);
    setRevealTheme(desired);
  }, [overHero, activeTheme]);

  return (
    <div className={styles.wrapper}>
      <header
        ref={headerRef}
        className={`${styles.header} ${scrolled ? styles.scrolled : ""} ${
          activeTheme === "light" ? styles.themeLight : styles.themeDark
        }`}
      >
        {revealTheme && (
          <motion.span
            key={revealId.current}
            aria-hidden
            className={`${styles.revealDot} ${
              revealTheme === "light" ? styles.themeLight : styles.themeDark
            }`}
            style={{
              width: coverSize,
              height: coverSize,
              marginLeft: -coverSize / 2,
              marginTop: -coverSize / 2,
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 22, mass: 0.9 }}
            onAnimationComplete={() => {
              setActiveTheme(revealTheme);
              setRevealTheme(null);
            }}
          />
        )}

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
        <Link href={`/${otherLocale}`} className={styles.langSwitch}>
          {otherLocale.toUpperCase()}
        </Link>
        <Button
          href="#contact"
          className={styles.cta}
          style={
            {
              "--btn-bg": "#fff",
              "--btn-fg": "#050507",
              "--btn-fill": "#050507",
              "--btn-fill-fg": "#fff",
            } as React.CSSProperties
          }
        >
          {t.cta}
        </Button>
      </header>
    </div>
  );
}