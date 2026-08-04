export const profile = {
  name: "Anthony Lazkani",
  handle: "anthony.lazkani",
  title: "Software Engineer",
  location: "Gif-sur-Yvette, France",
  email: "anthonylazkani.22@gmail.com",
  github: "https://github.com/Anthony-Al-Lazkani",
  githubLabel: "github.com/Anthony-Al-Lazkani",
  linkedin: "https://linkedin.com/in/anthony-lazkani",
  linkedinLabel: "linkedin.com/in/anthony-lazkani",
  statement:
    "I am fascinated by how complex systems operate at the micro level.",
  bio: "Software engineer driven by curiosity and ambitious ideas, exploring how far software can go to solve real problems. Always learning, building, and diving deeper into AI, open source, and the craft of software.",
};

export type SkillCategory = {
  id: string;
  code: string;
  label: string;
  hint: string;
  items: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    code: "MOD_01",
    label: "Languages",
    hint: "core runtimes",
    items: ["Python", "C++", "Java", "Kotlin", "SQL", "JavaScript", "TypeScript"],
  },
  {
    id: "frameworks",
    code: "MOD_02",
    label: "Frameworks",
    hint: "app shells",
    items: ["FastAPI", "React.js", "Next.js", "Node.js", "Flask", "SvelteKit"],
  },
  {
    id: "ai",
    code: "MOD_03",
    label: "AI / Data",
    hint: "intelligence layer",
    items: ["Pandas", "Scikit-Learn", "Vercel AI SDK", "SpeechBrain", "LLM Architecture"],
  },
  {
    id: "tools",
    code: "MOD_04",
    label: "Technologies",
    hint: "infrastructure",
    items: ["Linux", "Git", "Docker", "MongoDB", "REST API", "SQLite", "Prisma", "Salesforce"],
  },
];

export type TermLine = {
  prompt?: string;
  text: string;
  tone?: "cmd" | "out" | "ok" | "warn" | "dim";
};

export type Project = {
  id: string;
  name: string;
  status?: "NEW";
  cmd: string;
  description: string;
  tech: string[];
  lines: TermLine[];
};

export const projects: Project[] = [
  {
    id: "mailsh",
    name: "Mailsh",
    status: "NEW",
    cmd: "mailsh — npm @armjunior/mailsh",
    description:
      "A globally published NPM CLI tool. Acts as a terminal-based AI assistant that triages inboxes, drafts emails via LLM, and manages contacts directly from the command line using local database resolution.",
    tech: ["TypeScript", "Vercel AI SDK", "Prisma", "SQLite", "Gmail API"],
    lines: [
      { prompt: "$", text: "npx @armjunior/mailsh --inbox", tone: "cmd" },
      { prompt: "›", text: "resolving local index ......... done", tone: "dim" },
      { prompt: "›", text: "14 threads · 3 urgent · 2 from AI-ops", tone: "out" },
      { prompt: ">", text: 'draft 1: "Re: CI pipeline hotfix" — [y/n]', tone: "out" },
      { prompt: "✓", text: "reply drafted · contact updated in sqlite", tone: "ok" },
    ],
  },
  {
    id: "finance",
    name: "Financial Advisory Bot",
    cmd: "experts — signal fusion",
    description:
      "Predicts a stock's price from an interest + budget prompt (e.g. \"AAPL, $2000\"). Four specialist LLMs forecast in parallel: alpha, news, market, fundamentals. A fifth fuses them into a buy/sell call, and a portfolio manager handles the exact rebalance.",
    tech: ["Python", "FastAPI", "Pandas", "Scikit-Learn", "Supabase"],
    lines: [
      { prompt: "$", text: "./experts run --ticker AAPL --budget 2000", tone: "cmd" },
      { prompt: "›", text: "fetching 4 streams in parallel ........ done", tone: "dim" },
      { prompt: "›", text: "[news]        prediction: bullish  (+0.72)", tone: "out" },
      { prompt: "›", text: "[alphas]      prediction: bullish  (+0.41)", tone: "out" },
      { prompt: "→", text: "decision llm: BUY · conf 0.68", tone: "ok" },
      { prompt: "✓", text: "portfolio mgr: sell 12 AAPL · alloc $1,420", tone: "ok" },
    ],
  },
  {
    id: "friendshare",
    name: "Friendshare",
    cmd: "friendshare — trip.split",
    description:
      "Full-stack expense-sharing app with trip management, custom split algorithms, and multilingual translation integration.",
    tech: ["Next.js", "FastAPI", "TypeScript", "PostgreSQL", "REST API"],
    lines: [
      { prompt: "$", text: "friend split --algorithm fair", tone: "cmd" },
      { prompt: "›", text: 'trip "Bali · Aug" · €1,284.50', tone: "out" },
      { prompt: "›", text: "anthony → €412.00 · salma → €297.50", tone: "out" },
      { prompt: "›", text: "leo → €312.00 · maria → €263.00", tone: "out" },
      { prompt: "✓", text: "settled · zero-debt engine", tone: "ok" },
    ],
  },
];

