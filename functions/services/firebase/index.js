const firebase = require("firebase");
const HttpStatus = require("http-status-codes");
const validator = require("../../utils/validator/");
const logger = require("../../utils/logger");
const { addDebugID } = require("../../utils/error-helper");

firebase.initializeApp({
    apiKey: process.env.FIREBASE_PUBLIC_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    databaseURL: process.env.FIREBASE_DATABASE_URL
});

const firestore = firebase.firestore();
//const realtime = firebase.database();

const generateErrorGenerator = (args) => {
    return (invalidArgs) => {
        const err = new Error(
            `Arguments ${invalidArgs
                .map(({ name }) => name)
                .join(", ")} are invalid`
        );

        err.statusCode = HttpStatus.BAD_REQUEST;
        addDebugID(undefined, err);
        logger.error(err.message, {
            debugId: err.debugId,
            args: { ...args },
            invalidArgs
        });
        throw err;
    };
};

/**
 * Write new teem
 * @param onfleetID OnFleet ID
 * @param zipcode Zip Code
 * @return {Promise<void>}
 */
const writeNewTeam = async (onfleetID, zipcode) => {
    validator.assert({
        args: [{ onfleetID }, { zipcode }],
        validateFn: (arg) => arg && typeof arg === "string",
        errorGeneratorFn: generateErrorGenerator({ onfleetID, zipcode })
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
    validator.assert({
        args: [{ zipcode }],
        validateFn: (arg) => arg && typeof arg === "string",
        errorGeneratorFn: generateErrorGenerator({ zipcode })
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
