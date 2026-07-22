export interface TimelineNode {
  id: string;
  title: string;
  period: string;
  icon: string;
  color: string;
  content: {
    insight: string;
    narrative: string;
    transition: string;
  };
}

export interface SkillNode {
  id: string;
  label: string;
  x: number;
  y: number;
  color: string;
  connections: string[];
  content: {
    type: string;
    items: {
      title: string;
      description: string;
      contribution: string;
      capability: string;
    }[];
  };
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  githubUrl: string;
  type: 'dashboard' | 'interactive' | 'visualization';
  features: string[];
}

export interface Tool {
  id: string;
  name: string;
  tool: string;
  stage: string;
  theme: string;
  description: string;
  icon: string;
  color: string;
  researchQuestion: string;
  aiCapability: string;
  output: string;
  insight: string;
  link: string;
}

export interface Idea {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
}

export const timelineData: TimelineNode[] = [
  {
    id: 'seeing-beyond',
    title: 'Seeing Beyond Information',
    period: '2023',
    icon: 'Eye',
    color: '#85cdca',
    content: {
      insight: 'Market outcomes are not determined by information alone.',
      narrative: 'My freshman internship at Guolian Minsheng Securities introduced me to the reality of financial analysis. Initially, I believed the key was collecting more information, tracking performance indicators, and comparing fundamentals. Yet I observed investors reaching vastly different valuation conclusions when analyzing companies with nearly identical public information. This led me to question how investors form their judgments.',
      transition: 'I began realizing that interpretation, expectations, and sentiment also shape valuation outcomes.',
    },
  },
  {
    id: 'building-foundations',
    title: 'Building Analytical Foundations',
    period: '2023 - 2025',
    icon: 'BookOpen',
    color: '#c38d9e',
    content: {
      insight: 'Theoretical models cannot fully capture uncertainty and complex market dynamics.',
      narrative: 'My academic training at Fudan University provided systematic frameworks through courses in Microeconomics, Macroeconomics, Corporate Finance, Financial Markets, and Econometrics. These equipped me to understand value creation, market mechanisms, and economic forces. But as my understanding deepened, I moved from learning models that explain markets to recognizing their inherent limitations.',
      transition: 'I shifted from accepting theories to questioning their boundaries.',
    },
  },
  {
    id: 'understanding-expectations',
    title: 'Understanding Expectations',
    period: '2025',
    icon: 'Search',
    color: '#a8b5a0',
    content: {
      insight: 'Valuation is about how markets price future possibilities.',
      narrative: 'At Zhongtai Securities Electronics Research Team during the generative AI boom, I witnessed companies with similar financial performance receiving dramatically different valuations. The difference lay in investors\' expectations regarding technological development, industry prospects, and future growth opportunities. This taught me that valuation is not merely about measuring current performance.',
      transition: 'I moved from analyzing companies to analyzing how markets perceive companies.',
    },
  },
  {
    id: 'exploring-value',
    title: 'Exploring Value Creation',
    period: '2025',
    icon: 'Sparkles',
    color: '#f4a261',
    content: {
      insight: 'Corporate value emerges from the interaction of multiple forces.',
      narrative: 'Through the Xiyuan Project at Fudan, my empirical research on data factor marketplaces and corporate innovation revealed how institutional environments, innovation incentives, and market mechanisms collectively influence firm development. Corporate value is shaped by innovation, institutions, policy environment, and market expectations in concert.',
      transition: 'My understanding expanded from company-level metrics to broader economic systems.',
    },
  },
  {
    id: 'developing-judgment',
    title: 'Developing Financial Judgment',
    period: '2025 - Present',
    icon: 'Zap',
    color: '#8B7399',
    content: {
      insight: 'The most valuable capability is forming independent judgments in an age of AI.',
      narrative: 'My journey has evolved from analyzing market outcomes to developing judgment under uncertainty. In an era where AI makes information processing increasingly accessible, mere information acquisition is no longer sufficient. The true value lies in integrating diverse information sources, understanding complex systems, and forming independent judgments.',
      transition: 'Finance × AI × Human Judgment — this is where the future lies.',
    },
  },
];

