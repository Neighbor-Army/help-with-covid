require("dotenv").config();
const functions = require("firebase-functions");
const express = require("express"); // call express
const cors = require("cors");
const app = express(); // define our app using express
const bodyParser = require("body-parser");
const Onfleet = require("@onfleet/node-onfleet");
const onfleet = new Onfleet(process.env.ONFLEET_KEY);

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: true }));
// ROUTES FOR OUR API
// =============================================================================
app.get("/", function(req, res) {
  res.json({ message: "hooray! welcome to our api!" });
});

//this endpoint uses the shortID to identify query for packages
//not the long id
app.get("/task/:id", async function(req, res) {
  const result = await onfleet.tasks.get(req.params.id, "shortId");
  res.json(result);
});

app.post("/task", async function(req, res) {
  const results = await onfleet.tasks.create({
    destination: {
      address: { unparsed: req.body.address }
    },
    recipients: [
      {
        name: req.body.name,
        phone: req.body.phone
      }
    ],
    notes: req.body.notes,
    autoAssign: { mode: "distance" }
  });
  res.json(results);
});

// more routes for our API will happen here
exports.widgets = functions.https.onRequest(app);
