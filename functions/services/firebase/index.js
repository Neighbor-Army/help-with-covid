const firebase = require("firebase");
const Validator = require("../../utils/validator/");

firebase.initializeApp({
    apiKey: process.env.FIREBASE_PUBLIC_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    databaseURL: process.env.FIREBASE_DATABASE_URL
});

const firestore = firebase.firestore();
//const realtime = firebase.database();

/**
 * Write new teem
 * @param onfleetID OnFleet ID
 * @param zipcode Zip Code
 * @return {Promise<void>}
 */
const writeNewTeam = async (onfleetID, zipcode) => {
    Validator.assert({
        args: [{ onfleetID }, { zipcode }],
        validateFn: (arg) => arg && typeof arg === "string"
    });

    return firestore.collection("teams").doc(zipcode).set({
        OnFleetID: onfleetID,
        zipcode: zipcode
    });
};

/**
 *
 * @param zipcode
 * @return {Promise<DocumentData>}
 */
const getTeam = async (zipcode) => {
    Validator.assert({
        args: [{ zipcode }],
        validateFn: (arg) => arg && typeof arg === "string"
    });

    const document = await firestore.collection("teams").doc(zipcode).get();
    return document.data();
};

const writeUnsuccessful = (phone, zipcode) => {
    const sZipcode = String(zipcode);
    return firestore.collection(`unsuccessful/byzip/${sZipcode}`).add({
        phone: phone
    });
};

module.exports = {
    writeNewTeam,
    getTeam,
    writeUnsuccessful
};
