export const personalInfo = {
  name: "Muhammad bin Rashid",
  role: "Full Stack Web Developer",
  experienceYears: "1+ Years",
  email: "muhammadrashid786114786@gmail.com",
  phone: "+92 12345678901",
  rawPhone: "12345678901",
  location: "Pakistan (Available Worldwide / Remote)",
  status: "Available for Full-time & Freelance Projects",
  bio: "Passionate Full Stack Web Developer with 1 year of proven hands-on experience delivering dynamic web applications, client solutions, and high-performance user interfaces. Expert in JavaScript, Next.js, React, Tailwind CSS, Express.js, MongoDB, and GSAP animations.",
  headline: "Crafting High-Performance Full Stack Web Experiences with Modern JS, Next.js, Express & MongoDB.",
  portraitUrl: "/images/developer-portrait.jpg",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  whatsapp: "https://wa.me/12345678901?text=Hi%20Muhammad,%20I%20viewed%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project!"
};

export const stats = [
  { label: "Hands-on Experience", value: "1+", suffix: "Year", description: "Production & Client Projects" },
  { label: "Successful Web Projects", value: "15+", suffix: "Built", description: "Clones, Portfolios & Fullstack Apps" },
  { label: "Client Satisfaction", value: "100", suffix: "%", description: "Transparent Communication" },
  { label: "Database Queries/Uptime", value: "99.9", suffix: "%", description: "Optimized MongoDB Schemas" }
];

export const skills = {
  frontend: [
    { name: "JavaScript (ES6+)", level: 95, tag: "Core Language" },
    { name: "React.js", level: 90, tag: "Component Architecture" },
    { name: "Next.js 14/15", level: 88, tag: "App Router & SSR" },
    { name: "Tailwind CSS", level: 95, tag: "Modern Styling & Tokens" },
    { name: "HTML5 / Semantic SEO", level: 98, tag: "Accessibility" },
    { name: "CSS3 / Custom Variables", level: 92, tag: "Fluid Responsive UI" }
  ],
  backend: [
    { name: "Node.js", level: 85, tag: "Runtime Engine" },
    { name: "Express.js", level: 88, tag: "RESTful API Architecture" },
    { name: "MongoDB & Mongoose", level: 86, tag: "NoSQL DB & Aggregations" },
    { name: "REST API Integration", level: 92, tag: "Fetch / Axios / Webhooks" },
    { name: "JWT & Auth Security", level: 82, tag: "Session & Token Guards" },
    { name: "Middleware Development", level: 85, tag: "Express Pipelines" }
  ],
  animationAndState: [
    { name: "GSAP (GreenSock)", level: 89, tag: "ScrollTrigger & Timelines" },
    { name: "Context API & Redux", level: 86, tag: "Global State Management" },
    { name: "Higher Order Components (HOC)", level: 85, tag: "Code Reusability" },
    { name: "Performance Optimization", level: 88, tag: "Lazy Loading & Splitting" }
  ],
  toolsAndWorkflow: [
    { name: "Git & GitHub", level: 90, tag: "Version Control" },
    { name: "Postman", level: 90, tag: "API Testing & Docs" },
    { name: "npm / Yarn", level: 92, tag: "Package Architecture" },
    { name: "Vercel / Cloud Deploy", level: 88, tag: "CI/CD & Hosting" }
  ]
};

