const privacy = require("privacy-api");
let privacy_api = new privacy(process.env.PRIVACY_API_KEY, true, 1); // Initialize the privacy object with your API key

class PrivacyCard {
    constructor(cardToken) {
        this.cardToken = cardToken;
    }

    async getCardDetails() {
        return await privacy_api.list_cards(
            null,
            null,
            null,
            null,
            this.cardToken
        );
    }

    async setCardLimit(amount) {
        return await privacy_api.update_card(
            this.cardToken,
            amount,
            "Transaction"
        );
    }
}

const listCards = async () => {
    console.log(await privacy_api.list_cards());
};

module.exports = {
    listCards,
    PrivacyCard
};
//listCards();
