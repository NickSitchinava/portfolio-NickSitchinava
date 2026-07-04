"use client";

import { motion } from "framer-motion";
import styles from "./about.module.css";

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

const content: Record<
  Locale,
  {
    ariaLabel: string;
    eyebrow: string;
    headingLineOne: string;
    headingLineTwo: string;
    paragraph: string;
    location: string;
    steps: { number: string; title: string; description: string }[];
    cta: string;
  }
> = {
  en: {
    ariaLabel: "About us",
    eyebrow: "How We Work",
    headingLineOne: "Thoughtful process,",
    headingLineTwo: "lasting results",
    paragraph:
      "We're a Tbilisi-based web design and development studio building fast, considered websites for businesses across Georgia and beyond. Every project starts with structure, not templates.",
    location:
      "Based in Tbilisi, Georgia, serving local and international clients.",
    steps: [
      {
        number: "01",
        title: "Discover",
        description:
          "We learn your goals, your audience, and your content before any design decisions are made.",
      },
      {
        number: "02",
        title: "Design",
        description:
          "We build a visual system that reflects your brand and keeps navigation effortless.",
      },
      {
        number: "03",
        title: "Build & Launch",
        description:
          "We write clean, fast code and ship a site that's optimized for search from day one.",
      },
    ],
    cta: "Start a Project",
  },
  ka: {
    ariaLabel: "ჩვენ შესახებ",
    eyebrow: "როგორ ვმუშაობთ",
    headingLineOne: "გააზრებული პროცესი,",
    headingLineTwo: "ხანგრძლივი შედეგი",
    paragraph:
      "ჩვენ ვართ თბილისში დაფუძნებული ვებ დიზაინისა და დეველოპმენტის სტუდია, რომელიც ქმნის სწრაფ და გააზრებულ ვებსაიტებს საქართველოსა და მის ფარგლებს გარეთ მოქმედი ბიზნესებისთვის. ყოველი პროექტი იწყება სტრუქტურით და არა შაბლონით.",
    location:
      "დაფუძნებულია თბილისში, საქართველოში, ვემსახურებით ადგილობრივ და საერთაშორისო კლიენტებს.",
    steps: [
      {
        number: "01",
        title: "კვლევა",
        description:
          "ჯერ ვსწავლობთ თქვენს მიზნებს, აუდიტორიასა და კონტენტს, სანამ დიზაინზე გადავალთ.",
      },
      {
        number: "02",
        title: "დიზაინი",
        description:
          "ვქმნით ვიზუალურ სისტემას, რომელიც ასახავს თქვენს ბრენდს და ამარტივებს ნავიგაციას.",
      },
      {
        number: "03",
        title: "აწყობა და გაშვება",
        description:
          "ვწერთ სუფთა და სწრაფ კოდს და ვუშვებთ საიტს, რომელიც ოპტიმიზირებულია საძიებო სისტემებისთვის.",
      },
    ],
    cta: "დაიწყეთ პროექტი",
  },
};

export interface AboutProps {
  locale?: Locale;
}

export default function About({ locale = "en" }: AboutProps) {
  const t = content[locale];

  return (
    <section id="about" className={styles.about} aria-label={t.ariaLabel}>
      <div className={styles.grid}>
        <motion.div
          className={styles.intro}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.span className={styles.eyebrow} variants={fadeUp} transition={{ duration: 0.5, ease: EASE }}>
            {t.eyebrow}
          </motion.span>

          <motion.h2 className={styles.heading} variants={fadeUp} transition={{ duration: 0.6, ease: EASE }}>
            <span className={styles.headingItalic}>{t.headingLineOne}</span>
            <span className={styles.headingRegular}>{t.headingLineTwo}</span>
          </motion.h2>

          <motion.p className={styles.paragraph} variants={fadeUp} transition={{ duration: 0.6, ease: EASE }}>
            {t.paragraph}
          </motion.p>

          <motion.p className={styles.location} variants={fadeUp} transition={{ duration: 0.6, ease: EASE }}>
            {t.location}
          </motion.p>
        </motion.div>

        <motion.div
          className={styles.steps}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          {t.steps.map((step) => (
            <motion.div
              key={step.number}
              className={styles.step}
              variants={fadeUp}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <span className={styles.stepNumber}>{step.number}</span>
              <div className={styles.stepBody}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepText}>{step.description}</p>
              </div>
            </motion.div>
          ))}

          <motion.div className={styles.ctaRow} variants={fadeUp} transition={{ duration: 0.5, ease: EASE }}>
            <a href="#contact" className={styles.cta}>
              {t.cta}
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}