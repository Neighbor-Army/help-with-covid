const client = require("@sendgrid/client");

client.setApiKey(process.env.SENDGRID_API_KEY);

const addEmailToList = async (email, listId) => {
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

    const [response] = await client.request(request);
    return response;
};

module.exports = {
    addEmailToList
};
