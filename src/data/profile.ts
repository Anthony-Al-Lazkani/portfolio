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
    items: ["Python", "C++", "Java", "Kotlin", "SQL", "Apex", "JavaScript", "TypeScript"],
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
    items: ["Pandas", "Scikit-Learn"],
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
    id: "zeplug",
    node: "NODE_01",
    role: "Software & Data Platform Engineer",
    company: "Zeplug & ChargeGuru",
    period: "Jul 2026 — Present",
    location: "Paris",
    points: [
      "Developed full-stack features for a multi-tenant installer portal (React/TypeScript SPA and Express proxy over Salesforce).",
      "Engineered Salesforce Apex batch jobs, REST endpoints, validation rules and permission sets backing the portal's data layer.",
      "Automated purchase- and delivery-order cost control with consolidated Apex batches, Account roll-up fields and margin logic.",
      "Led the migration of a 182 GB production PostgreSQL database from Heroku to Amazon RDS Aurora across AWS regions.",
      "Designed a snapshot-based cutover with pgcopydb after ruling out CDC and logical replication blocked by Heroku.",
      "Built a migration risk-assessment framework with dependency mapping, timed rehearsals and data-integrity verification.",
    ],
    tags: ["React", "TypeScript", "Salesforce", "Apex", "PostgreSQL", "AWS"],
  },
  {
    id: "usj",
    node: "NODE_02",
    role: "Software Engineering Intern",
    company: "Saint Joseph University",
    period: "Jan 2025 — Jul 2025",
    location: "Beirut",
    points: [
      "Developed an Android backend system using FastAPI for home automation with Voice Authentication.",
      "Integrated AI voice recognition and speech-to-text conversion using SpeechBrain.",
      "Created an NLP model with Scikit-learn, achieving 85.85% prediction accuracy.",
      "Parallelized voice recognition, speech-to-text, and NLP layers, reducing latency to 0.88s.",
      "Implemented role-based access control for multiple users (Admin, Family, User, Guest).",
      "Monitored sensors in real-time for fire, gas, earthquake, and door opening alerts.",
    ],
    tags: ["FastAPI", "Python", "SpeechBrain", "Scikit-Learn", "Arduino", "Raspberry Pi"],
  },
  {
    id: "dsh",
    node: "NODE_03",
    role: "Information Technology Intern",
    company: "Dar Al-Handasah",
    period: "May 2024 — Jul 2024",
    location: "Beirut",
    points: [
      "Configured MicroTik routers, VLANs, and DHCP for network segmentation and connectivity.",
      "Configured VMware ESXi with Windows Server VMs and optimized network resources.",
      "Developed the frontend of a social network-style website using React.js, integrating secure authentication, real-time updates, and friend management.",
    ],
    tags: ["Linux", "React.js", "JavaScript", "REST API", "ESXi", "MongoDB"],
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

export const bootLines = [
  { prompt: ">", text: "systemctl start portfolio", tone: "cmd" },
  { prompt: "›", text: "mounting /dev/micro_systems ........ OK", tone: "dim" },
  { prompt: "›", text: "loading modules: skills, projects, experience ........ OK", tone: "dim" },
  { prompt: "›", text: "establishing neural grid ........ OK", tone: "dim" },
  { prompt: "✓", text: "boot complete · latency 0.88s", tone: "ok" },
] as TermLine[];
