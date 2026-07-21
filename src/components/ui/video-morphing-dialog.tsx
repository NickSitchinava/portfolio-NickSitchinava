"use client";

import * as RdxDialog from "@radix-ui/react-dialog";
import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import styles from "./video-morphing-dialog.module.css";

export interface VideoMorphingDialogProps {
  videoSrc: string;
  label: string;
  className?: string;
}

const EASE = [0.16, 1, 0.3, 1] as const;

export function VideoMorphingDialog({ videoSrc, label, className }: VideoMorphingDialogProps) {
  const [open, setOpen] = React.useState(false);
  const prefersReducedMotion = useReducedMotion();
  const layoutId = React.useId();

  return (
    <RdxDialog.Root open={open} onOpenChange={setOpen}>
      <RdxDialog.Trigger asChild>
        <motion.button
          type="button"
          layoutId={`video-frame-${layoutId}`}
          className={`${styles.trigger} ${className ?? ""}`}
          aria-label={label}
          animate={{ opacity: open ? 0 : 1 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.2, ease: EASE }}
        >
          <video
            className={styles.video}
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
          <span className={styles.playBadge} aria-hidden="true">
            {label}
          </span>
        </motion.button>
      </RdxDialog.Trigger>

      <AnimatePresence>
        {open && (
          <RdxDialog.Portal forceMount>
            <RdxDialog.Overlay asChild forceMount>
              <motion.div
                className={styles.overlay}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: EASE }}
              />
            </RdxDialog.Overlay>

            <RdxDialog.Content asChild forceMount aria-describedby={undefined}>
              <div className={styles.content}>
                <motion.div
                  layoutId={`video-frame-${layoutId}`}
                  className={styles.contentInner}
                  transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.45, ease: EASE }}
                >
                  <RdxDialog.Title className={styles.srOnly}>{label}</RdxDialog.Title>
                  <video
                    className={styles.expandedVideo}
                    src={videoSrc}
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls
                  />
                  <RdxDialog.Close asChild>
                    <button type="button" className={styles.closeButton} aria-label="Close">
                      <X size={18} strokeWidth={2} />
                    </button>
                  </RdxDialog.Close>
                </motion.div>
              </div>
            </RdxDialog.Content>
          </RdxDialog.Portal>
        )}
      </AnimatePresence>
    </RdxDialog.Root>
  );
}