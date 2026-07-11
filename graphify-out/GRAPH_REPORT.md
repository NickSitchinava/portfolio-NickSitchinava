# Graph Report - .  (2026-07-11)

## Corpus Check
- Corpus is ~12,141 words - fits in a single context window. You may not need a graph.

## Summary
- 247 nodes · 324 edges · 21 communities (17 shown, 4 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.73)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Page Routes & SEO
- App Layout & Fonts
- Services Card Components
- Dev Dependencies & ESLint
- Animation & Motion Libraries
- TypeScript Config & Refs
- About Section Components
- Gradual Blur UI Effect
- Next.js Type References
- Button UI Component
- Package Scripts & Metadata
- Glow Horizon Visual Effect
- Project Identity & Docs
- Graphify Knowledge Graph
- Strands Visual Component
- i18n Middleware & Routing
- ESLint Configuration
- Next.js Configuration
- PostCSS Configuration
- Tailwind CSS Configuration

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `Locale` - 12 edges
3. `dictionaries` - 9 edges
4. `include` - 7 edges
5. `locales` - 6 edges
6. `scripts` - 5 edges
7. `react` - 5 edges
8. `Button` - 5 edges
9. `GradualBlur()` - 5 edges
10. `ArcRevealHero()` - 4 edges

## Surprising Connections (you probably didn't know these)
- `Next.js Portfolio Project` --conceptually_related_to--> `Portfolio Brand Identity Logo`  [INFERRED]
  README.md → public/images/logo.webp
- `useLoaderReveal()` --references--> `react`  [EXTRACTED]
  src/components/ArcRevealHero/LoaderContext.tsx → package.json
- `hasTextContent()` --references--> `react`  [EXTRACTED]
  src/components/ui/origin-button.tsx → package.json
- `ArcRevealHero()` --references--> `react`  [EXTRACTED]
  src/components/ArcRevealHero/ArcRevealHero.tsx → package.json
- `Graphify Workflow` --conceptually_related_to--> `Graphify Knowledge Graph Rule`  [INFERRED]
  .agents/workflows/graphify.md → .agents/rules/graphify.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Portfolio Project Identity & Tooling** — readme_nextjs_project, public_images_logo_brand_identity, _agents_rules_graphify_graphify_knowledge_graph, _agents_workflows_graphify_graphify_workflow [INFERRED 0.75]

## Communities (21 total, 4 thin omitted)

### Community 0 - "Page Routes & SEO"
Cohesion: 0.14
Nodes (15): useLoaderReveal(), Contact(), Footer(), Header(), EASE, OPTIONS, EASE, fadeUp (+7 more)

### Community 1 - "App Layout & Fonts"
Cohesion: 0.09
Nodes (17): react, react, inter, playfair, ArcRevealGreeting, ArcRevealHero(), ArcRevealHeroProps, DEFAULT_GREETINGS (+9 more)

### Community 2 - "Services Card Components"
Cohesion: 0.11
Nodes (20): EASE, featureRow, GlassPanel(), LearnMoreButton(), ServiceCard(), ServiceCardTheme, serviceIcons, stagger (+12 more)

### Community 3 - "Dev Dependencies & ESLint"
Cohesion: 0.10
Nodes (21): autoprefixer, eslint, eslint-config-next, devDependencies, autoprefixer, eslint, eslint-config-next, postcss (+13 more)

### Community 4 - "Animation & Motion Libraries"
Cohesion: 0.10
Nodes (21): clsx, framer-motion, gsap, @gsap/react, lucide-react, motion, next, ogl (+13 more)

### Community 5 - "TypeScript Config & Refs"
Cohesion: 0.10
Nodes (21): dom, dom.iterable, esnext, ./src/*, compilerOptions, allowJs, esModuleInterop, incremental (+13 more)

### Community 6 - "About Section Components"
Cohesion: 0.12
Nodes (13): AboutContent, AboutProps, AboutStat, AboutStatKind, AboutStep, content, EASE, fadeUp (+5 more)

### Community 7 - "Gradual Blur UI Effect"
Cohesion: 0.18
Nodes (12): CURVE_FUNCTIONS, debounce(), DEFAULT_CONFIG, getGradientDirection(), GradualBlur(), GradualBlurMemo, GradualBlurProps, mergeConfigs() (+4 more)

### Community 8 - "Next.js Type References"
Cohesion: 0.20
Nodes (9): **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx, exclude (+1 more)

### Community 9 - "Button UI Component"
Cohesion: 0.20
Nodes (6): AnchorProps, ButtonProps, CommonProps, FILL_EASE, MotionConflictingHandlers, NativeButtonProps

### Community 10 - "Package Scripts & Metadata"
Cohesion: 0.22
Nodes (8): name, private, scripts, build, dev, lint, start, version

### Community 11 - "Glow Horizon Visual Effect"
Cohesion: 0.29
Nodes (5): EASE, GlowHorizon(), GlowHorizonProps, GlowHorizonVariant, VARIANTS

### Community 12 - "Project Identity & Docs"
Cohesion: 0.33
Nodes (6): Portfolio Brand Identity Logo, Abstract Geometric S-Mark Design, Geist Font, Next.js Framework, Next.js Portfolio Project, Vercel Deployment Platform

### Community 13 - "Graphify Knowledge Graph"
Cohesion: 0.40
Nodes (5): Graphify Knowledge Graph Rule, Graphify Query Pattern, Graphify Update Pattern, Graphify Workflow, Knowledge Graph Pipeline

### Community 14 - "Strands Visual Component"
Cohesion: 0.67
Nodes (3): buildPalette(), Strands(), StrandsProps

### Community 15 - "i18n Middleware & Routing"
Cohesion: 0.67
Nodes (3): config, middleware(), resolveLocale()

## Knowledge Gaps
- **120 isolated node(s):** `eslintConfig`, `nextConfig`, `name`, `version`, `private` (+115 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `Animation & Motion Libraries` to `App Layout & Fonts`, `Package Scripts & Metadata`?**
  _High betweenness centrality (0.258) - this node is a cross-community bridge._
- **Why does `react` connect `App Layout & Fonts` to `Page Routes & SEO`, `Animation & Motion Libraries`?**
  _High betweenness centrality (0.247) - this node is a cross-community bridge._
- **Why does `useLoaderReveal()` connect `Page Routes & SEO` to `App Layout & Fonts`?**
  _High betweenness centrality (0.137) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `nextConfig`, `name` to the rest of the system?**
  _120 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Page Routes & SEO` be split into smaller, more focused modules?**
  _Cohesion score 0.14015151515151514 - nodes in this community are weakly interconnected._
- **Should `App Layout & Fonts` be split into smaller, more focused modules?**
  _Cohesion score 0.09116809116809117 - nodes in this community are weakly interconnected._
- **Should `Services Card Components` be split into smaller, more focused modules?**
  _Cohesion score 0.10826210826210826 - nodes in this community are weakly interconnected._