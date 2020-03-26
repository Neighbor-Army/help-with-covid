const firebase = require("firebase");

firebase.initializeApp({
    apiKey: process.env.FIREBASE_PUBLIC_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    databaseURL: process.env.FIREBASE_DATABASE_URL
});

const firestore = firebase.firestore();
const realtime = firebase.database();

const writeNewTeam = (onfleetID, zipcode) => {
    return firestore.collection("teams").doc(zipcode).set({
        OnFleetID: onfleetID,
        zipcode: zipcode
    });
};

const getTeam = async (zipcode) => {
    const document = await firestore.collection("teams").doc(zipcode).get();
    return document.data();
};

const writeUnsuccessful = (phone, zipcode) => {
    const sZipcode = String(zipcode);
    return firestore.collection(`unsuccessful/byzip/${sZipcode}`).add({
        phone: phone
    });
};

console.log(writeUnsuccessful("4172655212", 19213));

module.exports = {
    writeNewTeam,
    getTeam,
    writeUnsuccessful
};
