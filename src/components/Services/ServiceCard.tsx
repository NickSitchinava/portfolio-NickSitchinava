"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Check, Code2, Layout, TrendingUp, type LucideIcon } from "lucide-react";
import { FlowSection } from "@/components/ui/story-scroll";
import { BorderRotate } from "@/components/ui/animated-gradient-border";
import type { ServiceItem } from "@/i18n/dictionaries";
import { useServicesCursor } from "./ServicesCursor";
import { useServicesParallax } from "./ServicesParallax";
import styles from "./services.module.css";

const serviceIcons: LucideIcon[] = [Code2, Layout, TrendingUp];

export interface ServiceCardTheme {
  stageBg: string;
  stageInk: string;
  cardBg: string;
  cardInk: string;
  cardInkMuted: string;
  cardInkFaint: string;
  borderColors: { primary: string; secondary: string; accent: string };
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const featureRow = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0 },
};

const EASE = [0.16, 1, 0.3, 1] as const;

function CascadeChars({ text }: { text: string }) {
  return (
    <>
      {[...text].map((char, index) => (
        <span
          key={index}
          className={styles.cascadeChar}
          style={{ transitionDelay: `${index * 18}ms` }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </>
  );
}

function LearnMoreButton({
  href,
  label,
  theme,
}: {
  href: string;
  label: string;
  theme: ServiceCardTheme;
}) {
  const cursor = useServicesCursor();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 280, damping: 22, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 280, damping: 22, mass: 0.4 });
  const arrowX = useTransform(springX, (value) => value * 0.5);
  const arrowY = useTransform(springY, (value) => value * 0.5);

  const handlePointerMove = (event: React.PointerEvent<HTMLAnchorElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      href={href}
      className={styles.learnMore}
      style={{
        x: springX,
        y: springY,
        background: theme.cardInk,
        color: theme.cardBg,
      }}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => cursor?.setActive(true)}
      onPointerLeave={() => {
        reset();
        cursor?.setActive(false);
      }}
      whileTap={{ scale: 0.95 }}
    >
      <span>{label}</span>
      <motion.span className={styles.learnMoreIcon} style={{ x: arrowX, y: arrowY }}>
        <ArrowUpRight size={14} strokeWidth={2.25} />
      </motion.span>
    </motion.a>
  );
}

export function ServiceCard({
  service,
  index,
  locale,
  theme,
  learnMoreLabel,
}: {
  service: ServiceItem;
  index: number;
  locale: string;
  theme: ServiceCardTheme;
  learnMoreLabel: string;
}) {
  const Icon = serviceIcons[index % serviceIcons.length];
  const cursor = useServicesCursor();
  const scrollProgress = useServicesParallax();
  const backLayerY = useTransform(scrollProgress, [0, 1], [0, -70]);
  const cardY = useTransform(scrollProgress, [0, 1], [0, -22]);

  return (
    <FlowSection
      aria-label={service.title}
      style={{ backgroundColor: theme.stageBg, color: theme.stageInk }}
    >
      <div className={styles.stage}>
        <div className={styles.composition}>
          <motion.div className={styles.backLayer} style={{ y: backLayerY }}>
            <span className={styles.iconBadge} aria-hidden="true">
              <Icon size={26} strokeWidth={1.5} />
            </span>
            <h3 className={styles.title} itemProp="name">
              <span className={styles.cascadeWrap}>
                <CascadeChars text={service.title} />
              </span>
            </h3>
          </motion.div>

          <motion.div style={{ y: cardY }}>
            <BorderRotate
              animationMode="auto-rotate"
              animationSpeed={8}
              gradientColors={theme.borderColors}
              backgroundColor={theme.cardBg}
              borderWidth={1.5}
              borderRadius={28}
              className={styles.card}
              onPointerEnter={() => cursor?.setActive(true)}
              onPointerLeave={() => cursor?.setActive(false)}
            >
              <div className={styles.cardHeader}>
                <span className={styles.cardLabel} style={{ color: theme.cardInkFaint }}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <LearnMoreButton
                  href={`/${locale}/services/${service.slug}`}
                  label={learnMoreLabel}
                  theme={theme}
                />
              </div>

              <p className={styles.cardText} style={{ color: theme.cardInk }}>
                {service.description}
              </p>
              <p className={styles.cardDetails} style={{ color: theme.cardInkMuted }}>
                {service.details}
              </p>

              <motion.ul
                className={styles.cardFeatures}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={stagger}
              >
                {service.features.map((feature) => (
                  <motion.li
                    key={feature}
                    className={styles.cardFeatureItem}
                    style={{ color: theme.cardInkMuted }}
                    variants={featureRow}
                    transition={{ duration: 0.5, ease: EASE }}
                  >
                    <Check size={14} strokeWidth={2.25} style={{ color: theme.cardInkFaint }} />
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </BorderRotate>
          </motion.div>
        </div>
      </div>
    </FlowSection>
  );
}