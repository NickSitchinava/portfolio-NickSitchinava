"use client";

import Link from "next/link";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";
import styles from "./language-switcher.module.css";
import type { Locale } from "@/i18n/config";

const OPTIONS: { code: Locale; label: string }[] = [
  { code: "en", label: "English" },
  { code: "ka", label: "ქართული" },
];

const EASE = [0.23, 1, 0.32, 1] as const;
const PANEL_GAP = 10;

export default function LanguageSwitcher({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [coords, setCoords] = useState({ top: 0, right: 0 });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const computeCoords = () => {
    const rect = triggerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setCoords({
      top: rect.bottom + PANEL_GAP,
      right: window.innerWidth - rect.right,
    });
  };

  useEffect(() => {
    if (!open) return;

    computeCoords();

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (
        !triggerRef.current?.contains(target) &&
        !panelRef.current?.contains(target)
      ) {
        setOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const handleReposition = () => computeCoords();

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleReposition);
    window.addEventListener("scroll", handleReposition, true);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleReposition);
      window.removeEventListener("scroll", handleReposition, true);
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={styles.trigger}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Change language"
        onClick={() => setOpen((value) => !value)}
      >
        <span className={styles.triggerLabel}>{locale.toUpperCase()}</span>
        <motion.span
          className={styles.chevron}
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
        >
          <ChevronDown size={13} strokeWidth={2} />
        </motion.span>
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                ref={panelRef}
                role="menu"
                className={styles.panel}
                style={{ top: coords.top, right: coords.right }}
                initial={{ opacity: 0, scale: 0.95, y: -4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -4 }}
                transition={{ duration: 0.16, ease: EASE }}
              >
                {OPTIONS.map((option) => {
                  const isActive = option.code === locale;
                  return (
                    <Link
                      key={option.code}
                      href={`/${option.code}`}
                      role="menuitem"
                      className={styles.item}
                      data-active={isActive ? "true" : "false"}
                      onClick={() => setOpen(false)}
                    >
                      <span>{option.label}</span>
                      {isActive && <Check size={14} strokeWidth={2} />}
                    </Link>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}