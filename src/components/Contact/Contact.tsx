"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Mail, MessageCircle, type LucideIcon } from "lucide-react";
import { siInstagram } from "simple-icons";
import { LocationCard } from "./LocationCard";
import { dictionaries } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import styles from "./contact.module.css";

const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const lucideChannelIcons: Partial<Record<"email" | "whatsapp" | "instagram", LucideIcon>> = {
  email: Mail,
  whatsapp: MessageCircle,
};

function ChannelIcon({ channelKey }: { channelKey: "email" | "whatsapp" | "instagram" }) {
  if (channelKey === "instagram") {
    return (
      <svg viewBox="0 0 24 24" width={17} height={17} aria-hidden="true">
        <path d={siInstagram.path} fill="currentColor" />
      </svg>
    );
  }

  const Icon = lucideChannelIcons[channelKey];
  if (!Icon) return null;
  return <Icon size={17} strokeWidth={2} />;
}

function ReachOutCard({
  channelsEyebrow,
  channelsNote,
  channels,
  channelOrder,
}: {
  channelsEyebrow: string;
  channelsNote: string;
  channels: Record<"email" | "whatsapp" | "instagram", { label: string; value: string; href: string }>;
  channelOrder: ("email" | "whatsapp" | "instagram")[];
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [glowEnabled, setGlowEnabled] = useState(false);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const glowOpacity = useMotionValue(0);

  useEffect(() => {
    setGlowEnabled(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  const glowActive = glowEnabled && !prefersReducedMotion;

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!glowActive) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    glowX.set(((e.clientX - rect.left) / rect.width) * 100);
    glowY.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  const glowBackground = useMotionTemplate`radial-gradient(420px circle at ${glowX}% ${glowY}%, rgba(255, 255, 255, 0.14), transparent 70%)`;

  return (
    <div
      ref={cardRef}
      className={styles.reachCard}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => glowActive && glowOpacity.set(1)}
      onPointerLeave={() => glowActive && glowOpacity.set(0)}
    >
      {glowActive && (
        <motion.div
          className={styles.reachGlow}
          aria-hidden="true"
          style={{ background: glowBackground, opacity: glowOpacity }}
        />
      )}

      <div className={styles.reachContent}>
        <span className={styles.reachEyebrow}>{channelsEyebrow}</span>

        <ul className={styles.channels}>
          {channelOrder.map((key) => {
            const channel = channels[key];
            return (
              <li key={key} className={styles.channelRow}>
                <a
                  href={channel.href}
                  target={key === "email" ? undefined : "_blank"}
                  rel={key === "email" ? undefined : "noopener noreferrer"}
                  className={styles.channelLink}
                >
                  <span className={styles.channelIcon}>
                    <ChannelIcon channelKey={key} />
                  </span>
                  <span className={styles.channelText}>
                    <span className={styles.channelLabel}>{channel.label}</span>
                    <span className={styles.channelValue}>{channel.value}</span>
                  </span>
                  <span className={styles.channelArrow} aria-hidden="true">
                    <ArrowUpRight size={15} strokeWidth={2} />
                  </span>
                </a>
              </li>
            );
          })}
        </ul>

        <p className={styles.reachNote}>{channelsNote}</p>
      </div>
    </div>
  );
}

export default function Contact({ locale }: { locale: Locale }) {
  const t = dictionaries[locale].contact;
  const channelOrder: ("email" | "whatsapp" | "instagram")[] = ["email", "whatsapp", "instagram"];

  return (
    <section id="contact" className={styles.contact} aria-label={t.eyebrow}>
      <div className={styles.inner}>
        <div className={styles.topRow}>
          <motion.div
            className={styles.textCol}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.span
              className={styles.eyebrow}
              variants={fadeUp}
              transition={{ duration: 0.5, ease: EASE }}
            >
              {t.eyebrow}
            </motion.span>

            <motion.h2
              className={styles.heading}
              lang={locale}
              variants={fadeUp}
              transition={{ duration: 0.6, ease: EASE }}
            >
              {t.headingLead} <span className={styles.headingWord}>{t.headingAccent}</span>
            </motion.h2>

            <motion.p
              className={styles.text}
              lang={locale}
              variants={fadeUp}
              transition={{ duration: 0.6, ease: EASE }}
            >
              {t.text}
            </motion.p>

            <motion.div
              className={styles.statusRow}
              variants={fadeUp}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <span className={styles.statusDot} aria-hidden="true" />
              <span className={styles.statusLabel} lang={locale}>
                {t.statusLabel}
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            className={styles.reachCol}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          >
            <ReachOutCard
              channelsEyebrow={t.channelsEyebrow}
              channelsNote={t.channelsNote}
              channels={t.channels}
              channelOrder={channelOrder}
            />
          </motion.div>
        </div>

        <motion.div
          className={styles.mapRow}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
        >
          <LocationCard
            location={t.map.location}
            coordinates={t.map.coordinates}
            liveLabel={t.map.liveLabel}
            hintLabel={t.map.hintLabel}
          />
        </motion.div>
      </div>
    </section>
  );
}