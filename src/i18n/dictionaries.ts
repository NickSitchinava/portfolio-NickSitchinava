import type { Locale } from "./config";

export interface ServiceItem {
  slug: string;
  title: string;
  description: string;
  details: string;
  features: string[];
}

export interface Dictionary {
  meta: {
    title: string;
    description: string;
    ogDescription: string;
    keywords: string[];
  };
  loaderGreetings: string[];
  header: {
    about: string;
    services: string;
    projects: string;
    contact: string;
    cta: string;
  };
  hero: {
    eyebrow: string;
    headlinePrefix: string;
    headlineEmphasis: string;
    subhead: string;
    chips: string[];
    primaryCta: string;
    secondaryCta: string;
  };
  services: {
    heading: string;
    cta: string;
    items: ServiceItem[];
  };
  serviceDetail: {
    backLabel: string;
    featuresHeading: string;
    ctaHeading: string;
    ctaText: string;
    ctaButton: string;
  };
  projects: {
    heading: string;
    items: { title: string; description: string }[];
  };
  contact: {
    heading: string;
    text: string;
  };
  footer: {
    rights: string;
  };
}

export const dictionaries: Record<Locale, Dictionary> = {
  en: {
    meta: {
      title: "Web Design & Development Agency in Tbilisi, Georgia | Nick Sitchinava",
      description:
        "We design and build custom websites, landing pages, and web applications for businesses in Tbilisi, Georgia and worldwide. Fast, SEO-friendly, built to convert.",
      ogDescription:
        "Custom websites, landing pages, and web applications, designed and built in Tbilisi, Georgia for clients worldwide.",
      keywords: [
        "web design agency Tbilisi",
        "website development Georgia",
        "Tbilisi web developer",
        "custom website design",
        "landing page design services",
        "web development agency",
        "small business website design",
        "web app development",
        "responsive website design",
        "Next.js development agency",
        "Nick Sitchinava",
      ],
    },
    loaderGreetings: [
      "Custom websites.",
      "Landing pages that convert.",
      "Code that loads fast.",
      "Built for SEO.",
      "Clean. Fast. Found.",
    ],
    header: {
      about: "About",
      services: "Services",
      projects: "Projects",
      contact: "Contact",
      cta: "Start a Project",
    },
    hero: {
      eyebrow: "Web Design & Development Agency",
      headlinePrefix: "We build ",
      headlineEmphasis: "websites that convert",
      subhead:
        "Custom website design, landing pages, and web app development for startups and growing businesses.",
      chips: ["Website Design", "Landing Pages", "Web Applications"],
      primaryCta: "View Our Work",
      secondaryCta: "Start a Project",
    },
    services: {
      heading: "Services",
      cta: "Learn More",
      items: [
        {
          slug: "website-development",
          title: "Website Development",
          description: "Custom-built websites, designed and coded from scratch.",
          details:
            "We design and hand-code every site to fit your business, no page builders, no bloated templates. Every layout, animation, and line of code exists for a reason: to load fast, look sharp, and turn visitors into calls.",
          features: [
            "Custom design, no templates",
            "Hand-written, maintainable code",
            "Optimized for speed and SEO from day one",
          ],
        },
        {
          slug: "landing-pages",
          title: "Landing Pages",
          description: "High-converting landing pages built for speed and clarity.",
          details:
            "A landing page has one job: convert. We strip away distractions and structure every section around a single, clear action, so visitors know exactly what to do next.",
          features: [
            "Focused, single-goal layouts",
            "Built for A/B testing",
            "Mobile-first, fast-loading design",
          ],
        },
        {
          slug: "seo-optimization",
          title: "SEO Optimization",
          description: "Clean, search-friendly code structured to rank well.",
          details:
            "Good SEO starts in the code, not after launch. We build every site with semantic markup, structured data, and performance baked in, so search engines and visitors both find what they need.",
          features: [
            "Semantic, accessible markup",
            "Structured data and schema.org",
            "Core Web Vitals optimization",
          ],
        },
      ],
    },
    serviceDetail: {
      backLabel: "Back to Services",
      featuresHeading: "What's included",
      ctaHeading: "Ready to start?",
      ctaText: "Tell us about your project and we'll get back to you with next steps.",
      ctaButton: "Start a Project",
    },
    projects: {
      heading: "Projects",
      items: [
        { title: "Project One", description: "A short description of this project goes here." },
        { title: "Project Two", description: "A short description of this project goes here." },
        { title: "Project Three", description: "A short description of this project goes here." },
      ],
    },
    contact: {
      heading: "Contact",
      text: "Have a project in mind? Send me a message and let's talk about it.",
    },
    footer: {
      rights: "All rights reserved.",
    },
  },
  ka: {
    meta: {
      title: "ვებ დიზაინისა და დეველოპმენტის სააგენტო თბილისში | Nick Sitchinava",
      description:
        "ჩვენ ვქმნით ვებსაიტებს, ლენდინგ გვერდებსა და ვებ აპლიკაციებს თბილისისა და მთელი მსოფლიოს ბიზნესებისთვის. სწრაფი, SEO-ზე მორგებული და კონვერტაციაზე ორიენტირებული გადაწყვეტილებები.",
      ogDescription:
        "ინდივიდუალური ვებსაიტები, ლენდინგ გვერდები და ვებ აპლიკაციები, შექმნილი თბილისში, საქართველოში, მსოფლიოს მასშტაბით მოქმედი კლიენტებისთვის.",
      keywords: [
        "ვებ დიზაინი თბილისი",
        "ვებსაიტის დამზადება საქართველო",
        "ვებ დეველოპერი თბილისი",
        "ინდივიდუალური ვებსაიტის დიზაინი",
        "ლენდინგ გვერდის დამზადება",
        "ვებ დეველოპმენტის სააგენტო",
        "მცირე ბიზნესის ვებსაიტი",
        "ვებ აპლიკაციის დეველოპმენტი",
        "რესპონსივი ვებსაიტის დიზაინი",
        "Next.js დეველოპმენტის სააგენტო",
        "Nick Sitchinava",
      ],
    },
    loaderGreetings: [
      "ინდივიდუალური ვებსაიტები.",
      "ლენდინგ გვერდები, რომლებიც კონვერტირებენ.",
      "კოდი, რომელიც სწრაფად იტვირთება.",
      "აგებულია SEO-სთვის.",
      "სუფთა. სწრაფი. აღმოჩენადი.",
    ],
    header: {
      about: "ჩვენ შესახებ",
      services: "სერვისები",
      projects: "პროექტები",
      contact: "კონტაქტი",
      cta: "დაიწყეთ პროექტი",
    },
    hero: {
      eyebrow: "ვებ დიზაინისა და დეველოპმენტის სააგენტო",
      headlinePrefix: "ჩვენ ვქმნით ",
      headlineEmphasis: "ვებსაიტებს, რომლებიც კონვერტირებენ",
      subhead:
        "ინდივიდუალური ვებსაიტის დიზაინი, ლენდინგ გვერდები და ვებ აპლიკაციების დეველოპმენტი სტარტაპებისა და მზარდი ბიზნესებისთვის.",
      chips: ["ვებსაიტის დიზაინი", "ლენდინგ გვერდები", "ვებ აპლიკაციები"],
      primaryCta: "ნახეთ ჩვენი ნამუშევრები",
      secondaryCta: "დაიწყეთ პროექტი",
    },
    services: {
      heading: "სერვისები",
      cta: "დაწვრილებით",
      items: [
        {
          slug: "website-development",
          title: "ვებსაიტის დეველოპმენტი",
          description: "ინდივიდუალურად აგებული ვებსაიტები, დაპროექტებული და კოდირებული ნულიდან.",
          details:
            "ჩვენ თითოეულ საიტს ვქმნით და ვწერთ ხელით თქვენი ბიზნესის შესაბამისად, არანაირი მზა შაბლონი და ზედმეტად დატვირთული კონსტრუქტორი. ყოველი განლაგება, ანიმაცია და კოდის სტრიქონი ემსახურება ერთ მიზანს: სწრაფად ჩაიტვირთოს, კარგად გამოიყურებოდეს და ვიზიტორი კლიენტად აქციოს.",
          features: [
            "ინდივიდუალური დიზაინი, არა შაბლონი",
            "ხელით დაწერილი, ადვილად შენარჩუნებადი კოდი",
            "სისწრაფესა და SEO-ზე ორიენტირებული პირველივე დღიდან",
          ],
        },
        {
          slug: "landing-pages",
          title: "ლენდინგ გვერდები",
          description: "მაღალკონვერტირებადი ლენდინგ გვერდები, აგებული სისწრაფისა და სიცხადისთვის.",
          details:
            "ლენდინგ გვერდს ერთი ამოცანა აქვს: კონვერტაცია. ჩვენ ვხსნით ყველა ზედმეტ დეტალს და ვაწყობთ თითოეულ სექციას ერთი, მკაფიო მოქმედების გარშემო, რათა ვიზიტორმა ზუსტად იცოდეს, რა უნდა გააკეთოს შემდეგ.",
          features: [
            "ერთ მიზანზე ორიენტირებული სტრუქტურა",
            "მზადაა A/B ტესტირებისთვის",
            "მობილურზე მორგებული, სწრაფად ჩატვირთვადი დიზაინი",
          ],
        },
        {
          slug: "seo-optimization",
          title: "SEO ოპტიმიზაცია",
          description:
            "სუფთა, საძიებო სისტემებისთვის მოსახერხებელი კოდი, სტრუქტურირებული მაღალი პოზიციებისთვის.",
          details:
            "კარგი SEO იწყება კოდიდან და არა გაშვების შემდეგ. ჩვენ ვაგებთ თითოეულ საიტს სემანტიკური მარკაპით, სტრუქტურირებული მონაცემებით და გამართული წარმადობით, რათა საძიებო სისტემებმაც და ვიზიტორებმაც იპოვონ ის, რაც სჭირდებათ.",
          features: [
            "სემანტიკური, ხელმისაწვდომი მარკაპი",
            "სტრუქტურირებული მონაცემები და schema.org",
            "Core Web Vitals-ის ოპტიმიზაცია",
          ],
        },
      ],
    },
    serviceDetail: {
      backLabel: "სერვისებზე დაბრუნება",
      featuresHeading: "რას მოიცავს",
      ctaHeading: "მზად ხართ დასაწყებად?",
      ctaText: "მოგვიყევით თქვენი პროექტის შესახებ და დაგიკავშირდებით შემდეგი ნაბიჯებისთვის.",
      ctaButton: "დაიწყეთ პროექტი",
    },
    projects: {
      heading: "პროექტები",
      items: [
        { title: "პროექტი პირველი", description: "ამ პროექტის მოკლე აღწერა განთავსდება აქ." },
        { title: "პროექტი მეორე", description: "ამ პროექტის მოკლე აღწერა განთავსდება აქ." },
        { title: "პროექტი მესამე", description: "ამ პროექტის მოკლე აღწერა განთავსდება აქ." },
      ],
    },
    contact: {
      heading: "კონტაქტი",
      text: "გაქვთ პროექტის იდეა? მომწერეთ და ვისაუბროთ.",
    },
    footer: {
      rights: "ყველა უფლება დაცულია.",
    },
  },
};