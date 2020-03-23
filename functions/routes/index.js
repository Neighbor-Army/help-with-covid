const logger = require("../../utils/logger/");
const express = require("express");

const neighborhoodService = require("../services/neighborhood");
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
    const { address, person, notes } = req.body;
    try {
        const results = await onFleetService.createTask(address, person, notes);
        res.json(results);
    } catch (error) {
        next(error);
    }
});

router.patch("/task/:id", async function(req, res, next) {
    try {
        const results = await onFleetService.updateTask(req.params.id, req.body);
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
function isNeighborhoodExit(neighborhoodData) {
    return firebaseService.getTeam(neighborhoodData.id.toString());
}

async function createNeighborhood(neighborhoodData) {
    const results = await onFleetService.createTeam(neighborhoodData);

    return firebaseService.writeNewTeam(
        results.name,
        results.onFleetID,
        results.neighborhoodID
    );
}

router.post("/neighborhood", async function(req, res, next) {
    const address = req.body.address;

    let neighborhoodData;
    try {
        neighborhoodData = await neighborhoodService.getNeighborhood(parseAddress(address));
    } catch (e) {
        return next(e);
    }

    //also create the neighborhood while we are at it if it doesn't exist
    if (!await isNeighborhoodExit(neighborhoodData).catch(() => false)) {
        try {
            await createNeighborhood(neighborhoodData);
        } catch (error) {
            return next(error);
        }
    }

    return res.json(neighborhoodData);
});

function parseAddress(address) {
    return {
        streetAddress: address.number + " " + address.street,
        unit: address.apartment,
        city: address.city,
        state: address.state,
        zipcode: address.postalCode
    };
}

router.post("/team", async function(req, res, next) {
    const address = req.body.address;
    try {
        const neighborhoodData = await neighborhoodService.getNeighborhood(parseAddress(address));
        const results = await onFleetService.createTeam(neighborhoodData);

        await firebaseService.writeNewTeam(
            results.name,
            results.onFleetID,
            results.neighborhoodID
        );
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
    const {phone, name, neighborhoodID} = req.body;

    try {
        const neighborhoodData = await firebaseService.getTeam(neighborhoodID);
        const onfleetTeamId = neighborhoodData.OnFleetID;
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

router.post("/email", async function(req, res, next) {
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
module.exports = router;
