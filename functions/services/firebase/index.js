const firebase = require("firebase");
const { get } = require("geofirex");
const geo = require("geofirex").init(firebase);
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
//const realtime = firebase.datziabase();

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

const miToKm = (mi) => {
    return mi * 1.60934;
};

// TODO go a geocode call to google places to turn address into latitude longitude
const getNearbyZipcodes = async (zipcode, radius) => {
    const zipcodes = firestore.collection("zipcodes");
    let zipRef = zipcodes.doc(String(zipcode));
    let zipDoc = await zipRef.get();
    let coords = zipDoc.data().position.geopoint;
    const center = geo.point(coords.latitude, coords.longitude);
    const km = miToKm(radius);
    const field = "position";
    const query = geo.query(zipcodes).within(center, km, field);
    const hits = await get(query);
    return hits.map((item) => item.id);
};

const zipToOnfleetIds = async (zipcodes) => {
    // eslint-disable-next-line no-undef
    const ids = await Promise.all(
        zipcodes.map(async (zipcode) => {
            const res = await getTeam(zipcode);
            if (res) {
                return res.OnFleetID;
            }
        })
    );
    return ids.filter((e) => e != null);
};

module.exports = {
    writeNewTeam,
    getTeam,
    writeUnsuccessful,
    getNearbyZipcodes,
    zipToOnfleetIds
};
