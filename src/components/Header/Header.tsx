"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./header.module.css";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={styles.wrapper}>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
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
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>
    </div>
  );
}