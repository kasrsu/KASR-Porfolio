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
    value: 50,
    label: 'Projects Completed'
  },
  {
    icon: 'users',
    value: 25,
    label: 'Happy Clients'
  },
  {
    icon: 'laptop-code',
    value: 7,
    label: 'Years Experience'
  },
  {
    icon: 'award',
    value: 12,
    label: 'Awards & Certifications'
  }
];

export const workExperiences: WorkExperience[] = [
  {
    id: 'exp1',
    title: 'Lead Data Scientist',
    company: 'TechCorp Analytics',
    location: 'Vienna, Austria',
    startDate: 'Jan 2022',
    endDate: 'Present',
    description: 'Leading a team of data scientists to develop machine learning solutions for enterprise clients.',
    responsibilities: [
      'Managed a team of 5 data scientists, setting technical direction and ensuring delivery quality',
      'Designed and implemented machine learning pipelines for predictive maintenance, reducing equipment downtime by 35%',
      'Created NLP models to analyze customer feedback, improving product recommendations by 28%',
      'Presented technical findings to C-level executives and translated business requirements into data science solutions'
    ],
    skills: ['Team Leadership', 'Machine Learning', 'NLP', 'Python', 'AWS', 'Project Management'],
    logo: '/images/companies/techcorp.png'
  },
  {
    id: 'exp2',
    title: 'Senior Data Scientist',
    company: 'FinTech Innovations',
    location: 'Berlin, Germany',
    startDate: 'Mar 2019',
    endDate: 'Dec 2021',
    description: 'Developed machine learning models for fraud detection and credit risk assessment.',
    responsibilities: [
      'Built and deployed fraud detection system using ensemble methods, reducing fraud losses by 42%',
      'Created credit scoring models using gradient boosting, improving approval accuracy by 15%',
      'Implemented data pipelines using Apache Airflow and AWS services',
      'Collaborated with product teams to integrate ML solutions into customer-facing applications'
    ],
    skills: ['Fraud Detection', 'Risk Modeling', 'Python', 'SQL', 'AWS', 'Gradient Boosting'],
    logo: '/images/companies/fintech.png'
  },
  {
    id: 'exp3',
    title: 'Data Scientist',
    company: 'Global Retail Analytics',
    location: 'Prague, Czech Republic',
    startDate: 'Jun 2017',
    endDate: 'Feb 2019',
    description: 'Analyzed customer behavior data to optimize marketing campaigns and improve customer retention.',
    responsibilities: [
      'Developed customer segmentation models using clustering algorithms',
      'Built recommendation systems that increased cross-sell revenue by 22%',
      'Created interactive dashboards using Tableau for business stakeholders',
      'Conducted A/B tests to optimize marketing campaigns'
    ],
    skills: ['Customer Analytics', 'Recommendation Systems', 'A/B Testing', 'R', 'Python', 'Tableau'],
    logo: '/images/companies/retail.png'
  }
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
