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

/**
 * Create Error generator for service
 * @param {object} config Options
 * @param {string} config.serviceName The service name
 * @param {function(e: Error | any): number} config.getStatusCodeFromError Function for getting the status code from error
 * @param {string} [config.defaultErrorMsg=`There was an error with the ${serviceName} service`] config.defaultErrorMsg Default error message
 * @return {function(e: Error | any, errorMsg: string = defaultErrorMsg): Error} The error generator for that
 */
const createServiceErrorCreator = (config) => {
    let { serviceName, getStatusCodeFromError, defaultErrorMsg } = config;
    defaultErrorMsg =
        defaultErrorMsg || `There was an error with the ${serviceName} service`;
    return (e, errorMsg = defaultErrorMsg) => {
        const err = new Error(errorMsg);

        err.statusCode = getStatusCodeFromError(e);

        // If the error is user fault he should get all the data that may help for solving the error
        if (400 <= err.statusCode && err.statusCode <= 499) {
            err.internalError = e;
        }

        addDebugID(e, err);
        return err;
    };
};

module.exports = {
    addDebugID,
    createServiceErrorCreator
};
