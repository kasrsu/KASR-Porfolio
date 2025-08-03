export interface Project {
  id: string;
  title: string;
  description: string;
  summary: string;
  points: string[];
  thumbnail: string;
  images?: string[];
  technologies: string[];
  category: 'machine learning' | 'data analysis' | 'visualization' | 'nlp' | 'research' | 'other';
  demoUrl?: string;
  codeUrl?: string;
  featured: boolean;
  date: string;
  duration?: string;
}

export const projects: Project[] = [
  {
    id: 'proj-1',
    title: 'AI-Powered Educational Guidance System',
    description: `Engineered a revolutionary AI chatbot using Ollamal and Neo4j for semantic search, 
analyzing user prompts to deliver personalized, resource-rich course recommendations for IT students.`,
    summary: `

🕸 Neo4j Knowledge Graph
 Every course, module, topic, and skill is structured in a graph.
 Recommendations are contextual, not clickbait.

`,
    points: [
      'Developed a semantic search engine using Neo4j graph database.',
      'Integrated Ollamal for natural language understanding and response generation.',
      'Conducted user testing to refine chatbot interactions and improve recommendations.',
 
    ],
    thumbnail: '/projects/ai-education-thumb.jpg',
    images: [
      '/projects/ai-education-1.jpg',
      '/projects/ai-education-2.jpg',
      '/projects/ai-education-3.jpg'
    ],
    technologies: ['React Native', 'Expo', 'Neo4j', 'LangChain', 'Ollamal', 'TypeScript'],
    category: 'machine learning',
    demoUrl: 'https://example.com/ai-education-demo',
    codeUrl: 'https://github.com/username/ai-education-system',
    featured: true,
    date: '2025-03',
    duration: '4 months'
  },
  {
    id: 'proj-2',
    title: 'Interactive COVID-19 Dashboard',
    description: `Created a real-time interactive dashboard tracking global COVID-19 statistics. 
The dashboard includes visualizations of cases, recoveries, and vaccinations with filtering capabilities by country and time period.`,
    summary: `A data visualization tool that provided critical insights during the pandemic, used by over 10,000 people.`,
    points: [
      'Developed a semantic search engine using Neo4j graph database.',
      'Integrated Ollamal for natural language understanding and response generation.',
      'Conducted user testing to refine chatbot interactions and improve recommendations.'
    ],
    thumbnail: '/projects/covid-dashboard-thumb.jpg',
    images: [
      '/projects/covid-dashboard-1.jpg',
      '/projects/covid-dashboard-2.jpg'
    ],
    technologies: ['D3.js', 'React', 'TypeScript', 'Node.js', 'MongoDB'],
    category: 'visualization',
    demoUrl: 'https://example.com/covid-dashboard',
    codeUrl: 'https://github.com/username/covid-dashboard',
    featured: true,
    date: '2021-03',
    duration: '2 months'
  },
  {
    id: 'proj-3',
    title: 'Sentiment Analysis for Product Reviews',
    description: `Implemented an NLP solution to analyze customer reviews for e-commerce products. 
The system categorizes reviews by sentiment, extracts key topics, and highlights areas for product improvement.`,
    summary: `An NLP system that helped increase product ratings by identifying and addressing customer pain points.`,
    points: [
      'Developed a semantic search engine using Neo4j graph database.',
      'Integrated Ollamal for natural language understanding and response generation.',
      'Conducted user testing to refine chatbot interactions and improve recommendations.'
    ],
    thumbnail: '/projects/sentiment-analysis-thumb.jpg',
    images: [
      '/projects/sentiment-analysis-1.jpg',
      '/projects/sentiment-analysis-2.jpg'
    ],
    technologies: ['Python', 'NLTK', 'SpaCy', 'BERT', 'TensorFlow', 'Flask'],
    category: 'nlp',
    demoUrl: 'https://example.com/sentiment-demo',
    codeUrl: 'https://github.com/username/review-sentiment-analysis',
    featured: false,
    date: '2022-08',
    duration: '4 months'
  },
  {
    id: 'proj-4',
    title: 'Sales Forecasting System',
    description: `Developed a time series forecasting model to predict sales for a retail chain. 
The model accounts for seasonality, trends, and external factors like promotions and holidays.`,
    summary: `A forecasting tool that improved inventory management and reduced stockouts by 35%.`,
    points: [
      'Developed a semantic search engine using Neo4j graph database.',
      'Integrated Ollamal for natural language understanding and response generation.',
      'Conducted user testing to refine chatbot interactions and improve recommendations.'
    ],
    thumbnail: '/projects/sales-forecast-thumb.jpg',
    images: [
      '/projects/sales-forecast-1.jpg',
      '/projects/sales-forecast-2.jpg'
    ],
    technologies: ['Python', 'Prophet', 'ARIMA', 'LSTM', 'Pandas', 'Plotly'],
    category: 'data analysis',
    codeUrl: 'https://github.com/username/sales-forecasting',
    featured: true,
    date: '2021-11',
    duration: '3 months'
  },
  {
    id: 'proj-5',
    title: 'Credit Risk Assessment',
    description: `Built a machine learning pipeline to assess credit risk for loan applications. 
The model evaluates applicant data and provides a risk score with explanatory factors.`,
    points: [
      'Developed a semantic search engine using Neo4j graph database.',
      'Integrated Ollamal for natural language understanding and response generation.',
      'Conducted user testing to refine chatbot interactions and improve recommendations.'
    ],
    summary: `An ML solution that increased approval accuracy by 15% while reducing default rates.`,
    thumbnail: '/projects/credit-risk-thumb.jpg',
    images: [
      '/projects/credit-risk-1.jpg',
      '/projects/credit-risk-2.jpg'
    ],
    technologies: ['Python', 'Scikit-learn', 'LightGBM', 'SHAP', 'Pandas', 'Docker'],
    category: 'machine learning',
    demoUrl: 'https://example.com/credit-risk-demo',
    codeUrl: 'https://github.com/username/credit-risk-assessment',
    featured: false,
    date: '2022-01',
    duration: '5 months'
  },
  {
    id: 'proj-6',
    title: 'Research: Attention Mechanisms in NLP',
    description: `Conducted research on novel attention mechanisms for transformer-based language models. 
Proposed a new approach for more efficient context handling in large documents.`,
    summary: `A research project that contributed to improving long-document processing in NLP applications.`,
    points: [
      'Developed a semantic search engine using Neo4j graph database.',
      'Integrated Ollamal for natural language understanding and response generation.',
      'Conducted user testing to refine chatbot interactions and improve recommendations.'
    ],
    thumbnail: '/projects/attention-research-thumb.jpg',
    images: [
      '/projects/attention-research-1.jpg'
    ],
    technologies: ['Python', 'PyTorch', 'Transformers', 'BERT', 'Attention Mechanisms'],
    category: 'research',
    codeUrl: 'https://github.com/username/attention-mechanisms-research',
    featured: false,
    date: '2021-09',
    duration: '6 months'
  }
];

export const projectCategories = [
  { id: 'all', name: 'All Projects' },
  { id: 'machine learning', name: 'Machine Learning' },
  { id: 'data analysis', name: 'Data Analysis' },
  { id: 'visualization', name: 'Data Visualization' },
  { id: 'nlp', name: 'NLP' },
  { id: 'research', name: 'Research' }
];

export const getFeaturedProjects = () => projects.filter(project => project.featured);
export const getProjectsByCategory = (category: string) => {
  if (category === 'all') return projects;
  return projects.filter(project => project.category === category);
};
