const request = require('request');
const defaultOptions = { authToken: "" };
const getDefaultHeaders = (options) => ({
    "Accept": "application/json",
    "x-auth-token": options.authToken
});

const api = {
    get: (url, options) => makeApiRequest("get", url, options)
};

module.exports = api;


function makeApiRequest(method, url, callOptions, callback) {
    const options = Object.assign({}, defaultOptions, callOptions);
    const defaultHeaders = getDefaultHeaders(options);
    const headers = Object.assign({}, defaultHeaders, options.headers);

    return new Promise((resolve, reject) => {
        request(
            { url, headers, method },
            (error, response, body) => {
                if (options.debug) {
                    debugger;
                }
                
                if (error || !isStatusCodeOkayish(response.statusCode)){
                    console.error(error, body);
                    reject({ error, response });
                } else {
                    resolve({response, body});
                }
            }
        ); 
     });
}

// i know this is bad, I don't care
function isStatusCodeOkayish(statusCode) {
    const okayishCodesStartWith = ['2', '3'];
    const statusCodeStartsWith = String(statusCode).slice(0, 1);
    return okayishCodesStartWith.includes(statusCodeStartsWith);
}