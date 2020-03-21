const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");
firebase.initializeApp({
    apiKey: process.env.FIREBASE_PUBLIC_API_KEY,
    authDomain: "http://neighbor-army.firebaseapp.com/",
    projectId: "neighbor-army"
});
var db = firebase.firestore();
const writeNewTeam = async (name, onfleetID, neighborhoodID) => {
    db.collection("teams")
        .doc(neighborhoodID.toString())
        .set({
            neighborhoodID: neighborhoodID,
            name: name,
            OnFleetID: onfleetID
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
};

module.exports = {
    writeNewTeam
};
