module.exports = (config = {}, requiredProperties = []) => {
    const configProperties = Object.keys(config);
    const missingProperty = requiredProperties.find((property) => !configProperties.includes(property));
    
    if (missingProperty) {
        throw Error(`Config Error: Missing Property ${missingProperty}`);
    }
} 