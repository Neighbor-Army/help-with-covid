const logger = require("../utils/logger");
const express = require("express");

//const neighborhoodService = require("../services/neighborhood");
const onFleetService = require("../services/onfleet");
const firebaseService = require("../services/firebase");
const sendgridService = require("../services/sendgrid");

const router = express.Router({ mergeParams: true });

router.get("/task/:id", async function(req, res, next) {
    try {
        const result = await onFleetService.getTask(req.params.id);
        res.json(result);
    } catch (e) {
        next(e);
    }
});

router.post("/task", async function(req, res, next) {
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
        res.json(results);
    } catch (error) {
        next(error);
    }
});

router.patch("/task/:id", async function(req, res, next) {
    try {
        const results = await onFleetService.updateTask(
            req.params.id,
            req.body
        );
        res.json(results);
    } catch (e) {
        next(e);
    }
});

router.delete("/task/:id", async function(req, res, next) {
    try {
        const results = await onFleetService.deleteTask(req.params.id);
        res.json(results);
    } catch (e) {
        next(e);
    }
});

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

router.post("/team", async function(req, res, next) {
    const zipcode = req.body.zipcode;
    try {
        const results = await onFleetService.createTeam(zipcode);
        await firebaseService.writeNewTeam(results.onFleetID, zipcode);
        res.status(200).json(results);
    } catch (error) {
        next(error);
    }
});

router.get("/team/:id", async function(req, res, next) {
    const team = await firebaseService.getTeam(req.params.id);

    if (!team) {
        return next(new Error("Team doesn't exist!"));
    }

    return res.json(team);
});

router.post("/worker", async function(req, res, next) {
    const { phone, name, zipcode } = req.body;
    logger.debug({ phone, name, zipcode });
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
            req.body.email,
            process.env.SENDGRID_VOLUNTEERS_LIST_ID
        );
        res.status(200).json(results);
    } catch (error) {
        next(error);
    }
});

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

router.post("/voicemail", async function (req, res, next) {
    logger.debug(req.body.phone);
    logger.debug(req.body.url);
    try {
        await firebaseService.writeVoicemail(req.body.phone, req.body.url);
        res.status(200).send();
    } catch (error) {
        next(error);
    }
});
*/
module.exports = router;
