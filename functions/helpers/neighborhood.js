const axios = require("axios").default;
const getNeighborhood = async address => {
    const randEmail =
        Math.random()
            .toString(36)
            .substring(2, 15) +
        "@" +
        Date.now() +
        ".com";
    return axios
        .post("https://nextdoor.com/ajax/account/validate/", {
            address: {
                street_address: address.streetAddress,
                unit: address.unit,
                city: address.city,
                state: address.state,
                zip_code: address.zipcode,
                residence_id: null
            },
            email_address: randEmail
        })
        .catch(function(error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        })
        .then(function(response) {
            return response.data.context.neighborhood;
        });
};

module.exports = {
    getNeighborhood
};
