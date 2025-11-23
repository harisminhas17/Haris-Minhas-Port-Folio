
import {
  // Navigation
  menu,
  close,
  
  // Projects
  buddy,
  mrDelivery,
  falahApp,
  tokenEstate,
  beeSportz,
  explorerBees,
  
  // Experience/Project placeholders
  church,
  hrm,
  itworkcenter,
  laundaryday,
  trektooicon,
  mightymedia,
  
  // Services
  web,
  mobile,
  backend,
  creator,
  
  // Tech Icons
  html,
  css,
  javascript,
  reactjs,
  threejs,
  tailwind,
  mui,
  aws,
  mysql,
  github,
  php,
  laravel,
  nextjs,
  python,
} from '../assets';


export const navLinks = [


  {
    id: "about",
    title: "About",
    
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Full-Stack Web Developer (Laravel & ReactJS)",
    icon: web,
  },
  {
    title: "AI Chatbot & ML Model Training",
    icon: mobile,
  },
  {
    title: "Backend Architect & API Developer",
    icon: backend,
  },
  {
    title: "DataBase Designer (MYSQL, Postgres, MongoDB)",
    icon: creator,
  },
];


const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
   
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Material Ui",
    icon: mui,
  }, 
  {
    name: "AWS",
    icon: aws,
  }, 
  {
    name: "MySql",
    icon: mysql,
  },
 
   {
    name: "Github",
    icon: github,
  },
   {
    name: "php",
    icon: php,
  },
   {
    name: "laravel",
    icon: laravel,
  },
   {
    name: "nextjs",
    icon: nextjs,
  },
 {
    name: "python",
    icon: python,
  },
];

