const { createTask, deleteTask } = require("./index");

// Introduce the faker library to generate random
// data for tests. This makes the appeared reliance
// on 'hardcoded' values less. This covers cases
// in which the input influences a pass or fail of
// tests
//
// You can refer to available functions here:
// https://cdn.rawgit.com/Marak/faker.js/master/examples/browser/index.html
const faker = require('faker');

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
      let fakeResponse = {status: 'fake-status-code'}

      beforeAll(() => {
        fakeOnfleetClient = {
          tasks: {
            create: jest.fn().mockResolvedValueOnce(fakeResponse)
          }
        };
      });

      it("given valid parameters it will call onfleet to create a task with the correct payload and return a promise", async () => {
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
      let fakeResponse = {status: 'fake-status-code'}

      beforeAll(() => {
        fakeOnfleetClient = {
          tasks: {
            deleteOne: jest.fn().mockResolvedValueOnce(fakeResponse)
          }
        };
      });

      it("calls the deleteOne on onfleet tasks using the id provided and returns a promise", async () => {
        const taskId = faker.random.number();

        const response = await deleteTask(taskId);
        expect(response).toBe(fakeResponse);

        expect(fakeOnfleetClient.tasks.deleteOne).toHaveBeenCalledWith(
          taskId
        );
        expect(fakeOnfleetClient.tasks.deleteOne).toHaveBeenCalledTimes(1);
      });
    });
});
