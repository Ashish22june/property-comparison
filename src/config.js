// Configuration for Property Investment Analyzer
const config = {
  // App Info
  appName: process.env.REACT_APP_NAME || 'Property Investment Analyzer',
  version: process.env.REACT_APP_VERSION || '1.0.0',
  environment: process.env.REACT_APP_ENV || 'development',
  
  // App Settings
  currency: process.env.REACT_APP_DEFAULT_CURRENCY || 'INR',
  language: process.env.REACT_APP_DEFAULT_LANGUAGE || 'en',
  maxProperties: parseInt(process.env.REACT_APP_MAX_PROPERTIES) || 10,
  maxScenarios: parseInt(process.env.REACT_APP_MAX_SCENARIOS) || 5,
  
  // API Configuration
  apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:3000',
  
  // Utility Functions
  isProduction: () => process.env.NODE_ENV === 'production' || process.env.REACT_APP_ENV === 'production',
  isDevelopment: () => process.env.NODE_ENV === 'development' || process.env.REACT_APP_ENV === 'development',
  
  // Log Configuration
  logConfig: () => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('⚙️  App Configuration:');
      console.log(`   Name: ${config.appName}`);
      console.log(`   Version: ${config.version}`);
      console.log(`   Environment: ${config.environment}`);
      console.log(`   Currency: ${config.currency}`);
    }
  }
};

export default config;
