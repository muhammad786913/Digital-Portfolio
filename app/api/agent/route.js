import { NextResponse } from 'next/server';

// ============================================================
// PORTFOLIO KNOWLEDGE BASE — Muhammad bin Rashid
// ============================================================
const KB = {
  name: "Muhammad bin Rashid",
  github_username: "muhammad786913",
  github_url: "https://github.com/muhammad786913",
  email: "muhammadrashid786114786@gmail.com",
  location: "Lahore, Pakistan (Available Worldwide / Remote)",
  city: "Lahore",
  country: "Pakistan",
  status: "Available for Full-time & Freelance Projects",
  experience: "1+ Years",
  role: "Full Stack Web Developer & UI Architect",

  // Personal Info
  age: 18,
  birthday: "29 November 2007",
  education: "Intermediate (FSc / ICS)",
  educationStatus: "Currently enrolled — studying alongside freelance development work",

  bio: `Muhammad bin Rashid is an 18-year-old passionate Full Stack Web Developer from Lahore, Pakistan. Despite being just 18 and still completing his Intermediate education, he has built 15+ production-grade web applications and has 1+ year of hands-on freelance experience. He specializes in building high-performance, visually stunning web applications using modern JavaScript technologies and is available for projects worldwide.`,

  techStack: {
    frontend: ["JavaScript (ES6+)", "React.js", "Next.js 14/15", "Tailwind CSS", "HTML5", "CSS3"],
    backend: ["Node.js", "Express.js", "MongoDB", "Mongoose", "REST APIs", "JWT Authentication"],
    animation: ["GSAP", "ScrollTrigger", "Web Animations API"],
    tools: ["Git", "GitHub", "Postman", "Vercel", "npm", "VS Code"]
  },

  projects: [
    {
      name: "Digital Impact — SaaS Agency Platform",
      type: "Client / Agency Clone",
      stack: "Next.js, Tailwind CSS, GSAP, Chart.js, MongoDB",
      highlights: "Production-grade SaaS platform with analytics dashboard, 98/100 PageSpeed, +38.4% lead conversion",
      github: "https://github.com/muhammadbinrashid/digital-impact-agency",
      demo: "https://digital-impact-demo.vercel.app"
    },
    {
      name: "Matias Creative Developer Portfolio",
      type: "Interactive Portfolio Clone",
      stack: "Next.js, GSAP ScrollTrigger, Tailwind CSS, Web Audio API",
      highlights: "60 FPS butter-smooth animations, 3D hover badges, magnetic cursor physics, 25+ custom hooks",
      github: "https://github.com/muhammadbinrashid/matias-creative-portfolio",
      demo: "https://matias-portfolio-clone.vercel.app"
    },
    {
      name: "UniEnroll — Admission Management System",
      type: "Full Stack Web Application",
      stack: "MongoDB, Express.js, React, Node.js, PDFKit",
      highlights: "310+ applications processed, <250ms PDF generation, 92% form error reduction",
      github: "https://github.com/muhammadbinrashid/unienroll-admission-system",
      demo: "https://unienroll-portal.vercel.app"
    },
    {
      name: "TaskFlow — MongoDB Full Stack Kanban Suite",
      type: "Full Stack SaaS",
      stack: "MongoDB Atlas, Express.js, React, Node.js, Tailwind CSS, Context API",
      highlights: "14ms average query latency, real-time sync, drag-and-drop Kanban, full CRUD REST API",
      github: "https://github.com/muhammadbinrashid/taskflow-mongodb-kanban",
      demo: "https://taskflow-mongo.vercel.app"
    },
    {
      name: "OmniCalc Pro — Financial & Scientific Calculator",
      type: "Advanced Web App",
      stack: "JavaScript ES6+, Tailwind CSS, Canvas API, HTML5, localStorage",
      highlights: "40+ math functions, 25-year compound growth projection, <1ms calculation speed",
      github: "https://github.com/muhammadbinrashid/omnicalc-pro-calculator",
      demo: "https://omnicalc-pro.vercel.app"
    }
  ],

  services: [
    "Full Stack MVP Development (2-4 Weeks)",
    "High-End Animated Websites with GSAP (1-2 Weeks)",
    "Express & MongoDB API Architecture (1-3 Weeks)",
    "Website Clones & Modern Redesigns (1-2 Weeks)"
  ],

  experience_timeline: [
    {
      period: "2024 - Present",
      role: "Full Stack Web Developer & Freelance Consultant",
      company: "Independent Client Solutions",
      achievements: ["Custom full-stack solutions with Next.js, Express, MongoDB", "40%+ faster Core Web Vitals optimization", "100% on-time delivery record"]
    },
    {
      period: "2023 - 2024",
      role: "Frontend & Full Stack Associate / Self-Directed Mastery",
      company: "Production Projects & Client Clones",
      achievements: ["Built 10+ production-grade web applications", "Mastered Express.js REST APIs with JWT auth", "Advanced GSAP animations & ScrollTrigger"]
    }
  ],

  stats: {
    experience: "1+ Year",
    projects: "15+ Built",
    satisfaction: "100% Client Satisfaction",
    uptime: "99.9% Database Uptime"
  }
};

