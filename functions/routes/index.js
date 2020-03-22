const express = require("express");

const neighborhoodService = require("../services/neighborhood");
const onFleetService = require("../services/onfleet");
const firebaseService = require("../services/firebase");
const sendgridService = require("../services/sendgrid");

const router = express.Router({ mergeParams: true });

router.get("/task/:id", async function (req, res) {
    const result = await onFleetService.getTask(req.params.id);
    res.json(result);
});

router.post("/task", async function (req, res, next) {
    const address = req.body.address;
    try {
        const neighborhoodName = await neighborhoodService.getNeighborhood({
            streetAddress: address.number + " " + address.street,
            unit: address.apartment,
            city: address.city,
            state: address.state,
            zipcode: address.postalCode
        });
        console.log(neighborhoodName);
        const results = await onFleetService.createTask(
            req.body.address,
            req.body.person,
            req.body.notes
        );
        res.json(results);
    } catch (error) {
        next(error);
    }
});

router.patch("/task/:id", async function (req, res) {
    const results = await onFleetService.updateTask(req.params.id, req.body);
    res.json(results);
});

router.delete("/task/:id", async function (req, res) {
    const results = await onFleetService.deleteTask(req.params.id);
    res.json(results);
});

router.post("/neighborhood", async function (req, res) {
    const address = req.body.address;
    const neighborhoodData = await neighborhoodService.getNeighborhood({
        streetAddress: address.number + " " + address.street,
        unit: address.apartment,
        city: address.city,
        state: address.state,
        zipcode: address.postalCode
    });
    return res.json(neighborhoodData);
});

router.post("/team", async function (req, res, next) {
    const address = req.body.address;
    const neighborhoodData = await neighborhoodService.getNeighborhood({
        streetAddress: address.number + " " + address.street,
        unit: address.apartment,
        city: address.city,
        state: address.state,
        zipcode: address.postalCode
    });
    try {
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

router.get("/team/:id", async function (req, res, next) {
    const team = await firebaseService.getTeam(req.params.id);

    if (!team) {
        return next(new Error("Team doesn't exist!"));
    }

    return res.json(team);
});

router.post("/worker", async function (req, res, next) {
    const phone = req.body.phone;
    const name = req.body.name;
    const neighborhoodId = req.body.neighborhoodID;
    const neighborhoodData = await firebaseService.getTeam(neighborhoodId);
    const onfleetTeamId = neighborhoodData.OnFleetID;
    try {
        const results = await onFleetService.createWorker(
            onfleetTeamId,
            name,
            phone
        );
        await sendgridService.addEmailToList(req.body.email);
        res.status(200).json(results);
    } catch (error) {
        next(error);
    }
});

router.post("/email", async function (req, res) {
    console.log(req.body.email);
    const result = await sendgridService.addEmailToList(req.body.email);
    res.status(result.statusCode).send();
});
module.exports = router;
