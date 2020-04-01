const cookieSession = require("./cookieSession");
const cookieSessionRefresh = require("./cookieSessionRefresh");

// Load environment variables.
require("../../../env");

module.exports = function(handler) {
    cookieSession(cookieSessionRefresh(handler));
};
