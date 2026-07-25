"use client";

import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";
import styles from "./pricing-calculator.module.css";

const PANEL_GAP = 8;

export interface DropdownOption {
  value: string;
  label: string;
  description?: string;
}

export interface DropdownFieldProps {
  index: number;
  label: string;
  placeholder: string;
  options: DropdownOption[];
  value: string | null;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function DropdownField({
  index,
  label,
  placeholder,
  options,
  value,
  onChange,
  disabled = false,
}: DropdownFieldProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  const computeCoords = () => {
    const rect = triggerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setCoords({
      top: rect.bottom + PANEL_GAP,
      left: rect.left,
      width: rect.width,
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

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className={styles.field}>
      <div className={styles.fieldHeader}>
        <span className={styles.fieldIndex}>{index}</span>
        <span className={styles.fieldLabel}>{label}</span>
      </div>

      <button
        ref={triggerRef}
        type="button"
        className={styles.fieldTrigger}
        data-disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        disabled={disabled}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className={styles.fieldTriggerLabel} data-placeholder={!selectedOption}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <motion.span
          className={styles.fieldChevron}
          animate={{ rotate: open ? 180 : 0 }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.4, ease: "easeInOut", type: "spring" }
          }
        >
          <ChevronDown size={18} strokeWidth={2} />
        </motion.span>
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && !disabled && (
              <motion.div
                ref={panelRef}
                role="listbox"
                className={styles.fieldPanel}
                style={{ top: coords.top, left: coords.left, width: coords.width }}
                initial={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : { y: -5, scale: 0.95, filter: "blur(10px)", opacity: 0 }
                }
                animate={
                  prefersReducedMotion
                    ? { opacity: 1 }
                    : { y: 0, scale: 1, filter: "blur(0px)", opacity: 1 }
                }
                exit={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : { y: -5, scale: 0.95, filter: "blur(10px)", opacity: 0 }
                }
                transition={
                  prefersReducedMotion
                    ? { duration: 0.15 }
                    : { duration: 0.6, ease: "circInOut", type: "spring" }
                }
              >
                {options.map((option, optionIndex) => {
                  const isActive = option.value === value;
                  return (
                    <motion.button
                      type="button"
                      key={option.value}
                      role="option"
                      aria-selected={isActive}
                      className={styles.fieldOption}
                      data-active={isActive}
                      initial={
                        prefersReducedMotion
                          ? { opacity: 0 }
                          : { opacity: 0, x: 10, scale: 0.95, filter: "blur(10px)" }
                      }
                      animate={
                        prefersReducedMotion
                          ? { opacity: 1 }
                          : { opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }
                      }
                      exit={
                        prefersReducedMotion
                          ? { opacity: 0 }
                          : { opacity: 0, x: 10, scale: 0.95, filter: "blur(10px)" }
                      }
                      transition={
                        prefersReducedMotion
                          ? { duration: 0.1 }
                          : {
                              duration: 0.4,
                              delay: optionIndex * 0.05,
                              ease: "easeInOut",
                              type: "spring",
                            }
                      }
                      whileTap={{
                        scale: 0.97,
                        transition: { duration: 0.2, ease: "easeInOut" },
                      }}
                      onClick={() => {
                        onChange(option.value);
                        setOpen(false);
                      }}
                    >
                      <span className={styles.fieldOptionText}>
                        <span className={styles.fieldOptionLabel}>{option.label}</span>
                        {option.description && (
                          <span className={styles.fieldOptionDescription}>
                            {option.description}
                          </span>
                        )}
                      </span>
                      {isActive && <Check size={16} strokeWidth={2} />}
                    </motion.button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}

export default DropdownField;