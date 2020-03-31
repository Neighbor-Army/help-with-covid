const uuid = require("uuid").v4;

/**
 * Generate Unique ID
 * @return {string} Unique ID
 */
const generateUID = () => {
    return uuid();
};

module.exports = {
    generateUID
};
