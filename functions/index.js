require("dotenv").config();
const functions = require("firebase-functions");
const express = require("express"); // call express
const cors = require("cors");
const app = express(); // define our app using express
const bodyParser = require("body-parser");
const neighborhood = require("./helpers/neighborhood");
const task = require("./helpers/onfleet/task");
const Onfleet = require("@onfleet/node-onfleet");
const onfleet = new Onfleet(process.env.ONFLEET_KEY);
const firebase = require("./helpers/firebase");
const sendgrid = require("./helpers/sendgrid");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: true }));

/*
address: {
	unit: "apt 122",
	number: "123",
	street: "wentz st",
	city: "Springfield",
	state: "illinois",
	postalCode: "65521"
}

person: {
	name: "joe bill",
	phone: "+14133333333"
}

*/

app.get("/", async function(req, res) {
    res.json({ message: "hooray! welcome to our api!" });
});

app.get("/task/:id", async function(req, res) {
    const result = await task.getTask(req.param.id);
    res.json(result);
});

app.post("/task", async function(req, res, next) {
    const address = req.body.address;
    try {
        const neighborhoodName = await neighborhood.getNeighborhood({
            streetAddress: address.number + " " + address.street,
            unit: address.apartment,
            city: address.city,
            state: address.state,
            zipcode: address.postalCode
        });
        console.log(neighborhoodName);
        const results = await task.createTask(
            req.body.address,
            req.body.person,
            req.body.notes
        );
        res.json(results);
    } catch (error) {
        next(error);
    }
});

app.patch("/task/:id", async function(req, res) {
    const results = await task.updateTask(req.params.id, req.query.body);
    res.json(results);
});

app.delete("/task/:id", async function(req, res) {
    const results = task.deleteTask(req.param.id);
    res.json(results);
});

app.post("/team", async function(req, res) {
    const address = req.body.address;
    const neighborhoodData = await neighborhood.getNeighborhood({
        streetAddress: address.number + " " + address.street,
        unit: address.apartment,
        city: address.city,
        state: address.state,
        zipcode: address.postalCode
    });
    console.log(neighborhoodData);
    const name = neighborhoodData.short_name.replace("/", "-");
    const neighborhoodID = neighborhoodData.id;
    onfleet.teams
        .create({
            name: neighborhoodID
        })
        .catch(function() {
            res.status(409).send("Team already exists");
        })
        .then(function(response) {
            const id = response.id;
            firebase.writeNewTeam(name, id, neighborhoodID);
            res.status(200).json({
                onFleetID: id,
                name: name,
                neighborhoodID: neighborhoodID
            });
        });
});

app.post("/email", async function(req, res) {
    console.log(req.body.email);
    const result = await sendgrid.addEmailToList(req.body.email);
    res.status(result.statusCode).send();
});

// app.get("/team", async function(req, res) {});

app.use((err, req, res) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || "Something went wrong call Mikis 318-929-0221"
    });
});

// more routes for our API will happen here
exports.widgets = functions.https.onRequest(app);
