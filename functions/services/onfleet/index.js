const logger = require("../../utils/logger");
const Onfleet = require("@onfleet/node-onfleet");
const HttpStatus = require("http-status-codes");
const {
    createServiceErrorCreator,
    addDebugID
} = require("../../utils/error-helper");

/**
 * The Onfleet API Documentation
 * @see https://docs.onfleet.com/reference The Onfleet API Documentation
 */

/**
 * Error name to HTTP status code
 */
const errorNamesToHttpCode = {
    /**
     * TODO - Need to orchestrate our request rate for avoid getting into the rate limit
     * @see https://docs.onfleet.com/reference#section-throttling
     */
    RateLimitError: HttpStatus.INTERNAL_SERVER_ERROR,
    PermissionError: HttpStatus.INTERNAL_SERVER_ERROR,
    ServiceError: HttpStatus.INTERNAL_SERVER_ERROR
};

/**
 * Get the rightmost HTTP status code based on the Onfleet error
 * @param {ServiceError | RateLimitError | HttpError | PermissionError | ValidationError} error
 * @return {number} HTTP status code for that provided error
 * @see https://gist.github.com/euskode/8a34b2152cb35ddeb659 Onfleet API Errors
 */
const onFleetErrorCodeToHttpErrorCodeConverter = (error) => {
    const { status: errorCode, name } = error;

    if (name in errorNamesToHttpCode) {
        return errorNamesToHttpCode[name];
    }

    return errorCode === HttpStatus.BAD_REQUEST
        ? errorCode
        : HttpStatus.INTERNAL_SERVER_ERROR;
};

const createError = createServiceErrorCreator({
    serviceName: "Onfleet",
    getStatusCodeFromError: (e) => onFleetErrorCodeToHttpErrorCodeConverter(e)
});

const createTask = async (address, zipcode, person, notes, onfleetTeamId) => {
    if (!address || !zipcode || !person || !notes) {
        const err = new Error(
            "Missing required args: address, person and/or notes."
        );
        err.statusCode = HttpStatus.BAD_REQUEST;
        addDebugID(undefined, err);
        logger.error(err.message, {
            debugId: err.debugId,
            args: { address, zipcode, person, notes, onfleetTeamId }
        });
        throw err;
    }

    let task;

    try {
        task = await getOnfleetClient().tasks.create({
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
    } catch (e) {
        const err = createError(e);
        logger.error("Failed when trying to create task with Onfleet", {
            debugId: err.debugId,
            internalError: e,
            args: { address, zipcode, person, notes, onfleetTeamId }
        });
        throw err;
    }

    try {
        await getOnfleetClient().tasks.autoAssign({
            tasks: [task.id],
            options: {
                mode: "load",
                teams: [onfleetTeamId],
                considerDependencies: true
            }
        });
    } catch (e) {
        const err = createError(e);
        logger.error("Failed when trying to auto assign task with Onfleet", {
            debugId: err.debugId,
            internalError: e,
            args: { address, zipcode, person, notes, onfleetTeamId },
            task
        });
        throw err;
    }

    return task;
};

const deleteTask = (id) => {
    return getOnfleetClient()
        .tasks.deleteOne(id)
        .catch((e) => {
            const err = createError(e);
            logger.error("Failed when trying to delete task with Onfleet", {
                debugId: err.debugId,
                internalError: e,
                args: { id }
            });
            throw err;
        });
};

const getTask = (id) => {
    return getOnfleetClient()
        .tasks.get(id)
        .catch((e) => {
            const err = createError(e);
            logger.error("Failed when trying to get task with Onfleet", {
                debugId: err.debugId,
                internalError: e,
                args: { id }
            });
            throw err;
        });
};

const updateTask = (id, body) => {
    return getOnfleetClient()
        .tasks.update(id, body)
        .catch((e) => {
            const err = createError(e);
            logger.error("Failed when trying to update task with Onfleet", {
                debugId: err.debugId,
                internalError: e,
                args: { id, body }
            });
            throw err;
        });
};

const createTeam = async (zipcode) => {
    let response;

    try {
        response = await getOnfleetClient().teams.create({
            name: zipcode
        });
    } catch (e) {
        const err = createError(e);
        logger.error("Failed when trying to create team with Onfleet", {
            debugId: err.debugId,
            internalError: e,
            args: { zipcode }
        });
        throw err;
    }

    const id = response.id;
    return {
        onFleetID: id,
        name: zipcode
    };
};

const createWorker = async (teamId, name, phone) => {
    logger.debug({ teamId, name, phone });
    return getOnfleetClient()
        .workers.create({
            name: name,
            phone: phone,
            teams: [teamId.toString()]
        })
        .catch((e) => {
            const err = createError(e);
            logger.error("Failed when trying to create worker with Onfleet", {
                debugId: err.debugId,
                internalError: e,
                args: { teamId, name, phone }
            });
            throw err;
        });
};

function getOnfleetClient() {
    // TODO - after creating for the first time we should return the same instance instead of recreating it
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