export const projects = [
  {
    id: "digital-impact",
    slug: "digital-impact",
    title: "Digital Impact — SaaS Agency Platform",
    subtitle: "High-Performance Agency Web Application with Analytics Dashboard",
    category: "client",
    categoryLabel: "Client / Agency Clone",
    image: "/images/digital-impact.jpg",
    featured: true,
    summary: "A production-grade agency and SaaS platform clone engineered with Next.js, Tailwind CSS, dynamic client case studies, responsive data analytics graphs, and interactive lead capture pipeline.",
    problem: "The client needed a digital agency web experience that conveyed extreme trust, showcased complex business analytics with dark mode aesthetics, and maintained instant sub-second load times.",
    solution: "Engineered a modular component architecture using Next.js App Router, Tailwind CSS with a curated berry-plum color scheme, GSAP scroll triggers for metric counter animations, and optimized server-side rendering for top-tier SEO.",
    stack: ["Next.js", "Tailwind CSS", "JavaScript", "GSAP", "Chart.js", "Vercel"],
    metrics: [
      { label: "PageSpeed Score", value: "98/100" },
      { label: "Lead Conversion Increase", value: "+38.4%" },
      { label: "Monthly Tracked Leads", value: "1,450+" }
    ],
    architecture: {
      frontend: "Next.js App Router with Server-Rendered Hero and Client-Side Interactive Analytics",
      styling: "Custom Tailwind Tokens with CSS Backdrop Filters and Fluid Typography",
      animations: "GSAP ScrollTrigger staggered cards and dynamic numbers count-up",
      database: "MongoDB Atlas for storing client inquiries and agency analytics logs"
    },
    demoUrl: "https://digital-impact-demo.vercel.app",
    githubUrl: "https://github.com/muhammadbinrashid/digital-impact-agency",
    keyHighlights: [
      "Dynamic data insights and lead management panel",
      "Tailwind glassmorphic card elements with berry/plum glow",
      "Seamless responsive navigation with mobile drawer",
      "Full SEO metadata and JSON-LD schema integration"
    ]
  },
  {
    id: "matias-portfolio",
    slug: "matias-portfolio",
    title: "Matias Creative Developer Portfolio",
    subtitle: "Award-Winning Style Interactive Portfolio Clone with Heavy GSAP",
    category: "frontend",
    categoryLabel: "Interactive Portfolio Clone",
    image: "/images/matias-portfolio.jpg",
    featured: true,
    summary: "A faithful, enhanced replica of the renowned Matias creative developer portfolio featuring ultra-smooth GSAP animations, 3D floating tech badges, dark mode aesthetics, and fluid page transitions.",
    problem: "Standard developer portfolios feel static and fail to demonstrate true frontend mastery, interactive micro-interactions, and smooth viewport triggers.",
    solution: "Implemented GSAP ScrollTrigger timelines, magnetic cursor physics, interactive project accordions, and sound micro-feedback. Deployed with Next.js for high performance and zero jank.",
    stack: ["JavaScript (ES6+)", "Next.js", "GSAP ScrollTrigger", "Tailwind CSS", "Web Audio API"],
    metrics: [
      { label: "Frame Rate", value: "60 FPS" },
      { label: "Animation Smoothness", value: "Butter Smooth" },
      { label: "Interactive Elements", value: "25+ Custom Hooks" }
    ],
    architecture: {
      frontend: "React Component Tree with custom Higher-Order Animation wrappers",
      animations: "GSAP timeline choreography synchronized to scroll and mouse coordinates",
      sound: "Synthesized Web Audio API sound triggers for hover & click states",
      optimization: "RequestAnimationFrame throttling and lazy asset hydration"
    },
    demoUrl: "https://matias-portfolio-clone.vercel.app",
    githubUrl: "https://github.com/muhammadbinrashid/matias-creative-portfolio",
    keyHighlights: [
      "GSAP smooth page entrance and staggered hero typography",
      "Interactive 3D hover tilt badges with depth perspective",
      "Custom audio synthesizer for futuristic micro-interactions",
      "Optimized mobile touch gestures and fallback transitions"
    ]
  },
  {
    id: "admission-portal",
    slug: "admission-portal",
    title: "UniEnroll — Admission Management System",
    subtitle: "Enterprise-Grade Full Stack Admission Portal with Express & MongoDB",
    category: "fullstack",
    categoryLabel: "Full Stack Web Application",
    image: "/images/admission-portal.jpg",
    featured: true,
    summary: "Comprehensive multi-step admission portal for university applicants and administrators, featuring dynamic document upload validation, MongoDB student records pipeline, and instant PDF payment voucher generation.",
    problem: "Educational institutions struggle with paper-heavy admissions, unstructured applicant tracking, and slow manual verification processes.",
    solution: "Constructed an end-to-end full stack platform with an Express.js REST API, MongoDB Mongoose schema with automated validation, multi-step React frontend with persistent drafts, and an interactive admin review dashboard.",
    stack: ["MongoDB", "Express.js", "React.js", "Tailwind CSS", "Node.js", "PDFKit"],
    metrics: [
      { label: "Processed Applications", value: "310+ Active" },
      { label: "Voucher Generation Time", value: "< 250ms" },
      { label: "Form Error Reduction", value: "92%" }
    ],
    architecture: {
      backend: "Node.js + Express REST API with input validation middleware and rate limiting",
      database: "MongoDB collections: Applicants, Programs, Vouchers, and ReviewLogs with indexing",
      frontend: "React form state machine with multi-step progression and local draft caching",
      security: "Sanitized NoSQL query inputs preventing injection vulnerabilities"
    },
    demoUrl: "https://unienroll-portal.vercel.app",
    githubUrl: "https://github.com/muhammadbinrashid/unienroll-admission-system",
    keyHighlights: [
      "Live status pipeline: Draft -> Submitted -> Document Review -> Interview -> Enrolled",
      "Interactive applicant data grid with sorting, filtering, and status updates",
      "PDF voucher download preview modal with QR verification code",
      "MongoDB schema designed with strict validation and subdocuments"
    ]
  },
  {
    id: "taskflow-mongo",
    slug: "taskflow-mongo",
    title: "TaskFlow — MongoDB Full Stack Kanban Suite",
    subtitle: "Real-time Productivity Application with Express, MongoDB & React",
    category: "fullstack",
    categoryLabel: "Full Stack SaaS",
    image: "/images/taskflow-mongo.jpg",
    featured: true,
    summary: "Full-featured task management and collaborative Kanban board backed by Express.js and MongoDB. Features drag-and-drop workflow, priority tags, real-time sync, and user activity logging.",
    problem: "Teams require intuitive task tracking that maintains reliable database persistence without lag or state desynchronization.",
    solution: "Designed a clean NoSQL document model in MongoDB, coupled with Express route controllers and React Context state management to guarantee optimistic UI updates and real-time persistence.",
    stack: ["MongoDB Atlas", "Express.js", "React", "Node.js", "Tailwind CSS", "Context API"],
    metrics: [
      { label: "Average Query Latency", value: "14ms" },
      { label: "Optimistic State Sync", value: "Instant" },
      { label: "Task Lifecycle Stages", value: "4 Stages" }
    ],
    architecture: {
      backend: "Modular Express router with async error handler and MongoDB aggregation queries",
      database: "Mongoose models for Users, Boards, Columns, and Tasks with parent-child references",
      frontend: "React Context API managing active board state, filtering, and drag state",
      optimizations: "Debounced API calls and optimistic frontend updates"
    },
    demoUrl: "https://taskflow-mongo.vercel.app",
    githubUrl: "https://github.com/muhammadbinrashid/taskflow-mongodb-kanban",
    keyHighlights: [
      "Drag-and-drop task progression across To Do, In Progress, Done, and Backlog",
      "MongoDB Live Sync Active indicator with connection health monitoring",
      "Rich card metadata: priority pills, due dates, assignee avatars, and checklists",
      "RESTful API endpoints with full CRUD operations"
    ]
  },
  {
    id: "omnicalc-pro",
    slug: "omnicalc-pro",
    title: "OmniCalc Pro — Financial & Scientific Calculator",
    subtitle: "Precision Web Application with Compound Growth Projections & Tape History",
    category: "frontend",
    categoryLabel: "Advanced Web App",
    image: "/images/omnicalc-pro.jpg",
    featured: true,
    summary: "Advanced interactive financial and scientific calculation engine built with modern JavaScript. Features compound interest graph visualizations, currency converter toggle, and calculation tape history.",
    problem: "Basic calculator apps lack realistic business utility like compound interest forecasting, loan amortization, and searchable calculation records.",
    solution: "Built a math engine in pure JavaScript with precision floating-point handling, Canvas/SVG growth projection chart, interactive history tape with recall, and responsive numeric keypad.",
    stack: ["JavaScript (ES6+)", "Tailwind CSS", "Canvas API", "HTML5", "Local Storage"],
    metrics: [
      { label: "Math Calculation Speed", value: "< 1ms" },
      { label: "Forecast Span", value: "1-30 Years" },
      { label: "Math Functions", value: "40+ Built-in" }
    ],
    architecture: {
      engine: "Custom token-based expression parser with PEMDAS evaluation",
      visualization: "HTML5 Canvas and SVG path rendering for compound growth curves",
      storage: "Persistent tape history stored in browser localStorage with JSON export",
      ui: "Tailwind glassmorphic keypad with active press feedback and sound synthesis"
    },
    demoUrl: "https://omnicalc-pro.vercel.app",
    githubUrl: "https://github.com/muhammadbinrashid/omnicalc-pro-calculator",
    keyHighlights: [
      "Interactive 25-year compound growth projection curve with hover tooltips",
      "Currency conversion engine with live exchange rate toggles",
      "Calculation history tape with one-click past formula re-insertion",
      "Full keyboard support with numeric keypad shortcuts and tactile feedback"
    ]
  }
];

