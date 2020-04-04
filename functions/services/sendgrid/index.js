const client = require("@sendgrid/client");
const HttpStatus = require("http-status-codes");
const logger = require("../../utils/logger");
const { createServiceErrorCreator } = require("../../utils/error-helper");

/**
 * The SendGrid API Documentation
 * @see https://sendgrid.api-docs.io/v3.0/ The SendGrid API Documentation
 */

client.setApiKey(process.env.SENDGRID_API_KEY);

const createError = createServiceErrorCreator({
    serviceName: "SendGrid",
    getStatusCodeFromError: (e) => {
        let status = e.code || HttpStatus.INTERNAL_SERVER_ERROR;

        if (status === HttpStatus.UNAUTHORIZED) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return status;
    }
});

/**
 *
 * @param email
 * @param listId
 * @return {Promise<>}
 */
const addEmailToList = async (email, listId) => {
    /**
     * @see https://sendgrid.api-docs.io/v3.0/contacts/add-or-update-a-contact The Docs for the function request
     */
    const request = {
        method: "PUT",
        url: "/v3/marketing/contacts",
        body: {
            list_ids: [listId],
            contacts: [
                {
                    email: email
                }
            ]
        }
    };

    let response;
    try {
        [response] = await client.request(request);
    } catch (e) {
        const err = createError(e);
        logger.error("Failed when trying to add email to list with SendGrid", {
            debugId: err.debugId,
            internalError: e,
            args: { email, listId },
            request
        });
        throw err;
    }

    return response;
};

module.exports = {
    addEmailToList
};
