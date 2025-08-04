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
    title: 'Business Process Mining - University Student Enrollment',
    description: `Applied Alpha Miner and Heuristic Miner algorithms to construct process models and identify inefficiencies. 
Performed data cleaning, preprocessing, and analysis using R programming to extract insights from event logs. 
Developed visualizations and dashboards to effectively communicate findings to stakeholders. 
Aimed to optimize productivity, reduce risks, and enhance operational efficiency through process mining techniques.`,
    summary: `A process mining project aimed at improving operational efficiency in university enrollment systems.`,
    points: [
      'Applied Alpha Miner and Heuristic Miner algorithms to analyze event logs.',
      'Performed data preprocessing and cleaning using R programming.',
      'Developed dashboards to visualize inefficiencies and communicate findings effectively.',
      'Proposed actionable insights to optimize enrollment processes and reduce risks.'
    ],
    thumbnail: '/projects/process-mining-thumb.jpg',
    images: [
      '/projects/process-mining-1.jpg',
      '/projects/process-mining-2.jpg'
    ],
    technologies: ['R', 'Process Mining', 'Alpha Miner', 'Heuristic Miner', 'Data Visualization'],
    category: 'data analysis',
    demoUrl: 'https://example.com/process-mining-demo',
    codeUrl: 'https://github.com/username/process-mining-enrollment',
    featured: false,
    date: '2023-06',
    duration: '3 months'
  },
  {
    id: 'proj-3',
    title: 'End-to-End NLP System for Text Classification and Humanization',
    description: `Developed an AI Text Humanizer to refine AI-generated text and a Human vs. AI Classifier using BERT models. 
Created a custom dataset by scraping pre-2019 articles and rewriting them with Ollama Mistral AI to generate AI-text pairs.`,
    summary: `An NLP system delivering insights into sentiment trends, linguistic patterns, and AI-human text differences.`,
    points: [
      'Built an AI Text Humanizer and Human vs. AI Classifier using BERT models.',
      'Created a custom dataset by scraping and rewriting articles with AI.',
      'Processed text data with preprocessing, POS tagging, NER, and dependency parsing.',
      'Applied LDA for topic modeling and Word2Vec/Doc2Vec for clustering.',
      'Developed Transformer-based models for AI-to-human text conversion.',
      'Visualized results with Matplotlib and Seaborn for actionable insights.'
    ],
    thumbnail: '/projects/nlp-system-thumb.jpg',
    images: [
      '/projects/nlp-system-1.jpg',
      '/projects/nlp-system-2.jpg'
    ],
    technologies: ['Python', 'NLTK', 'spaCy', 'TensorFlow', 'PyTorch', 'Hugging Face'],
    category: 'nlp',
    demoUrl: 'https://example.com/nlp-system-demo',
    codeUrl: 'https://github.com/username/nlp-system',
    featured: true,
    date: '2024-05',
    duration: '6 months'
  },
  {
    id: 'proj-4',
    title: 'User Authentication via Acceleration Data – MATLAB Coursework',
    description: `Developed a user authentication system using Feedforward Multi-Layer Perceptron (MLP) neural networks 
based on acceleration data from digital devices. Analyzed intra-user and inter-user variance across six datasets per user.`,
    summary: `A MATLAB-based user authentication system achieving 96% accuracy and 97% recall.`,
    points: [
      'Applied feature selection techniques such as ANOVA, PCA, Reliability Ratio, and Mutual Information.',
      'Trained and fine-tuned the neural network to optimize performance.',
      'Implemented data preprocessing, training, and classification in MATLAB.',
      'Achieved high accuracy and recall through rigorous model evaluation.'
    ],
    thumbnail: '/projects/user-auth-thumb.jpg',
    images: [
      '/projects/user-auth-1.jpg',
      '/projects/user-auth-2.jpg'
    ],
    technologies: ['MATLAB', 'MLP Neural Networks', 'PCA', 'ANOVA', 'Feature Selection'],
    category: 'machine learning',
    demoUrl: 'https://example.com/user-auth-demo',
    codeUrl: 'https://github.com/username/user-authentication',
    featured: false,
    date: '2022-10',
    duration: '2 months'
  },
  {
    id: 'proj-5',
    title: 'AI Tour Guide LLM Integration with LangChain',
    description: `Developed a smart tour guide system using LangChain and AI, offering travel recommendations based on user prompts. 
Integrated data sources to provide up-to-date suggestions and itineraries. 
Improved the chatbot experience by enhancing response relevance and speed.`,
    summary: `A smart AI-powered tour guide system delivering personalized travel recommendations.`,
    points: [
      'Built a travel recommendation system using LangChain and AI.',
      'Integrated multiple data sources for real-time travel suggestions.',
      'Enhanced chatbot response relevance and speed for better user experience.'
    ],
    thumbnail: '/projects/ai-tour-guide-thumb.jpg',
    images: [
      '/projects/ai-tour-guide-1.jpg',
      '/projects/ai-tour-guide-2.jpg'
    ],
    technologies: ['LangChain', 'Python', 'AI', 'Chatbot Development'],
    category: 'machine learning',
    demoUrl: 'https://example.com/ai-tour-guide-demo',
    codeUrl: 'https://github.com/username/ai-tour-guide',
    featured: false,
    date: '2023-12',
    duration: '3 months'
  },
  {
    id: 'proj-6',
    title: 'Weather Forecast App',
    description: `Developed an AI-based weather forecasting application with a machine learning model that provides 
accurate predictions using historical data. Data preprocessing, EDA, time series decomposition, model selection 
(ARIMA, SARIMA, Prophet), model evaluation (accuracy, mean absolute error), and deployment.`,
    summary: `An AI-powered weather forecasting app delivering accurate predictions and alerts for different regions.`,
    points: [
      'Performed data preprocessing, exploratory data analysis, and time series decomposition.',
      'Implemented and compared models such as ARIMA, SARIMA, and Prophet for forecasting.',
      'Evaluated models using metrics like accuracy and mean absolute error.',
      'Deployed the application with a responsive UI using Streamlit.',
      'Generated forecasts and alerts for different regions through data analytics.'
    ],
    thumbnail: '/projects/weather-forecast-thumb.jpg',
    images: [
      '/projects/weather-forecast-1.jpg',
      '/projects/weather-forecast-2.jpg'
    ],
    technologies: ['Python', 'Streamlit', 'ARIMA', 'SARIMA', 'Prophet', 'Time Series Analysis'],
    category: 'data analysis',
    demoUrl: 'https://example.com/weather-forecast-demo',
    codeUrl: 'https://github.com/username/weather-forecast-app',
    featured: false,
    date: '2023-08',
    duration: '4 months'
  },
  {
    id: 'proj-7',
    title: 'Loan Repayment Prediction System',
    description: `Built a machine learning model to predict loan repayment probability based on financial and behavioral data. 
Implemented logistic regression for missing value imputation, outlier detection and removal (z-scores, IQR), EDA, 
feature engineering, model selection (logistic regression, decision trees, random forests, gradient boosting), 
model evaluation (accuracy, precision, recall, F1 score, ROC-AUC), deployment, and monitoring.`,
    summary: `A machine learning system for predicting loan repayment probability with high accuracy and reliability.`,
    points: [
      'Performed extensive exploratory data analysis to uncover patterns and trends in financial data.',
      'Implemented outlier detection and removal techniques such as z-scores and IQR.',
      'Engineered features to improve model performance and interpretability.',
      'Trained and compared models including logistic regression, decision trees, random forests, and gradient boosting.',
      'Evaluated models using metrics like accuracy, precision, recall, F1 score, and ROC-AUC.',
      'Deployed the model with a user-friendly interface for real-time predictions.',
      'Set up monitoring and alerting systems to ensure model performance over time.'
    ],
    thumbnail: '/projects/loan-repayment-thumb.jpg',
    images: [
      '/projects/loan-repayment-1.jpg',
      '/projects/loan-repayment-2.jpg'
    ],
    technologies: ['Python', 'Scikit-learn', 'Pandas', 'Matplotlib', 'Gradient Boosting', 'Logistic Regression'],
    category: 'data analysis',
    demoUrl: 'https://example.com/loan-repayment-demo',
    codeUrl: 'https://github.com/username/loan-repayment-prediction',
    featured: false,
    date: '2024-02',
    duration: '5 months'
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
