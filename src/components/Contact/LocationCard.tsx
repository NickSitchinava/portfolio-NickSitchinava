"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { MapPin } from "lucide-react";
import styles from "./location-card.module.css";

const EASE = [0.16, 1, 0.3, 1] as const;

export interface LocationCardProps {
  location: string;
  coordinates: string;
  liveLabel: string;
  hintLabel: string;
}

export function LocationCard({ location, coordinates, liveLabel, hintLabel }: LocationCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [tiltEnabled, setTiltEnabled] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setTiltEnabled(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-50, 50], [7, -7]);
  const rotateY = useTransform(mouseX, [-50, 50], [-7, 7]);

  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 });

  const tiltActive = tiltEnabled && !prefersReducedMotion;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!tiltActive || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={containerRef}
      className={styles.perspectiveWrap}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={() => setIsExpanded((v) => !v)}
      role="button"
      tabIndex={0}
      aria-expanded={isExpanded}
      aria-label={`${location}. ${hintLabel}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setIsExpanded((v) => !v);
        }
      }}
    >
      <motion.div
        className={styles.card}
        style={
          tiltActive
            ? {
                rotateX: springRotateX,
                rotateY: springRotateY,
                transformStyle: "preserve-3d",
              }
            : undefined
        }
        animate={{
          width: isExpanded ? "100%" : "78%",
          height: isExpanded ? 300 : 160,
        }}
        transition={{ type: "spring", stiffness: 380, damping: 34 }}
      >
        <div className={styles.gradientOverlay} />

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className={styles.mapLayer}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className={styles.mapBase} />

              <svg className={styles.mapSvg} preserveAspectRatio="none">
                <motion.line
                  x1="0%" y1="35%" x2="100%" y2="35%"
                  className={styles.roadMain}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
                <motion.line
                  x1="0%" y1="65%" x2="100%" y2="65%"
                  className={styles.roadMain}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
                <motion.line
                  x1="30%" y1="0%" x2="30%" y2="100%"
                  className={styles.roadSecondary}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                />
                <motion.line
                  x1="70%" y1="0%" x2="70%" y2="100%"
                  className={styles.roadSecondary}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                />
                {[20, 50, 80].map((y, i) => (
                  <motion.line
                    key={`h-${y}`}
                    x1="0%" y1={`${y}%`} x2="100%" y2={`${y}%`}
                    className={styles.streetLine}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                  />
                ))}
                {[15, 45, 55, 85].map((x, i) => (
                  <motion.line
                    key={`v-${x}`}
                    x1={`${x}%`} y1="0%" x2={`${x}%`} y2="100%"
                    className={styles.streetLine}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
                  />
                ))}
              </svg>

              <motion.div
                className={`${styles.building} ${styles.buildingA}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.5 }}
              />
              <motion.div
                className={`${styles.building} ${styles.buildingB}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.6 }}
              />
              <motion.div
                className={`${styles.building} ${styles.buildingC}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.7 }}
              />
              <motion.div
                className={`${styles.building} ${styles.buildingD}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.55 }}
              />

              <motion.div
                className={styles.pinWrap}
                initial={{ scale: 0, y: -18 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.3 }}
              >
                <MapPin size={30} strokeWidth={2} fill="var(--color-accent)" className={styles.pinIcon} />
              </motion.div>

              <div className={styles.mapFade} />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className={styles.gridPattern}
          animate={{ opacity: isExpanded ? 0 : 0.05 }}
          transition={{ duration: 0.3 }}
        >
          <svg width="100%" height="100%">
            <defs>
              <pattern id="location-card-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" className={styles.gridLine} strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#location-card-grid)" />
          </svg>
        </motion.div>

        <div className={styles.content}>
          <div className={styles.topRow}>
            <motion.div animate={{ opacity: isExpanded ? 0 : 1 }} transition={{ duration: 0.3 }}>
              <MapPin size={18} strokeWidth={2} className={styles.compassIcon} />
            </motion.div>

            <motion.div
              className={styles.statusPill}
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.2 }}
            >
              <span className={styles.statusDot} />
              <span className={styles.statusLabel}>{liveLabel}</span>
            </motion.div>
          </div>

          <div className={styles.bottomBlock}>
            <motion.h3
              className={styles.locationName}
              animate={{ x: isHovered ? 4 : 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              {location}
            </motion.h3>

            <AnimatePresence>
              {isExpanded && (
                <motion.p
                  className={styles.coordinates}
                  initial={{ opacity: 0, y: -8, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -8, height: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {coordinates}
                </motion.p>
              )}
            </AnimatePresence>

            <motion.div
              className={styles.underline}
              initial={false}
              animate={{ scaleX: isHovered || isExpanded ? 1 : 0.3 }}
              transition={{ duration: 0.4, ease: EASE }}
            />
          </div>
        </div>
      </motion.div>

      <motion.p
        className={styles.hint}
        initial={{ opacity: 0 }}
        animate={{
          opacity: isHovered && !isExpanded ? 1 : 0,
          y: isHovered ? 0 : 4,
        }}
        transition={{ duration: 0.2 }}
      >
        {hintLabel}
      </motion.p>
    </motion.div>
  );
}

export default LocationCard;