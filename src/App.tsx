import {
  ArrowRight,
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
import { useEffect, useMemo, useRef, useState } from "react";

type Lang = "ru" | "en";
type Theme = "dark" | "light";

const contacts = {
  telegram: "https://t.me/huteex",
  github: "https://github.com/huteeex",
  email: "mailto:kalashnikov78ru@gmail.com",
};

const nav = {
  ru: [
    ["Главная", "hero"],
    ["Профиль", "profile"],
    ["Навыки", "skills"],
    ["Маршрут", "route"],
    ["Проекты", "projects"],
    ["Контакты", "contact"],
  ],
  en: [
    ["Home", "hero"],
    ["Profile", "profile"],
    ["Skills", "skills"],
    ["Route", "route"],
    ["Work", "projects"],
    ["Contact", "contact"],
  ],
} as const;

const copy = {
  ru: {
    heroKicker: "Full-stack developer · 3+ года практики · 15+ проектов",
    heroTitle: "Full-stack под запуск",
    heroLead:
      "Проектирую и собираю веб-приложения целиком: backend, frontend, базу данных, AI/NLP-логику, админ-панели и инфраструктуру для деплоя.",
    heroCta: "Показать маршрут проекта",
    heroNote: "Листайте дальше: на десктопе сайт едет вправо, на телефоне — вниз",
    stats: [
      ["3+", "года практической разработки"],
      ["15+", "проектов и учебных систем"],
      ["5", "ключевых кейсов в портфолио"],
      ["Full-cycle", "от схемы БД до запуска"],
    ],
    profileTitle: "Не джуниорская витрина. Рабочий опыт в продуктах, данных и интерфейсах.",
    profileText: [
      "Я full-stack разработчик: работаю с Python, Node.js, TypeScript, React, C#, ASP.NET, Django и PostgreSQL. Собираю системы с авторизацией, ролями, REST API, административными панелями, отчетами, real-time функционалом и нормальной интеграцией frontend с backend.",
      "Отдельная сильная зона — анализ текста и проверка схожести материалов. Дипломная работа была связана с антиплагиатом: загрузка документов, подготовка текста, сравнение, хранение результатов и работа с группами пользователей.",
      "Во время учебы делал курсовые и учебные проекты для студентов: базы данных, CRUD-системы, отчеты, автоматизация и документация. Это дало много практики в быстрых задачах, чужих требованиях и доведении проекта до защиты.",
    ],
    servicesTitle: "Что я закрываю в проекте",
    servicesLead: "Не просто верстка. Я думаю о данных, сценариях, правах доступа, скорости, поддержке и запуске.",
    skillsTitle: "Навыки без шума",
    skillsLead: "Стек подобран не для красивого списка, а для задач: быстро собрать MVP, доработать существующий продукт или усилить backend.",
    routeTitle: "Project Route Board",
    routeLead:
      "Вместо странной “фишки” — понятный интерактив: выберите тип задачи, и сайт покажет, как я превращаю ее в рабочий план, стек и первый результат.",
    projectsTitle: "Пять кейсов из более чем 15 проектов",
    projectsLead:
      "Здесь оставлены проекты, которые лучше всего показывают ширину опыта: дипломная NLP-платформа, сервисы для бизнеса, бот, магазин и учебно-коммерческие системы.",
    contactTitle: "Давайте обсудим задачу",
    contactLead:
      "Напишите, что нужно сделать: MVP, backend, интерфейс, бот, админ-панель, база данных или доработка существующего сайта. Я отвечу по делу и предложу план.",
    contactCta: "Написать в Telegram",
  },
  en: {
    heroKicker: "Full-stack developer · 3+ years · 15+ projects",
    heroTitle: "Full-stack built to ship",
    heroLead:
      "I design and build complete web products: backend, frontend, databases, AI/NLP logic, admin panels and deployment infrastructure.",
    heroCta: "Open project route",
    heroNote: "Scroll to explore: sideways on desktop, vertical on mobile",
    stats: [
      ["3+", "years of hands-on development"],
      ["15+", "projects and academic systems"],
      ["5", "selected portfolio cases"],
      ["Full-cycle", "from DB schema to launch"],
    ],
    profileTitle: "Not a junior showcase. Real work across products, data and interfaces.",
    profileText: [
      "I am a full-stack developer working with Python, Node.js, TypeScript, React, C#, ASP.NET, Django and PostgreSQL. I build systems with authentication, roles, REST APIs, admin panels, reports, real-time features and clean frontend/backend integration.",
      "A separate strong area is text analysis and document similarity. My diploma project focused on anti-plagiarism: document upload, text preprocessing, comparison logic, result storage and group-based user workflows.",
      "During university I also built coursework and educational systems for students: databases, CRUD apps, reports, automation and documentation. That gave me a lot of practice with fast requirements and shipping projects to a defendable state.",
    ],
    servicesTitle: "What I can own in a project",
    servicesLead: "Not just UI. I think about data, user flows, permissions, speed, support and deployment.",
    skillsTitle: "Skills without noise",
    skillsLead: "The stack is selected for real tasks: launching an MVP, improving an existing product or strengthening backend architecture.",
    routeTitle: "Project Route Board",
    routeLead:
      "A clear interactive board: choose a task type and the site shows how I turn it into a practical plan, stack and first deliverable.",
    projectsTitle: "Five cases from 15+ projects",
    projectsLead:
      "Selected work that shows the range: an NLP diploma platform, business services, a bot, a store and academic/commercial systems.",
    contactTitle: "Let’s discuss the project",
    contactLead:
      "Send me what you need: MVP, backend, UI, bot, admin panel, database or existing site improvement. I will reply with a practical plan.",
    contactCta: "Message on Telegram",
  },
};

const serviceItems = {
  ru: [
    {
      icon: ServerCog,
      title: "Backend и API",
      text: "Django, DRF, Node.js, Express, ASP.NET Core: REST API, роли, JWT, админ-панели, бизнес-логика и интеграции.",
    },
    {
      icon: Code2,
      title: "Frontend и UX",
      text: "React, Next.js, TypeScript, Tailwind, Redux Toolkit: интерфейсы, формы, кабинеты, адаптивность и понятные пользовательские сценарии.",
    },
    {
      icon: Database,
      title: "Данные и PostgreSQL",
      text: "Схемы БД, связи, SQL, PL/pgSQL, функции, триггеры, фильтрация, отчеты и хранение результатов проверок.",
    },
    {
      icon: Sparkles,
      title: "AI / NLP",
      text: "Интеграция LLM API, prompt engineering, обработка текста, нормализация, токенизация и метрики схожести документов.",
    },
    {
      icon: Workflow,
      title: "Автоматизация",
      text: "Telegram-боты, внутренние панели, CRUD, desktop-приложения на C#, сценарии для учета, заявок и повторяющихся операций.",
    },
    {
      icon: Rocket,
      title: "Запуск и DevOps",
      text: "Docker, Docker Compose, Nginx, Vercel, Railway, Supabase, GitHub: подготовка проекта к реальному размещению.",
    },
  ],
  en: [
    {
      icon: ServerCog,
      title: "Backend and API",
      text: "Django, DRF, Node.js, Express, ASP.NET Core: REST APIs, roles, JWT, admin panels, business logic and integrations.",
    },
    {
      icon: Code2,
      title: "Frontend and UX",
      text: "React, Next.js, TypeScript, Tailwind, Redux Toolkit: interfaces, forms, accounts, responsive layouts and clear flows.",
    },
    {
      icon: Database,
      title: "Data and PostgreSQL",
      text: "DB schemas, relations, SQL, PL/pgSQL, functions, triggers, filtering, reports and check-result storage.",
    },
    {
      icon: Sparkles,
      title: "AI / NLP",
      text: "LLM API integration, prompt engineering, text preprocessing, normalization, tokenization and document similarity metrics.",
    },
    {
      icon: Workflow,
      title: "Automation",
      text: "Telegram bots, internal dashboards, CRUD, C# desktop apps and workflows for inventory, requests and repeated operations.",
    },
    {
      icon: Rocket,
      title: "Launch and DevOps",
      text: "Docker, Docker Compose, Nginx, Vercel, Railway, Supabase, GitHub: preparing projects for real deployment.",
    },
  ],
};

const skillGroups = [
  {
    ruTitle: "Языки",
    enTitle: "Languages",
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
    ruTitle: "Frontend",
    enTitle: "Frontend",
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
    ruTitle: "Backend",
    enTitle: "Backend",
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
    ruTitle: "AI, Data, DevOps",
    enTitle: "AI, Data, DevOps",
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

const routes = {
  ru: [
    {
      key: "mvp",
      label: "MVP / веб-продукт",
      title: "Быстро собрать рабочую первую версию без хаоса",
      result: "Архитектура, база данных, API, frontend, деплой и список следующих итераций.",
      timeline: "2-6 недель",
      steps: ["собираю требования и риски", "проектирую сущности и роли", "делаю API и UI", "готовлю деплой и документацию"],
    },
    {
      key: "nlp",
      label: "Антиплагиат / NLP",
      title: "Сравнение текстов, группы пользователей и понятные результаты",
      result: "Загрузка документов, preprocessing, метрики схожести, история проверок и отчеты.",
      timeline: "4-8 недель",
      steps: ["нормализация текста", "токенизация и сравнение", "хранение результатов", "админ-панель и группы"],
    },
    {
      key: "business",
      label: "Сайт для бизнеса",
      title: "Сайт, который объясняет услугу и приводит заявки",
      result: "Структура, адаптивный интерфейс, формы, каталог/услуги, SEO-база и подготовка к размещению.",
      timeline: "1-3 недели",
      steps: ["аудит сценариев", "структура страниц", "верстка и формы", "оптимизация и запуск"],
    },
    {
      key: "automation",
      label: "Автоматизация",
      title: "Убрать ручную работу из заявок, учета и внутренних операций",
      result: "Бот, desktop-приложение, админ-панель или API-интеграция под конкретный процесс.",
      timeline: "2-5 недель",
      steps: ["описываю процесс", "делаю модель данных", "автоматизирую сценарии", "добавляю отчеты"],
    },
  ],
  en: [
    {
      key: "mvp",
      label: "MVP / web product",
      title: "Build a working first version without chaos",
      result: "Architecture, database, API, frontend, deployment and a clear next-iteration list.",
      timeline: "2-6 weeks",
      steps: ["gather requirements and risks", "design entities and roles", "build API and UI", "prepare deployment and docs"],
    },
    {
      key: "nlp",
      label: "Anti-plagiarism / NLP",
      title: "Text comparison, user groups and clear results",
      result: "Document upload, preprocessing, similarity metrics, check history and reports.",
      timeline: "4-8 weeks",
      steps: ["normalize text", "tokenize and compare", "store results", "build admin and groups"],
    },
    {
      key: "business",
      label: "Business website",
      title: "A website that explains the service and brings requests",
      result: "Structure, responsive UI, forms, catalog/services, SEO base and deployment preparation.",
      timeline: "1-3 weeks",
      steps: ["audit user flows", "structure pages", "build UI and forms", "optimize and launch"],
    },
    {
      key: "automation",
      label: "Automation",
      title: "Remove manual work from requests, inventory and operations",
      result: "A bot, desktop app, admin panel or API integration built around the real process.",
      timeline: "2-5 weeks",
      steps: ["describe the process", "model the data", "automate scenarios", "add reports"],
    },
  ],
};

const projects = {
  ru: [
    {
      title: "Antiplag Platform",
      label: "дипломная работа · NLP · PostgreSQL",
      text: "Платформа для обнаружения схожести текстовых работ внутри групп. Реализованы загрузка материалов, обработка текста, сравнение, хранение результатов, пользователи, группы и подготовка к Docker/Nginx запуску.",
      stack: ["TypeScript", "React", "Vite", "Tailwind", "PostgreSQL", "PL/pgSQL", "Docker", "Nginx"],
    },
    {
      title: "Nusi Nails Website",
      label: "салон красоты · запись · админ-панель",
      text: "Full-stack сайт для салона: услуги, мастера, запись на время, регистрация, статусы заявок, клиентская часть и административная панель для управления расписанием.",
      stack: ["React", "TypeScript", "Node.js", "Django", "PostgreSQL", "REST API", "JWT", "Tailwind"],
    },
    {
      title: "Nusi Nails Telegram Bot",
      label: "бот · заявки · автоматизация",
      text: "Telegram-бот для салона: обработка команд, сценарии записи, ответы пользователям, интеграция с backend-логикой и подготовка к автоматизации клиентского общения.",
      stack: ["Python", "Telegram Bot API", "REST API", "PostgreSQL", "Git"],
    },
    {
      title: "monochromist.ru",
      label: "магазин одежды · ранний коммерческий проект",
      text: "Один из первых проектов: сайт магазина на HTML, CSS, PHP и JavaScript. Каталог, базовая логика страниц, правки отображения, адаптация интерфейса и поддержка контента.",
      stack: ["HTML", "CSS", "JavaScript", "PHP", "SQL"],
    },
    {
      title: "Client & Coursework Systems",
      label: "15+ проектов · бизнес и учебные задачи",
      text: "Сайты для малого бизнеса, учебные CRUD-системы, базы данных, отчеты, формы, исправления интерфейса, автоматизация и курсовые проекты с документацией и подготовкой к защите.",
      stack: ["Python", "C#", "React", "SQL", "PostgreSQL", "Docker", "Git"],
    },
  ],
  en: [
    {
      title: "Antiplag Platform",
      label: "diploma project · NLP · PostgreSQL",
      text: "A platform for detecting similarity between text works inside groups. It includes uploads, text preprocessing, comparison logic, result storage, users, groups and Docker/Nginx launch preparation.",
      stack: ["TypeScript", "React", "Vite", "Tailwind", "PostgreSQL", "PL/pgSQL", "Docker", "Nginx"],
    },
    {
      title: "Nusi Nails Website",
      label: "beauty salon · booking · admin panel",
      text: "A full-stack salon website: services, masters, appointment booking, registration, request statuses, client UI and an admin panel for schedule management.",
      stack: ["React", "TypeScript", "Node.js", "Django", "PostgreSQL", "REST API", "JWT", "Tailwind"],
    },
    {
      title: "Nusi Nails Telegram Bot",
      label: "bot · requests · automation",
      text: "A Telegram bot for the salon: command handling, booking scenarios, user replies, backend logic integration and automation of client communication.",
      stack: ["Python", "Telegram Bot API", "REST API", "PostgreSQL", "Git"],
    },
    {
      title: "monochromist.ru",
      label: "clothing store · early commercial project",
      text: "One of my first commercial projects: a store website built with HTML, CSS, PHP and JavaScript. Catalog, page logic, display fixes, responsive adjustments and content support.",
      stack: ["HTML", "CSS", "JavaScript", "PHP", "SQL"],
    },
    {
      title: "Client & Coursework Systems",
      label: "15+ projects · business and academic tasks",
      text: "Small business websites, educational CRUD systems, databases, reports, forms, UI fixes, automation and coursework projects with documentation and defense preparation.",
      stack: ["Python", "C#", "React", "SQL", "PostgreSQL", "Docker", "Git"],
    },
  ],
};

function BrandIcon({ slug, color, label }: { slug: string; color: string; label: string }) {
  return (
    <img
      src={`https://cdn.simpleicons.org/${slug}/${color}`}
      alt={label}
      className="brand-icon"
      loading="lazy"
      width="22"
      height="22"
      onError={(event) => {
        event.currentTarget.style.display = "none";
      }}
    />
  );
}

function AppNav({
  lang,
  theme,
  setLang,
  setTheme,
  scrollToPanel,
}: {
  lang: Lang;
  theme: Theme;
  setLang: (lang: Lang) => void;
  setTheme: (theme: Theme) => void;
  scrollToPanel: (id: string) => void;
}) {
  return (
    <header className="topbar">
      <button className="brand-button" type="button" onClick={() => scrollToPanel("hero")}>
        huteeex.dev
      </button>
      <nav className="topbar-links" aria-label={lang === "ru" ? "Навигация по сайту" : "Site navigation"}>
        {nav[lang].map(([label, id]) => (
          <button key={id} type="button" onClick={() => scrollToPanel(id)}>
            {label}
          </button>
        ))}
      </nav>
      <div className="topbar-actions">
        <button type="button" onClick={() => setLang(lang === "ru" ? "en" : "ru")} aria-label="Switch language">
          <Languages size={16} />
          {lang === "ru" ? "EN" : "RU"}
        </button>
        <button type="button" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="Switch theme">
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
    </header>
  );
}

function SideRails({ lang }: { lang: Lang }) {
  return (
    <aside className="side-rails" aria-label={lang === "ru" ? "Быстрые контакты" : "Quick contacts"}>
      <a className="rail rail-blue" href={contacts.github} target="_blank" rel="noreferrer">
        GitHub
      </a>
      <a className="rail rail-violet" href={contacts.telegram} target="_blank" rel="noreferrer">
        Telegram
      </a>
    </aside>
  );
}

function PanelTitle({ kicker, title, lead }: { kicker: string; title: string; lead?: string }) {
  return (
    <div className="panel-title">
      <span>{kicker}</span>
      <h2>{title}</h2>
      {lead ? <p>{lead}</p> : null}
    </div>
  );
}

function HeroPanel({ lang, scrollToPanel }: { lang: Lang; scrollToPanel: (id: string) => void }) {
  const t = copy[lang];

  return (
    <section id="hero" className="panel hero-panel" aria-label={lang === "ru" ? "Главный экран" : "Hero"}>
      <div className="hero-layout">
        <div className="hero-word">
          <span>{t.heroKicker}</span>
          <h1>{t.heroTitle}</h1>
          <p>{t.heroLead}</p>
          <div className="hero-actions">
            <button type="button" onClick={() => scrollToPanel("route")}>
              {t.heroCta}
              <ArrowRight size={18} />
            </button>
            <small>{t.heroNote}</small>
          </div>
        </div>
        <div className="hero-terminal" aria-label="Developer stack terminal">
          <div className="terminal-top">
            <i />
            <i />
            <i />
            <strong>launch-plan.ts</strong>
          </div>
          <pre>{`type Product = {
  backend: "Django" | "Node" | "ASP.NET";
  frontend: "React" | "Next.js";
  database: "PostgreSQL";
  extras: ["AI/NLP", "Telegram Bot", "Docker"];
}

const launch = async (idea: Product) => {
  await designSchema(idea.database)
  await shipAPI(idea.backend)
  await connectUI(idea.frontend)
  return deploy("Docker + Nginx")
}`}</pre>
          <div className="terminal-tags">
            {["AUTH", "API", "DB", "UI", "NLP", "DEPLOY"].map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="hero-stats" aria-label={lang === "ru" ? "Ключевые показатели" : "Key metrics"}>
        {t.stats.map(([value, label]) => (
          <article key={value}>
            <strong>{value}</strong>
            <span>{label}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProfilePanel({ lang }: { lang: Lang }) {
  const t = copy[lang];

  return (
    <section id="profile" className="panel profile-panel">
      <PanelTitle kicker={lang === "ru" ? "Профиль" : "Profile"} title={t.profileTitle} />
      <div className="profile-copy">
        {t.profileText.map((text) => (
          <p key={text}>{text}</p>
        ))}
      </div>
      <div className="profile-strip">
        {[
          ["Backend", "Django · Node.js · ASP.NET"],
          ["Frontend", "React · Next.js · TypeScript"],
          ["Data", "PostgreSQL · SQL · PL/pgSQL"],
          ["AI/NLP", "OpenAI API · Similarity · Text processing"],
        ].map(([title, text]) => (
          <article key={title}>
            <strong>{title}</strong>
            <span>{text}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function SkillsPanel({ lang }: { lang: Lang }) {
  const t = copy[lang];

  return (
    <section id="skills" className="panel skills-panel">
      <PanelTitle kicker={lang === "ru" ? "Навыки" : "Skills"} title={t.skillsTitle} lead={t.skillsLead} />
      <div className="skills-board">
        {skillGroups.map((group) => (
          <article className="skill-group" key={group.ruTitle}>
            <h3>{lang === "ru" ? group.ruTitle : group.enTitle}</h3>
            <div>
              {group.items.map(([label, slug, color]) => (
                <span className="skill-chip" key={`${group.ruTitle}-${label}`}>
                  <BrandIcon label={label} slug={slug} color={color} />
                  {label}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ServicesPanel({ lang }: { lang: Lang }) {
  const t = copy[lang];

  return (
    <section id="services" className="panel services-panel">
      <PanelTitle kicker={lang === "ru" ? "Работа" : "Services"} title={t.servicesTitle} lead={t.servicesLead} />
      <div className="service-grid">
        {serviceItems[lang].map((item, index) => {
          const Icon = item.icon;
          return (
            <article className="service-tile" key={item.title}>
              <div>
                <Icon size={22} />
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function RoutePanel({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const routeList = routes[lang];
  const [activeKey, setActiveKey] = useState(routeList[0].key);
  const active = useMemo(() => routeList.find((item) => item.key === activeKey) ?? routeList[0], [activeKey, routeList]);

  useEffect(() => {
    setActiveKey(routeList[0].key);
  }, [lang, routeList]);

  return (
    <section id="route" className="panel route-panel">
      <PanelTitle kicker={lang === "ru" ? "Фишка, но понятная" : "Interactive board"} title={t.routeTitle} lead={t.routeLead} />
      <div className="route-board">
        <div className="route-tabs" role="tablist" aria-label={lang === "ru" ? "Типы задач" : "Task types"}>
          {routeList.map((item) => (
            <button
              type="button"
              key={item.key}
              className={active.key === item.key ? "is-active" : ""}
              onClick={() => setActiveKey(item.key)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <article className="route-card">
          <span className="route-time">{active.timeline}</span>
          <h3>{active.title}</h3>
          <p>{active.result}</p>
          <ol>
            {active.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </article>
      </div>
    </section>
  );
}

function ProjectsPanel({ lang }: { lang: Lang }) {
  const t = copy[lang];

  return (
    <section id="projects" className="panel projects-panel">
      <PanelTitle kicker={lang === "ru" ? "Проекты" : "Projects"} title={t.projectsTitle} lead={t.projectsLead} />
      <div className="project-row">
        {projects[lang].map((project, index) => (
          <article className="project-card" key={project.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{project.title}</h3>
            <small>{project.label}</small>
            <p>{project.text}</p>
            <div>
              {project.stack.map((item) => (
                <em key={`${project.title}-${item}`}>{item}</em>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ContactPanel({ lang }: { lang: Lang }) {
  const t = copy[lang];

  return (
    <section id="contact" className="panel contact-panel">
      <PanelTitle kicker={lang === "ru" ? "Контакты" : "Contact"} title={t.contactTitle} lead={t.contactLead} />
      <div className="contact-grid">
        <a href={contacts.telegram} target="_blank" rel="noreferrer">
          <Send size={24} />
          <span>Telegram</span>
          <strong>@huteex</strong>
        </a>
        <a href={contacts.github} target="_blank" rel="noreferrer">
          <BrandIcon label="GitHub" slug="github" color="111111" />
          <span>GitHub</span>
          <strong>github.com/huteeex</strong>
        </a>
        <a href={contacts.email}>
          <Mail size={24} />
          <span>Email</span>
          <strong>kalashnikov78ru@gmail.com</strong>
        </a>
      </div>
      <a className="final-cta" href={contacts.telegram} target="_blank" rel="noreferrer">
        {t.contactCta}
        <ArrowRight size={18} />
      </a>
    </section>
  );
}

export default function App() {
  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem("portfolio-lang") as Lang) || "ru");
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem("portfolio-theme") as Theme) || "dark");
  const deckRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("portfolio-lang", lang);
    localStorage.setItem("portfolio-theme", theme);
  }, [lang, theme]);

  useEffect(() => {
    deckRef.current?.scrollTo({ left: 0 });
  }, []);

  const scrollToPanel = (id: string) => {
    const panel = document.getElementById(id);
    if (!panel) {
      return;
    }
    if (window.innerWidth >= 960 && deckRef.current) {
      deckRef.current.scrollTo({ left: panel.offsetLeft, behavior: "smooth" });
      return;
    }
    panel.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const deck = deckRef.current;
    if (!deck || window.innerWidth < 960 || Math.abs(event.deltaY) <= Math.abs(event.deltaX)) {
      return;
    }
    deck.scrollLeft += event.deltaY;
    event.preventDefault();
  };

  return (
    <>
      <AppNav lang={lang} theme={theme} setLang={setLang} setTheme={setTheme} scrollToPanel={scrollToPanel} />
      <SideRails lang={lang} />
      <main className="deck" ref={deckRef} onWheel={handleWheel}>
        <HeroPanel lang={lang} scrollToPanel={scrollToPanel} />
        <ProfilePanel lang={lang} />
        <SkillsPanel lang={lang} />
        <ServicesPanel lang={lang} />
        <RoutePanel lang={lang} />
        <ProjectsPanel lang={lang} />
        <ContactPanel lang={lang} />
      </main>
    </>
  );
}
