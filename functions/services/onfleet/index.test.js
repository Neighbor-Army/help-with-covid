const {
    createTask,
    deleteTask,
    getTask,
    updateTask,
    createTeam,
    createWorker
} = require("./index");

// Introduce the faker library to generate random
// data for tests. This makes the appeared reliance
// on 'hardcoded' values less. This covers cases
// in which the input influences a pass or fail of
// tests
//
// You can refer to available functions here:
// https://cdn.rawgit.com/Marak/faker.js/master/examples/browser/index.html
const faker = require("faker");

// Mock out the logger library
jest.mock("../../utils/logger");
const logger = require("../../utils/logger");

// Mock out the node-onfleet library
jest.mock("@onfleet/node-onfleet");
const Onfleet = require("@onfleet/node-onfleet");

describe("OnFleetService", () => {
    // Define a fakeOnfleetClient that can be
    // used to modify the behavior of OnFleet
    let fakeOnfleetClient;

    beforeAll(() => {
        process.env = {
            ONFLEET_KEY: faker.random.uuid()
        };

        Onfleet.mockImplementation(() => {
            // You can change the behavior of this by
            // overriding the definition of `fakeOnfleetClient`.
            return fakeOnfleetClient;
        });
    });

    afterEach(() => {
        // Make sure after every block that we clearup the mocks
        // so it doesn't interfere with any other tests.
        jest.clearAllMocks();
    });

    describe("createTask", () => {
        let fakeResponse = {
            status: faker.random.number()
        };

        beforeAll(() => {
            fakeOnfleetClient = {
                tasks: {
                    create: jest.fn().mockResolvedValueOnce(fakeResponse),
                    autoAssign: jest.fn().mockResolvedValueOnce(fakeResponse)
                }
            };
        });

        it("creates a onfleet task with the correct payload. Returns the response via a promise", async () => {
            const fakeAddress = faker.address.streetAddress();
            const fakeZip = faker.address.zipCode();
            const fakePerson = {
                name: faker.name.findName(),
                phone: faker.phone.phoneNumber()
            };
            const fakeNotes = faker.lorem.text();
            const fakeTeamId = faker.random.number();

            const response = await createTask(
                fakeAddress,
                fakeZip,
                fakePerson,
                fakeNotes,
                fakeTeamId
            );

            expect(response).toBe(fakeResponse);

            // Ensure that create tasks was called with the correct payload
            expect(fakeOnfleetClient.tasks.create).toHaveBeenCalledWith({
                destination: {
                    address: {
                        unparsed: fakeAddress + " " + fakeZip
                    }
                },
                recipients: [fakePerson],
                notes: fakeNotes,
                container: {
                    type: "TEAM",
                    team: fakeTeamId
                }
            });
            expect(fakeOnfleetClient.tasks.create).toHaveBeenCalledTimes(1);
        });

        it("throws an Error if missing args", async () => {
            await expect(createTask()).rejects.toThrow(
                expect.objectContaining({ statusCode: 400 })
            );
            await expect(createTask("address")).rejects.toThrow(
                expect.objectContaining({ statusCode: 400 })
            );
            await expect(createTask("address", "person")).rejects.toThrow(
                expect.objectContaining({ statusCode: 400 })
            );
        });
    });

    describe("deleteTask", () => {
        let fakeResponse = {
            status: faker.random.number()
        };

        beforeAll(() => {
            fakeOnfleetClient = {
                tasks: {
                    deleteOne: jest.fn().mockResolvedValueOnce(fakeResponse)
                }
            };
        });

        it("deletes a onfleet task using the id provided. Returns the response via a promise", async () => {
            const taskId = faker.random.number();

            const response = await deleteTask(taskId);
            expect(response).toBe(fakeResponse);

            expect(fakeOnfleetClient.tasks.deleteOne).toHaveBeenCalledWith(
                taskId
            );
            expect(fakeOnfleetClient.tasks.deleteOne).toHaveBeenCalledTimes(1);
        });
    });

    describe("getTask", () => {
        let fakeResponse = {
            status: faker.random.number()
        };

        beforeAll(() => {
            fakeOnfleetClient = {
                tasks: {
                    get: jest.fn().mockResolvedValueOnce(fakeResponse)
                }
            };
        });

        it("gets a onfleet task using the id provided. Returns the response via a promise", async () => {
            const taskId = faker.random.number();

            const response = await getTask(taskId);
            expect(response).toBe(fakeResponse);

            expect(fakeOnfleetClient.tasks.get).toHaveBeenCalledWith(taskId);
            expect(fakeOnfleetClient.tasks.get).toHaveBeenCalledTimes(1);
        });
    });

    describe("updateTask", () => {
        let fakeResponse = {
            status: faker.random.number()
        };

        beforeAll(() => {
            fakeOnfleetClient = {
                tasks: {
                    update: jest.fn().mockResolvedValueOnce(fakeResponse)
                }
            };
        });

        it("updates a onfleet task using the id and body provided. Returns the response via a promise", async () => {
            const taskId = faker.random.number();
            const fakeBody = { fakeData: faker.random.word() };

            const response = await updateTask(taskId, fakeBody);
            expect(response).toBe(fakeResponse);

            expect(fakeOnfleetClient.tasks.update).toHaveBeenCalledWith(
                taskId,
                fakeBody
            );
            expect(fakeOnfleetClient.tasks.update).toHaveBeenCalledTimes(1);
        });
    });

    describe("createTeam", () => {
        let fakeResponse = {
            id: faker.random.number()
        };

        beforeAll(() => {
            fakeOnfleetClient = {
                teams: {
                    create: jest.fn().mockResolvedValueOnce(fakeResponse)
                }
            };
        });

        it("creates a onfleet team using the zipcode provided. Returns the created team's id and name (zipcode)", async () => {
            const fakeZipCode = faker.address.zipCode();

            const results = await createTeam(fakeZipCode);
            expect(results).toStrictEqual({
                onFleetID: fakeResponse.id,
                name: fakeZipCode
            });

            expect(fakeOnfleetClient.teams.create).toHaveBeenCalledWith({
                name: fakeZipCode
            });
            expect(fakeOnfleetClient.teams.create).toHaveBeenCalledTimes(1);
        });
    });

    describe("createWorker", () => {
        let fakeResponse = {
            status: faker.random.number()
        };

        beforeAll(() => {
            fakeOnfleetClient = {
                workers: {
                    create: jest.fn().mockResolvedValueOnce(fakeResponse)
                }
            };
        });

        it("creates a onfleet worker using the parameters provided. Returns the response via a promise", async () => {
            const fakeTeamID = faker.random.number();
            const fakeName = faker.name.findName();
            const fakePhone = faker.phone.phoneNumber();

            const response = await createWorker(
                fakeTeamID,
                fakeName,
                fakePhone
            );
            expect(response).toBe(fakeResponse);

            // Check that the logging is functional
            expect(logger.debug).toHaveBeenCalledWith({
                teamId: fakeTeamID,
                name: fakeName,
                phone: fakePhone
            });
            expect(logger.debug).toHaveBeenCalledTimes(1);

            expect(fakeOnfleetClient.workers.create).toHaveBeenCalledWith({
                name: fakeName,
                phone: fakePhone,
                teams: [fakeTeamID.toString()]
            });

            expect(fakeOnfleetClient.workers.create).toHaveBeenCalledTimes(1);
        });
    });
});