// ============================================================
// INTENT CLASSIFIER
// ============================================================
function classifyIntent(msg) {
  const m = msg.toLowerCase();

  const intents = [
    { key: 'greeting', patterns: ['hi', 'hello', 'hey', "what's up", 'sup', 'howdy', 'greetings', 'good morning', 'good evening'] },
    { key: 'who', patterns: ['who are you', 'who is muhammad', 'who is this', 'tell me about yourself', 'tell me about him', 'about you', 'introduce', 'bio'] },
    { key: 'skills', patterns: ['skills', 'technologies', 'tech stack', 'what can you', 'what do you know', 'stack', 'languages', 'tools', 'frameworks', 'expertise'] },
    { key: 'frontend', patterns: ['frontend', 'front-end', 'react', 'next.js', 'nextjs', 'tailwind', 'css', 'html', 'ui', 'gsap', 'animation'] },
    { key: 'backend', patterns: ['backend', 'back-end', 'express', 'node', 'nodejs', 'api', 'rest', 'server', 'mongodb', 'database', 'mongoose', 'jwt', 'auth'] },
    { key: 'projects', patterns: ['projects', 'portfolio', 'work', 'built', 'created', 'made', 'applications', 'apps', 'show me', 'examples'] },
    { key: 'digital_impact', patterns: ['digital impact', 'agency', 'saas agency', 'agency platform'] },
    { key: 'matias', patterns: ['matias', 'creative portfolio', 'portfolio clone', 'animated portfolio'] },
    { key: 'unienroll', patterns: ['unienroll', 'admission', 'university', 'portal', 'student'] },
    { key: 'taskflow', patterns: ['taskflow', 'task', 'kanban', 'task management', 'productivity'] },
    { key: 'omnicalc', patterns: ['omnicalc', 'calculator', 'financial', 'scientific calc'] },
    { key: 'experience', patterns: ['experience', 'years', 'how long', 'background', 'history', 'timeline', 'career'] },
    { key: 'services', patterns: ['services', 'hire', 'freelance', 'what do you offer', 'packages', 'pricing', 'cost', 'rates'] },
    { key: 'contact', patterns: ['contact', 'email', 'whatsapp', 'reach', 'message', 'phone', 'get in touch', 'talk', 'connect'] },
    { key: 'location', patterns: ['location', 'where', 'country', 'pakistan', 'remote', 'based', 'timezone', 'lahore', 'city'] },
    { key: 'github', patterns: ['github', 'git', 'repositories', 'repos', 'open source', 'code', 'source code'] },
    { key: 'gsap', patterns: ['gsap', 'animation', 'animate', 'motion', 'scroll trigger', 'scrolltrigger'] },
    { key: 'availability', patterns: ['available', 'availability', 'open to work', 'job', 'contract'] },
    { key: 'testimonials', patterns: ['testimonials', 'reviews', 'clients', 'feedback', 'rating', 'what clients say'] },
    { key: 'stats', patterns: ['stats', 'statistics', 'numbers', 'achievements', 'metrics'] },
    { key: 'search_github', patterns: ['search github', 'find on github', 'github profile', 'view github', 'check github'] },
    { key: 'capabilities', patterns: ['what can', 'what are you', 'help me', 'capabilities', 'how can you help', 'what do you do'] },
    { key: 'age', patterns: ['age', 'how old', 'umar', 'kitni umar', 'years old', 'old is'] },
    { key: 'birthday', patterns: ['birthday', 'born', 'date of birth', 'dob', 'birth date', 'janam', '29 nov', 'november', '2007'] },
    { key: 'education', patterns: ['education', 'study', 'studies', 'school', 'college', 'degree', 'intermediate', 'fsc', 'ics', 'student', 'parhai', 'qualification'] },
    { key: 'fun', patterns: ['fun fact', 'interesting', 'hobby', 'hobbies', 'passion', 'when not coding', 'besides coding', 'personal', 'about him personally'] },
  ];

  for (const intent of intents) {
    if (intent.patterns.some(p => m.includes(p))) {
      return intent.key;
    }
  }

  return 'general';
}