export const skillMapData: SkillNode[] = [
  {
    id: 'core',
    label: 'Perri Luo',
    x: 0,
    y: 0,
    color: '#f5e6d3',
    connections: ['investment', 'valuation', 'empirical', 'ai', 'product', 'academic'],
    content: {
      type: 'About Me',
      items: [
        {
          title: 'Introduction',
          description: 'A finance-trained analyst who combines market understanding, empirical research, AI-enabled tools, and independent judgment to analyze value creation in a changing world.',
          contribution: 'Building Financial Intelligence for the AI Era',
          capability: 'Finance × Research × AI × Business Thinking',
        },
      ],
    },
  },
  {
    id: 'investment',
    label: 'Investment Research',
    x: 240,
    y: -120,
    color: '#e8a87c',
    connections: ['core', 'valuation', 'ai'],
    content: {
      type: 'Industry Analysis',
      items: [
        {
          title: 'Zhongtai Securities — Electronics Research Team',
          description: 'Researched cloud computing and AI industries, analyzed companies including AMD and Dell focusing on financial performance and capital expenditure.',
          contribution: 'Built Bloomberg-based databases covering US technology companies and BAT, maintained semiconductor cycle tracking models and valuation frameworks.',
          capability: 'Industry research, company analysis, database building, valuation frameworks',
        },
        {
          title: 'Guolian Minsheng Securities — Power & New Energy Team',
          description: 'Conducted industry research on traditional and renewable energy sectors, tracked electricity prices, corporate events, and industry trends.',
          contribution: 'Built a weekly energy database covering 8 categories and 20+ indicators, supported industry reports and investment research.',
          capability: 'Energy sector analysis, data tracking, report support',
        },
        {
          title: 'Cinda Securities — Pharmaceutical Research Team',
          description: 'Researched innovative drug companies and pharmaceutical industries, analyzed competitive landscape and market development.',
          contribution: 'Built clinical research database with 5,000+ entries.',
          capability: 'Pharmaceutical industry analysis, clinical data research',
        },
      ],
    },
  },
  {
    id: 'valuation',
    label: 'Corporate Valuation',
    x: 220,
    y: 120,
    color: '#c38d9e',
    connections: ['core', 'investment', 'product'],
    content: {
      type: 'Financial Analysis',
      items: [
        {
          title: 'Tencent Holdings Analysis',
          description: 'Conducted multidimensional financial analysis, built macroeconomic risk sensitivity matrix, applied DuPont analysis, SOTP valuation, and three-stage DCF model.',
          contribution: 'Produced a 20,000-word investment analysis report covering business model, competitive advantage, and growth drivers.',
          capability: 'Financial modeling, DCF valuation, risk analysis, investment report writing',
        },
        {
          title: 'Kweichow Moutai Analysis',
          description: 'Built financial diagnostic framework, conducted three-statement analysis, applied DCF, WACC, and relative valuation methods.',
          contribution: 'Developed investment recommendations based on comprehensive valuation analysis.',
          capability: 'Financial statement analysis, relative valuation, investment recommendation',
        },
      ],
    },
  },
  {
    id: 'empirical',
    label: 'Empirical Research',
    x: -220,
    y: 120,
    color: '#e59966',
    connections: ['core', 'ai', 'academic'],
    content: {
      type: 'Quantitative Analysis',
      items: [
        {
          title: 'Xiyuan Project — Data Factor Market and Corporate Innovation',
          description: 'Constructed a 10-year Chinese A-share panel dataset using financial, patent, and disclosure data. Applied DID models, fixed effects, robustness tests, heterogeneity analysis, and mechanism analysis.',
          contribution: 'Studied how data factor markets influence corporate innovation, won First Prize in Excellence Cup Innovation Competition.',
          capability: 'Panel data construction, causal inference, DID methodology, academic research',
        },
        {
          title: 'Prospect Theory and Stock Analysis',
          description: 'Processed US and Chinese stock index data using Python, implemented value function and probability weighting models, estimated investor subjective utility.',
          contribution: 'Applied event study methodology to analyze market shocks from a behavioral perspective.',
          capability: 'Behavioral finance, quantitative modeling, Python data processing, event study',
        },
      ],
    },
  },
  {
    id: 'ai',
    label: 'AI & Data',
    x: -240,
    y: -120,
    color: '#7db8b5',
    connections: ['core', 'empirical', 'product'],
    content: {
      type: 'Intelligence Tools',
      items: [
        {
          title: 'AI-Driven Financial Analysis Workflows',
          description: 'Developed AI-enhanced research pipelines that integrate LLM-assisted analysis with traditional financial modeling.',
          contribution: 'Built Daily Market Intelligence Agent project that automates market monitoring and analysis.',
          capability: 'AI-assisted research, automation, LLM workflow design',
        },
        {
          title: 'Data Tools & Platforms',
          description: 'Proficient in Python, SQL, Bloomberg, Wind, and Tableau for data processing, automation, and visualization.',
          contribution: 'Applied these tools across multiple research projects to enhance analytical efficiency and output quality.',
          capability: 'Data processing, financial data platforms, visualization, automation',
        },
      ],
    },
  },
  {
    id: 'product',
    label: 'Product & Strategy',
    x: 120,
    y: 220,
    color: '#d4756a',
    connections: ['core', 'valuation', 'ai', 'academic'],
    content: {
      type: 'Business Thinking',
      items: [
        {
          title: 'XTransfer — Product Operations',
          description: 'Supported LC and DP financial product incubation, participated in Southeast Asia collection channel deployment.',
          contribution: 'Translated business requirements into product solutions, managed transaction operations and audited 1,000+ cross-border settlement transactions totaling RMB 18 million.',
          capability: 'Product operations, cross-border finance, business requirement translation, transaction management',
        },
        {
          title: 'Bain Cup — Taikang Elderly Care Industry Strategy',
          description: 'Conducted industry research on China\'s elderly care sector, built financial feasibility models.',
          contribution: 'Applied DCF and cost-benefit analysis, developed market expansion strategies for Taikang\'s elderly care business.',
          capability: 'Consulting, industry strategy, financial modeling, market expansion',
        },
      ],
    },
  },
  {
    id: 'academic',
    label: 'Academic Foundation',
    x: -120,
    y: 220,
    color: '#8fa3a3',
    connections: ['core', 'empirical', 'product'],
    content: {
      type: 'Education',
      items: [
        {
          title: 'Fudan University, School of Economics',
          description: 'B.Econ in Finance with GPA: 96/100.',
          contribution: 'Completed rigorous training in econometrics, corporate finance, financial markets, financial modeling, and quantitative analysis.',
          capability: 'Academic excellence, theoretical foundation, quantitative methods',
        },
        {
          title: 'Academic Credentials',
          description: 'IELTS 8.0, GRE 334+4.',
          contribution: 'Demonstrated strong analytical and communication skills through standardized testing.',
          capability: 'English proficiency, analytical reasoning, writing',
        },
      ],
    },
  },
];

