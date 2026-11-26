export const defaultContent = {
  meta: {
    siteName: "Haris Minhas",
    role: "Full Stack Developer",
    avatar: "/assets/Haris%20Minhas.png",
    available: true,
    availabilityNote: "Open to new projects",
    nav: [
      { label: "Work", href: "#work" },
      { label: "About", href: "#about" },
      { label: "Experience", href: "#experience" },
      { label: "Contact", href: "#contact" },
    ],
  },

  hero: {
    eyebrow: "Rawalpindi, PK",
    firstName: "Haris",
    lastName: "Minhas",
    image: "/assets/Haris%20Minhas.png",
    headlineLines: ["Full stack", "developer"],
    intro:
      "I build scalable systems and high-performance interfaces. Laravel, React and Next.js, with AI woven in where it earns its place.",
    phone: "+92 316 5461537",
    email: "harisminhas0017@gmail.com",
    ctaPrimary: { label: "View selected work", href: "#work" },
    ctaSecondary: { label: "Start a project", href: "#contact" },
    stats: [
      { value: "4+", label: "Years building" },
      { value: "6", label: "Shipped products" },
      { value: "7", label: "Teams worked with" },
    ],
  },

  about: {
    kicker: "01 — About",
    title: "Engineering that holds up under real load.",
    paragraphs: [
      "I engineer high-impact digital solutions by merging complex logic with intuitive design. As a full stack developer, I architect intelligent, scalable systems that drive efficiency and growth.",
      "My work spans Laravel, PHP, React and modern frontend tooling. I transform ambitious ideas into seamless, user-centric applications and I am actively integrating AI and machine learning to deliver future-ready solutions that solve real-world problems.",
    ],
    pullQuote:
      "Complex logic, intuitive surface. That is the whole job.",
    facts: [
      { label: "Based in", value: "Rawalpindi, Pakistan" },
      { label: "Focus", value: "Full stack · AI integration" },
      { label: "Stack", value: "Laravel · React · Next.js" },
      { label: "Availability", value: "Open to work" },
    ],
  },

  capabilities: {
    kicker: "02 — Capabilities",
    title: "What I take responsibility for.",
    items: [
      {
        icon: "Layers",
        title: "Full stack development",
        description:
          "End-to-end web applications with seamless integration and performance that survives production traffic.",
      },
      {
        icon: "Sparkles",
        title: "AI & ML integration",
        description:
          "Intelligent models and assistants wired into real product flows to automate work and surface insight.",
      },
      {
        icon: "Server",
        title: "Backend architecture",
        description:
          "Robust, scalable server-side systems for data-intensive applications, built to grow without rewrites.",
      },
      {
        icon: "Database",
        title: "Database design",
        description:
          "Schemas and storage strategies optimised for reliability, speed and clean data contracts.",
      },
    ],
  },

  work: {
    kicker: "03 — Selected work",
    title: "Products I have shipped.",
    intro:
      "A selection of platforms built end to end. Each one solved a concrete operational problem, not a design exercise.",
    projects: [
      {
        name: "Buddy App",
        slug: "buddy-app",
        year: "2025",
        summary:
          "Service-matching platform connecting customers with nearby workers through real-time bidding and smart job recommendations.",
        description:
          "Built an intelligent service-matching platform that connects customers with nearby workers using real-time bidding, smart job recommendations and automated notifications. Integrated location filters, radius expansion logic and a streamlined booking workflow for fast worker assignment.",
        tags: ["Laravel", "React", "PHP", "MySQL", "Google Maps", "Firebase"],
        image: "/assets/Buddy.png",
        logo: "/assets/buddy_logo.png",
        liveUrl: "",
        repoUrl: "https://github.com/",
      },
      {
        name: "Mr Delivery",
        slug: "mr-delivery",
        year: "2024",
        summary:
          "On-demand delivery platform with real-time rider posting, bidding, wallet payments and automated booking flows.",
        description:
          "Developed a complete on-demand delivery platform where customers book riders for parcel pickup and drop-off. Implemented real-time rider posting, bidding-style request acceptance, a wallet system with PayMob payments, multi-language support and automated booking workflows, plus push notifications and a driver earnings module.",
        tags: ["Laravel", "React Native", "PHP", "MySQL", "PayMob", "Firebase"],
        image: "/assets/MrDelivery.jpeg",
        logo: "/assets/mrdelivery_logo.png",
        liveUrl: "",
        repoUrl: "https://github.com/",
      },
      {
        name: "Falah App",
        slug: "falah-app",
        year: "2025",
        summary:
          "SOS and assistance platform routing emergency alerts to NGOs, with role-based dashboards and appointment booking.",
        description:
          "Built a safety and assistance platform that sends SOS alerts to registered NGOs and organisations. Integrated real-time emergency notifications, role-based dashboards and appointment booking with lawyers and therapists, with secure authentication and a smooth workflow for urgent help and professional support.",
        tags: ["Laravel", "React", "PHP", "MySQL", "Notifications", "SOS"],
        image: "/assets/Falah App.jpeg",
        logo: "/assets/falah_logo.png",
        liveUrl: "",
        repoUrl: "https://github.com/",
      },
      {
        name: "TokenEstate",
        slug: "token-estate",
        year: "2025",
        summary:
          "Blockchain real estate platform turning physical property into tokenized digital assets with secure ownership flows.",
        description:
          "Developed a blockchain-based real estate platform where physical properties are converted into digital tokenized assets. Implemented secure registration, property listing workflows and a MongoDB data layer, integrated blockchain logic for asset representation, and enabled users to explore and manage tokenized property data.",
        tags: ["Node.js", "Blockchain", "MongoDB", "Web3", "JavaScript"],
        image: "/assets/TokenEsate.png",
        logo: "/assets/tokenestate_logo.png",
        liveUrl: "",
        repoUrl: "https://github.com/",
      },
      {
        name: "Bee Sportz",
        slug: "bee-sportz",
        year: "2025",
        summary:
          "Sports management and analytics platform with real-time player tracking, match stats and admin dashboards.",
        description:
          "Working on a sports management and analytics platform. Implementing real-time player performance tracking, match statistics and automated data processing with AI-assisted insight. Enhancing backend APIs, optimising the database and improving admin dashboards for team, event and score management.",
        tags: ["Laravel", "PHP", "MySQL", "React", "Analytics", "API"],
        image: "/assets/Bee Sportz.png",
        logo: "/assets/beesportz_logo.png",
        liveUrl: "",
        repoUrl: "https://github.com/",
      },
      {
        name: "Explorer Bees",
        slug: "explorer-bees",
        year: "2025",
        summary:
          "Educational activity platform for kids, with tightened backend logic, refined APIs and smoother learning flows.",
        description:
          "Contributed to an educational and activity-based learning platform for kids. Improved content flow, optimised backend logic and enhanced UX. Implemented feature updates, fixed bugs, refined API responses and ensured smooth navigation across learning modules, quizzes and interactive activities.",
        tags: ["Laravel", "PHP", "MySQL", "React", "EdTech", "API"],
        image: "/assets/Explorer Bees.png",
        logo: "/assets/explorerbees_logo.png",
        liveUrl: "",
        repoUrl: "https://github.com/",
      },
    ],
  },

  experience: {
    kicker: "04 — Experience",
    title: "Where I have worked.",
    items: [
      {
        company: "Bee Sportz",
        role: "Full Stack Developer",
        period: "Sep 2025 — Present",
        logo: "/assets/beesportz_logo.png",
        points: [
          "Developing a sports platform for events, bookings and user interactions.",
          "Implementing dashboards, APIs and dynamic modules with Laravel and React.",
          "Building payment integration, notifications and real-time updates.",
        ],
      },
      {
        company: "Token Estate",
        role: "Full Stack Developer",
        period: "Jun 2025 — Aug 2025",
        logo: "/assets/tokenestate_logo.png",
        points: [
          "Built a blockchain-based property management platform on MongoDB and smart contracts.",
          "Enabled users to register, tokenize and manage digital property assets.",
          "Implemented authentication, user roles and property tracking modules.",
        ],
      },
      {
        company: "Falah App",
        role: "Full Stack Developer",
        period: "Jun 2025",
        logo: "/assets/falah_logo.png",
        points: [
          "Developed an SOS alert and service booking platform for NGOs, lawyers and therapists.",
          "Implemented appointment scheduling, role-based access and service management.",
          "Integrated notifications and focused on real-time, secure data handling.",
        ],
      },
      {
        company: "Buddy App",
        role: "Full Stack Developer",
        period: "Mar 2025 — May 2025",
        logo: "/assets/buddy_logo.png",
        points: [
          "Created a gig-based application connecting customers with nearby workers.",
          "Implemented a dynamic bidding system with location-based filtering.",
          "Integrated payment and wallet flows between customers and workers.",
        ],
      },
      {
        company: "Mr. Delivery",
        role: "Full Stack Developer",
        period: "Nov 2024 — Feb 2025",
        logo: "/assets/mrdelivery_logo.png",
        points: [
          "Developed and enhanced a delivery management platform with Laravel.",
          "Implemented booking, rider assignment and real-time tracking.",
          "Built dashboards for admin, riders and customers.",
        ],
      },
      {
        company: "Ensyd Technologies",
        role: "Software Testing Intern",
        period: "Sep 2024 — Oct 2024",
        logo: "/assets/ensyd_logo.png",
        points: [
          "Conducted software testing for the Anaar multi-tenant application.",
          "Performed functional, integration and system testing.",
          "Documented bugs and worked with developers to ensure timely fixes.",
        ],
      },
    ],
  },

  stack: {
    kicker: "05 — Stack",
    title: "Tools I reach for.",
    groups: [
      {
        label: "Frontend",
        items: ["HTML5", "CSS3", "JavaScript", "React", "Next.js", "Tailwind CSS", "Material UI"],
      },
      {
        label: "Backend",
        items: ["PHP", "Laravel", "Node.js", "Python", "REST APIs"],
      },
      {
        label: "Data & Ops",
        items: ["MySQL", "MongoDB", "AWS", "Git", "GitHub", "Firebase"],
      },
    ],
    logos: [
      { name: "React", src: "/assets/tech/reactjs.png" },
      { name: "Next.js", src: "/assets/nextjs.png" },
      { name: "Laravel", src: "/assets/laravel.png" },
      { name: "PHP", src: "/assets/php.png" },
      { name: "Python", src: "/assets/python.png" },
      { name: "Tailwind", src: "/assets/tech/tailwind.png" },
      { name: "MySQL", src: "/assets/tech/mysql.png" },
      { name: "AWS", src: "/assets/tech/aws.png" },
      { name: "GitHub", src: "/assets/github.png" },
    ],
  },

  testimonials: {
    kicker: "06 — Testimonials",
    title: "What clients say.",
    items: [
      {
        quote:
          "Haris built and scaled our Buddy application with clean React code and well-integrated Laravel APIs. His full stack expertise and proactive approach shaped a seamless user experience.",
        name: "Project Manager",
        role: "Buddy Application",
      },
      {
        quote:
          "Haris built a robust delivery management system for Mr Delivery from scratch, with advanced admin features, real-time tracking and seamless user flows. He exceeded our expectations.",
        name: "Founder",
        role: "Mr Delivery",
      },
      {
        quote:
          "Haris delivered high-quality work on time for our Falah app. His Laravel expertise and attention to detail made a real difference to our performance and user satisfaction.",
        name: "Project Lead",
        role: "Falah App",
      },
    ],
  },

  contact: {
    kicker: "07 — Contact",
    title: "Let's build something.",
    intro:
      "Have a product that needs to ship, a system that needs to scale, or an idea that needs a technical partner? Send a note.",
    email: "harisminhas0017@gmail.com",
    phone: "+92 316 5461537",
    whatsapp: "923165461537",
    location: "ATS Old Airport Road, Chaklala Cantt, Rawalpindi, Pakistan",
    socials: [
      { label: "GitHub", href: "https://github.com/harisminhas17" },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/haris-minhas-68693b2ba",
      },
      { label: "Instagram", href: "https://www.instagram.com/harisminhas.5" },
    ],
  },
};

export default defaultContent;