// ============================================================
// RESPONSE GENERATOR
// ============================================================
function generateResponse(intent) {
  const p = KB.projects;

  const responses = {
    greeting: {
      text: `👋 Hey there! I'm **MBR Agent** — the AI assistant for **${KB.name}'s** portfolio.\n\nI can answer anything about Muhammad: his skills, projects, experience, services, or GitHub. I can also help you search his GitHub profile!\n\nWhat would you like to know? 🚀`,
      links: [],
      suggestions: ["What are his skills?", "Show me his projects", "How do I hire him?", "View GitHub profile"]
    },

    who: {
      text: `## ${KB.name}\n\n${KB.bio}\n\n**🎯 Role:** ${KB.role}\n**📍 Location:** ${KB.location}\n**🟢 Status:** ${KB.status}\n**⚡ Experience:** ${KB.experience}`,
      links: [{ label: "GitHub Profile", url: KB.github_url }],
      suggestions: ["What technologies does he use?", "Show me his projects", "How can I contact him?"]
    },

    skills: {
      text: `## 🛠️ Muhammad's Full Tech Stack\n\n**Frontend:**\n${KB.techStack.frontend.map(t => `• ${t}`).join('\n')}\n\n**Backend:**\n${KB.techStack.backend.map(t => `• ${t}`).join('\n')}\n\n**Animation & Motion:**\n${KB.techStack.animation.map(t => `• ${t}`).join('\n')}\n\n**Tools & Workflow:**\n${KB.techStack.tools.map(t => `• ${t}`).join('\n')}`,
      links: [],
      suggestions: ["Tell me about his frontend skills", "What backend tech does he use?", "Show his projects"]
    },

    frontend: {
      text: `## 🎨 Frontend Expertise\n\n• **JavaScript (ES6+)** — 95% proficiency\n• **React.js** — 90% (Component Architecture)\n• **Next.js 14/15** — 88% (App Router, SSR, ISR)\n• **Tailwind CSS** — 95% (Custom design systems)\n• **HTML5 / Semantic SEO** — 98%\n• **CSS3 / Custom Variables** — 92%\n• **GSAP ScrollTrigger** — 89% (Butter-smooth animations)\n\nHis UI work features glassmorphism, dynamic color systems, and 60 FPS animations.`,
      links: [{ label: "View Projects", url: "/projects" }],
      suggestions: ["Tell me about GSAP animations", "Show frontend projects", "What about backend?"]
    },

    backend: {
      text: `## ⚙️ Backend Expertise\n\n• **Node.js** — 85% (Runtime Engine)\n• **Express.js** — 88% (RESTful API Architecture)\n• **MongoDB & Mongoose** — 86% (NoSQL DB & Aggregations)\n• **REST API Integration** — 92%\n• **JWT & Auth Security** — 82%\n• **Middleware Development** — 85%\n\nHe designs secure, performant APIs with input validation, rate limiting, and optimized MongoDB schemas.`,
      links: [],
      suggestions: ["Show full stack projects", "What frontend frameworks?", "How to hire him?"]
    },

    projects: {
      text: `## 🚀 Muhammad's Projects (15+ Built)\n\nHere are his **5 featured projects**:\n\n${p.map((proj, i) => `**${i + 1}. ${proj.name}**\n• Type: ${proj.type}\n• Stack: ${proj.stack}\n• 🌟 ${proj.highlights}`).join('\n\n')}`,
      links: p.slice(0, 3).map(proj => ({ label: `${proj.name.split('—')[0].trim()}`, url: proj.demo })),
      suggestions: ["Tell me about Digital Impact", "What is TaskFlow?", "Show GitHub repos"]
    },

    digital_impact: {
      text: `## 🏢 Digital Impact — SaaS Agency Platform\n\n**Stack:** ${p[0].stack}\n\n**Key Metrics:**\n• ⚡ 98/100 PageSpeed score\n• 📈 +38.4% lead conversion increase\n• 👥 1,450+ monthly tracked leads\n\n**Highlights:**\n• GSAP ScrollTrigger animations\n• MongoDB Atlas analytics backend\n• Tailwind glassmorphic UI design`,
      links: [{ label: "Live Demo", url: p[0].demo }, { label: "GitHub Repo", url: p[0].github }],
      suggestions: ["Tell me about Matias portfolio", "What other projects?", "Show all projects"]
    },

    matias: {
      text: `## 🎭 Matias Creative Developer Portfolio\n\n**Stack:** ${p[1].stack}\n\n**Highlights:**\n• 60 FPS maintained throughout\n• GSAP smooth page entrance & staggered hero typography\n• 3D hover tilt badges with depth perspective\n• Custom Web Audio API sound micro-interactions\n• Optimized mobile touch gestures`,
      links: [{ label: "Live Demo", url: p[1].demo }, { label: "GitHub Repo", url: p[1].github }],
      suggestions: ["Tell me about UniEnroll", "What GSAP techniques?", "View all projects"]
    },

    unienroll: {
      text: `## 🎓 UniEnroll — Admission Management System\n\n**Stack:** ${p[2].stack}\n\n**Key Metrics:**\n• 📋 310+ applications processed\n• ⚡ <250ms PDF voucher generation\n• ✅ 92% form error reduction\n\n**Features:**\n• Full pipeline: Draft → Submitted → Review → Enrolled\n• Express REST API with MongoDB Mongoose\n• JWT-secured admin dashboard`,
      links: [{ label: "Live Demo", url: p[2].demo }, { label: "GitHub Repo", url: p[2].github }],
      suggestions: ["Tell me about TaskFlow", "What backend skills?", "Show all projects"]
    },

    taskflow: {
      text: `## ✅ TaskFlow — MongoDB Full Stack Kanban Suite\n\n**Stack:** ${p[3].stack}\n\n**Key Metrics:**\n• ⚡ 14ms average query latency\n• 🔄 Real-time optimistic UI sync\n• 📊 4 Kanban stages\n\n**Features:**\n• Drag-and-drop (To Do → In Progress → Done → Backlog)\n• Full CRUD REST API\n• MongoDB Live Sync indicator`,
      links: [{ label: "Live Demo", url: p[3].demo }, { label: "GitHub Repo", url: p[3].github }],
      suggestions: ["Tell me about OmniCalc", "What is MongoDB?", "Show all projects"]
    },

    omnicalc: {
      text: `## 🧮 OmniCalc Pro — Financial & Scientific Calculator\n\n**Stack:** ${p[4].stack}\n\n**Key Metrics:**\n• 🔢 40+ built-in math functions\n• ⚡ <1ms calculation speed\n• 📅 1-30 year forecast span\n\n**Features:**\n• 25-year compound growth projection\n• Currency conversion engine\n• Calculation history tape with re-insertion`,
      links: [{ label: "Live Demo", url: p[4].demo }, { label: "GitHub Repo", url: p[4].github }],
      suggestions: ["Show all projects", "What frontend skills?", "View GitHub repos"]
    },

    experience: {
      text: `## 📅 Experience Timeline\n\n**${KB.experience_timeline[0].period} — ${KB.experience_timeline[0].role}**\n*${KB.experience_timeline[0].company}*\n${KB.experience_timeline[0].achievements.map(a => `• ${a}`).join('\n')}\n\n**${KB.experience_timeline[1].period} — ${KB.experience_timeline[1].role}**\n*${KB.experience_timeline[1].company}*\n${KB.experience_timeline[1].achievements.map(a => `• ${a}`).join('\n')}`,
      links: [],
      suggestions: ["What projects has he built?", "What are his services?", "How to contact him?"]
    },

    services: {
      text: `## 💼 Services & Packages\n\n${KB.services.map((s, i) => `**${i + 1}.** ${s}`).join('\n')}\n\n**Guarantee:** On-time delivery with transparent communication\n\nReady to start? Reach out directly!`,
      links: [{ label: "Send Email", url: `mailto:${KB.email}` }, { label: "WhatsApp Chat", url: `https://wa.me/12345678901?text=Hi%20Muhammad,%20I%20viewed%20your%20portfolio!` }],
      suggestions: ["How do I contact him?", "What's his experience?", "Show his projects"]
    },

    contact: {
      text: `## 📬 Contact Muhammad\n\n**📧 Email:** ${KB.email}\n**💬 WhatsApp:** Available for quick chats\n**📍 Location:** ${KB.location}\n**🟢 Status:** ${KB.status}\n\nFor professional inquiries, use the **"Hire Muhammad"** button or **"Book 15-Min Call"** above!`,
      links: [{ label: "Send Email", url: `mailto:${KB.email}` }, { label: "WhatsApp Now", url: `https://wa.me/12345678901?text=Hi%20Muhammad,%20I%20viewed%20your%20portfolio!` }],
      suggestions: ["What services does he offer?", "View GitHub profile", "Show his projects"]
    },

    location: {
      text: `## 📍 Location & Availability\n\n**Based in:** Pakistan 🇵🇰\n**Work Mode:** Fully Remote — Available Worldwide\n**Timezone:** PKT (UTC+5) — Flexible for client timezones\n**Status:** ${KB.status}\n\nMuhammad works seamlessly with international clients across different time zones.`,
      links: [],
      suggestions: ["How to hire him?", "What are his services?", "Contact information"]
    },

    github: {
      text: `## 🐙 GitHub — @${KB.github_username}\n\nExplore Muhammad's code, contributions, and open source work:\n\n• 🔗 **Profile:** ${KB.github_url}\n• 📦 **Repositories:** All 15+ project repos\n• 📊 **Activity:** Contribution graphs\n• 📖 **README:** Profile documentation`,
      links: [
        { label: "GitHub Profile", url: KB.github_url },
        { label: "All Repositories", url: `${KB.github_url}?tab=repositories` }
      ],
      suggestions: ["Show me his projects", "What tech does he use?", "Contact him"]
    },

    gsap: {
      text: `## 🎬 GSAP Animation Mastery\n\nMuhammad uses **GreenSock (GSAP)** at an advanced level:\n\n• **ScrollTrigger** — scroll-linked animations & pinning\n• **Timeline choreography** — precise multi-step sequences\n• **Stagger effects** — cascading element animations\n• **3D transforms** — perspective tilts & rotations\n• **Magnetic cursor physics** — interactive UI elements\n• **Counter animations** — dynamic number reveals\n\nAll animations maintain **60 FPS** even on mobile.`,
      links: [{ label: "See Matias Portfolio Demo", url: p[1].demo }],
      suggestions: ["Show animated projects", "Frontend skills overview", "View all projects"]
    },

    availability: {
      text: `## 🟢 Currently Available!\n\n**${KB.name}** is **open to work** and taking on:\n\n• 🔨 **Freelance Projects** — Full stack web applications\n• 💼 **Client Contracts** — Short & long-term engagements\n• 🌍 **Remote Work** — Available worldwide\n• ⚡ **Quick Turnaround** — 1-4 week timelines\n\nDon't wait — reach out today!`,
      links: [{ label: "Send Email", url: `mailto:${KB.email}` }, { label: "WhatsApp Now", url: `https://wa.me/12345678901?text=Hi%20Muhammad,%20I%27d%20like%20to%20discuss%20a%20project!` }],
      suggestions: ["What services does he offer?", "View his projects first", "What are his skills?"]
    },

    testimonials: {
      text: `## ⭐ Client Testimonials\n\n**Hassan Tariq** — Founder, GrowthPeak Agency\n*"Muhammad delivered our agency platform clone with impeccable attention to detail. The GSAP animations feel world-class!"*\n\n**Dr. Elena Rostova** — Director, EduTech Solutions\n*"Working with Muhammad on UniEnroll was effortless. He built both the Express API and MongoDB schema flawlessly."*\n\n**Zeeshan Malik** — Product Lead, TaskFlow\n*"Muhammad's grasp of MongoDB and modern JavaScript is remarkable. He writes clean, modular code."*`,
      links: [],
      suggestions: ["Show his projects", "What services?", "How to contact him?"]
    },

    stats: {
      text: `## 📊 Key Achievement Metrics\n\n| Metric | Value |\n|--------|-------|\n| 🗓️ Experience | ${KB.stats.experience} |\n| 🚀 Projects Built | ${KB.stats.projects} |\n| 😊 Client Satisfaction | ${KB.stats.satisfaction} |\n| 🗄️ DB Uptime | ${KB.stats.uptime} |\n\nEvery project delivered on time, every client delighted.`,
      links: [],
      suggestions: ["Show his projects", "What tech does he use?", "Services & packages"]
    },

    search_github: {
      text: `## 🔍 GitHub Profile — @${KB.github_username}\n\nHere are the links to explore Muhammad's GitHub:\n\n• 👤 Profile overview with pinned repositories\n• 📦 All public repositories\n• ⭐ Starred projects\n• 📊 Contribution activity\n\n*Click the links below to open GitHub:*`,
      links: [
        { label: "🐙 GitHub Profile", url: KB.github_url },
        { label: "📦 All Repositories", url: `${KB.github_url}?tab=repositories` },
        { label: "⭐ Starred Projects", url: `${KB.github_url}?tab=stars` }
      ],
      suggestions: ["Show project details", "What tech stack?", "Contact Muhammad"]
    },

    capabilities: {
      text: `## 🤖 What I Can Help With\n\nI'm **MBR Agent** — your guide to Muhammad's portfolio!\n\n**Ask me about:**\n• 👨‍💻 Background & bio\n• 🛠️ Tech skills & expertise\n• 🚀 Specific projects\n• 💼 Services & hiring\n• 📬 Contact information\n• 🐙 GitHub profile & repos\n• ⏱️ Experience timeline\n• ⭐ Client testimonials\n\nJust ask naturally!`,
      links: [],
      suggestions: ["Tell me about Muhammad", "Show his projects", "View GitHub profile", "How to hire him?"]
    },

    fun: {
      text: `## 🎯 Fun Facts About Muhammad\n\n• Went from **zero to production apps** in under 2 years\n• Obsessed with **pixel-perfect UI** — 1px off = fix it\n• Favorite library: **GSAP** — motion makes everything better\n• Built this very portfolio you're viewing 🤯\n• Uses **dark mode** for everything (obviously)\n• Available **24/7 on WhatsApp** for project discussions\n• Pakistan's timezone doesn't stop global client work!`,
      links: [],
      suggestions: ["Show his projects", "Contact him", "What are his skills?"]
    },

    general: {
      text: `I'm not quite sure what you meant, but I'd love to help! 🤔\n\nTry asking about:\n• **Skills & tech stack**\n• **Projects** (Digital Impact, TaskFlow, UniEnroll...)\n• **Experience & background**\n• **Services & how to hire**\n• **GitHub profile**\n• **Contact info**`,
      links: [],
      suggestions: ["Tell me about Muhammad", "What are his skills?", "Show projects", "How to hire him?"]
    }
  };

  return responses[intent] || responses['general'];
}

// ============================================================
// API ROUTE HANDLER
// ============================================================
export async function POST(request) {
  try {
    const body = await request.json();
    const { message } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Realistic delay for AI feel
    await new Promise(r => setTimeout(r, 400 + Math.random() * 600));

    const intent = classifyIntent(message.trim());
    const response = generateResponse(intent);

    return NextResponse.json({
      text: response.text,
      links: response.links || [],
      suggestions: response.suggestions || [],
      intent,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Agent API error:', error);
    return NextResponse.json(
      { error: 'Agent is temporarily unavailable. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    agent: 'MBR Portfolio Agent',
    version: '1.0.0',
    owner: 'Muhammad bin Rashid',
    github: 'https://github.com/muhammad786913',
    status: 'active'
  });
}
