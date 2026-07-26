"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./floating-menu.module.css";

const ease = [0.22, 1, 0.36, 1] as const;

interface MenuItem {
  label: string;
  href: string;
}

interface FloatingMenuProps {
  items: MenuItem[];
  menuLabel: string;
  onNavigate?: () => void;
}

function MenuLink({
  label,
  href,
  isOpen,
  index,
  onNavigate,
}: {
  label: string;
  href: string;
  isOpen: boolean;
  index: number;
  onNavigate?: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const animatingRef = useRef(false);
  const pendingLeaveRef = useRef(false);
  const chars = label.split("");
  const lockDuration = 30 * chars.length + 300;

  const handleEnter = useCallback(() => {
    pendingLeaveRef.current = false;
    if (hovered) return;
    setHovered(true);
    animatingRef.current = true;
    setTimeout(() => {
      animatingRef.current = false;
      if (pendingLeaveRef.current) {
        pendingLeaveRef.current = false;
        setHovered(false);
      }
    }, lockDuration);
  }, [hovered, lockDuration]);

  const handleLeave = useCallback(() => {
    if (animatingRef.current) {
      pendingLeaveRef.current = true;
    } else {
      setHovered(false);
    }
  }, []);

  return (
    <motion.a
      href={href}
      onClick={onNavigate}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={styles.menuLink}
      animate={{ opacity: isOpen ? 1 : 0 }}
      transition={{
        duration: 0.4,
        delay: isOpen ? 0.4 + 0.08 * index : 0,
        ease,
      }}
    >
      <div className={styles.menuLinkRow}>
        {chars.map((char, i) => (
          <span key={i} className={styles.charMask}>
            <span
              className={styles.charFlip}
              style={{
                transitionDuration: hovered ? "800ms" : "0ms",
                transitionDelay: hovered ? `${30 * i}ms` : "0ms",
                transform: hovered ? "translateY(-50%)" : "translateY(0%)",
              }}
            >
              <span className={styles.charLine}>{char === " " ? "\u00A0" : char}</span>
              <span className={styles.charLine} aria-hidden>
                {char === " " ? "\u00A0" : char}
              </span>
            </span>
          </span>
        ))}
      </div>
    </motion.a>
  );
}

export default function FloatingMenu({ items, menuLabel, onNavigate }: FloatingMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const CLOSED_HEIGHT = 48;
  const OPEN_HEIGHT = 240;
  const CLOSED_WIDTH = 128;
  const OPEN_WIDTH = 240;

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen]);

  const handleNavigate = () => {
    setIsOpen(false);
    onNavigate?.();
  };

  return (
    <motion.div
      ref={containerRef}
      className={styles.wrapper}
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease }}
    >
      <motion.div
        className={styles.shell}
        onClick={() => {
          if (!isOpen) setIsOpen(true);
        }}
        style={{ cursor: isOpen ? "default" : "pointer" }}
        animate={{
          width: isOpen ? OPEN_WIDTH : CLOSED_WIDTH,
          height: isOpen ? OPEN_HEIGHT : CLOSED_HEIGHT,
          borderRadius: isOpen ? 28 : 72,
        }}
        whileHover={isOpen ? undefined : { scale: 1.05 }}
        transition={{
          duration: 0.8,
          ease,
          height: { duration: isOpen ? 0.8 : 0.15 },
          scale: { duration: 0.25, ease },
        }}
      >
        <motion.div className={styles.shellBg} aria-hidden="true" />

        <motion.div
          className={styles.shellReveal}
          animate={{
            top: isOpen ? -40 : CLOSED_HEIGHT + 40,
          }}
          transition={{ duration: 0.8, ease, delay: isOpen ? 0.1 : 0 }}
          aria-hidden="true"
        />

        <button
          type="button"
          className={styles.toggleBar}
          onClick={() => setIsOpen((value) => !value)}
          aria-expanded={isOpen}
          aria-label={menuLabel}
        >
          <motion.span
            className={styles.toggleLabel}
            animate={{ color: isOpen ? "#ffffff" : "#111111" }}
            transition={{ duration: 0.3, ease }}
          >
            {menuLabel}
          </motion.span>

          <div className={styles.burger}>
            <motion.span
              className={styles.burgerLine}
              animate={{
                rotate: isOpen ? 45 : 0,
                y: isOpen ? 0 : -3,
                backgroundColor: isOpen ? "#ffffff" : "#111111",
              }}
              transition={{ duration: 0.4, ease }}
            />
            <motion.span
              className={styles.burgerLine}
              animate={{
                rotate: isOpen ? -45 : 0,
                y: isOpen ? 0 : 3,
                backgroundColor: isOpen ? "#ffffff" : "#111111",
              }}
              transition={{ duration: 0.4, ease }}
            />
          </div>
        </button>

        <nav
          className={styles.menuItems}
          style={{
            pointerEvents: isOpen ? "auto" : "none",
            opacity: isOpen ? 1 : 0,
          }}
          aria-hidden={!isOpen}
        >
          {items.map((item, idx) => (
            <MenuLink
              key={item.label}
              label={item.label}
              href={item.href}
              isOpen={isOpen}
              index={idx}
              onNavigate={handleNavigate}
            />
          ))}
        </nav>
      </motion.div>
    </motion.div>
  );
}