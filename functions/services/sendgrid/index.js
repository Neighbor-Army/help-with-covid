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

    const sendgridClient = getSendgridClient();
    const [response] = await sendgridClient.request(request);
    return response;
};

function getSendgridClient() {
  const client = require("@sendgrid/client");
  client.setApiKey(process.env.SENDGRID_API_KEY);

  return client;
}

module.exports = {
    addEmailToList
};