export const projectsData: Project[] = [
  {
    id: 'daily-stock',
    title: 'Daily A-share Intelligence',
    subtitle: 'AI-Powered Market Intelligence',
    description: '基于LLM的每日A股市场情报系统，自动生成市场分析报告、热点追踪与投资建议',
    githubUrl: '#',
    type: 'dashboard',
    features: ['实时市场数据', 'AI分析报告', '热点追踪', '投资建议', '可视化Dashboard'],
  },
  {
    id: 'prospect-theory',
    title: 'Prospect Theory Simulator',
    subtitle: 'Interactive Behavioral Finance',
    description: '前景理论交互演示组件，支持用户拖拽概率参数，实时观察价值函数曲线变化',
    githubUrl: '#',
    type: 'interactive',
    features: ['概率参数拖拽', '实时曲线计算', '风险偏好可视化', '理论解释'],
  },
  {
    id: 'industry-research',
    title: 'Industry Research Graph',
    subtitle: 'Visualizing Tech Supply Chains',
    description: '产业链动态图谱，点击企业节点展开多维度信息，呈现Capex、Revenue、Cloud、AI等数据',
    githubUrl: '#',
    type: 'visualization',
    features: ['企业节点交互', '产业链图谱', '多维数据展示', '动态可视化'],
  },
];

