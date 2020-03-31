const { generateUID } = require("../general");

/**
 * Generate debugId to be able to search in the logs for all errors for the specific response
 * @param internalError The thrown error
 * @param newError The new error that about to throw
 * @param {function(): string} [idGen=generateUID] idGen ID Generator (The default is {@link generateUID})
 */
const addDebugID = (internalError, newError, idGen = generateUID) => {
    internalError = internalError || {};
    internalError.debugId = internalError.debugId || idGen();
    newError.debugId = internalError.debugId;
};

module.exports = {
    addDebugID
};
