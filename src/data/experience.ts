export interface Statistic {
  icon: string;
  value: number;
  label: string;
}

export interface WorkExperience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  responsibilities: string[];
  skills: string[];
  logo?: string;
}

export interface Education {
  id: string;
  degree: string;
  field: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  achievements?: string[];
  logo?: string;
}

export const statistics: Statistic[] = [
  {
    icon: 'project-diagram',
    value: 10,
    label: 'Projects Completed'
  },
  {
    icon: 'users',
    value: 7,
    label: 'Happy Clients'
  },
  {
    icon: 'laptop-code',
    value: 3,
    label: 'Years Experience'
  },
  {
    icon: 'award',
    value: 5,
    label: 'Awards & Certifications'
  }
];

export const workExperiences: WorkExperience[] = [
  {
    id: 'exp1',
    title: 'Primary Education',
    company: 'Prince of Wales College',
    location: 'Moratuwa, Colombo',
    startDate: '2000',
    endDate: '2006',
    description: 'Excelled in primary education, demonstrating strong academic abilities from an early age.',
    responsibilities: [
      'Served as Grade 5 Class Prefect, developing leadership skills',
      'Passed the competitive Grade 5 Scholarship Examination',
      'Achieved excellent results in primary education examinations',
      'Recognized for outstanding performance in mathematics and science'
    ],
    skills: ['Academic Excellence', 'Leadership', 'Mathematics', 'Science'],
    logo: '/images/companies/pow-college.png'
  },
  {
    id: 'exp2',
    title: 'GCE O/levels',
    company: 'Prince of Wales College',
    location: 'Moratuwa, Colombo',
    startDate: '2006',
    endDate: '2018',
    description: 'Introvert student who excelled in mathematics and science subjects.',
    responsibilities: [
      'Successfully passed GCE O/Level examinations with strong results',
      'Participated in mathematics competitions and science exhibitions'
    ],
    skills: ['Mathematics', 'Science', 'Critical Thinking', 'Problem Solving'],
    logo: '/images/companies/pow-college.png'
  },
  {
    id: 'exp3',
    title: 'GCE A/levels',
    company: 'Prince of Wales College',
    location: 'Moratuwa, Colombo',
    startDate: '2018',
    endDate: '2020',
    description: 'Completed advanced studies in Mathematics stream with IT specialization.',
    responsibilities: [
      'Successfully passed GCE A/Level examinations with a Z-score of 0.35',
      'Specialized in Mathematics and IT subjects',
      'Developed strong analytical and problem-solving skills',
      'Participated in programming competitions and IT projects'
    ],
    skills: ['Advanced Mathematics', 'IT', 'Programming', 'Analytical Thinking', 'Problem Solving'],
    logo: '/images/companies/pow-college.png'
  },
  {
    id: 'exp4',
    title: 'BSc (Hons) in Data Science',
    company: 'NSBM Green University / Plymouth University',
    location: 'Homagama, Sri Lanka',
    startDate: '2021',
    endDate: 'Present',
    description: 'Pursuing honors degree in Data Science offered in collaboration with Plymouth University (UK).',
    responsibilities: [
      'Maintaining strong academic performance across core data science subjects',
      'Completing coursework in statistics, machine learning, and data visualization',
      'Participating in data analysis projects and research initiatives',
      'Developing practical skills in Python, R, and SQL programming',
      'Collaborating with peers on team-based data science challenges'
    ],
    skills: ['Data Science', 'Machine Learning', 'Statistical Analysis', 'Python', 'R', 'SQL', 'Data Visualization'],
    logo: '/images/companies/nsbm-plymouth.png'
  },

];

export const education: Education[] = [
  {
    id: 'edu1',
    degree: 'Ph.D.',
    field: 'Computer Science - Machine Learning',
    institution: 'Vienna University of Technology',
    location: 'Vienna, Austria',
    startDate: '2014',
    endDate: '2017',
    achievements: [
      'Dissertation: "Deep Learning Approaches for Multimodal Data Fusion"',
      'Published 3 papers in top-tier machine learning conferences',
      'Recipient of the Outstanding Research Award'
    ],
    logo: '/images/education/vienna-tech.png'
  },
  {
    id: 'edu2',
    degree: 'M.Sc.',
    field: 'Data Science',
    institution: 'Charles University',
    location: 'Prague, Czech Republic',
    startDate: '2012',
    endDate: '2014',
    achievements: [
      'Graduated with honors - GPA 3.9/4.0',
      'Master\'s Thesis: "Statistical Methods for Time Series Analysis"'
    ],
    logo: '/images/education/charles-uni.png'
  },
  {
    id: 'edu3',
    degree: 'B.Sc.',
    field: 'Mathematics and Computer Science',
    institution: 'Czech Technical University',
    location: 'Prague, Czech Republic',
    startDate: '2008',
    endDate: '2012',
    achievements: [
      'Graduated summa cum laude',
      'Awarded Dean\'s List recognition for all semesters'
    ],
    logo: '/images/education/czech-tech.png'
  }
];
  export const certifications = [
    {
      id: 'cert-1',
      name: 'AWS Certified Machine Learning - Specialty',
      issuer: 'Amazon Web Services',
      date: '2022',
      url: 'https://aws.amazon.com/certification/certified-machine-learning-specialty/',
      logo: '/logos/aws-cert.png'
    },
    {
      id: 'cert-2',
      name: 'TensorFlow Developer Certificate',
      issuer: 'Google',
      date: '2021',
      url: 'https://www.tensorflow.org/certificate',
      logo: '/logos/tensorflow-cert.png'
    },
    {
      id: 'cert-3',
      name: 'Professional Data Scientist',
      issuer: 'DataCamp',
      date: '2020',
      url: 'https://www.datacamp.com/certificate/DS0016471462883',
      logo: '/logos/datacamp-cert.png'
    },
    {
      id: 'cert-4',
      name: 'Deep Learning Specialization',
      issuer: 'Coursera (deeplearning.ai)',
      date: '2019',
      url: 'https://www.coursera.org/specializations/deep-learning',
      logo: '/logos/coursera-cert.png'
    }
  ];


// Statistics for counter animations
export const counterStatistics = [
  { label: 'Years Experience', value: 7, icon: 'calendar' },
  { label: 'Projects Completed', value: 42, icon: 'project-diagram' },
  { label: 'Published Papers', value: 8, icon: 'file-alt' },
  { label: 'Happy Clients', value: 35, icon: 'smile' }
];
