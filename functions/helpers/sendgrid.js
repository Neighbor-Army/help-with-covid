const client = require("@sendgrid/client");
client.setApiKey(process.env.SENDGRID_API_KEY);

const addEmailToList = async email => {
    const request = {
        method: "PUT",
        url: "/v3/marketing/contacts",
        body: {
            contacts: [
                {
                    email: email
                }
            ]
        }
    };
    return client.request(request).then(([response]) => {
        return response;
    });
};

module.exports = {
    addEmailToList
};
