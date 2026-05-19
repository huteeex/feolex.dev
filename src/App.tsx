import {
  ArrowDown,
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

const sections = ["profile", "skills", "route", "projects", "contact"] as const;

const ui = {
  ru: {
    nav: ["Профиль", "Навыки", "Маршрут", "Проекты", "Контакты"],
    metaLeft: ["FULLSTACK // 2023-NOW", "PROJECT INDEX"],
    metaRight: ["PYTHON · TYPESCRIPT · REACT", "POSTGRESQL · DOCKER · AI/NLP"],
    metaBottomLeft: "BACKEND / FRONTEND / DATA",
    metaBottomRight: "READY FOR REAL PRODUCTS",
    heroKicker: "Full-stack developer · 3+ года практики · 15+ проектов",
    heroTitle: ["FULL-STACK", "DEVELOPER"],
    heroLead:
      "Собираю веб-продукты от базы данных до запуска: backend, frontend, AI/NLP-логику, админ-панели, ботов и инфраструктуру.",
    primary: "Посмотреть маршрут",
    secondary: "Написать в Telegram",
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
    routeTitle: "Project cockpit",
    routeLead:
      "Интерактивный маршрут проекта: выберите тип задачи и увидите, какой результат я собираю, какой стек подходит и из каких шагов состоит работа.",
    projectsTitle: "5 кейсов из 15+ проектов",
    projectsLead:
      "Проекты, которые показывают ширину опыта: дипломный антиплагиат, сервисы для салона, Telegram-бот, магазин и учебно-коммерческие системы.",
    contactTitle: "Готов обсудить задачу",
    contactLead:
      "Напишите, что нужно сделать: MVP, backend, frontend, Telegram-бот, админ-панель, база данных, AI/NLP или доработка существующего сайта. Я отвечу конкретным планом.",
  },
  en: {
    nav: ["Profile", "Skills", "Route", "Work", "Contact"],
    metaLeft: ["FULLSTACK // 2023-NOW", "PROJECT INDEX"],
    metaRight: ["PYTHON · TYPESCRIPT · REACT", "POSTGRESQL · DOCKER · AI/NLP"],
    metaBottomLeft: "BACKEND / FRONTEND / DATA",
    metaBottomRight: "READY FOR REAL PRODUCTS",
    heroKicker: "Full-stack developer · 3+ years · 15+ projects",
    heroTitle: ["FULL-STACK", "DEVELOPER"],
    heroLead:
      "I build web products from database to launch: backend, frontend, AI/NLP logic, admin panels, bots and deployment infrastructure.",
    primary: "View project route",
    secondary: "Message on Telegram",
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
    routeTitle: "Project cockpit",
    routeLead:
      "An interactive project route: choose a task type and see the outcome, stack and practical steps I use to move from idea to launch.",
    projectsTitle: "5 cases from 15+ projects",
    projectsLead:
      "Selected work that shows the range: diploma anti-plagiarism, salon services, Telegram bot, store and academic/commercial systems.",
    contactTitle: "Ready to discuss the task",
    contactLead:
      "Send what you need: MVP, backend, frontend, Telegram bot, admin panel, database, AI/NLP or existing site improvements. I will reply with a concrete plan.",
  },
};

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
      className="brand-icon"
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
    <header className="floating-nav">
      <a className="nav-brand" href="#hero">
        huteeex.dev
      </a>
      <nav aria-label="Portfolio navigation">
        {sections.map((id, index) => (
          <a key={id} href={`#${id}`}>
            {ui[lang].nav[index]}
          </a>
        ))}
      </nav>
      <div className="nav-actions">
        <button type="button" onClick={() => setLang(lang === "ru" ? "en" : "ru")} aria-label="Switch language">
          <Languages size={16} />
          {lang === "ru" ? "EN" : "RU"}
        </button>
        <button type="button" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="Switch theme">
          {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
        </button>
      </div>
    </header>
  );
}

function MetaBlock({ className, lines }: { className: string; lines: string[] }) {
  return (
    <div className={`meta-data ${className}`}>
      {lines.map((line) => (
        <span key={line}>
          <i>{line}</i>
        </span>
      ))}
    </div>
  );
}

