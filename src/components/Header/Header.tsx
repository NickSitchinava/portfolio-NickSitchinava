import styles from "./header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <a href="#home" className={styles.logo}>
        Nick Sitchinava
      </a>
      <nav className={styles.nav}>
        <a href="#about">About</a>
        <a href="#services">Services</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  );
}