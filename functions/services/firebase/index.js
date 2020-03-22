const firebase = require("firebase");

firebase.initializeApp({
    apiKey: process.env.FIREBASE_PUBLIC_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID
});

const db = firebase.firestore();

const writeNewTeam = (name, onfleetID, neighborhoodID) => {
    return db.collection("teams").doc(neighborhoodID.toString()).set({
        neighborhoodID: neighborhoodID,
        name: name,
        OnFleetID: onfleetID
    });
};

const getTeam = async (id) => {
    const document = await db.collection("teams").doc(id).get();
    return document.data();
};

module.exports = {
    writeNewTeam,
    getTeam
};
