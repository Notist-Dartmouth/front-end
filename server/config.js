const config = {
  nodeEnv: process.env.NODE_ENV,
  webConcurrency: process.env.WEB_CONCURRENCY || 1,
  port: process.env.PORT || 5000,
  timeout: 29000,
  host: process.env.NODE_ENV === 'production' ? 'notist-frontend.herokuapp.com' : 'localhost:5000',
  apiHost: process.env.NODE_ENV === 'production' ? 'notist.herokuapp.com' : 'localhost:3000',
};

module.exports = config;
