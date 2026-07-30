import type { Locale } from "./config";

export interface PricingCalculatorDictionary {
  eyebrow: string;
  heading: string;
  subhead: string;
  placeholder: string;
  steps: {
    projectType: {
      title: string;
      options: Record<"landing" | "website" | "portfolio", { label: string }>;
    };
    size: {
      title: string;
      options: {
        landing: Record<"short" | "standard" | "long", { label: string; description: string }>;
        website: Record<"small" | "medium" | "large", { label: string; description: string }>;
        portfolio: Record<"small" | "medium" | "large", { label: string; description: string }>;
      };
    };
    creativity: {
      title: string;
      options: Record<"standard" | "enhanced" | "creative", { label: string; description: string }>;
    };
    timeline: {
      title: string;
      options: Record<"flexible" | "asap", { label: string }>;
    };
    seo: {
      title: string;
      yes: string;
      no: string;
    };
    content: {
      title: string;
      options: Record<"client" | "assistance", string>;
    };
  };
  result: {
    timeLabel: string;
    priceLabel: string;
    weeksUnit: string;
    loadingRate: string;
    ctaButton: string;
  };
}

export interface ServiceItem {
  slug: string;
  title: string;
  description: string;
  details: string;
  features: string[];
}

export interface FooterDictionary {
  giantText: string;
  heading: string;
  marquee: string[];
  primaryCta: string;
  secondaryCta: string;
  nav: {
    about: string;
    services: string;
    projects: string;
    contact: string;
  };
  legal: {
    privacy: string;
    terms: string;
  };
  crafted: string;
  rights: string;
  backToTop: string;
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
    menuLabel: string;
  };
  hero: {
  eyebrow: string;
  headlinePrefix: string;
  headlineEmphasis: string;
  headlineLines: string[];
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
  pricingCalculator: PricingCalculatorDictionary;
  contact: {
    heading: string;
    text: string;
  };
  footer: FooterDictionary;
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
      menuLabel: "Menu",
    },
    hero: {
      eyebrow: "Web Design & Development Agency",
      headlinePrefix: "We build ",
      headlineEmphasis: "websites that convert",
      headlineLines: ["We build", "websites that", "convert"],
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
    pricingCalculator: {
      eyebrow: "Get an Estimate",
      heading: "Let's talk / about your / project.",
      subhead:
        "Most projects will be priced according to your needs, but we can still give a clear idea of timelines and budget.",
      placeholder: "Select an option",
      steps: {
        projectType: {
          title: "What are you building?",
          options: {
            landing: { label: "Landing Page" },
            website: { label: "Website" },
            portfolio: { label: "Portfolio" },
          },
        },
        size: {
          title: "How big is it?",
          options: {
            landing: {
              short: { label: "Short", description: "Up to 4 sections" },
              standard: { label: "Standard", description: "5 to 8 sections" },
              long: { label: "Long", description: "9 to 12 sections" },
            },
            website: {
              small: { label: "Small", description: "1 to 5 page templates" },
              medium: { label: "Medium", description: "6 to 10 page templates" },
              large: { label: "Large", description: "11 to 20 page templates" },
            },
            portfolio: {
              small: { label: "Small", description: "1 to 5 page templates" },
              medium: { label: "Medium", description: "6 to 10 page templates" },
              large: { label: "Large", description: "11 to 20 page templates" },
            },
          },
        },
        creativity: {
          title: "How much creative direction?",
          options: {
            standard: { label: "Standard", description: "Clean and functional" },
            enhanced: { label: "Enhanced", description: "Refined motion and details" },
            creative: {
              label: "Creative",
              description: "Full custom interactive experience",
            },
          },
        },
        timeline: {
          title: "What's your timeline?",
          options: {
            flexible: { label: "Flexible" },
            asap: { label: "ASAP" },
          },
        },
        seo: {
          title: "Do you need SEO optimization?",
          yes: "Yes",
          no: "No",
        },
        content: {
          title: "Who's providing the content?",
          options: {
            client: "I'll provide content",
            assistance: "I need content assistance",
          },
        },
      },
      result: {
        timeLabel: "Estimated development timeline",
        priceLabel: "Estimated price range",
        weeksUnit: "weeks",
        loadingRate: "Calculating...",
        ctaButton: "Start a Conversation",
      },
    },
    contact: {
      heading: "Contact",
      text: "Have a project in mind? Send me a message and let's talk about it.",
    },
    footer: {
      giantText: "DESIGN",
      heading: "Let's build something worth finding.",
      marquee: [
        "Custom Websites",
        "Landing Pages",
        "SEO Optimized",
        "Built to Convert",
        "Fast Load Times",
        "Bilingual by Default",
      ],
      primaryCta: "Start a Project",
      secondaryCta: "View Our Work",
      nav: {
        about: "About",
        services: "Services",
        projects: "Projects",
        contact: "Contact",
      },
      legal: {
        privacy: "Privacy Policy",
        terms: "Terms of Service",
      },
      crafted: "Crafted with",
      rights: "All rights reserved.",
      backToTop: "Back to top",
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
      menuLabel: "მენიუ",
    },
    hero: {
      eyebrow: "ვებ დიზაინისა და დეველოპმენტის სააგენტო",
      headlinePrefix: "ჩვენ ვქმნით ",
      headlineEmphasis: "ვებსაიტებს, რომლებიც კონვერტირებენ",
      headlineLines: ["ჩვენ ვქმნით", "ვებსაიტებს, რომლებიც", "კონვერტირებენ"],
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
    pricingCalculator: {
      eyebrow: "მიიღეთ შეფასება",
      heading: "მოდით ვისაუბროთ / თქვენს / პროექტზე",
      subhead:
        "პროექტების უმეტესობის ფასი განისაზღვრება ინდივიდუალურად, თუმცა შეგვიძლია მოგცეთ ნათელი წარმოდგენა ვადებსა და ბიუჯეტზე.",
      placeholder: "აირჩიეთ ვარიანტი",
      steps: {
        projectType: {
          title: "რას ქმნით?",
          options: {
            landing: { label: "ლენდინგ გვერდი" },
            website: { label: "ვებსაიტი" },
            portfolio: { label: "პორტფოლიო" },
          },
        },
        size: {
          title: "რა მოცულობისაა?",
          options: {
            landing: {
              short: { label: "მოკლე", description: "4 სექციამდე" },
              standard: { label: "სტანდარტული", description: "5-დან 8 სექციამდე" },
              long: { label: "გრძელი", description: "9-დან 12 სექციამდე" },
            },
            website: {
              small: { label: "პატარა", description: "1-დან 5 გვერდამდე" },
              medium: { label: "საშუალო", description: "6-დან 10 გვერდამდე" },
              large: { label: "დიდი", description: "11-დან 20 გვერდამდე" },
            },
            portfolio: {
              small: { label: "პატარა", description: "1-დან 5 გვერდამდე" },
              medium: { label: "საშუალო", description: "6-დან 10 გვერდამდე" },
              large: { label: "დიდი", description: "11-დან 20 გვერდამდე" },
            },
          },
        },
        creativity: {
          title: "რამდენად შემოქმედებითი მიდგომაა საჭირო?",
          options: {
            standard: { label: "სტანდარტული", description: "სუფთა და ფუნქციური" },
            enhanced: { label: "გაუმჯობესებული", description: "დახვეწილი ანიმაცია და დეტალები" },
            creative: {
              label: "შემოქმედებითი",
              description: "სრულად ინდივიდუალური ინტერაქტიული გამოცდილება",
            },
          },
        },
        timeline: {
          title: "რა ვადაშია საჭირო?",
          options: {
            flexible: { label: "მოქნილი" },
            asap: { label: "სასწრაფოდ" },
          },
        },
        seo: {
          title: "გჭირდებათ SEO ოპტიმიზაცია?",
          yes: "დიახ",
          no: "არა",
        },
        content: {
          title: "ვინ უზრუნველყოფს კონტენტს?",
          options: {
            client: "მე მოვამზადებ კონტენტს",
            assistance: "მჭირდება კონტენტში დახმარება",
          },
        },
      },
      result: {
        timeLabel: "სავარაუდო შესრულების ვადა",
        priceLabel: "სავარაუდო ფასის დიაპაზონი",
        weeksUnit: "კვირა",
        loadingRate: "მიმდინარეობს გამოთვლა...",
        ctaButton: "დაიწყეთ საუბარი",
      },
    },
    contact: {
      heading: "კონტაქტი",
      text: "გაქვთ პროექტის იდეა? მომწერეთ და ვისაუბროთ.",
    },
    footer: {
      giantText: "დიზაინი",
      heading: "მოდით შევქმნათ რაღაც აღმოსაჩენი.",
      marquee: [
        "ინდივიდუალური ვებსაიტები",
        "ლენდინგ გვერდები",
        "SEO ოპტიმიზაცია",
        "აგებული კონვერტაციისთვის",
        "სწრაფი ჩატვირთვა",
        "ორენოვანი ნაგულისხმევად",
      ],
      primaryCta: "დაიწყეთ პროექტი",
      secondaryCta: "ნახეთ ჩვენი ნამუშევრები",
      nav: {
        about: "ჩვენ შესახებ",
        services: "სერვისები",
        projects: "პროექტები",
        contact: "კონტაქტი",
      },
      legal: {
        privacy: "კონფიდენციალურობის პოლიტიკა",
        terms: "მომსახურების პირობები",
      },
      crafted: "შექმნილია",
      rights: "ყველა უფლება დაცულია.",
      backToTop: "ზემოთ დაბრუნება",
    },
  },
};