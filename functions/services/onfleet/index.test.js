const { deleteTask } = require("./index");

// Mock out the node-onfleet library
jest.mock("@onfleet/node-onfleet");
const Onfleet = require("@onfleet/node-onfleet");


describe('OnFleetService', () => {
  // Define a fakeOnfleetClient that can be
  // used to modify the behavior of OnFleet
  let fakeOnfleetClient;

  beforeAll(() => {
    process.env = {
      ONFLEET_KEY: 'fake-onfleet-key'
    }

    Onfleet.mockImplementation(() => {
      // You can change the behavior of this by
      // overriding the definition of `fakeOnfleetClient`.
      return fakeOnfleetClient;
    });
  })

  afterEach(() => {
    // Make sure after every block that we clearup the mocks
    // so it doesn't interfere with any other tests.
    jest.clearAllMocks();
  })

  describe('deleteTask', () => {
    let fakeApiResponse;
    beforeAll(() => {
      fakeApiResponse = {status: 'fake-response'}
      fakeOnfleetClient = {
        tasks: {
          deleteOne: jest.fn().mockResolvedValue(fakeApiResponse)
        }
      };
    })

    it("calls the deleteOne on onfleet tasks using the id provided and return the response", async () => {
      const taskId = 5;

      const response = await deleteTask(taskId);
      expect(response).toBe(fakeApiResponse);

      // Ensure that the Onfleet client was constructed using
      // the fake key from process.env.ONFLEET_KEY
      expect(Onfleet.mock.calls[0][0]).toBe(process.env.ONFLEET_KEY);

      // Check that the deleteOne used the taskId provided.
      expect(fakeOnfleetClient.tasks.deleteOne.mock.calls[0][0]).toBe(taskId);
    });
  })
})

