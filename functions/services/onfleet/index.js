const logger = require("../../../utils/logger/");
const Onfleet = require("@onfleet/node-onfleet");

const onfleet = new Onfleet(process.env.ONFLEET_KEY);

const createTask = (
    address,
    zipcode,
    person,
    notes,
    taskCreator = onfleet.tasks.create
) => {
    if (!address || !person || !notes) {
        throw new Error("Missing required args: address, person and/or notes.");
    }
    return taskCreator({
        destination: {
            address: {
                unparsed: address + " " + zipcode
            }
        },
        recipients: [person],
        notes: notes,
        container: {
            type: "TEAM",
            worker: zipcode
        }
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

const createTeam = async (zipcode) => {
    const response = await onfleet.teams.create({
        name: zipcode
    });

    const id = response.id;
    const results = {
        onFleetID: id,
        name: zipcode
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
