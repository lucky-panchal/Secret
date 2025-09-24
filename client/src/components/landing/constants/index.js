// Landing Page Constants
export const FEATURES = [
  {
    id: 'ai-assessment',
    title: 'AI Career Assessment',
    description: 'Advanced AI algorithms analyze your skills, interests, and market trends to create personalized career roadmaps.',
    icon: 'Psychology',
  },
  {
    id: 'blockchain-cert',
    title: 'Blockchain Certification',
    description: 'Secure, verifiable credentials stored on blockchain technology, recognized globally by employers.',
    icon: 'Security',
  },
  {
    id: 'job-matching',
    title: 'Global Job Matching',
    description: 'Connect with opportunities worldwide through our intelligent job matching system and employer network.',
    icon: 'Work',
  },
  {
    id: 'micro-learning',
    title: 'Micro-Learning Courses',
    description: 'Bite-sized, interactive learning modules designed for busy professionals to learn at their own pace.',
    icon: 'School',
  },
  {
    id: 'token-economy',
    title: 'Reskilling Token Economy',
    description: 'Earn tokens for learning achievements and use them for advanced courses, certifications, and career services.',
    icon: 'AccountBalance',
  },
];

export const SUCCESS_STORIES = [
  {
    id: 'ananya',
    name: 'Ananya',
    role: 'From Retail Worker to Data Analyst',
    steps: [
      {
        icon: 'School',
        title: 'AI Assessment',
        description: 'Discovered hidden analytical skills through comprehensive AI evaluation',
        status: 'completed',
      },
      {
        icon: 'TrendingUp',
        title: 'Micro-Learning',
        description: 'Completed 12 weeks of data science micro-courses during work breaks',
        status: 'completed',
      },
      {
        icon: 'CheckCircle',
        title: 'Blockchain Certification',
        description: 'Earned verified Data Analytics certification recognized globally',
        status: 'completed',
      },
      {
        icon: 'Work',
        title: 'Job Placement',
        description: 'Secured position at tech startup with 150% salary increase',
        status: 'completed',
      },
    ],
  },
  {
    id: 'arjun',
    name: 'Arjun',
    role: 'From Factory Worker to Cloud Engineer',
    steps: [
      {
        icon: 'School',
        title: 'Career Transition',
        description: 'Identified cloud computing as future-proof career path',
        status: 'completed',
      },
      {
        icon: 'TrendingUp',
        title: 'Skill Building',
        description: 'Mastered AWS, Azure, and DevOps through interactive learning',
        status: 'completed',
      },
      {
        icon: 'CheckCircle',
        title: 'Industry Recognition',
        description: 'Achieved multiple cloud certifications with blockchain verification',
        status: 'completed',
      },
      {
        icon: 'Work',
        title: 'Career Success',
        description: 'Now leads cloud infrastructure team at Fortune 500 company',
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