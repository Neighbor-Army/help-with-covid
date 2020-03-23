const logger = require("../../../utils/logger/");
const Onfleet = require("@onfleet/node-onfleet");

const onfleet = new Onfleet(process.env.ONFLEET_KEY);

const createTask = (address, zipcode, person, notes) => {
    return onfleet.tasks.create({
        destination: {
            address: {
                unparsed: address + " " + zipcode
            }
        },
        recipients: [person],
        notes: notes,
        autoAssign: { mode: "distance" }
    });
};

const deleteTask = (id) => {
    return onfleet.tasks.deleteOne(id);
};

const getTask = (id) => {
    return onfleet.tasks.get(id);
};

const updateTask = (id, body) => {
    return onfleet.tasks.update(id, body);
};

const createTeam = async (neighborhoodData) => {
    const name = neighborhoodData.short_name.replace("/", "-");
    const neighborhoodID = neighborhoodData.id;
    const response = await onfleet.teams.create({
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
    return onfleet.workers.create({
        name: name,
        phone: phone,
        teams: [teamId.toString()]
    });
};

module.exports = {
    createTask,
    deleteTask,
    getTask,
    updateTask,
    createTeam,
    createWorker
};
