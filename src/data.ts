import { Project, TechStackItem, NetworkHost } from "./types";

export const projectsData: Project[] = [
  {
    id: "mutual-fund-intelligence",
    title: "MUTUAL_FUND INTEL ENGINE",
    description: "Scalable ETL pipeline and Node.js backend for tracking mutual fund disclosures and analyzing portfolio data across 47+ AMCs.",
    date: "July 2025 - Present",
    longDescription: "Engineered a scalable, layout-agnostic ETL pipeline using Pandas with heuristic header detection and chunk-based streaming. This enabled efficient extraction, normalization, and incremental MongoDB upserts for portfolio data across 47+ AMCs covering 2,000+ schemes. Developed a scalable Node.js and Express backend to process monthly Mutual Fund disclosures and track stock movements. Designed advanced MongoDB aggregation pipelines to calculate sector-wise AUM and average percentage contribution to NAV.",
    tags: ["Python", "Node.js", "MongoDB", "Pandas"],
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuC5rr-xqhVaPLeMzwPCbWF8cfOKF02KppeDsBSI0E9-u326aM6zSwjke34Z5bc9kp3YBSbGww4b7qLho5EKRpVz_drfX52xgrER4fNhPVBq9usCEsUivlKtion68LSQoqcoKjqurvLvgvd-y4tK7b3uky51jpZeiBV-Sx6pBgfShmej31OX54PClS8BG0a5FO_K8aMyeeEogDQWRR5lf-LYQhxS3rVOQsjQletsRhIJWtCvGtxFp32bbddianfjq6lG3y_n3A0kEks",
    imageAlt: "Server racks and data processing visualization.",
    benchmarkScore: 98.4,
    metrics: [
      { label: "AMCs PROCESSED", value: "47+", trend: "up" },
      { label: "SCHEMES TRACKED", value: "2,000+", trend: "stable" },
      { label: "ETL PIPELINE", value: "Scalable", trend: "stable" },
      { label: "AUM CALCULATION", value: "Real-time", trend: "up" }
    ],
    architecture: {
      nodes: [
        { id: "node-1", name: "Pandas ETL Ingress", type: "gateway", status: "active" },
        { id: "node-2", name: "Chunk-based Streamer", type: "balancer", status: "active" },
        { id: "node-3", name: "Header Detection", type: "node", status: "active" },
        { id: "node-4", name: "Node.js/Express API", type: "user", status: "active" },
        { id: "node-5", name: "MongoDB Aggregation", type: "database", status: "active" }
      ],
      edges: [
        { from: "node-1", to: "node-2", latencyMs: 0.2 },
        { from: "node-2", to: "node-3", latencyMs: 0.8 },
        { from: "node-3", to: "node-5", latencyMs: 1.5 },
        { from: "node-4", to: "node-5", latencyMs: 0.4 }
      ]
    },
    systemLogs: [
      "SYSTEM: ETL pipeline initialized with heuristic header detection",
      "PANDAS: Streaming mutual fund disclosure dataset chunk 1/500",
      "MONGODB: Upserting normalized portfolio data to cluster",
      "API: Express backend computing sector-wise AUM aggregate arrays",
      "SUCCESS: 2000+ AMC schemes updated to NAV baseline"
    ]
  },
  {
    id: "quant-analysis",
    title: "QUANTITATIVE OPTIMIZATION",
    description: "Optimization pipeline using Monte Carlo simulations and Walk-Forward optimization to balance risk-return with Sharpe Ratios.",
    date: "Dec 2024 - July 2025",
    longDescription: "Designed and built an optimization pipeline combining Grid Search and Monte Carlo simulations (500+ runs) to test and refine portfolio weights under different scenarios. Created an Efficient Frontier module to identify portfolios that balance risk and return by maximizing Sharpe Ratio and minimizing volatility. Developed a Walk-Forward Optimization framework with a 12-week rolling window to validate strategy performance on unseen data and reduce overfitting. Used OLS regression to analyze how different momentum factors impact portfolio returns.",
    tags: ["Python", "SciPy", "Statistics", "MachLearn"],
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuD1ERewpTa453M_PsNA2MQBZ1tKISMLkajrkEkhyO1JkBlxLMqLKdY4GBA5ZhYsbsvB6c8ClBVcvNo5x4aOytgi79pFU5SPbf6O-5T0GI6MiLOVgAZaKwUlnsGBhUZupOHjzOSHSznlPdcHh1xGZ73Ws381cIl7NpKFRVQmx_z2RLJsVX-rqwTV5_KCTIRGcp5PMQIcgRSGV8roj1WDo3mHnrboCylaSNCqDSRZ5YrtwD8bVSnRWW5ahMCJ4lty-wooBBOdDdb2cYc",
    imageAlt: "Abstract digital visualization of metrics and matrices.",
    benchmarkScore: 99.2,
    metrics: [
      { label: "MONTE CARLO RUNS", value: "500+", trend: "up" },
      { label: "WALK-FORWARD", value: "12-Week", trend: "stable" },
      { label: "OVERFITTING REDUCTION", value: "95%", trend: "down" },
      { label: "SHARPE RATIO", value: "Optimized", trend: "up" }
    ],
    architecture: {
      nodes: [
        { id: "node-a", name: "Data Ingest", type: "gateway", status: "active" },
        { id: "node-b", name: "Grid Search Optimizer", type: "balancer", status: "active" },
        { id: "node-c", name: "Monte Carlo Simulator", type: "node", status: "active" },
        { id: "node-d", name: "Walk-Forward Framework", type: "node", status: "active" },
        { id: "node-e", name: "Efficient Frontier Module", type: "cache", status: "active" },
        { id: "node-f", name: "OLS Regression Layer", type: "database", status: "active" }
      ],
      edges: [
        { from: "node-a", to: "node-b", latencyMs: 2.1 },
        { from: "node-b", to: "node-c", latencyMs: 0.2 },
        { from: "node-c", to: "node-e", latencyMs: 5.5 },
        { from: "node-d", to: "node-e", latencyMs: 1.1 },
        { from: "node-e", to: "node-f", latencyMs: 3.5 }
      ]
    },
    systemLogs: [
      "KERNEL: Spawned SciPy computation stack, threading enabled",
      "SIMULATOR: Running 500+ Monte Carlo stochastic simulations",
      "OPTIMIZER: Evaluating Efficient Frontier for risk/return balance",
      "VALIDATOR: Running 12-week Walk-Forward optimization on backtest slices",
      "ANALYSIS: OLS regression mapped for 15D-3M momentum factors"
    ]
  },
  {
    id: "smallcase-tracker",
    title: "SMALLCASE TRACKING API",
    description: "Financial tracking and analytics system integrating Zerodha APIs, interactive visualization, and live portfolio evaluation.",
    date: "Sep 2024 - Dec 2024",
    longDescription: "Designed and developed a comprehensive Smallcase Tracking System using Node.js, Express.js, MongoDB, and ReactJs. Developed automated system for 10+ technical indicators (RSI, MACD, EMA) across multiple timeframes for portfolio health monitoring (Watch/Worry/Clean flags). Developed Industry Allocation charts and interactive Portfolio Timelines with price changes. Integrated the Zerodha API to pull historical data and streamlined Node.js to Python backend communication for efficient quantitative processing.",
    tags: ["React", "Express.js", "Zerodha", "Node.js"],
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDeTMEYWpDzoTFH-GYFt1hGAJI8qvczrKaadkIfBw8ON5x_CMStTvTY72z21lnoIZd53zkO-QEec30u2ebjUr68GxB6jphrHl-cHLt-Rdn_4yuCeXNu7cnoUOWKywSjBGg2mi8NcybfI7Pkhk36-9LMDXKkZ-Yvmjk_-sTlseQfsogl-OSi-mDi8X75fzSHqMipawIV1lyKbnBbO-3FHyH7h3jr4cFaI7UD3SJj08r35NW2AfnPFYKG7u13Bv7MhYQlg6iQXc1RSlQ",
    imageAlt: "Data dashboard visualizing financial timelines.",
    benchmarkScore: 96.5,
    metrics: [
      { label: "TECHNICAL INDICATORS", value: "10+", trend: "stable" },
      { label: "BROKER INTEGRATION", value: "Zerodha API", trend: "stable" },
      { label: "PYTHON RPC LATENCY", value: "0.2ms", trend: "down" },
      { label: "PORTFOLIO TIMELINES", value: "Interactive", trend: "up" }
    ],
    architecture: {
      nodes: [
        { id: "node-x", name: "Zerodha API Stream", type: "gateway", status: "active" },
        { id: "node-y", name: "Node.js Express Server", type: "balancer", status: "active" },
        { id: "node-z", name: "Node-Python IPC", type: "queue", status: "active" },
        { id: "node-w", name: "Indicator Compute Engine", type: "node", status: "active" },
        { id: "node-v", name: "MongoDB Cloud", type: "database", status: "active" },
        { id: "node-u", name: "ReactJs UI Client", type: "user", status: "active" }
      ],
      edges: [
        { from: "node-x", to: "node-y", latencyMs: 4.1 },
        { from: "node-y", to: "node-z", latencyMs: 0.1 },
        { from: "node-z", to: "node-w", latencyMs: 0.2 },
        { from: "node-w", to: "node-v", latencyMs: 1.9 },
        { from: "node-v", to: "node-u", latencyMs: 2.4 }
      ]
    },
    systemLogs: [
      "INGRESS: Authenticated Zerodha Kite Connect WebSocket",
      "CALC: Computing MACD and RSI multi-timeframe overlays",
      "PIPELINE: Passed payload to Python process via IPC bridge",
      "DATABASE: Streaming B2B metrics directly to primary MongoDB node",
      "ESTIMATION: Applied Watch/Worry/Clean flags based on EMA crosses"
    ]
  },
  {
    id: "smart-traveller",
    title: "THE SMART TRAVELLER",
    description: "Location-centric web application featuring Firebase Cloud Messaging and live G-Maps integration.",
    date: "June 2022 - Aug 2022",
    longDescription: "Orchestrated responsive ReactJs/Redux UIs embedded with the G-Maps API for real-time navigation and geo-location services. Handled complex asynchronous push notifications using Firebase Cloud Messaging to boost retention. Architected document storage with MongoDB Cloud Realm for retrieval of user travel paths and preferences. Maintained a rigorous QA standard, actively pushing unit test coverage and establishing deployment stability across cross-platform environments.",
    tags: ["ReactJs", "Redux", "G-Maps API", "Firebase"],
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuC5rr-xqhVaPLeMzwPCbWF8cfOKF02KppeDsBSI0E9-u326aM6zSwjke34Z5bc9kp3YBSbGww4b7qLho5EKRpVz_drfX52xgrER4fNhPVBq9usCEsUivlKtion68LSQoqcoKjqurvLvgvd-y4tK7b3uky51jpZeiBV-Sx6pBgfShmej31OX54PClS8BG0a5FO_K8aMyeeEogDQWRR5lf-LYQhxS3rVOQsjQletsRhIJWtCvGtxFp32bbddianfjq6lG3y_n3A0kEks",
    imageAlt: "A global map projection with routing nodes glowing.",
    benchmarkScore: 92.1,
    metrics: [
      { label: "MAPS INTEGRATION", value: "Real-time", trend: "up" },
      { label: "PUSH DELIVERY", value: "FCM", trend: "stable" },
      { label: "STATE MANAGEMENT", value: "Redux", trend: "stable" },
      { label: "DATA RETRIEVAL", value: "Realm Cloud", trend: "up" }
    ],
    architecture: {
      nodes: [
        { id: "node-a1", name: "G-Maps REST", type: "gateway", status: "active" },
        { id: "node-a2", name: "Firebase Message Relay", type: "balancer", status: "active" },
        { id: "node-a3", name: "ReactJs Front-End", type: "user", status: "active" },
        { id: "node-a4", name: "Redux Store", type: "cache", status: "active" },
        { id: "node-a5", name: "MongoDB Realm", type: "database", status: "active" }
      ],
      edges: [
        { from: "node-a3", to: "node-a4", latencyMs: 0.1 },
        { from: "node-a1", to: "node-a3", latencyMs: 12.2 },
        { from: "node-a2", to: "node-a3", latencyMs: 5.5 },
        { from: "node-a4", to: "node-a5", latencyMs: 14.1 }
      ]
    },
    systemLogs: [
      "CLIENT: React app mounted with global Redux store initialized",
      "MAPS: Live location tracker acquired user bounds [Lat/Lng]",
      "FCM: Registered device token for cloud messaging push channel",
      "DATABASE: Synchronized offline-first queries via MongoDB Realm",
      "QA: All Unit tests passing on mobile and desktop wrappers"
    ]
  }
];

