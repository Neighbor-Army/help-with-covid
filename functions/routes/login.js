const commonMiddleware = require("../../src/utils/middleware/commonMiddleware");

const handler = async (req, res, next) => {};

module.exports = () => commonMiddleware(handler);
