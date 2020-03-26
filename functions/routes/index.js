const logger = require("../utils/logger");
const express = require("express");
const onFleetService = require("../services/onfleet");
const firebaseService = require("../services/firebase");
const sendgridService = require("../services/sendgrid");
const twilioService = require("../services/twilio");
const router = express.Router({ mergeParams: true });

router.get("/task/:id", async function (req, res) {
    const result = await onFleetService.getTask(req.params.id);
    res.json(result);
});

router.post("/task", async function (req, res, next) {
    const { address, zipcode, person, notes } = req.body;
    try {
        logger.debug({ address, zipcode, person, notes });
        const teamData = await firebaseService.getTeam(zipcode);
        let onfleetTeamId = "";

        if (!teamData) {
            res.status(500).send("Area not serviced");
            return;
        }
        onfleetTeamId = teamData.OnFleetID;

        onfleetTeamId = teamData.OnFleetID;

        logger.debug(onfleetTeamId);

        const results = await onFleetService.createTask(
            address,
            zipcode,
            person,
            notes,
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
    console.log(zipcode);
    const team = await firebaseService.getTeam(zipcode);

    if (!team) {
        return next(new Error("Team doesn't exist!"));
    }

    return res.sendStatus(200);
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
    logger.debug(phone);
    logger.debug(name);
    logger.debug(zipcode);
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
