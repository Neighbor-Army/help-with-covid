const logger = require("../utils/logger");
const express = require("express");
const onFleetService = require("../services/onfleet");
const firebaseService = require("../services/firebase");
const sendgridService = require("../services/sendgrid");
const twilioService = require("../services/twilio");
const router = express.Router({ mergeParams: true });
const verifyIdToken = require("../../src/utils/auth/firebaseAdmin");
const firebase = require("firebase");
var admin = require("firebase-admin");
var serviceAccountKey = require("./serviceAccountKey.json");

if (serviceAccountKey) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccountKey),
        databaseURL: "https://neighbor-army.firebaseio.com"
    });
} else {
    throw "You didn't provide a service account key.";
}

router.post("/login/createToken", async function (req, res, next) {
    try {
        let uid = "james-test-id";

        return admin
            .auth()
            .createCustomToken(uid)
            .then(function (customToken) {
                console.log(
                    "Your customToken was successfully retrieved",
                    customToken
                );
                // Send token back to client
            })
            .catch(function (error) {
                console.log("Error creating custom token:", error);
            });
    } catch (e) {
        next(e);
    }
});

router.get("/login/createUser", async function (req, res, next) {
    try {
        const email = "hjhart+onemore@gmail.com";
        const password = "buttsbutts";
        await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(function (userObject) {
                userObject;
            });
        firebase
            .auth()
            .currentUser.getIdToken(/* forceRefresh */ true)
            .then(function (idToken) {
                console.log("Your idToken was successfully retrieved", idToken);
                // Send token to your backend via HTTPS
                // ...
            })
            .catch(function (error) {
                // Handle error
                console.log("Your idToken error", error);
            });
    } catch (e) {
        next(e);
    }
});

router.post("/api/login", async function (req, res, next) {
    try {
        if (!req.body) {
            return res.status(400);
        }

        const { token } = req.body;
        console.log("The token is ", token);

        // Here, we decode the user's Firebase token and store it in a cookie. Use
        // express-session (or similar) to store the session data server-side.
        // An alternative approach is to use Firebase's `createSessionCookie`. See:
        // https://firebase.google.com/docs/auth/admin/manage-cookies
        // Firebase docs:
        //   "This is a low overhead operation. The public certificates are initially
        //    queried and cached until they expire. Session cookie verification can be
        //    done with the cached public certificates without any additional network
        //    requests."
        // However, in a serverless environment, we shouldn't rely on caching, so
        // it's possible Firebase's `verifySessionCookie` will make frequent network
        // requests in a serverless context.
        return verifyIdToken(token, admin)
            .then((decodedToken) => {
                console.log("Request session:", req.session);
                // req.session.decodedToken = decodedToken;
                // req.session.token = token;
                return decodedToken;
            })
            .then((decodedToken) => {
                return res.status(200).json({ status: true, decodedToken });
            })
            .catch((error) => {
                return res.status(500).json({ error });
            });
    } catch (e) {
        next(e);
    }
});

router.get("/task/:id", async function (req, res, next) {
    try {
        const result = await onFleetService.getTask(req.params.id);
        res.json(result);
    } catch (e) {
        next(e);
    }
});

router.post("/task", async function (req, res, next) {
    const { address, zipcode, person, notes } = req.body;
    try {
        logger.debug({ address, zipcode, person, notes });
        const teamData = await firebaseService.getTeam(zipcode);
        let onfleetTeamId = "";

        if (!teamData) {
            res.status(500).send("Area not serviced");

            // Return here to avoid trying to resend which will throw an error
            return;
        }
        onfleetTeamId = teamData.OnFleetID;

        logger.debug({ onfleetTeamId });

        const results = await onFleetService.createTask(
            req.body.address,
            req.body.zipcode,
            req.body.person,
            req.body.notes,
            onfleetTeamId
        );
        return res.json(results);
    } catch (error) {
        next(error);
    }
});

router.patch("/task/:id", async function (req, res) {
    const results = await onFleetService.updateTask(req.params.id, req.body);
    return res.json(results);
});

router.delete("/task/:id", async function (req, res) {
    const results = await onFleetService.deleteTask(req.params.id);
    return res.json(results);
});

router.post("/team", async function (req, res, next) {
    const zipcode = String(req.body.zipcode);
    try {
        const results = await onFleetService.createTeam(zipcode);
        await firebaseService.writeNewTeam(results.onFleetID, zipcode);
        return res.status(200).json(results);
    } catch (error) {
        next(error);
    }
});

router.get("/team", async function (req, res, next) {
    const zipcode = String(req.query.zipcode);
    logger.debug(zipcode);
    const team = await firebaseService.getTeam(zipcode);

    if (!team) {
        return next(new Error("Team doesn't exist!"));
    }

    return res.status(200).json(team);
});

