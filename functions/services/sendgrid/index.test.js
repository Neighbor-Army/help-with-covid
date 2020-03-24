const { addEmailToList } = require("./index");

const faker = require("faker");

jest.mock("@sendgrid/client");
const client = require("@sendgrid/client");

describe('SendgridService', () => {
  beforeAll(() => {
    process.env = {
      SENDGRID_API_KEY: faker.random.uuid()
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  describe('addEmailToList', () => {
    let fakeResponse = [{
      status: faker.random.number()
    }]
    beforeEach(() => {
      client.request = jest.fn().mockResolvedValueOnce(fakeResponse)
    })

    it('blim', async () => {
      const fakeEmail = faker.internet.email();
      const fakeListID = faker.random.number();

      const response = await addEmailToList(fakeEmail, fakeListID)
      expect(response).toBe(fakeResponse[0]);

      // Sendgrid client get initialized with the process.env variable
      expect(client.setApiKey).toHaveBeenCalledWith(process.env.SENDGRID_API_KEY)
      expect(client.setApiKey).toHaveBeenCalledTimes(1)

      expect(client.request).toHaveBeenCalledWith({
        method: "PUT",
        url: "/v3/marketing/contacts",
        body: {
          list_ids: [fakeListID],
          contacts: [
            {
              email: fakeEmail
            }
          ]
        }
      })
      expect(client.request).toHaveBeenCalledTimes(1)
    })
  })
})