export type Experience = {
  id: string;
  node: string;
  role: string;
  company: string;
  period: string;
  location: string;
  points: string[];
  tags: string[];
};

export const experiences: Experience[] = [
  {
    id: "usj",
    node: "NODE_01",
    role: "Software Engineering Intern",
    company: "Saint Joseph University",
    period: "Jan 2025 — Jul 2025",
    location: "Beirut",
    points: [
      "Developed Android backend (FastAPI) for home automation with Voice Auth.",
      "Integrated AI voice recognition (SpeechBrain) and an NLP model (Scikit-learn, 85.85% accuracy).",
      "Parallelized processing layers, cutting inference latency to 0.88s.",
    ],
    tags: ["FastAPI", "Python", "SpeechBrain", "Scikit-Learn"],
  },
  {
    id: "dsh",
    node: "NODE_02",
    role: "Information Technology Intern",
    company: "Dar Al-Handasah",
    period: "May 2024 — Jul 2024",
    location: "Beirut",
    points: [
      "Configured MicroTik routers, VLANs, and ESXi Windows Server VMs.",
      "Developed a frontend social network with React.js and real-time updates.",
    ],
    tags: ["Linux", "React.js", "JavaScript", "REST API"],
  },
];

export type Education = {
  id: string;
  degree: string;
  school: string;
  location: string;
  period: string;
  timeline: string;
  status: "IN PROGRESS" | "COMPLETED";
  progress: number;
};

export const education: Education[] = [
  {
    id: "cs",
    degree: "Specialized Masters in Engineering of Open Intelligent Systems",
    school: "CentraleSupélec",
    location: "Gif-sur-Yvette, France",
    period: "Sep 2025 — Sep 2026",
    timeline: "2025 - 2026",
    status: "IN PROGRESS",
    progress: 18,
  },
  {
    id: "sju",
    degree: "Engineering Degree in Computer and Communications Engineering",
    school: "Saint Joseph University",
    location: "Beirut, Lebanon",
    period: "Sep 2020 — Jul 2025",
    timeline: "2020 - 2025",
    status: "COMPLETED",
    progress: 100,
  },
];

export type Metric = {
  key: string;
  value: number;
  decimals: number;
  suffix: string;
  label: string;
  tone: string;
};

export const metrics: Metric[] = [
  { key: "voice_accuracy", value: 85.85, decimals: 2, suffix: "%", label: "NLP classifier accuracy", tone: "ok" },
  { key: "inference_latency", value: 0.88, decimals: 2, suffix: "s", label: "parallelized voice pipeline", tone: "accent" },
  { key: "npm_packages", value: 1, decimals: 0, suffix: "", label: "globally published CLI", tone: "accent2" },
  { key: "expert_llms", value: 5, decimals: 0, suffix: "", label: "specialist LLMs in the pipeline", tone: "ok" },
];

export const bootLines = [
  { prompt: ">", text: "systemctl start portfolio", tone: "cmd" },
  { prompt: "›", text: "mounting /dev/micro_systems ........ OK", tone: "dim" },
  { prompt: "›", text: "loading modules: skills, projects, experience ........ OK", tone: "dim" },
  { prompt: "›", text: "establishing neural grid ........ OK", tone: "dim" },
  { prompt: "✓", text: "boot complete · latency 0.88s", tone: "ok" },
] as TermLine[];