router.post("/unsuccessful", async function (req, res, next) {
    const { phone, zipcode } = req.body;
    try {
        firebaseService.writeUnsuccessful(phone, zipcode);
        res.sendStatus(200);
    } catch (error) {
        next(error);
    }
});

router.post("/worker", async function (req, res, next) {
    const { phone, name, zipcode, email } = req.body;
    logger.debug({ phone, name, zipcode, email });
    try {
        const teamData = await firebaseService.getTeam(zipcode);
        let onfleetTeamId = "";

        // If team doesn't exist in firebase, it must not exist anywhere
        // thus we create it.
        if (!teamData) {
            const results = await onFleetService.createTeam(zipcode);
            await firebaseService.writeNewTeam(results.onFleetID, zipcode);
            onfleetTeamId = results.onFleetID;
        } else {
            onfleetTeamId = teamData.OnFleetID;
        }

        const results = await onFleetService.createWorker(
            onfleetTeamId,
            name,
            phone
        );

        await sendgridService.addEmailToList(
            email,
            process.env.SENDGRID_VOLUNTEERS_LIST_ID
        );
        res.status(200).json(results);
    } catch (error) {
        next(error);
    }
});

router.post("/twimlNumber", async function (req, res) {
    const { Caller } = req.body;
    const phone = Caller.substring(2);

    res.writeHead(200, { "Content-Type": "text/xml" });
    //const resp = `<?xml version="1.0" encoding="UTF-8"?><Response><Say>Is<say-as interpret-as="digits">${phone}</say-as>the best number we can reach you at?</Say><Redirect>https://webhooks.twilio.com/v1/Accounts/ACb228c71773482b13000655101442e779/Flows/FWf23aac20d25b198078c9b6c98957da34?FlowEvent=return</Redirect></Response>`;
    const resp = twilioService.generateTwiML(
        "Is",
        phone,
        "the best number we can reach you at?",
        process.env.TWILIO_STUDIO_RETURN_URL
    );
    return res.end(resp.toString());
});

router.get("/twimlZipcode", async function (req, res) {
    const { zipcode } = req.query;
    res.writeHead(200, { "Content-Type": "text/xml" });
    //const resp = `<?xml version="1.0" encoding="UTF-8"?><Response><Say>Is<say-as interpret-as="digits">${zipcode}</say-as>your zipcode?</Say><Redirect>https://webhooks.twilio.com/v1/Accounts/ACb228c71773482b13000655101442e779/Flows/FWf23aac20d25b198078c9b6c98957da34?FlowEvent=return</Redirect></Response>`;
    const resp = twilioService.generateTwiML(
        "Is",
        zipcode,
        "Your zipcode?",
        process.env.TWILIO_STUDIO_RETURN_URL
    );
    return res.end(resp.toString());
});

module.exports = router;

/*
router.post("/neighborhood", async function (req, res, next) {
    const address = req.body.address;
    const neighborhoodData = await neighborhoodService.getNeighborhood({
        streetAddress: address.number + " " + address.street,
        unit: address.apartment,
        city: address.city,
        state: address.state,
        zipcode: address.postalCode
    });
    //also create the neighborhood while we are at it if it doesn't exist
    const doesExist = firebaseService.getTeam(neighborhoodData.id.toString());
    if (!doesExist.data) {
        try {
            const results = await onFleetService.createTeam(neighborhoodData);

            await firebaseService.writeNewTeam(
                results.name,
                results.onFleetID,
                results.neighborhoodID
            );
        } catch (error) {
            next(error);
        }
    }
    return res.json(neighborhoodData);
});
*/

/*
router.post("/email", async function (req, res, next) {
    logger.debug(req.body.email);
    try {
        const result = await sendgridService.addEmailToList(
            req.body.email,
            process.env.SENDGRID_MARKETING_LIST_ID
        );
        res.status(result.statusCode).send();
    } catch (error) {
        next(error);
    }
});
*/

/*
router.post("/transcribe", async function (req, res, next) {
    const { url, zipcode } = req.body;
    try {
        //await firebaseService.writeVoicemail(req.body.phone, req.body.url);
        googleCloudService.speechToText(url, async (transcribedAddress) => {
            transcribedAddress = transcribedAddress + ", " + zipcode;
            const autocorrectedAddress = await googleCloudService.geocode(
                transcribedAddress
            );
            if (autocorrectedAddress) {
                return res
                    .status(200)
                    .send(
                        "https://05ff1c0c.ngrok.io/neighbor-army/us-central1/widgets/twimlMessage?address=" +
                            encodeURI(autocorrectedAddress)
                    );
            }
            throw "Repeat";
        });
    } catch (error) {
        next(error);
    }
});
*/
