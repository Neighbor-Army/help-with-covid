const logger = require("../../../utils/logger/");
const Onfleet = require("@onfleet/node-onfleet");

const createTask = (
    address,
    person,
    notes,
    taskCreator = getOnfleetClient().tasks.create
) => {
    if (!address || !person || !notes) {
        throw new Error("Missing required args: address, person and/or notes.");
    }
    return taskCreator({
        destination: { address: address },
        recipients: [person],
        notes: notes,
        autoAssign: { mode: "distance" }
    });
};

const deleteTask = id => {
    return getOnfleetClient().tasks.deleteOne(id);
};

const getTask = id => {
    return getOnfleetClient().tasks.get(id);
};

const updateTask = (id, body) => {
    return getOnfleetClient().tasks.update(id, body);
};

const createTeam = async neighborhoodData => {
    const name = neighborhoodData.short_name.replace("/", "-");
    const neighborhoodID = neighborhoodData.id;
    const response = await getOnfleetClient().teams.create({
        name: neighborhoodID
    });

    const id = response.id;
    const results = {
        onFleetID: id,
        name: name,
        neighborhoodID: neighborhoodID
    };
    return results;
};

const createWorker = async (teamId, name, phone) => {
    logger.debug({ teamId, name, phone });
    return getOnfleetClient().workers.create({
        name: name,
        phone: phone,
        teams: [teamId.toString()]
    });
};

function getOnfleetClient() {
    return new Onfleet(process.env.ONFLEET_KEY);
}

module.exports = {
    createTask,
    deleteTask,
    getTask,
    updateTask,
    createTeam,
    createWorker
};