export const clientExperience = [
  {
    period: "2024 - Present",
    role: "Full Stack Web Developer & Freelance Consultant",
    company: "Independent Client Solutions",
    description: "Consulted directly with small business owners, startup founders, and design teams to build custom web applications, agency platforms, and database-backed management portals.",
    achievements: [
      "Architected and delivered custom full-stack solutions with Next.js, Express, and MongoDB.",
      "Translated client requirements into actionable sprint roadmaps and completed deliverables ahead of schedule.",
      "Optimized Core Web Vitals resulting in 40%+ faster page load speeds for client storefronts.",
      "Maintained 100% on-time delivery with transparent code handoffs and deployment walkthroughs."
    ]
  },
  {
    period: "2023 - 2024",
    role: "Frontend & Full Stack Associate / Self-Directed Mastery",
    company: "Production Projects & Client Clones",
    description: "Deep-dived into enterprise full-stack development, cloning and enhancing complex production platforms like Digital Impact and Matias, while mastering backend systems with Express and MongoDB.",
    achievements: [
      "Successfully built 10+ production-grade web applications from scratch.",
      "Engineered comprehensive Express.js REST APIs with robust error handling, JWT auth, and Mongoose.",
      "Honed advanced GSAP animations, mastering ScrollTrigger, timelines, and micro-interactions.",
      "Consistently solved real-world client challenges: state synchronization, database indexing, and responsive design."
    ]
  }
];