function SectionTitle({ kicker, title, lead }: { kicker: string; title: string; lead?: string }) {
  return (
    <div className="section-heading">
      <span>{kicker}</span>
      <h2>{title}</h2>
      {lead ? <p>{lead}</p> : null}
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

  const t = ui[lang];
  const active = useMemo(() => routes[lang].find((route) => route.key === activeRoute) ?? routes[lang][0], [activeRoute, lang]);

  return (
    <div>
      <Header lang={lang} theme={theme} setLang={setLang} setTheme={setTheme} />

      <main>
        <section id="hero" className="stage">
          <div className="portfolio-canvas">
            <div className="crosshair ch-1" aria-hidden="true" />
            <div className="crosshair ch-2" aria-hidden="true" />
            <div className="accent-block" aria-hidden="true" />

            <MetaBlock className="tl-data" lines={t.metaLeft} />
            <MetaBlock className="tr-data" lines={t.metaRight} />
            <MetaBlock className="bl-data" lines={[t.metaBottomLeft]} />
            <MetaBlock className="br-data" lines={[t.metaBottomRight]} />

            <div className="imagery-layer terminal-visual" aria-label="Developer launch map">
              <div className="terminal-top">
                <span />
                <span />
                <span />
                <strong>launch-map.ts</strong>
              </div>
              <pre>{`const stack = {
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
              <div className="terminal-tags">
                {["AUTH", "API", "DB", "UI", "NLP", "DEPLOY"].map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>

            <div className="title-layer" aria-hidden="true">
              <div className="title">{t.heroTitle[0]}</div>
              <div className="subtitle">{t.heroTitle[1]}</div>
            </div>

            <div className="hero-copy">
              <span>{t.heroKicker}</span>
              <p>{t.heroLead}</p>
              <div className="hero-actions">
                <a href="#route">
                  {t.primary}
                  <ArrowDown size={16} />
                </a>
                <a href={contacts.telegram} target="_blank" rel="noreferrer">
                  {t.secondary}
                  <Send size={16} />
                </a>
              </div>
            </div>

            <ul className="nav-list">
              <li>
                <a className="action-link" href="#skills">
                  Skills
                </a>
              </li>
              <li>
                <a className="action-link" href="#projects">
                  Projects
                </a>
              </li>
              <li>
                <a className="action-link" href="#contact">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </section>

        <section className="content-section stats-strip">
          {stats.map(([value, labels]) => (
            <article className="metric-card" key={value}>
              <strong>{value}</strong>
              <span>{labels[lang]}</span>
            </article>
          ))}
        </section>

        <section id="profile" className="content-section profile-section">
          <SectionTitle kicker={lang === "ru" ? "Профиль" : "Profile"} title={t.profileTitle} lead={t.profileLead} />
          <div className="profile-grid">
            {t.profilePoints.map((point, index) => (
              <article key={point} className="profile-point">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{point}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="content-section">
          <SectionTitle kicker={lang === "ru" ? "Навыки" : "Skills"} title={t.skillsTitle} />
          <div className="skills-grid">
            {skillGroups.map((group) => (
              <article className="skill-card" key={group.title.ru}>
                <h3>{group.title[lang]}</h3>
                <div>
                  {group.items.map(([label, slug, color]) => (
                    <span className="skill-pill" key={`${group.title.ru}-${label}`}>
                      <BrandIcon label={label} slug={slug} color={color} />
                      {label}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section">
          <SectionTitle kicker={lang === "ru" ? "Работа" : "Services"} title={t.servicesTitle} />
          <div className="services-grid">
            {services[lang].map(([title, body, Icon], index) => (
              <article className="service-card" key={title}>
                <div className="service-top">
                  <Icon size={23} />
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="route" className="content-section route-section">
          <SectionTitle kicker={lang === "ru" ? "Интерактив" : "Interactive"} title={t.routeTitle} lead={t.routeLead} />
          <div className="route-board">
            <div className="route-tabs">
              {routes[lang].map((route) => (
                <button
                  key={route.key}
                  type="button"
                  className={route.key === active.key ? "is-active" : ""}
                  onClick={() => setActiveRoute(route.key)}
                >
                  {route.label}
                </button>
              ))}
            </div>
            <article className="route-output" key={active.key}>
              <span>Route output</span>
              <h3>{active.result}</h3>
              <div className="stack-line">
                {active.stack.map((item) => (
                  <em key={item}>{item}</em>
                ))}
              </div>
              <ol>
                {active.steps.map((step, index) => (
                  <li key={step}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </article>
          </div>
        </section>

        <section id="projects" className="content-section">
          <SectionTitle kicker={lang === "ru" ? "Проекты" : "Work"} title={t.projectsTitle} lead={t.projectsLead} />
          <div className="projects-grid">
            {projects[lang].map(([title, label, body, stack], index) => (
              <article className="project-card" key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <small>{label}</small>
                <p>{body}</p>
                <div className="stack-line">
                  {stack.map((item) => (
                    <em key={`${title}-${item}`}>{item}</em>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="content-section contact-section">
          <SectionTitle kicker={lang === "ru" ? "Контакты" : "Contact"} title={t.contactTitle} lead={t.contactLead} />
          <div className="contact-grid">
            <a href={contacts.telegram} target="_blank" rel="noreferrer">
              <Send />
              <span>Telegram</span>
              <strong>@huteex</strong>
            </a>
            <a href={contacts.github} target="_blank" rel="noreferrer">
              <Workflow />
              <span>GitHub</span>
              <strong>github.com/huteeex</strong>
            </a>
            <a href={contacts.email}>
              <Mail />
              <span>Email</span>
              <strong>kalashnikov78ru@gmail.com</strong>
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