export const toolsData: Tool[] = [
  {
    id: 'financial-intelligence',
    name: 'Financial Intelligence',
    tool: 'FinGPT',
    stage: 'Financial Information',
    theme: 'Understanding financial information with AI.',
    description: 'Exploring how financial LLMs can process financial documents, news, and corporate information to extract structured investment insights.',
    icon: 'Brain',
    color: '#85cdca',
    researchQuestion: 'How can financial LLMs transform unstructured financial data into actionable investment insights?',
    aiCapability: 'Financial document processing, information extraction, structured insight generation',
    output: 'NVIDIA AI Financial Intelligence Report',
    insight: 'AI can significantly reduce the time needed to process and synthesize information from diverse financial sources, enabling analysts to focus on higher-value judgment tasks.',
    link: 'https://github.com/perriluo05-lagom/NVDA-FinGPT-Financial-Intelligence',
  },
  {
    id: 'research-automation',
    name: 'Research Automation',
    tool: 'FinRobot',
    stage: 'Research Process',
    theme: 'AI-assisted equity research.',
    description: 'Exploring how AI agents can automate parts of the equity research workflow, including company analysis, information synthesis, and research report generation.',
    icon: 'Bot',
    color: '#c38d9e',
    researchQuestion: 'Can AI agents automate repetitive tasks in equity research while maintaining analytical quality?',
    aiCapability: 'Company analysis automation, research report generation, financial modeling assistance',
    output: 'NVIDIA Professional Equity Research Report',
    insight: 'AI can automate the mechanical aspects of equity research, but human oversight and contextual judgment remain essential for investment recommendations.',
    link: 'https://finrobot.ai/output/NVDA/report/Professional_Equity_Report_NVDA.html',
  },
  {
    id: 'investment-intelligence',
    name: 'Investment Intelligence',
    tool: 'TradingAgents',
    stage: 'Investment Decision',
    theme: 'AI-supported investment decision-making.',
    description: 'Exploring how multi-agent AI systems simulate investment committee workflows through multiple perspectives, debate, risk assessment, and final decision-making.',
    icon: 'Users',
    color: '#e8a87c',
    researchQuestion: 'How can multi-agent systems simulate collaborative investment decision-making processes?',
    aiCapability: 'Multi-perspective analysis, debate simulation, risk assessment, decision synthesis',
    output: 'NVIDIA AI Investment Committee Memo',
    insight: 'Multi-agent AI systems can provide structured debate frameworks, but the final investment decision requires human conviction and accountability.',
    link: 'https://github.com/perriluo05-lagom/AI-Investment-Committee-Experiment',
  },
];

export const ideasData: Idea[] = [
  {
    id: 'future-equity',
    title: 'The Future of Equity Research',
    excerpt: 'AI正在重塑股票研究的方式，从数据收集到报告生成，自动化正在改变分析师的工作流程',
    date: '2024',
    tags: ['AI', 'Equity Research', 'Future'],
  },
  {
    id: 'ai-wont-replace',
    title: 'AI Won\'t Replace Analysts',
    excerpt: 'AI是增强而非替代，优秀的分析师将利用AI工具提升效率，聚焦更高价值的判断工作',
    date: '2024',
    tags: ['AI', 'Career', 'Future'],
  },
  {
    id: 'financial-intelligence',
    title: 'Building Financial Intelligence',
    excerpt: '金融智能不仅仅是数据分析，而是将AI能力与金融专业知识深度融合的产物',
    date: '2024',
    tags: ['AI', 'Finance', 'Intelligence'],
  },
  {
    id: 'ai-workflows',
    title: 'Building AI Workflows',
    excerpt: '构建高效的AI工作流是提升生产力的关键，从prompt工程到自动化管道，每一步都值得优化',
    date: '2024',
    tags: ['AI', 'Workflow', 'Productivity'],
  },
];

export const contactCommands = {
  help: [
    { cmd: 'contact', desc: 'Show contact information' },
    { cmd: 'email', desc: 'Copy email address' },
    { cmd: 'github', desc: 'Open GitHub profile' },
    { cmd: 'linkedin', desc: 'Open LinkedIn profile' },
    { cmd: 'resume', desc: 'Download resume' },
    { cmd: 'clear', desc: 'Clear terminal' },
    { cmd: 'help', desc: 'Show this help message' },
  ],
};
