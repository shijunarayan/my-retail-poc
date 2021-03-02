const production = 'https://frestmeet.herokuapp.com/';
const development = 'http://localhost:3000/';
const apiConfig = {
  apiUrl: (process.env.NODE_ENV ? production : development)
};
module.exports = apiConfig;