"use client";

import * as RdxHoverCard from "@radix-ui/react-hover-card";
import * as React from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, Variants, Transition } from "framer-motion";
import { cn } from "@/lib/utils";
import styles from "./link-preview.module.css";

function useHoverState(followMouse: boolean) {
  const [isPeeking, setPeeking] = React.useState(false);
  const mouseX = useMotionValue(0);
  const followX = useSpring(mouseX, { stiffness: 260, damping: 24 });

  const handlePointerMove = React.useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (!followMouse) return;
      const rect = event.currentTarget.getBoundingClientRect();
      const offsetFromCenter = (event.clientX - rect.left - rect.width / 2) * 0.3;
      mouseX.set(offsetFromCenter);
    },
    [mouseX, followMouse]
  );

  const handleOpenChange = React.useCallback(
    (open: boolean) => {
      setPeeking(open);
      if (!open) mouseX.set(0);
    },
    [mouseX]
  );

  return { isPeeking, handleOpenChange, handlePointerMove, followX };
}

export interface LinkPreviewProps {
  children: React.ReactNode;
  url: string;
  imageSrc: string;
  imageAlt: string;
  className?: string;
  peekWidth?: number;
  peekHeight?: number;
  enableMouseFollow?: boolean;
  side?: "top" | "bottom" | "left" | "right";
}

export function LinkPreview({
  children,
  url,
  imageSrc,
  imageAlt,
  className,
  peekWidth = 220,
  peekHeight = 140,
  enableMouseFollow = true,
  side = "top",
}: LinkPreviewProps) {
  const { isPeeking, handleOpenChange, handlePointerMove, followX } = useHoverState(enableMouseFollow);

  const springTransition: Transition = { type: "spring", stiffness: 260, damping: 22 };

  const cardVariants: Variants = {
    initial: { opacity: 0, scale: 0.92, y: side === "top" ? 8 : -8 },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: springTransition,
    },
    exit: { opacity: 0, scale: 0.92, y: side === "top" ? 8 : -8, transition: { duration: 0.12 } },
  };

  const triggerChild = React.isValidElement(children)
    ? React.cloneElement(children as React.ReactElement<Record<string, unknown>>, {
        className: cn((children.props as { className?: string }).className, className),
        onPointerMove: handlePointerMove,
      })
    : (
      <span className={className} onPointerMove={handlePointerMove}>
        {children}
      </span>
    );

  return (
    <RdxHoverCard.Root openDelay={70} closeDelay={100} onOpenChange={handleOpenChange}>
      <RdxHoverCard.Trigger asChild>{triggerChild}</RdxHoverCard.Trigger>
      <RdxHoverCard.Portal>
        <RdxHoverCard.Content side={side} align="center" sideOffset={12} style={{ zIndex: 70 }}>
          <AnimatePresence>
            {isPeeking && (
              <motion.div
                variants={cardVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                style={{ x: enableMouseFollow ? followX : 0 }}
              >
                <div
                  className={styles.linkPreviewFrame}
                  style={{ width: peekWidth, height: peekHeight }}
                >
                  <img
                    src={imageSrc}
                    alt={imageAlt}
                    width={peekWidth}
                    height={peekHeight}
                    className={styles.linkPreviewImg}
                    loading="lazy"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </RdxHoverCard.Content>
      </RdxHoverCard.Portal>
    </RdxHoverCard.Root>
  );
}