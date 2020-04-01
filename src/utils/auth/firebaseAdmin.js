// import * as admin from "firebase-admin";

function verifyIdToken(token, admin) {
    const firebasePrivateKey = process.env.FIREBASE_PRIVATE_KEY;

    if (!admin.apps.length) {
        console.log("Initializing admin app");
        // admin.initializeApp({
        //     credential: admin.credential.cert(serviceAccount),
        //     databaseURL: "https://neighbor-army.firebaseio.com"
        // });

        // admin.initializeApp({
        //     credential: admin.credential.cert({
        //         projectId: process.env.FIREBASE_PROJECT_ID,
        //         clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        //         // https://stackoverflow.com/a/41044630/1332513
        //         privateKey: firebasePrivateKey.replace(/\\n/g, "\n")
        //     }),
        //     databaseURL: process.env.FIREBASE_DATABASE_URL
        // });
        console.log("Finished initializing app");
    }

    return admin
        .auth()
        .verifyIdToken(token)
        .then(decodedToken => {
            console.log("Finished verifying token", decodedToken);
        })
        .catch(error => {
            console.log("Error!", error);
            throw error;
        });
}

module.exports = verifyIdToken;