export const techStackData: TechStackItem[] = [
  // Languages
  { name: "TypeScript / JS", category: "languages", proficiency: 94, metric: "Primary web-app syntax & backend framework execution" },
  { name: "Python", category: "languages", proficiency: 92, metric: "ETL pipelines, quantitative modeling (SciPy, Pandas)" },
  { name: "C++ / C", category: "languages", proficiency: 88, metric: "Core algorithm design, competitive programming (AIR 32 ST)" },

  // Frameworks
  { name: "React / Redux / Vue", category: "frameworks", proficiency: 95, metric: "Engineered scalable client UIs & internal B2B dashboards" },
  { name: "Node.js / Express", category: "frameworks", proficiency: 92, metric: "Built robust backends tracking 2,000+ mutual fund schemas" },
  { name: "Pandas / SciPy", category: "frameworks", proficiency: 90, metric: "Handled data chunk streams & statistical factor modeling" },

  // Infrastructure
  { name: "Docker / Compose", category: "infrastructure", proficiency: 85, metric: "Containerized environments for consistent deployments" },
  { name: "AWS", category: "infrastructure", proficiency: 80, metric: "Cloud deployment architectures & load distribution" },
  { name: "Git / LATEX / Jest", category: "infrastructure", proficiency: 88, metric: "Versioning, algorithmic documentation, unit testing automation" },

  // Databases
  { name: "MongoDB / Realm", category: "databases", proficiency: 90, metric: "Built custom aggregation pipelines & incremental upserts" },
  { name: "Firebase / Firestore", category: "databases", proficiency: 85, metric: "Implemented real-time sync & FCM push notifications" },
  { name: "MySQL / GraphQL", category: "databases", proficiency: 82, metric: "Relational data structures & optimized API queries" }
];

export const networkHostsData: NetworkHost[] = [
  { id: "h1", name: "IIT Kanpur - CompSci", region: "Kanpur, IN", ip: "202.3.77.10", status: "online", pingTime: 12, cpuLoad: 24, memoryLoad: 42 },
  { id: "h2", name: "Goalzen ETL StreamServer", region: "Hyderabad, IN", ip: "13.232.14.88", status: "online", pingTime: 8, cpuLoad: 68, memoryLoad: 80 },
  { id: "h3", name: "Quantitative Optimizer", region: "Hyderabad, IN", ip: "3.109.43.201", status: "online", pingTime: 14, cpuLoad: 85, memoryLoad: 92 },
  { id: "h4", name: "Zerodha Kite Ticker", region: "Mumbai, IN", ip: "15.207.12.91", status: "degraded", pingTime: 44, cpuLoad: 35, memoryLoad: 50 },
  { id: "h5", name: "Smart Traveller DB", region: "Ap-South", ip: "13.236.192.3", status: "online", pingTime: 22, cpuLoad: 14, memoryLoad: 31 },
  { id: "h6", name: "Dev Sandbox", region: "Localhost", ip: "127.0.0.1", status: "offline", pingTime: 999, cpuLoad: 0, memoryLoad: 0 }
];
