const production = 'https://shiju-my-retail.herokuapp.com/';
const development = 'http://localhost:3000/';
const apiConfig = {
  apiUrl: (process.env.NODE_ENV ? production : development)
};
module.exports = apiConfig;