const experiences = [
  {
    title: "Bee Sportz",
    company_name: "Bee Sportz",
    icon: beeSportz || "BS",
    iconBg: "#E6DEDD",
    date: "Sept 2025 - Present",
    points: [
      "Developing a sports platform for events, bookings, and user interactions.",
      "Implementing dashboards, APIs, and dynamic modules using Laravel and React.",
      "Working on payment integration, notifications, and real-time updates.",
      "Collaborating with the team to build scalable, high-performance features.",
    ],
  },
  {
    title: "Token Estate",
    company_name: "Token Estate",
    icon: tokenEstate || "TE",
    iconBg: "#383E56",
    date: "June 2025 - August 2025",
    points: [
      "Built a blockchain-based property management platform using MongoDB and smart contracts.",
      "Enabled users to register, tokenize, and manage digital property assets.",
      "Developed dashboards and APIs for secure property transactions.",
      "Implemented authentication, user roles, and property tracking modules.",
    ],
  },
  {
    title: "Falah App",
    company_name: "Falah App",
    icon: falahApp || "FA",
    iconBg: "#FFEFDD",
    date: "June 2025",
    points: [
      "Developed an SOS alert and service booking platform for NGOs, lawyers, and therapists.",
      "Implemented appointment scheduling, role-based access, and service management.",
      "Integrated notifications for alerts and bookings.",
      "Focused on real-time functionality and secure data handling.",
    ],
  },
  {
    title: "Buddy App",
    company_name: "Buddy App",
    icon: buddy || "BA",
    iconBg: "#DDEEFF",
    date: "March 2025 - May 2025",
    points: [
      "Created a gig-based application connecting customers with nearby workers.",
      "Implemented dynamic bidding system with location-based filtering.",
      "Developed real-time notifications and automated bid radius expansion.",
      "Integrated payment and wallet system for transactions between users and workers.",
    ],
  },
  {
    title: "Mr. Delivery",
    company_name: "Mr. Delivery",
    icon: laundaryday || "MD",
    iconBg: "#F0F0F0",
    date: "Nov 2024 - Feb 2025",
    points: [
      "Developed and enhanced a delivery management platform using Laravel.",
      "Implemented booking, rider assignment, and real-time tracking features.",
      "Integrated notifications, wallet system, and payment gateway for smooth transactions.",
      "Built dashboards for admin, riders, and customers to monitor deliveries.",
    ],
  },
  {
    title: "Software Testing Intern",
    company_name: "Ensyd Technologies Pvt Ltd",
    icon: mightymedia || "ET",
    iconBg: "#E6DEDD",
    date: "Sept 2024 - Oct 2024",
    points: [
      "Conducted software testing for Anaar Multi-Tenant Application.",
      "Performed functional, integration, and system testing.",
      "Documented bugs and collaborated with developers to ensure timely fixes.",
      "Assisted in improving application performance and reliability.",
    ],
  },
  {
    title: "Travel App (FYP)",
    company_name: "Travel App (FYP)",
    icon: trektooicon || "TA",
    iconBg: "#383E56",
    date: "March 2024 - Aug 2024",
    points: [
      "Developed a travel booking application using Laravel and React.",
      "Implemented user-friendly booking flows and interactive dashboards.",
      "Integrated payment gateway and location-based services for smooth travel experience.",
      "Optimized frontend for SEO and performance.",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "Haris Minhas helped us build and scale our Buddy application with clean React code and well-integrated Laravel APIs. His full stack expertise and proactive approach were instrumental in creating a seamless user experience.",
    name: "Client",
    designation: "Project Manager",
    company: "Buddy Application",
    
  },
  {
    testimonial:
      "Haris Minhas built a robust delivery management system for MR Delivery from scratch with advanced admin features, real-time tracking, and seamless user flows. He exceeded our expectations with his technical skills.",
    name: "Client",
    designation: "Founder",
    company: "MR Delivery",
    
  },
  {
    testimonial:
      "Haris Minhas delivered high-quality work on time for our Falah app. His Laravel expertise and attention to detail made a significant difference in our application's performance and user satisfaction.",
    name: "Client",
    designation: "Project Lead",
    company: "Falah App",
    
  },
];


const projects = [
 {
  name: "Buddy App",
  description:
    "Built an intelligent service-matching platform (Buddy App) that connects customers with nearby workers using real-time bidding, smart job recommendations, and automated notifications. Integrated location-based filters, radius expansion logic, and a streamlined booking workflow for fast worker assignment.",
  tags: [
    { name: "laravel", color: "red-text-gradient" },
    { name: "react", color: "blue-text-gradient" },
    { name: "php", color: "green-text-gradient" },
    { name: "mysql", color: "purple-text-gradient" },
    { name: "google-maps", color: "orange-text-gradient" },
    { name: "firebase-notifications", color: "pink-text-gradient" },
  ],
  image: buddy,
  source_code_link: "https://github.com/",
},

  {
    name: "MrDelivery App",
    description:
      "Developed a complete on-demand delivery platform (MrDelivery App) where customers can book riders for parcel pickup and drop-off. Implemented real-time rider posting, bidding-style request acceptance, wallet system with PayMob payments, multi-language support, and automated booking workflows. Integrated push notifications and a comprehensive driver earnings module.",
    tags: [
      { name: "laravel", color: "red-text-gradient" },
      { name: "react-native", color: "blue-text-gradient" },
      { name: "php", color: "green-text-gradient" },
      { name: "mysql", color: "purple-text-gradient" },
      { name: "firebase", color: "orange-text-gradient" },
      { name: "paymob", color: "pink-text-gradient" },
      { name: "google-maps", color: "yellow-text-gradient" },
    ],
    image: mrDelivery,
    source_code_link: "https://github.com/",
  },
  {
    name: "Falah App",
    description:
      "Built a safety and assistance platform (Falah App) that sends SOS alerts to registered NGOs and organizations. Integrated real-time emergency notifications, role-based dashboards, and appointment booking with lawyers and therapists. Implemented automated database seeding, secure authentication, and a smooth workflow for users to request urgent help and schedule professional support.",
    tags: [
      { name: "laravel", color: "red-text-gradient" },
      { name: "react", color: "blue-text-gradient" },
      { name: "php", color: "green-text-gradient" },
      { name: "mysql", color: "purple-text-gradient" },
      { name: "notifications", color: "orange-text-gradient" },
      { name: "sos-system", color: "pink-text-gradient" },
    ],
    image: falahApp,
    source_code_link: "https://github.com/",
  },
  {
    name: "TokenEstate",
    description:
      "Developed a blockchain-based real estate platform (TokenEstate) where physical properties are converted into digital tokenized assets. Implemented secure user registration, property listing workflows, and a MongoDB-backed data layer. Integrated blockchain logic for asset representation, enabling users to explore, manage, and interact with tokenized property data in a modern web interface.",
    tags: [
      { name: "nodejs", color: "green-text-gradient" },
      { name: "blockchain", color: "blue-text-gradient" },
      { name: "mongodb", color: "purple-text-gradient" },
      { name: "web3", color: "orange-text-gradient" },
      { name: "javascript", color: "yellow-text-gradient" },
      { name: "tokenization", color: "pink-text-gradient" },
    ],
    image: tokenEstate,
    source_code_link: "https://github.com/",
  },
  {
    name: "Explorer Bees",
    description:
      "Contributed to Explorer Bees, an educational and activity-based learning platform for kids. Worked on improving content flow, optimizing backend logic, and enhancing user experience. Implemented feature updates, fixed bugs, refined API responses, and ensured smooth navigation across learning modules, quizzes, and interactive activities. Helped maintain platform stability and performance.",
    tags: [
      { name: "laravel", color: "red-text-gradient" },
      { name: "php", color: "blue-text-gradient" },
      { name: "mysql", color: "green-text-gradient" },
      { name: "react", color: "purple-text-gradient" },
      { name: "education-tech", color: "orange-text-gradient" },
      { name: "api-integration", color: "pink-text-gradient" },
    ],
    image: explorerBees,
    source_code_link: "https://github.com/",
  },
  {
    name: "Bee Sportz",
    description:
      "Working on Bee Sportz, a sports management and analytics platform. Implementing real-time player performance tracking, match statistics, and automated data processing with AI-assisted insights. Enhancing backend APIs, optimizing database structure, and improving admin dashboards for better team, event, and score management. Contributing to feature development, bug fixes, and overall system stability.",
    tags: [
      { name: "laravel", color: "red-text-gradient" },
      { name: "php", color: "blue-text-gradient" },
      { name: "mysql", color: "green-text-gradient" },
      { name: "react", color: "purple-text-gradient" },
      { name: "sports-analytics", color: "orange-text-gradient" },
      { name: "api-development", color: "pink-text-gradient" },
    ],
    image: beeSportz,
    source_code_link: "https://github.com/",
  },
 
];


export { services, technologies, experiences, testimonials, projects };
