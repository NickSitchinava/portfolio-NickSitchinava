"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  PenTool,
  Rocket,
  LifeBuoy,
  MapPin,
  Award,
  Zap,
  Languages,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/Button/Button";
import styles from "./about.module.css";

const Strands = dynamic(() => import("@/components/Strands/Strands"), {
  ssr: false,
});

const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

type Locale = "en" | "ka";

interface AboutStep {
  title: string;
  description: string;
}

interface AboutStat {
  value: string;
  label: string;
}

interface AboutContent {
  ariaLabel: string;
  eyebrow: string;
  locationBadge: string;
  headingLineOne: string;
  headingLineTwo: string;
  paragraph: string;
  stats: AboutStat[];
  steps: AboutStep[];
  cta: string;
}

const content: Record<Locale, AboutContent> = {
  en: {
    ariaLabel: "About us",
    eyebrow: "How We Work",
    locationBadge: "Tbilisi, Georgia",
    headingLineOne: "Thoughtful process,",
    headingLineTwo: "lasting results",
    paragraph:
      "We're a web design and development studio built for high-ticket local service businesses, HVAC, landscaping, and similar trades, that need a website which actually brings in calls. We study the problems specific to your industry, then design and build a site to solve them: fast to load, considered in every detail, and built to convert. From Tbilisi, we build for clients across Georgia and abroad.",
    stats: [
      { value: "5+", label: "Years Experience" },
      { value: "Sub-3s", label: "Page Load Time" },
      { value: "EN / KA", label: "Fully Bilingual" },
    ],
    steps: [
      {
        title: "Discover",
        description:
          "We study the problems specific to your industry, HVAC scheduling, landscaping seasonality, whatever slows down calls and bookings, before any design work begins.",
      },
      {
        title: "Design",
        description:
          "We build a visual system around getting visitors to call, book, or request a quote, not just look good.",
      },
      {
        title: "Build & Launch",
        description:
          "We write clean, fast code and launch a site built to load in under 3 seconds, in English and Georgian if needed.",
      },
      {
        title: "Support & Iterate",
        description:
          "We keep watching performance after launch, and you can book updates or fixes whenever you need them.",
      },
    ],
    cta: "Start a Project",
  },
  ka: {
    ariaLabel: "ჩვენ შესახებ",
    eyebrow: "როგორ ვმუშაობთ",
    locationBadge: "თბილისი, საქართველო",
    headingLineOne: "გააზრებული პროცესი,",
    headingLineTwo: "ხანგრძლივი შედეგი",
    paragraph:
      "ჩვენ ვართ ვებ დიზაინისა და დეველოპმენტის სტუდია, რომელიც აშენებულია მაღალი ღირებულების სერვის ბიზნესებისთვის, მაგალითად HVAC და გამწვანების კომპანიები, რომლებსაც სჭირდებათ ვებსაიტი, რომელიც რეალურად მოაქვს ზარებს. ჩვენ ვსწავლობთ თქვენი ინდუსტრიისთვის დამახასიათებელ პრობლემებს და შემდეგ ვქმნით საიტს, რომელიც სწრაფად იტვირთება, გააზრებულია დეტალებში და აგებულია კონვერტაციისთვის. თბილისიდან ვმუშაობთ კლიენტებთან საქართველოს მასშტაბით და მის ფარგლებს გარეთ.",
    stats: [
      { value: "5+", label: "წლიანი გამოცდილება" },
      { value: "Sub-3s", label: "გვერდის ჩატვირთვის დრო" },
      { value: "EN / KA", label: "სრულად ორენოვანი" },
    ],
    steps: [
      {
        title: "კვლევა",
        description:
          "ჩვენ ვსწავლობთ თქვენი ინდუსტრიისთვის დამახასიათებელ პრობლემებს, იქნება ეს HVAC-ის განრიგი თუ გამწვანების სეზონურობა, სანამ დიზაინზე გადავალთ.",
      },
      {
        title: "დიზაინი",
        description:
          "ვქმნით ვიზუალურ სისტემას, რომელიც აგებულია ვიზიტორების ზარზე, ჯავშანზე თუ შეკვეთაზე მოსაყვანად.",
      },
      {
        title: "აწყობა და გაშვება",
        description:
          "ვწერთ სუფთა და სწრაფ კოდს და ვუშვებთ საიტს, რომელიც იტვირთება 3 წამზე ნაკლებში, საჭიროებისამებრ ინგლისურ და ქართულ ენებზე.",
      },
      {
        title: "მხარდაჭერა და დახვეწა",
        description:
          "გაშვების შემდეგაც ვაკვირდებით საიტის მუშაობას, და შეგიძლიათ ნებისმიერ დროს დაჯავშნოთ განახლება, თუ რამის გამოსწორება დაგჭირდებათ.",
      },
    ],
    cta: "დაიწყეთ პროექტი",
  },
};

