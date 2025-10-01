// Landing Page Constants
export const FEATURES = [
  {
    id: 'ai-assessment',
    title: 'AI Neural Assessment',
    description: 'Advanced neural networks and machine learning algorithms analyze your cognitive patterns, skills, and market trends to create hyper-personalized career roadmaps.',
    icon: 'Psychology',
    color: '#00F5FF',
    gradient: 'linear-gradient(135deg, #00F5FF 0%, #0EA5E9 100%)',
  },
  {
    id: 'blockchain-cert',
    title: 'Blockchain Credentials',
    description: 'Immutable, cryptographically secured credentials on distributed ledger technology, instantly verifiable by employers worldwide.',
    icon: 'Security',
    color: '#FBBF24',
    gradient: 'linear-gradient(135deg, #FBBF24 0%, #F97316 100%)',
  },
  {
    id: 'job-matching',
    title: 'Quantum Job Matching',
    description: 'AI-powered quantum algorithms match your unique skill signature with global opportunities in real-time.',
    icon: 'Work',
    color: '#A855F7',
    gradient: 'linear-gradient(135deg, #A855F7 0%, #C084FC 100%)',
  },
  {
    id: 'micro-learning',
    title: 'Adaptive Micro-Learning',
    description: 'AI-curated, bite-sized learning modules that adapt to your learning style and pace using machine learning.',
    icon: 'School',
    color: '#10B981',
    gradient: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
  },
  {
    id: 'token-economy',
    title: 'DeFi Learning Economy',
    description: 'Earn cryptocurrency tokens for learning achievements, stake them for premium features, and trade on decentralized exchanges.',
    icon: 'AccountBalance',
    color: '#EC4899',
    gradient: 'linear-gradient(135deg, #EC4899 0%, #F472B6 100%)',
  },
];

export const SUCCESS_STORIES = [
  {
    id: 'ananya',
    name: 'Ananya',
    role: 'From Retail Worker to AI Data Scientist',
    steps: [
      {
        icon: 'School',
        title: 'AI Assessment',
        description: 'AI neural assessment revealed exceptional pattern recognition abilities',
        status: 'completed',
      },
      {
        icon: 'TrendingUp',
        title: 'Micro-Learning',
        description: 'Mastered ML algorithms through adaptive micro-learning during work breaks',
        status: 'completed',
      },
      {
        icon: 'CheckCircle',
        title: 'Blockchain Certification',
        description: 'Earned blockchain-verified AI/ML certification with cryptographic proof',
        status: 'completed',
      },
      {
        icon: 'Work',
        title: 'Job Placement',
        description: 'Landed AI researcher role at tech unicorn with 200% salary increase',
        status: 'completed',
      },
    ],
  },
  {
    id: 'arjun',
    name: 'Arjun',
    role: 'From Factory Worker to Blockchain Developer',
    steps: [
      {
        icon: 'School',
        title: 'Career Transition',
        description: 'AI assessment identified blockchain development as optimal career path',
        status: 'completed',
      },
      {
        icon: 'TrendingUp',
        title: 'Skill Building',
        description: 'Mastered Solidity, DeFi protocols, and smart contracts through AI-guided learning',
        status: 'completed',
      },
      {
        icon: 'CheckCircle',
        title: 'Industry Recognition',
        description: 'Earned multiple blockchain certifications with immutable credential proofs',
        status: 'completed',
      },
      {
        icon: 'Work',
        title: 'Career Success',
        description: 'Now leads DeFi development team at major cryptocurrency exchange',
        status: 'completed',
      },
    ],
  },
];

export const BUSINESS_MODEL_POINTS = [
  {
    icon: 'CheckCircle',
    title: 'Freemium Model',
    description: 'Free basic courses with premium advanced content and personalized mentoring',
  },
  {
    icon: 'TrendingUp',
    title: 'Placement Fees',
    description: 'Success-based revenue from job placement partnerships with global employers',
  },
  {
    icon: 'Business',
    title: 'Corporate Training',
    description: 'Enterprise reskilling solutions for companies adapting to digital transformation',
  },
  {
    icon: 'Security',
    title: 'Insurance Partnerships',
    description: 'Collaboration with insurers to provide reskilling coverage for displaced workers',
  },
];

export const ANIMATION_VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  },
  button: {
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
    tap: { scale: 0.95 },
  },
  card: {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  },
};