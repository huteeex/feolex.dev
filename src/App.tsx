import {
  ArrowRight,
  Bot,
  Code2,
  Database,
  Languages,
  Mail,
  Moon,
  Rocket,
  Send,
  ServerCog,
  Sparkles,
  Sun,
  Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type Lang = "ru" | "en";
type Theme = "dark" | "light";

const contacts = {
  telegram: "https://t.me/huteex",
  github: "https://github.com/huteeex",
  email: "mailto:kalashnikov78ru@gmail.com",
};

const text = {
  ru: {
    nav: ["Главная", "Профиль", "Навыки", "Маршрут", "Проекты", "Контакты"],
    heroTag: "Full-stack developer · 3+ года · 15+ проектов",
    heroTitle: "Собираю веб-продукты от базы данных до запуска",
    heroLead:
      "React, TypeScript, Python, Django, Node.js, C#, ASP.NET, PostgreSQL, AI/NLP и Docker. Беру идею, раскладываю на архитектуру, интерфейс, данные и понятный план релиза.",
    heroPrimary: "Посмотреть маршрут",
    heroSecondary: "Написать в Telegram",
    profileTitle: "Не просто верстка. Я закрываю продуктовую логику целиком.",
    profileLead:
      "Работаю на стыке backend, frontend и данных: авторизация, роли, REST API, админ-панели, real-time сценарии, отчеты, интеграции и деплой. Отдельный фокус — анализ текста и задачи, близкие к антиплагиату.",
    profilePoints: [
      "Дипломная работа: платформа проверки схожести материалов внутри групп пользователей.",
      "Проекты для людей и бизнеса: Nusi Nails, Telegram-боты, магазины, сайты услуг, админ-панели.",
      "Во время учебы писал курсовые и учебные системы для студентов: БД, CRUD, отчеты, документация и подготовка к защите.",
      "Умею быстро входить в чужой проект: исправить ошибки, улучшить UX, привести интерфейс и backend к рабочему состоянию.",
    ],
    skillsTitle: "Стек, который решает задачи",
    servicesTitle: "Что я могу взять на себя",
    routeTitle: "Project cockpit: как я веду задачу",
    routeLead:
      "Это не декоративная “фишка”, а быстрый способ понять мой рабочий подход. Выберите тип проекта и увидите маршрут: что делаю сначала, какой стек беру и какой результат можно ожидать.",
    projectsTitle: "5 кейсов из 15+ проектов",
    projectsLead:
      "Оставил проекты, которые лучше показывают ширину опыта: дипломный антиплагиат, сервисы для салона, Telegram-бот, магазин и учебно-коммерческие системы.",
    contactTitle: "Готов обсудить задачу",
    contactLead:
      "Напишите, что нужно сделать: MVP, backend, frontend, Telegram-бот, админ-панель, база данных, AI/NLP или доработка существующего сайта. Я отвечу конкретным планом.",
  },
  en: {
    nav: ["Home", "Profile", "Skills", "Route", "Work", "Contact"],
    heroTag: "Full-stack developer · 3+ years · 15+ projects",
    heroTitle: "I build web products from database to launch",
    heroLead:
      "React, TypeScript, Python, Django, Node.js, C#, ASP.NET, PostgreSQL, AI/NLP and Docker. I turn an idea into architecture, interface, data model and a release plan.",
    heroPrimary: "View project route",
    heroSecondary: "Message on Telegram",
    profileTitle: "Not just UI. I own the product logic end to end.",
    profileLead:
      "I work across backend, frontend and data: auth, roles, REST APIs, admin panels, real-time flows, reports, integrations and deployment. A separate focus is text analysis and anti-plagiarism-style tasks.",
    profilePoints: [
      "Diploma project: a platform for checking similarity of materials inside user groups.",
      "Projects for real people and businesses: Nusi Nails, Telegram bots, stores, service websites and admin panels.",
      "During university I built coursework systems for students: databases, CRUD, reports, documentation and defense preparation.",
      "I can enter an existing project quickly: fix bugs, improve UX and bring UI/backend into a working state.",
    ],
    skillsTitle: "Stack that solves tasks",
    servicesTitle: "What I can own",
    routeTitle: "Project cockpit: how I run a task",
    routeLead:
      "Not a decorative gimmick. This shows my working process. Choose a project type and see the route: what comes first, which stack fits and what result to expect.",
    projectsTitle: "5 cases from 15+ projects",
    projectsLead:
      "Selected cases that show the range: diploma anti-plagiarism, salon services, Telegram bot, store and academic/commercial systems.",
    contactTitle: "Ready to discuss the task",
    contactLead:
      "Send what you need: MVP, backend, frontend, Telegram bot, admin panel, database, AI/NLP or existing site improvements. I will reply with a concrete plan.",
  },
};

const sections = ["hero", "profile", "skills", "route", "projects", "contact"];

const stats: Array<[string, Record<Lang, string>]> = [
  ["3+", { ru: "года практической разработки", en: "years of hands-on development" }],
  ["15+", { ru: "проектов и учебных систем", en: "projects and academic systems" }],
  ["5", { ru: "ключевых кейсов", en: "selected portfolio cases" }],
  ["Full-cycle", { ru: "от схемы БД до запуска", en: "from DB schema to launch" }],
];

const skillGroups = [
  {
    title: { ru: "Языки", en: "Languages" },
    items: [
      ["Python", "python", "3776AB"],
      ["TypeScript", "typescript", "3178C6"],
      ["JavaScript", "javascript", "F7DF1E"],
      ["C#", "dotnet", "512BD4"],
      ["SQL", "postgresql", "4169E1"],
      ["Go", "go", "00ADD8"],
      ["PHP", "php", "777BB4"],
    ],
  },
  {
    title: { ru: "Frontend", en: "Frontend" },
    items: [
      ["React", "react", "61DAFB"],
      ["Next.js", "nextdotjs", "111111"],
      ["Vite", "vite", "646CFF"],
      ["Tailwind", "tailwindcss", "06B6D4"],
      ["Redux Toolkit", "redux", "764ABC"],
      ["HTML5", "html5", "E34F26"],
      ["CSS", "css", "663399"],
    ],
  },
  {
    title: { ru: "Backend", en: "Backend" },
    items: [
      ["Django", "django", "092E20"],
      ["DRF", "django", "44B78B"],
      ["Node.js", "nodedotjs", "5FA04E"],
      ["Express", "express", "111111"],
      ["ASP.NET Core", "dotnet", "512BD4"],
      ["REST API", "swagger", "85EA2D"],
      ["Socket.io", "socketdotio", "111111"],
    ],
  },
  {
    title: { ru: "AI, Data, DevOps", en: "AI, Data, DevOps" },
    items: [
      ["OpenAI API", "openai", "111111"],
      ["PostgreSQL", "postgresql", "4169E1"],
      ["Supabase", "supabase", "3FCF8E"],
      ["Docker", "docker", "2496ED"],
      ["Nginx", "nginx", "009639"],
      ["Git", "git", "F05032"],
      ["GitHub", "github", "111111"],
    ],
  },
];

const services: Record<Lang, Array<[string, string, LucideIcon]>> = {
  ru: [
    ["Backend и API", "Django, DRF, Node.js, Express, ASP.NET Core: REST API, роли, JWT, админ-панели, бизнес-логика и интеграции.", ServerCog],
    ["Frontend и UX", "React, Next.js, TypeScript, Tailwind, Redux Toolkit: интерфейсы, формы, кабинеты, адаптивность и понятные сценарии.", Code2],
    ["PostgreSQL и данные", "Схемы БД, связи, SQL, PL/pgSQL, функции, триггеры, фильтрация, отчеты и хранение результатов.", Database],
    ["AI / NLP", "LLM API, prompt engineering, обработка текста, нормализация, токенизация и метрики схожести документов.", Sparkles],
    ["Боты и автоматизация", "Telegram-боты, внутренние панели, CRUD, C# desktop-приложения и автоматизация ручных операций.", Bot],
    ["Запуск и поддержка", "Docker, Nginx, Vercel, Railway, Supabase, GitHub: подготовка проекта к размещению и развитию.", Rocket],
  ],
  en: [
    ["Backend and API", "Django, DRF, Node.js, Express, ASP.NET Core: REST APIs, roles, JWT, admin panels, business logic and integrations.", ServerCog],
    ["Frontend and UX", "React, Next.js, TypeScript, Tailwind, Redux Toolkit: interfaces, forms, accounts, responsive layouts and clear flows.", Code2],
    ["PostgreSQL and data", "DB schemas, relations, SQL, PL/pgSQL, functions, triggers, filtering, reports and result storage.", Database],
    ["AI / NLP", "LLM APIs, prompt engineering, text preprocessing, normalization, tokenization and document similarity metrics.", Sparkles],
    ["Bots and automation", "Telegram bots, internal dashboards, CRUD, C# desktop apps and automation for manual operations.", Bot],
    ["Launch and support", "Docker, Nginx, Vercel, Railway, Supabase, GitHub: preparing projects for deployment and growth.", Rocket],
  ],
};

const routes = {
  ru: [
    {
      key: "mvp",
      label: "MVP / веб-продукт",
      result: "Архитектура, БД, API, frontend, деплой и список следующих итераций.",
      stack: ["React", "TypeScript", "Django/Node", "PostgreSQL", "Docker"],
      steps: ["разбор требований", "модель данных", "API и роли", "интерфейс", "деплой"],
    },
    {
      key: "nlp",
      label: "Антиплагиат / NLP",
      result: "Загрузка документов, preprocessing, метрики схожести, история проверок и отчеты.",
      stack: ["Python", "React", "PostgreSQL", "PL/pgSQL", "Docker"],
      steps: ["нормализация", "токенизация", "сравнение", "хранение", "отчеты"],
    },
    {
      key: "business",
      label: "Сайт для бизнеса",
      result: "Структура, адаптивный интерфейс, формы, каталог/услуги, SEO-база и подготовка к размещению.",
      stack: ["React", "Next.js", "Tailwind", "Forms", "SEO"],
      steps: ["аудит", "структура", "дизайн", "разработка", "запуск"],
    },
    {
      key: "automation",
      label: "Автоматизация",
      result: "Бот, desktop-приложение, админ-панель или API-интеграция под конкретный процесс.",
      stack: ["Python", "C#", "Telegram API", "SQL", "Git"],
      steps: ["процесс", "данные", "сценарии", "интеграции", "отчеты"],
    },
  ],
  en: [
    {
      key: "mvp",
      label: "MVP / web product",
      result: "Architecture, DB, API, frontend, deployment and a next-iteration list.",
      stack: ["React", "TypeScript", "Django/Node", "PostgreSQL", "Docker"],
      steps: ["requirements", "data model", "API and roles", "interface", "deploy"],
    },
    {
      key: "nlp",
      label: "Anti-plagiarism / NLP",
      result: "Document upload, preprocessing, similarity metrics, check history and reports.",
      stack: ["Python", "React", "PostgreSQL", "PL/pgSQL", "Docker"],
      steps: ["normalize", "tokenize", "compare", "store", "report"],
    },
    {
      key: "business",
      label: "Business website",
      result: "Structure, responsive UI, forms, catalog/services, SEO base and launch preparation.",
      stack: ["React", "Next.js", "Tailwind", "Forms", "SEO"],
      steps: ["audit", "structure", "design", "build", "launch"],
    },
    {
      key: "automation",
      label: "Automation",
      result: "A bot, desktop app, admin panel or API integration built for the real process.",
      stack: ["Python", "C#", "Telegram API", "SQL", "Git"],
      steps: ["process", "data", "scenarios", "integrations", "reports"],
    },
  ],
};

const projects: Record<Lang, Array<[string, string, string, string[]]>> = {
  ru: [
    ["Antiplag Platform", "дипломная работа · NLP · PostgreSQL", "Платформа для обнаружения схожести текстовых работ внутри групп: загрузка материалов, обработка текста, сравнение, хранение результатов, пользователи, группы и Docker/Nginx подготовка.", ["TypeScript", "React", "Vite", "PostgreSQL", "PL/pgSQL", "Docker"]],
    ["Nusi Nails Website", "салон красоты · запись · админ-панель", "Full-stack сайт для салона: услуги, мастера, запись на время, регистрация, статусы заявок, клиентская часть и административная панель расписания.", ["React", "TypeScript", "Django/Node", "PostgreSQL", "REST API", "JWT"]],
    ["Nusi Nails Telegram Bot", "бот · заявки · автоматизация", "Telegram-бот для салона: обработка команд, сценарии записи, ответы пользователям, интеграция с backend-логикой и автоматизация общения.", ["Python", "Telegram Bot API", "REST API", "PostgreSQL"]],
    ["monochromist.ru", "магазин одежды · ранний коммерческий проект", "Один из первых проектов: сайт магазина на HTML, CSS, PHP и JavaScript. Каталог, базовая логика страниц, правки отображения и поддержка контента.", ["HTML", "CSS", "JavaScript", "PHP", "SQL"]],
    ["Client & Coursework Systems", "15+ проектов · бизнес и учебные задачи", "Сайты для малого бизнеса, учебные CRUD-системы, базы данных, отчеты, формы, исправления интерфейса, автоматизация и курсовые с документацией.", ["Python", "C#", "React", "SQL", "PostgreSQL", "Git"]],
  ],
  en: [
    ["Antiplag Platform", "diploma project · NLP · PostgreSQL", "A platform for detecting similarity between text works inside groups: uploads, preprocessing, comparison logic, result storage, users, groups and Docker/Nginx preparation.", ["TypeScript", "React", "Vite", "PostgreSQL", "PL/pgSQL", "Docker"]],
    ["Nusi Nails Website", "beauty salon · booking · admin panel", "A full-stack salon website: services, masters, booking, registration, request statuses, client UI and admin schedule management.", ["React", "TypeScript", "Django/Node", "PostgreSQL", "REST API", "JWT"]],
    ["Nusi Nails Telegram Bot", "bot · requests · automation", "A Telegram bot for the salon: command handling, booking scenarios, user replies, backend integration and communication automation.", ["Python", "Telegram Bot API", "REST API", "PostgreSQL"]],
    ["monochromist.ru", "clothing store · early commercial project", "One of my first projects: a store website built with HTML, CSS, PHP and JavaScript. Catalog, page logic, display fixes and content support.", ["HTML", "CSS", "JavaScript", "PHP", "SQL"]],
    ["Client & Coursework Systems", "15+ projects · business and academic tasks", "Small business websites, educational CRUD systems, databases, reports, forms, UI fixes, automation and coursework with documentation.", ["Python", "C#", "React", "SQL", "PostgreSQL", "Git"]],
  ],
};

function BrandIcon({ label, slug, color }: { label: string; slug: string; color: string }) {
  return (
    <img
      src={`https://cdn.simpleicons.org/${slug}/${color}`}
      alt={label}
      width="20"
      height="20"
      loading="lazy"
      className="h-5 w-5 rounded bg-white p-0.5"
      onError={(event) => {
        event.currentTarget.style.display = "none";
      }}
    />
  );
}

function Header({
  lang,
  theme,
  setLang,
  setTheme,
}: {
  lang: Lang;
  theme: Theme;
  setLang: (lang: Lang) => void;
  setTheme: (theme: Theme) => void;
}) {
  return (
    <header className="fixed left-3 right-3 top-3 z-50 rounded-[28px] border border-[var(--line)] bg-[color-mix(in_srgb,var(--panel)_82%,transparent)] px-4 py-3 shadow-2xl shadow-black/20 backdrop-blur-xl lg:left-8 lg:right-8">
      <div className="flex flex-wrap items-center gap-3 lg:flex-nowrap">
        <a href="#hero" className="mr-auto text-lg font-black tracking-tight text-[var(--text)]">
          huteeex.dev
        </a>
        <nav className="order-3 flex w-full gap-1 overflow-x-auto text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)] lg:order-none lg:w-auto lg:gap-2">
          {sections.map((id, index) => (
            <a key={id} href={`#${id}`} className="rounded-full px-3 py-2 transition hover:bg-[var(--soft)] hover:text-[var(--text)]">
              {text[lang].nav[index]}
            </a>
          ))}
        </nav>
        <div className="flex gap-2">
          <button
            type="button"
            className="inline-flex h-10 items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--soft)] px-3 text-sm font-semibold text-[var(--text)]"
            onClick={() => setLang(lang === "ru" ? "en" : "ru")}
            aria-label="Switch language"
          >
            <Languages size={16} />
            {lang === "ru" ? "EN" : "RU"}
          </button>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-[var(--line)] bg-[var(--soft)] text-[var(--text)]"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Switch theme"
          >
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </button>
        </div>
      </div>
    </header>
  );
}

function SectionTitle({ kicker, title, lead }: { kicker: string; title: string; lead?: string }) {
  return (
    <div className="mb-10 max-w-5xl">
      <p className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.22em] text-[var(--orange)]">{kicker}</p>
      <h2 className="text-balance text-4xl font-black uppercase leading-[0.93] tracking-[-0.055em] text-[var(--text)] sm:text-6xl lg:text-7xl">
        {title}
      </h2>
      {lead ? <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--muted)] sm:text-lg">{lead}</p> : null}
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem("portfolio-lang") as Lang) || "ru");
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem("portfolio-theme") as Theme) || "dark");
  const [activeRoute, setActiveRoute] = useState(routes[lang][0].key);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("portfolio-lang", lang);
    localStorage.setItem("portfolio-theme", theme);
  }, [lang, theme]);

  useEffect(() => {
    setActiveRoute(routes[lang][0].key);
  }, [lang]);

  const active = useMemo(() => routes[lang].find((route) => route.key === activeRoute) ?? routes[lang][0], [activeRoute, lang]);
  const t = text[lang];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[var(--bg)] text-[var(--text)]">
      <Header lang={lang} theme={theme} setLang={setLang} setTheme={setTheme} />

      <main>
        <section id="hero" className="relative isolate min-h-screen px-4 pb-16 pt-36 sm:px-8 lg:px-12 lg:pt-40">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_15%,var(--glow),transparent_32rem)]" />
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.02fr_0.88fr] lg:items-center">
            <div>
              <p className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.22em] text-[var(--orange)]">{t.heroTag}</p>
              <h1 className="text-balance text-5xl font-black uppercase leading-[0.9] tracking-[-0.065em] text-[var(--text)] sm:text-7xl lg:text-8xl">
                {t.heroTitle}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">{t.heroLead}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a className="inline-flex min-h-12 items-center gap-3 rounded-full bg-[var(--text)] px-5 font-mono text-sm font-bold uppercase tracking-wide text-[var(--bg)]" href="#route">
                  {t.heroPrimary}
                  <ArrowRight size={18} />
                </a>
                <a className="inline-flex min-h-12 items-center gap-3 rounded-full border border-[var(--line)] bg-[var(--soft)] px-5 font-mono text-sm font-bold uppercase tracking-wide text-[var(--text)]" href={contacts.telegram} target="_blank" rel="noreferrer">
                  {t.heroSecondary}
                  <Send size={18} />
                </a>
              </div>
            </div>

            <div className="rounded-[2rem] border border-[var(--line)] bg-[var(--panel)] p-4 shadow-2xl shadow-black/20 backdrop-blur">
              <div className="flex items-center gap-2 border-b border-[var(--line)] pb-4 font-mono text-xs text-[var(--muted)]">
                <span className="h-3 w-3 rounded-full bg-red-500" />
                <span className="h-3 w-3 rounded-full bg-emerald-400" />
                <span className="h-3 w-3 rounded-full bg-sky-400" />
                <span className="ml-auto">launch-map.ts</span>
              </div>
              <pre className="overflow-x-auto whitespace-pre-wrap py-6 font-mono text-sm leading-7 text-[var(--code)]">{`const stack = {
  backend: ["Django", "Node", "ASP.NET"],
  frontend: ["React", "Next.js", "Tailwind"],
  data: ["PostgreSQL", "PL/pgSQL"],
  extras: ["AI/NLP", "Telegram Bot", "Docker"]
}

ship(product)
  .designDatabase()
  .buildAPI()
  .connectInterface()
  .deploy()`}</pre>
              <div className="grid grid-cols-3 gap-2">
                {["AUTH", "API", "DB", "UI", "NLP", "DEPLOY"].map((item) => (
                  <span className="rounded-2xl border border-[var(--line)] bg-[var(--soft)] px-3 py-4 text-center font-mono text-xs tracking-[0.18em] text-[var(--muted)]" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mx-auto mt-10 grid max-w-7xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map(([value, labels]) => (
              <article className="border border-[var(--line)] bg-[var(--panel)] p-5" key={value}>
                <strong className="block text-3xl font-black">{value}</strong>
                <span className="mt-2 block font-mono text-xs uppercase tracking-[0.14em] text-[var(--muted)]">{labels[lang]}</span>
              </article>
            ))}
          </div>
        </section>

        <section id="profile" className="px-4 py-20 sm:px-8 lg:px-12">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <SectionTitle kicker={lang === "ru" ? "Профиль" : "Profile"} title={t.profileTitle} lead={t.profileLead} />
            <div className="grid gap-4">
              {t.profilePoints.map((item, index) => (
                <article className="flex gap-4 border border-[var(--line)] bg-[var(--panel)] p-5" key={item}>
                  <span className="font-mono text-sm font-bold text-[var(--accent)]">{String(index + 1).padStart(2, "0")}</span>
                  <p className="m-0 leading-7 text-[var(--muted)]">{item}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="px-4 py-20 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <SectionTitle kicker={lang === "ru" ? "Навыки" : "Skills"} title={t.skillsTitle} />
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {skillGroups.map((group) => (
                <article className="min-h-72 border border-[var(--line)] bg-[var(--panel)] p-6" key={group.title.ru}>
                  <h3 className="mb-5 text-2xl font-black">{group.title[lang]}</h3>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map(([label, slug, color]) => (
                      <span className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--soft)] px-3 py-2 font-mono text-xs font-semibold text-[var(--text)]" key={`${group.title.ru}-${label}`}>
                        <BrandIcon label={label} slug={slug} color={color} />
                        {label}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <SectionTitle kicker={lang === "ru" ? "Работа" : "Services"} title={t.servicesTitle} />
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {services[lang].map(([title, body, Icon], index) => (
                <article className="group min-h-60 border border-[var(--line)] bg-[var(--panel)] p-6 transition hover:-translate-y-1 hover:border-[var(--accent)]" key={title}>
                  <div className="flex items-center justify-between text-[var(--accent)]">
                    <Icon size={24} />
                    <span className="font-mono text-xs text-[var(--muted)]">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mt-8 text-2xl font-black">{title}</h3>
                  <p className="mt-4 leading-7 text-[var(--muted)]">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="route" className="px-4 py-20 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <SectionTitle kicker={lang === "ru" ? "Интерактив" : "Interactive"} title={t.routeTitle} lead={t.routeLead} />
            <div className="grid gap-4 border border-[var(--line)] bg-[var(--panel)] p-4 lg:grid-cols-[0.72fr_1.28fr]">
              <div className="grid content-start gap-2">
                {routes[lang].map((route) => (
                  <button
                    className={`min-h-16 border px-5 text-left font-mono text-sm font-bold uppercase tracking-wide transition ${
                      active.key === route.key ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--text)]" : "border-[var(--line)] bg-[var(--soft)] text-[var(--muted)] hover:text-[var(--text)]"
                    }`}
                    type="button"
                    key={route.key}
                    onClick={() => setActiveRoute(route.key)}
                  >
                    {route.label}
                  </button>
                ))}
              </div>
              <article className="border border-[var(--line)] bg-[var(--bg)] p-6">
                <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent)]">Route output</p>
                <h3 className="mt-4 text-3xl font-black uppercase tracking-[-0.04em] sm:text-5xl">{active.result}</h3>
                <div className="mt-6 flex flex-wrap gap-2">
                  {active.stack.map((item) => (
                    <span className="rounded-full border border-[var(--line)] bg-[var(--soft)] px-3 py-2 font-mono text-xs font-semibold" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
                <div className="mt-6 grid gap-2 sm:grid-cols-5">
                  {active.steps.map((step, index) => (
                    <div className="min-h-24 border border-[var(--line)] bg-[var(--panel)] p-4" key={step}>
                      <span className="font-mono text-xs text-[var(--accent)]">{String(index + 1).padStart(2, "0")}</span>
                      <p className="mt-2 text-sm font-semibold text-[var(--text)]">{step}</p>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="projects" className="px-4 py-20 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <SectionTitle kicker={lang === "ru" ? "Проекты" : "Work"} title={t.projectsTitle} lead={t.projectsLead} />
            <div className="grid gap-4 lg:grid-cols-2">
              {projects[lang].map(([title, label, body, stack], index) => (
                <article className="border border-[var(--line)] bg-[var(--panel)] p-6" key={title}>
                  <span className="font-mono text-xs font-bold text-[var(--accent)]">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="mt-5 text-3xl font-black tracking-[-0.04em]">{title}</h3>
                  <p className="mt-2 font-mono text-xs font-bold uppercase tracking-[0.14em] text-[var(--orange)]">{label}</p>
                  <p className="mt-5 leading-7 text-[var(--muted)]">{body}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {stack.map((item) => (
                      <span className="rounded-full border border-[var(--line)] bg-[var(--soft)] px-3 py-2 font-mono text-xs font-semibold" key={`${title}-${item}`}>
                        {item}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="px-4 py-20 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <SectionTitle kicker={lang === "ru" ? "Контакты" : "Contact"} title={t.contactTitle} lead={t.contactLead} />
            <div className="grid gap-4 md:grid-cols-3">
              <a className="border border-[var(--line)] bg-[var(--panel)] p-6 text-[var(--text)] no-underline transition hover:-translate-y-1 hover:border-[var(--accent)]" href={contacts.telegram} target="_blank" rel="noreferrer">
                <Send className="text-[var(--accent)]" />
                <span className="mt-8 block font-mono text-xs uppercase tracking-[0.16em] text-[var(--muted)]">Telegram</span>
                <strong className="mt-2 block text-xl">@huteex</strong>
              </a>
              <a className="border border-[var(--line)] bg-[var(--panel)] p-6 text-[var(--text)] no-underline transition hover:-translate-y-1 hover:border-[var(--accent)]" href={contacts.github} target="_blank" rel="noreferrer">
                <Workflow className="text-[var(--accent)]" />
                <span className="mt-8 block font-mono text-xs uppercase tracking-[0.16em] text-[var(--muted)]">GitHub</span>
                <strong className="mt-2 block break-words text-xl">github.com/huteeex</strong>
              </a>
              <a className="border border-[var(--line)] bg-[var(--panel)] p-6 text-[var(--text)] no-underline transition hover:-translate-y-1 hover:border-[var(--accent)]" href={contacts.email}>
                <Mail className="text-[var(--accent)]" />
                <span className="mt-8 block font-mono text-xs uppercase tracking-[0.16em] text-[var(--muted)]">Email</span>
                <strong className="mt-2 block break-words text-xl">kalashnikov78ru@gmail.com</strong>
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