const stepIcons: LucideIcon[] = [Search, PenTool, Rocket, LifeBuoy];
const statIcons: LucideIcon[] = [Award, Zap, Languages];

export interface AboutProps {
  locale?: Locale;
}

export default function About({ locale = "en" }: AboutProps) {
  const t: AboutContent = content[locale];
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [reduceEffects, setReduceEffects] = useState(false);

  useEffect(() => {
    setReduceEffects(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        window.innerWidth < 700
    );

    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const showEffects = inView && !reduceEffects;

  return (
    <section
      ref={sectionRef}
      id="about"
      className={styles.about}
      aria-label={t.ariaLabel}
    >
      <div className={styles.inner}>
        <div className={styles.grid}>
          <motion.div
            className={styles.textCol}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div
              className={styles.metaRow}
              variants={fadeUp}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <span className={styles.eyebrow}>{t.eyebrow}</span>
              <span className={styles.locationBadge}>
                <MapPin size={13} strokeWidth={2} />
                {t.locationBadge}
              </span>
            </motion.div>

            <motion.h2
              className={styles.heading}
              variants={fadeUp}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <span>{t.headingLineOne}</span>
              <span>{t.headingLineTwo}</span>
            </motion.h2>

            <motion.p
              className={styles.paragraph}
              variants={fadeUp}
              transition={{ duration: 0.6, ease: EASE }}
            >
              {t.paragraph}
            </motion.p>

            <motion.dl
              className={styles.statsRow}
              variants={fadeUp}
              transition={{ duration: 0.6, ease: EASE }}
            >
              {t.stats.map((stat: AboutStat, index: number) => {
                const Icon: LucideIcon = statIcons[index];
                return (
                  <div key={stat.label} className={styles.statItem}>
                    <span className={styles.statIcon} aria-hidden="true">
                      <Icon size={16} strokeWidth={1.75} />
                    </span>
                    <dt className={styles.statValue}>{stat.value}</dt>
                    <dd className={styles.statLabel}>{stat.label}</dd>
                  </div>
                );
              })}
            </motion.dl>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <Button
                href="#contact"
                style={
                  {
                    "--btn-bg": "oklch(55% 0.18 290)",
                    "--btn-fg": "#fff",
                    "--btn-fill": "oklch(30% 0.14 290)",
                    "--btn-fill-fg": "#fff",
                  } as React.CSSProperties
                }
              >
                {t.cta}
              </Button>
            </motion.div>
          </motion.div>

          <div className={styles.divider} aria-hidden="true" />

          <div className={styles.visual} aria-hidden="true">
            {showEffects && (
              <Strands
                colors={["#F97316", "#7C3AED", "#06B6D4"]}
                count={3}
                speed={0.5}
                amplitude={1}
                waviness={1}
                thickness={0.7}
                glow={2.6}
                taper={3}
                spread={1}
                intensity={0.6}
                saturation={2}
                opacity={1}
                scale={1}
                glass={false}
                refraction={1}
                dispersion={1}
                glassSize={1}
                hueShift={0}
              />
            )}
          </div>
        </div>

        <motion.ol
          className={styles.steps}
          itemScope
          itemType="https://schema.org/ItemList"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          {t.steps.map((step: AboutStep, index: number) => {
            const Icon: LucideIcon = stepIcons[index];
            return (
              <motion.li
                key={step.title}
                className={styles.step}
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
                variants={fadeUp}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <meta itemProp="position" content={String(index + 1)} />
                <span className={styles.stepIcon}>
                  <Icon size={20} strokeWidth={1.75} />
                </span>
                <div className={styles.stepBody}>
                  <h3 className={styles.stepTitle} itemProp="name">
                    {step.title}
                  </h3>
                  <p className={styles.stepText}>{step.description}</p>
                </div>
              </motion.li>
            );
          })}
        </motion.ol>
      </div>
    </section>
  );
}