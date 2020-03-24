const { createTask, deleteTask } = require("./index");

// Mock out the node-onfleet library
jest.mock("@onfleet/node-onfleet");
const Onfleet = require("@onfleet/node-onfleet");

describe("OnFleetService", () => {
    // Define a fakeOnfleetClient that can be
    // used to modify the behavior of OnFleet
    let fakeOnfleetClient;

    beforeAll(() => {
        process.env = {
            ONFLEET_KEY: "fake-onfleet-key"
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
        let fakeApiResponse;
        beforeAll(() => {
            fakeApiResponse = { status: "fake-response" };
            fakeOnfleetClient = {
                tasks: {
                    create: jest.fn().mockResolvedValueOnce(fakeApiResponse)
                }
            };
        });

        it("given valid parameters it will call onfleet to create a task with the correct payload and return the response", async () => {
            const fakeAddress = "5909 Parkhaven Ln";
            const fakeZip = "65810";
            const fakePerson = {
                name: "joe ",
                phone: "+14133333333"
            };
            const fakeNotes = "notes";
            const fakeTeamId = "abc132813823";

            const response = await createTask(
                fakeAddress,
                fakeZip,
                fakePerson,
                fakeNotes,
                fakeTeamId
            );

            expect(response).toBe(fakeApiResponse);

            // Ensure that create tasks was called with the
            // correct payload
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
                },
                autoAssign: { mode: "load" }
            });
            expect(fakeOnfleetClient.tasks.create).toHaveBeenCalledTimes(1);
        });

        it("throws an Error if any required args are ommitted", async () => {
            const argError = new Error(
                "Missing required args: address, person and/or notes."
            );
            expect(() => {
                createTask();
            }).toThrow(argError);

            expect(() => {
                createTask("address");
            }).toThrow(argError);

            expect(() => {
                createTask("address", "person");
            }).toThrow(argError);
        });
    });

    describe("deleteTask", () => {
        let fakeApiResponse;
        beforeAll(() => {
            fakeApiResponse = { status: "fake-response" };
            fakeOnfleetClient = {
                tasks: {
                    deleteOne: jest.fn().mockResolvedValueOnce(fakeApiResponse)
                }
            };
        });

        it("calls the deleteOne on onfleet tasks using the id provided and return the response", async () => {
            const taskId = 5;

            const response = await deleteTask(taskId);
            expect(response).toBe(fakeApiResponse);

            expect(fakeOnfleetClient.tasks.deleteOne).toHaveBeenCalledWith(
                taskId
            );
            expect(fakeOnfleetClient.tasks.deleteOne).toHaveBeenCalledTimes(1);
        });
    });
});
