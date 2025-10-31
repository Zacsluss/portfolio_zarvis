export interface PortfolioLink {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
  image?: string;
}

export interface PortfolioData {
  personal: {
    name: string;
    title: string;
    tagline: string;
    bio: string;
    location: string;
    email: string;
    phone?: string;
    avatar?: string;
  };
  social: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
    deviantart?: string;
    youtube?: string;
    kuula?: string;
  };
  experience: Experience[];
  projects: Project[];
  skills: SkillCategory[];
  education?: Education[];
  additionalLinks?: PortfolioLink[];
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  problem?: string;
  solution?: string;
  impact?: string;
  longDescription?: string;
  technologies: string[];
  features: string[];
  github?: string;
  demo?: string;
  image?: string;
  highlighted?: boolean;
  color?: string;
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  years?: number;
  certified?: boolean;
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  achievements?: string[];
}

export const portfolioData: PortfolioData = {
  personal: {
    name: "Zachary Sluss",
    title: "Lead CRM Systems Analyst | Enterprise Technology Leader",
    tagline: "Driving $10M+ revenue impact through enterprise platform leadership, team building, and strategic digital transformation across Fortune 500 organizations",
    bio: "I design and govern the digital ecosystems that keep global enterprises running - spanning Salesforce, ERP, and data clouds across 20+ countries and millions in technology investments. I turn complexity into clarity, automation into scale, and platforms into measurable growth - often improving productivity by 40% or more!\n\nBy day, I architect multi-cloud systems and negotiate million-dollar vendor contracts; by night, I build unique digital experiences and pilot drones through physics-defying spaces. Whether it's enterprise architecture or visual experiments, my work always comes down to the same thing: precision, performance, and a curiosity that never switches off.",
    location: "New Hampshire, USA (Remote)",
    email: "zacharyjsluss@gmail.com",
    phone: "(603) 515-6051",
    avatar: "/avatar.jpg",
  },
  social: {
    github: "https://github.com/Zacsluss/Portfolio",
    linkedin: "https://linkedin.com/in/zacharyjsluss",
    website: "https://zacsluss.github.io/zacsluss",
    deviantart: "https://www.deviantart.com/theoryart777",
    youtube: "https://www.youtube.com/channel/UCjnD1inIRh9eKjrl4LfwLcQ",
    kuula: "https://www.kuula.co/profile/Drone_360_Aerial_Photography",
  },
  experience: [
    {
      id: "exp-1",
      company: "Computershare",
      position: "Lead CRM Systems Analyst",
      startDate: "2023-07",
      description: "Lead enterprise CRM strategy and digital transformation initiatives for thousands of global users across over 20 countries. Govern a $1M+ annual CRM, analytics, and integration portfolio aligned to board-level growth objectives.",
      achievements: [
        "Defined and govern enterprise CRM architecture and roadmap spanning Salesforce Multi-Cloud, ERP, and analytics ecosystems - ensuring interoperability, data integrity, and scalable growth across all business units",
        "Directed global digital transformation program that improved sales and operational throughput 40%, automated 1,000+ hours annually, and established global process standardization through API-led integration frameworks",
        "Instituted enterprise governance and compliance model achieving 100% SOX audit readiness and maintaining zero regulatory breaches across all systems and markets",
        "Architected managed services pricing platform integrating automation and standardized product data models, increasing deal velocity 30% and enabling consistent global pricing strategy",
        "Defined multi-year CRM and data roadmap ensuring alignment with corporate strategy, M&A integrations, and geographic expansion goals",
        "Enabled executive and board-level decision intelligence by designing Salesforce dashboards and analytics frameworks for real-time forecasting, pipeline, and revenue insights",
        "Led global change management and adoption strategy, serving as single authority for Salesforce change governance - aligning process, communication, and user adoption across 22+ countries",
        "Directed multi-vendor ecosystem ($3M+ annual portfolio; 11 contracts) across CRM, integration, analytics, and automation categories - overseeing selection, negotiation, and multi-year ROI realization",
        "Govern enterprise project delivery portfolio of 12+ concurrent strategic programs annually, ensuring cross-functional alignment, on-time delivery, and measurable business impact",
      ],
      technologies: ["Salesforce Multi-Cloud", "Salesforce Marketing Cloud", "MuleSoft", "API Management", "Tableau", "Power BI", "SQL", "AWS", "Azure", "ServiceNow", "Jira", "Confluence", "SOX Compliance"],
    },
    {
      id: "exp-2",
      company: "Computershare",
      position: "Sr. Sales Systems Analyst",
      startDate: "2022-12",
      endDate: "2023-07",
      description: "Advanced CRM systems leadership role driving enterprise-wide adoption and integration strategies.",
      achievements: [
        "Established API-led integration framework connecting Salesforce with ERP and HCM systems",
        "Standardized global processes across 22+ countries ensuring compliance and operational consistency",
        "Led M&A integration efforts for platform consolidation and data migration",
        "Designed automation logic reducing manual processes by 35%",
      ],
      technologies: ["Salesforce", "Integration APIs", "Workday HCM", "SAP ERP", "Data Migration", "Process Automation"],
    },
    {
      id: "exp-3",
      company: "Computershare",
      position: "Sr. Sales Analyst",
      startDate: "2021-10",
      endDate: "2022-12",
      description: "Drove sales operations optimization and CRM platform enhancement initiatives.",
      achievements: [
        "Built analytics frameworks for sales forecasting and pipeline management",
        "Implemented data quality controls and validation rules improving CRM data integrity 45%",
        "Created executive reporting dashboards for C-suite visibility into sales metrics",
        "Partnered with global teams to identify automation opportunities",
      ],
      technologies: ["Salesforce Sales Cloud", "Analytics", "Reporting", "Data Quality Management"],
    },
    {
      id: "exp-4",
      company: "CIT Bank",
      position: "Funding Manager",
      startDate: "2019-09",
      endDate: "2021-10",
      description: "Directed technology-enabled lending transformation within CIT's $46M+ national syndicate business portfolio, integrating automation, compliance, and data-driven decision frameworks.",
      achievements: [
        "Spearheaded cloud-based loan origination modernization, unifying analytics, compliance, and CRM platforms to reduce approval cycles 35% and deliver real-time executive reporting",
        "Instituted data governance and workflow automation standards enhancing accuracy, transparency, and risk oversight across all lending operations",
        "Defined and executed workforce enablement strategy, cutting new-hire ramp time 80% by designing training systems and process frameworks for a distributed national team",
        "Partnered with executive leadership to identify automation initiatives that improved portfolio yield, accelerated funding timelines, and elevated compliance integrity",
      ],
      technologies: ["Cloud Loan Origination", "CRM Systems", "Analytics Platforms", "Compliance Automation", "Data Governance", "Process Automation"],
    },
    {
      id: "exp-5",
      company: "EVO Payments International",
      position: "Underwriter",
      startDate: "2018-06",
      endDate: "2019-07",
      description: "Led technology-driven risk transformation for a $10B+ annual transaction portfolio, architecting automated risk analytics and compliance frameworks within enterprise credit systems.",
      achievements: [
        "Directed modernization of credit risk evaluation infrastructure, integrating SQL and Oracle analytics for predictive insight and early fraud detection",
        "Engineered automated scoring and data-cleansing models that improved underwriting accuracy and reduced turnaround time 60%",
        "Collaborated with IT and compliance architects to embed analytics pipelines into enterprise processing systems, aligning with global architecture and risk governance standards",
      ],
      technologies: ["SQL", "Oracle", "Risk Analytics", "Automated Scoring Models", "Data Integration", "Compliance Frameworks"],
    },
    {
      id: "exp-6",
      company: "Black Flag LLC",
      position: "Founder & Managing Partner",
      startDate: "2017-03",
      description: "Founded and scaled multi-channel digital ventures spanning e-commerce, creative media, and analytics-driven services - integrating automation, cloud systems, and emerging tech.",
      achievements: [
        "Built and governed cross-industry digital operations portfolio, generating six-figure revenue through e-commerce, creative production, and technical services",
        "Implemented end-to-end automation and analytics frameworks, optimizing marketing performance and operations across digital channels",
        "Architected digital commerce and operational framework for a forthcoming trading card and board game venture, aligning creative IP with scalable infrastructure",
        "Delivered advanced aerial mapping and 3D modeling solutions as an FAA-licensed remote pilot, leveraging data visualization and photogrammetry for commercial clients",
      ],
      technologies: ["E-commerce Platforms", "Cloud Systems", "Automation", "Analytics", "Drone Technology", "3D Modeling", "Digital Marketing"],
    },
  ],
  projects: [
    {
      id: "proj-1",
      title: "Global Salesforce Multi-Cloud Transformation",
      description: "Enterprise-wide CRM modernization unifying 3,000+ users across 22 countries with integrated ERP, HCM, and analytics",
      problem: "Computershare operated with 22 disconnected regional CRM instances across global markets, causing data silos, inconsistent reporting, and 40% slower sales cycles. Leadership lacked real-time visibility into global pipeline, forecasting required manual consolidation from disparate sources, and M&A integrations took 6+ months due to platform fragmentation.",
      solution: "Architected comprehensive digital transformation program integrating Salesforce Multi-Cloud (Sales, Service, CPQ, Data Cloud) with Workday HCM and SAP ERP. Implemented API-led integration architecture using MuleSoft, established enterprise-wide governance framework ensuring SOX compliance, and built real-time executive dashboards for C-suite decision-making. Standardized business processes across 22 countries while maintaining regional flexibility.",
      impact: "40% increase in sales operational throughput • 1,000+ hours automated annually • $2M+ cost avoidance through platform consolidation • 100% SOX audit compliance with zero breaches • Real-time board-level visibility replacing 3-week manual reporting cycles",
      longDescription: "Led comprehensive digital transformation program integrating Salesforce Sales Cloud, Service Cloud, CPQ, and Data Cloud with Workday HCM and SAP ERP. Implemented API-led integration architecture using MuleSoft, established enterprise governance framework, and delivered real-time executive dashboards for C-suite decision-making.",
      technologies: ["Salesforce Multi-Cloud", "MuleSoft", "Workday HCM", "SAP ERP", "Tableau", "AWS", "API Management"],
      features: [
        "Global platform standardization across 22+ countries",
        "API-led integration framework with ERP and HCM systems",
        "Real-time executive dashboards for forecasting and pipeline visibility",
        "Enterprise governance model achieving 100% SOX compliance",
        "Automated 1,000+ hours annually through intelligent workflows",
        "40% increase in sales and operational throughput",
      ],
      highlighted: true,
      color: "#00ff88",
    },
    {
      id: "proj-2",
      title: "Enterprise Managed Services Pricing Engine",
      description: "Intelligent pricing platform with embedded automation increasing deal velocity 30%",
      problem: "Sales teams wasted 20+ hours per deal manually calculating pricing across fragmented product catalogs with inconsistent discount approval processes. Regional pricing variations created compliance risks, and leadership lacked visibility into pricing trends and margin erosion patterns.",
      solution: "Designed and implemented global pricing platform within Salesforce CPQ, standardizing product catalog across all regions with automated discounting logic based on deal parameters, customer segments, and competitive intelligence. Integrated with ERP for real-time cost synchronization and built intelligent approval workflows routing only exception cases to leadership.",
      impact: "30% improvement in deal closure velocity • 20+ hours saved per sales cycle • Standardized pricing across 22+ countries • Real-time margin visibility for finance team • Reduced pricing errors by 95%",
      longDescription: "Designed and implemented global pricing platform within Salesforce CPQ, standardizing product catalog, pricing models, and approval workflows. Integrated with ERP for real-time cost data and built automated discounting logic based on deal parameters, customer segments, and regional considerations.",
      technologies: ["Salesforce CPQ", "ERP Integration", "Pricing Automation", "Workflow Engine", "Business Rules"],
      features: [
        "Standardized global product and pricing catalog",
        "Automated approval workflows and discounting logic",
        "Real-time ERP integration for cost synchronization",
        "Regional pricing and tax calculation engines",
        "30% improvement in deal closure velocity",
      ],
      highlighted: true,
      color: "#0088ff",
    },
    {
      id: "proj-3",
      title: "Cloud-Based Loan Origination Platform",
      description: "Integrated lending platform reducing approval cycles 35% for $46M+ loan portfolio",
      problem: "CIT Bank's $46M+ syndicate lending program relied on manual credit decisioning with paper-based compliance checks, creating 10-14 day approval cycles and compliance risks. Portfolio managers lacked real-time visibility into risk exposure, and new coordinators required 6+ weeks training on fragmented legacy systems.",
      solution: "Deployed cloud-based loan origination system integrating CRM, analytics, and automated compliance engines. Built intelligent credit scoring workflows with real-time risk assessment, automated regulatory compliance checks, and executive dashboards providing portfolio-wide insights. Created standardized training frameworks reducing coordinator ramp time by 80%.",
      impact: "35% reduction in approval cycle time • 80% faster new-hire onboarding • Zero compliance incidents during tenure • Real-time portfolio risk monitoring for executive team • $46M+ managed with improved operational precision",
      longDescription: "Deployed cloud-based loan origination system integrating CRM, analytics, and compliance tools for national syndicate lending program. Built automated workflows for credit decisioning, risk assessment, and compliance checks, with executive dashboards providing real-time portfolio insights.",
      technologies: ["Cloud LOS", "CRM Integration", "Analytics Platforms", "Compliance Automation", "Risk Management"],
      features: [
        "Automated credit decisioning workflows",
        "Real-time compliance and risk monitoring",
        "Executive dashboards for portfolio management",
        "CRM integration for customer relationship tracking",
        "35% reduction in approval cycle time",
      ],
      highlighted: true,
      color: "#ff006e",
    },
  ],
  skills: [
    {
      category: "Analytics & Business Intelligence",
      skills: [
        { name: "Enterprise Data Strategy", level: "Expert", years: 6 },
        { name: "Google Analytics", level: "Expert", years: 5 },
        { name: "Looker", level: "Intermediate", years: 2 },
        { name: "Power BI", level: "Expert", years: 6 },
        { name: "Tableau (Certified)", level: "Expert", years: 6, certified: true },
      ],
    },
    {
      category: "Cloud Architecture & DevOps",
      skills: [
        { name: "AWS (Certified)", level: "Expert", years: 5, certified: true },
        { name: "Cloud Architecture & Transformation", level: "Expert", years: 5 },
        { name: "Docker", level: "Expert", years: 6 },
        { name: "Google Cloud Platform (GCP)", level: "Advanced", years: 4 },
        { name: "Infrastructure as Code (CloudFormation, Terraform)", level: "Advanced", years: 4 },
        { name: "Kubernetes", level: "Intermediate", years: 2 },
        { name: "Microsoft Azure & DevOps", level: "Advanced", years: 4 },
      ],
    },
    {
      category: "Collaboration & Project Management",
      skills: [
        { name: "Confluence", level: "Advanced", years: 3 },
        { name: "Jira", level: "Expert", years: 6 },
        { name: "Microsoft Teams", level: "Expert", years: 6 },
        { name: "Slack", level: "Expert", years: 6 },
      ],
    },
    {
      category: "Cybersecurity & Compliance",
      skills: [
        { name: "CrowdStrike", level: "Intermediate", years: 2 },
        { name: "Data Loss Prevention (DLP)", level: "Advanced", years: 4 },
        { name: "GDPR & CCPA", level: "Advanced", years: 4 },
        { name: "Okta SSO", level: "Intermediate", years: 2 },
        { name: "SOX Compliance", level: "Advanced", years: 4 },
        { name: "Splunk", level: "Intermediate", years: 2 },
        { name: "Zero Trust Architecture", level: "Advanced", years: 4 },
      ],
    },
    {
      category: "Enterprise Architecture & Frameworks",
      skills: [
        { name: "Enterprise Architecture Frameworks", level: "Intermediate", years: 2 },
        { name: "TOGAF", level: "Intermediate", years: 2 },
        { name: "Zachman Framework", level: "Intermediate", years: 2 },
      ],
    },
    {
      category: "Enterprise Automation & AI/ML",
      skills: [
        { name: "AI/ML Enablement & Enterprise Automation", level: "Expert", years: 5 },
        { name: "Blue Prism", level: "Intermediate", years: 2 },
        { name: "Make (Integromat)", level: "Advanced", years: 3 },
        { name: "Pipedream", level: "Advanced", years: 3 },
        { name: "Power Automate", level: "Advanced", years: 4 },
        { name: "UiPath", level: "Intermediate", years: 2 },
        { name: "Workato", level: "Advanced", years: 3 },
      ],
    },
    {
      category: "Enterprise CRM & Business Platforms",
      skills: [
        { name: "HubSpot", level: "Expert", years: 5 },
        { name: "Microsoft Power Platform", level: "Advanced", years: 4 },
        { name: "Oracle Cloud Applications", level: "Expert", years: 7 },
        { name: "Pardot", level: "Advanced", years: 4 },
        { name: "Salesforce CPQ", level: "Expert", years: 7 },
        { name: "Salesforce Data Cloud", level: "Expert", years: 7 },
        { name: "Salesforce Experience Cloud", level: "Expert", years: 7 },
        { name: "Salesforce Flow", level: "Advanced", years: 4 },
        { name: "Salesforce Marketing Cloud", level: "Expert", years: 7 },
        { name: "Salesforce Multi-Cloud (Certified)", level: "Expert", years: 7, certified: true },
        { name: "Salesforce Sales Cloud", level: "Expert", years: 7 },
        { name: "Salesforce Service Cloud", level: "Expert", years: 7 },
        { name: "SAP ERP", level: "Advanced", years: 4 },
        { name: "ServiceNow & Flow Designer", level: "Expert", years: 5 },
        { name: "Workday HCM", level: "Expert", years: 6 },
        { name: "Zoho CRM", level: "Advanced", years: 4 },
      ],
    },
    {
      category: "Integration & Data Orchestration",
      skills: [
        { name: "API Management (Apigee, Kong)", level: "Advanced", years: 4 },
        { name: "Application Integration & Data Orchestration", level: "Advanced", years: 4 },
        { name: "Google BigQuery", level: "Advanced", years: 3 },
        { name: "MuleSoft", level: "Advanced", years: 4 },
        { name: "Oracle Database", level: "Expert", years: 5 },
        { name: "Snowflake", level: "Intermediate", years: 2 },
        { name: "SQL", level: "Expert", years: 7 },
      ],
    },
    {
      category: "Modern Development & AI",
      skills: [
        { name: "Next.js", level: "Intermediate", years: 2 },
        { name: "Node.js", level: "Intermediate", years: 2 },
        { name: "React", level: "Intermediate", years: 2 },
        { name: "TypeScript", level: "Intermediate", years: 2 },
      ],
    },
    {
      category: "Strategic Leadership & Governance",
      skills: [
        { name: "API-Led Architecture", level: "Advanced", years: 4 },
        { name: "Capital Planning & Budget Oversight", level: "Advanced", years: 4 },
        { name: "Data Governance & Analytics Monetization", level: "Expert", years: 7 },
        { name: "Digital Transformation Leadership", level: "Expert", years: 6 },
        { name: "Enterprise Platform Governance", level: "Advanced", years: 4 },
        { name: "Enterprise Technology Strategy & Governance", level: "Advanced", years: 4 },
        { name: "Platform Integration & Roadmap Ownership", level: "Advanced", years: 4 },
        { name: "Vendor Portfolio Strategy & Contract Negotiation", level: "Advanced", years: 4 },
      ],
    },
  ],
  education: [
    {
      institution: "University of New Hampshire",
      degree: "Bachelor of Science",
      field: "Environmental and Resource Economics",
      startDate: "2012-09",
      endDate: "2016-12",
      achievements: [
        "Minor in Community and Environmental Planning",
        "Coursework in business management, analytics, finance, computer science, marketing, and natural sciences",
        "Developed strong analytical and strategic thinking foundations",
      ],
    },
  ],
  additionalLinks: [
    // AI & Technology
    {
      id: "link-10",
      title: "ASCII 3D Animator",
      description: "A fun, interactive web tool that transforms 3D animated models into live ASCII art using just text characters",
      url: "https://github.com/Zacsluss/ascii_3d_animator",
      category: "AI & Technology",
      image: "/portfolio-images/asciipicture.png",
    },
    {
      id: "link-11",
      title: "Crystal Blitz",
      description: "Crystal Blitz is an intense arena shooter where you face endless waves of intelligent enemies",
      url: "https://github.com/Zacsluss/crystal_blitz",
      category: "AI & Technology",
      image: "/portfolio-images/crystalblitzpicture.png",
    },
    {
      id: "link-12",
      title: "DATAPHREAK",
      description: "DATAPHREAK transforms impossible data challenges into 30-second solutions for analyzing CSV files and detecting patterns",
      url: "https://github.com/Zacsluss/dataphreak",
      category: "AI & Technology",
      image: "/portfolio-images/dataphreakpicture.png",
    },
    {
      id: "link-9",
      title: "Particle Physics Simulator",
      description: "An interactive particle physics simulation that brings real science to life through stunning visual effects",
      url: "https://github.com/Zacsluss/particle_physics_simulator",
      category: "AI & Technology",
      image: "/portfolio-images/particlepicture.png",
    },
    {
      id: "link-13",
      title: "Portfolio Zarvis",
      description: "A fun Conversation AI enabled portfolio with interactive chat capabilities",
      url: "https://github.com/Zacsluss/portfolio_zarvis",
      category: "AI & Technology",
      image: "/portfolio-images/portfoliopicture.png",
    },
    // Art & Design
    {
      id: "link-2",
      title: "Digital Art Portfolio",
      description: "Creative artwork and digital illustrations",
      url: "https://www.deviantart.com/theoryart777",
      category: "Art & Design",
      image: "/portfolio-images/images.webp",
    },
    {
      id: "link-4",
      title: "Digital Design Work",
      description: "Graphic design and visual branding projects",
      url: "https://drive.google.com/drive/folders/1giTNNrjznLS9RILHq9C9vCQQjWxCYgxD?usp=sharing",
      category: "Art & Design",
      image: "/portfolio-images/digitaldesign.webp",
    },
    {
      id: "link-3",
      title: "Music Production",
      description: "Original music compositions and productions",
      url: "https://drive.google.com/drive/folders/1ET30TX7_lST5Cp3EsNp7ak-S4WcLffar?usp=drive_link",
      category: "Art & Design",
      image: "/portfolio-images/music.webp",
    },
    // Certifications
    {
      id: "link-14",
      title: "Salesforce Trailblazer Profile",
      description: "Professional certifications and continuous learning achievements in Salesforce and enterprise technologies",
      url: "https://www.salesforce.com/trailblazer/zacharyjsluss",
      category: "Certifications",
      image: "/portfolio-images/certificationpicture.png",
    },
    // Drone 360 Aerial Photography
    {
      id: "link-5",
      title: "360° Immersive Photography",
      description: "Interactive 360-degree aerial photography experiences",
      url: "https://www.kuula.co/profile/Drone_360_Aerial_Photography",
      category: "Drone 360 Aerial Photography",
      image: "/portfolio-images/360Photo.webp",
    },
    {
      id: "link-6",
      title: "Aerial Photography Portfolio",
      description: "Professional drone photography collection",
      url: "https://drive.google.com/drive/folders/1aJG3T-TVUoJ-Xc6CdCvK2HZTf-PCBpDW?usp=sharing",
      category: "Drone 360 Aerial Photography",
      image: "/portfolio-images/DronePhoto.webp",
    },
    {
      id: "link-7",
      title: "Aerial Videography",
      description: "Cinematic drone video productions",
      url: "https://www.youtube.com/channel/UCjnD1inIRh9eKjrl4LfwLcQ",
      category: "Drone 360 Aerial Photography",
      image: "/portfolio-images/Video.webp",
    },
  ],
};
