export interface Skill {
  name: string;
  proficiency: number; // 0-100
  category: 'technical' | 'data science' | 'visualization' | 'soft skills' | 'machine learning' | 'deep learning' | 'graph-based analytics' | 'nlp';
  icon?: string; // Icon name or URL
  color?: string; // Accent color for the skill
}


 export const skills: Skill[] = [
  // Technical Skills
  {
    name: 'Python',
    proficiency: 95,
    category: 'technical',
    icon: 'python',
    color: '#3776AB'
  },
  {
    name: 'JavaScript',
    proficiency: 90,
    category: 'technical',
    icon: 'js',
    color: '#F7DF1E'
  },
  {
    name: 'R',
    proficiency: 80,
    category: 'technical',
    icon: 'r-project',
    color: '#276DC3'
  },
  {
    name: 'MATLAB',
    proficiency: 75,
    category: 'technical',
    icon: 'matlab',
    color: '#E16737'
  },
  {
    name: 'SQL',
    proficiency: 85,
    category: 'technical',
    icon: 'database',
    color: '#00758F'
  },
  {
    name: 'Git',
    proficiency: 90,
    category: 'technical',
    icon: 'git',
    color: '#F1502F'
  },
  {
    name: 'GitHub',
    proficiency: 90,
    category: 'technical',
    icon: 'github',
    color: '#333'
  },
  {
    name: 'VS Code',
    proficiency: 85,
    category: 'technical',
    icon: 'code',
    color: '#007ACC'
  },
  {
    name: 'Jupyter Notebook',
    proficiency: 90,
    category: 'technical',
    icon: 'book',
    color: '#F4D03F'
  },
  {
    name: 'Flask',
    proficiency: 80,
    category: 'technical',
    icon: 'flask',
    color: '#000000'
  },
  {
    name: 'Node.js',
    proficiency: 80,
    category: 'technical',
    icon: 'node-js',
    color: '#68A063'
  },
  {
    name: 'React Native',
    proficiency: 75,
    category: 'technical',
    icon: 'mobile-alt',
    color: '#61DAFB'
  },
  {
    name: 'Expo',
    proficiency: 70,
    category: 'technical',
    icon: 'mobile',
    color: '#000020'
  },
  {
    name: 'Neo4j',
    proficiency: 70,
    category: 'technical',
    icon: 'project-diagram',
    color: '#008CC1'
  },

  // Data Science
  {
    name: 'Core ML Algorithms',
    proficiency: 90,
    category: 'data science',
    icon: 'project-diagram',
    color: '#16A085'
  },
  {
    name: 'Unsupervised Learning',
    proficiency: 80,
    category: 'data science',
    icon: 'object-group',
    color: '#48C9B0'
  },
  {
    name: 'Feature Selection',
    proficiency: 80,
    category: 'data science',
    icon: 'filter',
    color: '#00B894'
  },
  {
    name: 'Hyperparameter Tuning',
    proficiency: 75,
    category: 'data science',
    icon: 'sliders-h',
    color: '#F9A825'
  },
  {
    name: 'Data Wrangling & Feature Engineering',
    proficiency: 90,
    category: 'data science',
    icon: 'tools',
    color: '#2ECC71'
  },
  {
    name: 'Predictive Modeling',
    proficiency: 85,
    category: 'data science',
    icon: 'chart-line',
    color: '#2980B9'
  },
  {
    name: 'Time-Series Forecasting',
    proficiency: 80,
    category: 'data science',
    icon: 'clock',
    color: '#F39C12'
  },
  {
    name: 'Big Data & Distributed Computing',
    proficiency: 70,
    category: 'data science',
    icon: 'cloud',
    color: '#00BFFF'
  },
  {
    name: 'Model Evaluation & Explainability',
    proficiency: 80,
    category: 'data science',
    icon: 'balance-scale',
    color: '#F7CA18'
  },
  // Machine Learning
  {
    name: 'Machine Learning',
    proficiency: 90,
    category: 'machine learning',
    icon: 'brain',
    color: '#FF6B6B'
  },
  {
    name: 'Reinforcement Learning',
    proficiency: 70,
    category: 'machine learning',
    icon: 'gamepad',
    color: '#00BFFF'
  },

  // Deep Learning
  {
    name: 'Neural Networks',
    proficiency: 85,
    category: 'deep learning',
    icon: 'network-wired',
    color: '#E84393'
  },
  {
    name: 'Graph Neural Networks',
    proficiency: 70,
    category: 'deep learning',
    icon: 'sitemap',
    color: '#6C5CE7'
  },

  // Graph-Based Analytics
  {
    name: 'Graph-Based Analytics',
    proficiency: 75,
    category: 'graph-based analytics',
    icon: 'project-diagram',
    color: '#6C5CE7'
  },

  // Natural Language Processing (NLP)
  {
    name: 'Natural Language Processing',
    proficiency: 85,
    category: 'nlp',
    icon: 'comment-alt',
    color: '#6C3483'
  },
  {
    name: 'Text Processing',
    proficiency: 80,
    category: 'nlp',
    icon: 'file-alt',
    color: '#5DADE2'
  },
  {
    name: 'Language Models',
    proficiency: 80,
    category: 'nlp',
    icon: 'robot',
    color: '#A569BD'
  },
  {
    name: 'spaCy',
    proficiency: 75,
    category: 'nlp',
    icon: 'cogs',
    color: '#4F8DFD'
  },
  {
    name: 'LangChain',
    proficiency: 70,
    category: 'nlp',
    icon: 'chain',
    color: '#00B894'
  },
  {
    name: 'Hugging Face Transformers',
    proficiency: 80,
    category: 'nlp',
    icon: 'smile',
    color: '#FFD21F'
  },
  {
    name: 'Semantic Analysis for NLP',
    proficiency: 75,
    category: 'nlp',
    icon: 'search',
    color: '#F39C12'
  },

  // Data Visualization
  {
    name: 'Using python-Matplotlib/Seaborn..',
    proficiency: 95,
    category: 'visualization',
    icon: 'chart-area',
    color: '#11A9F9'
  },

  // Soft Skills
  {
    name: 'Communication',
    proficiency: 90,
    category: 'soft skills',
    icon: 'comments',
    color: '#7CB9E8'
  },
  {
    name: 'Project Management',
    proficiency: 85,
    category: 'soft skills',
    icon: 'tasks',
    color: '#C3B1E1'
  },
  {
    name: 'Problem Solving',
    proficiency: 95,
    category: 'soft skills',
    icon: 'lightbulb',
    color: '#FFD700'
  },
  {
    name: 'Team Leadership',
    proficiency: 85,
    category: 'soft skills',
    icon: 'users',
    color: '#FF7F50'
  },
];


export const skillCategories = [
  { id: 'technical', name: 'Technical Skills', color: '#3776AB' },
  { id: 'data science', name: 'Data Science', color: '#9D44B5' },
  { id: 'machine learning', name: 'Machine Learning', color: '#FF6B6B' },
  { id: 'deep learning', name: 'Deep Learning', color: '#6C5CE7' },
  { id: 'graph-based analytics', name: 'Graph-Based Analytics', color: '#6C5CE7' },
  { id: 'nlp', name: 'Natural Language Processing', color: '#6C3483' },
  { id: 'visualization', name: 'Data Visualization', color: '#F9A03F' },
  { id: 'soft skills', name: 'Soft Skills', color: '#7CB9E8' }
];

export const getSkillsByCategory = (category: string) => {
  return skills.filter(skill => skill.category === category);
};
