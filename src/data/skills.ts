export interface Skill {
  name: string;
  proficiency: number; // 0-100
  category: 'technical' | 'data science' | 'visualization' | 'soft skills';
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
    name: 'R',
    proficiency: 90,
    category: 'technical',
    icon: 'r-project',
    color: '#276DC3'
  },
  {
    name: 'SQL',
    proficiency: 85,
    category: 'technical',
    icon: 'database',
    color: '#4479A1'
  },
  {
    name: 'JavaScript/TypeScript',
    proficiency: 75,
    category: 'technical',
    icon: 'typescript',
    color: '#3178C6'
  },
  {
    name: 'Docker',
    proficiency: 70,
    category: 'technical',
    icon: 'docker',
    color: '#2496ED'
  },

  // Data Science Skills
  {
    name: 'Machine Learning',
    proficiency: 90,
    category: 'data science',
    icon: 'brain',
    color: '#FF6B6B'
  },
  {
    name: 'Statistical Analysis',
    proficiency: 95,
    category: 'data science',
    icon: 'chart-line',
    color: '#6BCB77'
  },
  {
    name: 'Natural Language Processing',
    proficiency: 85,
    category: 'data science',
    icon: 'language',
    color: '#4D96FF'
  },
  {
    name: 'Deep Learning',
    proficiency: 80,
    category: 'data science',
    icon: 'network-wired',
    color: '#9D44B5'
  },
  {
    name: 'Time Series Analysis',
    proficiency: 85,
    category: 'data science',
    icon: 'chart-line',
    color: '#F7D060'
  },

  // Visualization Skills
  {
    name: 'Tableau',
    proficiency: 90,
    category: 'visualization',
    icon: 'table',
    color: '#E97627'
  },
  {
    name: 'Power BI',
    proficiency: 85,
    category: 'visualization',
    icon: 'chart-bar',
    color: '#F2C811'
  },
  {
    name: 'D3.js',
    proficiency: 75,
    category: 'visualization',
    icon: 'chart-pie',
    color: '#F9A03F'
  },
  {
    name: 'Matplotlib/Seaborn',
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
  }
];

export const skillCategories = [
  { id: 'technical', name: 'Technical Skills', color: '#3776AB' },
  { id: 'data science', name: 'Data Science', color: '#9D44B5' },
  { id: 'visualization', name: 'Data Visualization', color: '#F9A03F' },
  { id: 'soft skills', name: 'Soft Skills', color: '#7CB9E8' }
];

export const getSkillsByCategory = (category: string) => {
  return skills.filter(skill => skill.category === category);
};
