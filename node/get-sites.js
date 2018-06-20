const config = require('../config/api-call.config.js');
const api = require('./api-calls.js');
const validateConfig = require('./helpers/config-validation');

const requiredProperties = ['baseUrl', 'orgId', 'groupId', 'authToken'];
validateConfig(config, requiredProperties);

const url = `${config.baseUrl}/org/${config.orgId}/groups/${config.groupId}/sites/`;
const options = { authToken: config.authToken, debug: true };

//env flags
const findCondition = process.env.npm_config_findCondition || null;
const displayAll = process.env.npm_config_displayAll || null;

api.get(url, options).then((response) => {
    const data = JSON.parse(response.body).data;
    if (displayAll) {
        console.log(data);
    }
    if (findCondition){
        console.log(data.filter(new Function('site', `return ${process.env.npm_config_findCondition}`)));
    }
});
