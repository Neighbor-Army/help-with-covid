require("dotenv").config();
const functions = require("firebase-functions");
const express = require("express"); // call express
const cors = require("cors");
const app = express(); // define our app using express
const bodyParser = require("body-parser");
const neighborhood = require("./helpers/neighborhood");
const onfleet = require("./helpers/onfleet");
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: true }));
// ROUTES FOR OUR API
// =============================================================================

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
  const result = await onfleet.getTask(req.param.id);
  res.json(result);
});

app.post("/task", async function(req, res) {
  const address = req.body.address;
  const neighborhoodName = await neighborhood.getNeighborhood({
    streetAddress: address.number + " " + address.street,
    unit: address.apartment,
    city: address.city,
    state: address.state,
    zipcode: address.postalCode
  });
  console.log(neighborhoodName);
  const results = await onfleet.createTask(
    req.body.address,
    req.body.person,
    req.body.notes
  );
  res.json(results);
});

app.patch("/task/:id", async function(req, res) {
  const results = await onfleet.updateTask(req.params.id, req.query.body);
  res.json(results);
});

app.delete("/task/:id", async function(req, res) {
  const results = onfleet.deleteTask(req.param.id);
  res.json(results);
});

// more routes for our API will happen here
exports.widgets = functions.https.onRequest(app);
