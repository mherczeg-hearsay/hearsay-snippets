const config = require('../config/api-call.config.js');
const api = require('./api-calls.js');
const validateConfig = require('./helpers/config-validation');

const requiredProperties = ['authToken'];
validateConfig(config, requiredProperties);

const url =  process.env.npm_config_url || '';
const options = { authToken: config.authToken, debug: true };

api.get(url, options).then((response) => {
    const data = JSON.parse(response.body);
    console.log(data);
});
