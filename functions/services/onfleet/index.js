const logger = require("../../utils/logger");
const Onfleet = require("@onfleet/node-onfleet");

const createTask = async (address, zipcode, person, notes, onfleetTeamId) => {
    if (!address || !zipcode || !person || !notes) {
        throw new Error("Missing required args: address, person and/or notes.");
    }
    const task = await getOnfleetClient().tasks.create({
        destination: {
            address: {
                unparsed: address + " " + zipcode
            }
        },
        recipients: [person],
        notes: notes,
        container: {
            type: "TEAM",
            team: onfleetTeamId
        }
    });
    await getOnfleetClient().tasks.autoAssign({
        tasks: [task.id],
        options: {
            mode: "load",
            teams: [onfleetTeamId],
            considerDependencies: true
        }
    });
    return task;
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

const createTeam = async zipcode => {
    const response = await getOnfleetClient().teams.create({
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
