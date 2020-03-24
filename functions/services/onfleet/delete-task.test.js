const { deleteTask } = require("./index");

// Mock out the node-onfleet library
jest.mock("@onfleet/node-onfleet");
const Onfleet = require("@onfleet/node-onfleet");

describe("OnFleetService#deleteTask", () => {
    const fakeOnfleetKey = "fake-key";

    const fakeApiResponse = { fake: "response" };
    const fakeOnfleetClient = {
        tasks: {
            deleteOne: jest.fn().mockResolvedValue(fakeApiResponse)
        }
    };

    beforeEach(() => {
        process.env = {
            ONFLEET_KEY: fakeOnfleetKey
        };

        // Mock the implementation of the constructor of Onfleet
        Onfleet.mockImplementation(() => {
            return fakeOnfleetClient;
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should trigger deleteOne on tasks using the id provided and return the response", async () => {
        const taskId = 5;

        const response = await deleteTask(taskId);
        expect(response).toBe(fakeApiResponse);

        // Ensure that the Onfleet client was constructed using
        // the fake key from process.env.ONFLEET_KEY
        expect(Onfleet.mock.calls[0][0]).toBe(fakeOnfleetKey);

        // Check that the deleteOne used the taskId provided.
        expect(fakeOnfleetClient.tasks.deleteOne.mock.calls[0][0]).toBe(taskId);
    });
});
