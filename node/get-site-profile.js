const config = require('../config/api-call.config.js');
const api = require('./api-calls.js');
const validateConfig = require('./helpers/config-validation');

const requiredProperties = ['baseUrl', 'orgId', 'groupId', 'siteId', 'authToken'];
validateConfig(config, requiredProperties);

const url = `${config.baseUrl}/org/${config.orgId}/groups/${config.groupId}/sites/${config.siteId}/profile/`;
const options = { authToken: config.authToken, debug: true };

api.get(url, options).then((response) => {
    const data = JSON.parse(response.body);
    console.log(data);
});