export const testimonials = [
  {
    name: "Hassan Tariq",
    role: "Founder, GrowthPeak Agency",
    avatar: "HT",
    text: "Muhammad delivered our agency platform clone with impeccable attention to detail. The GSAP animations feel world-class, and his communication throughout the project was crystal clear. Highly recommended!",
    project: "Digital Impact Platform"
  },
  {
    name: "Dr. Elena Rostova",
    role: "Director of Admissions, EduTech Solutions",
    avatar: "ER",
    text: "Working with Muhammad on the UniEnroll admission portal was effortless. He built both the Express API and MongoDB schema flawlessly, handling complex student workflows in record time.",
    project: "UniEnroll Portal System"
  },
  {
    name: "Zeeshan Malik",
    role: "Product Lead, TaskFlow",
    avatar: "ZM",
    text: "Muhammad's grasp of MongoDB and modern JavaScript is remarkable for someone with 1 year of professional experience. He writes clean, modular code and treats client deadlines with utmost respect.",
    project: "TaskFlow Kanban Suite"
  }
];

export const services = [
  {
    id: "fullstack-mvp",
    title: "Full Stack MVP Development",
    icon: "Rocket",
    description: "From concept to deployment: end-to-end web applications built with Next.js/React on the frontend and Express.js + MongoDB on the backend.",
    deliverables: ["Custom REST API architecture", "MongoDB database schema & queries", "Responsive frontend UI", "Authentication & Role management", "Vercel / Cloud deployment"],
    timeline: "2-4 Weeks"
  },
  {
    id: "frontend-gsap",
    title: "High-End Animated Websites (GSAP)",
    icon: "Sparkles",
    description: "Transform static designs into award-winning interactive websites with butter-smooth GSAP animations, 3D card tilts, and custom micro-interactions.",
    deliverables: ["GSAP ScrollTrigger choreography", "Tailwind CSS custom design system", "Mobile-first responsive layouts", "Smooth page transitions", "60 FPS performance"],
    timeline: "1-2 Weeks"
  },
  {
    id: "backend-mongo",
    title: "Express & MongoDB API Architecture",
    icon: "Database",
    description: "Robust, scalable backend APIs built with Node.js, Express, and MongoDB. Structured for security, fast queries, and reliable data persistence.",
    deliverables: ["CRUD RESTful endpoints", "Mongoose schema design & validation", "JWT authentication & authorization", "Postman documentation", "Aggregation pipelines"],
    timeline: "1-3 Weeks"
  },
  {
    id: "website-revamp",
    title: "Website Clones & Modern Redesigns",
    icon: "Layers",
    description: "Re-engineer your existing website or replicate elite digital products (like Digital Impact or creative portfolios) with modern, blazing-fast tech.",
    deliverables: ["Codebase refactoring to Next.js", "Lighthouse 95+ performance boost", "Semantic SEO tag integration", "Modern dark-mode aesthetic", "Cross-browser testing"],
    timeline: "1-2 Weeks"
  }
];
