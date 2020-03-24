const { addEmailToList } = require("./index");

const faker = require("faker");

jest.mock("@sendgrid/client");
const client = require("@sendgrid/client");

describe("SendgridService", () => {
    const originalEnvs = {...(process.env)};
    beforeEach(() => {
      process.env = {
        SENDGRID_API_KEY: faker.random.uuid()
      };
    });

    afterEach(() => {
      jest.clearAllMocks();
      process.env = {...originalEnvs}
    });

    describe("addEmailToList", () => {
        let fakeResponse = [
            {
                status: faker.random.number()
            }
        ];
        beforeEach(() => {
            client.request = jest.fn().mockResolvedValueOnce(fakeResponse);
        });

        it("adds the provided email to the list provided. Returns the response via a promise", async () => {
            const fakeEmail = faker.internet.email();
            const fakeListID = faker.random.number();

            expect(addEmailToList(fakeEmail, fakeListID)).resolves.toBe(fakeResponse[0])

            // Sendgrid client get initialized with the process.env variable
            expect(client.setApiKey).toHaveBeenCalledWith(
                process.env.SENDGRID_API_KEY
            );
            expect(client.setApiKey).toHaveBeenCalledTimes(1);

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
            });
            expect(client.request).toHaveBeenCalledTimes(1);
        });
    });
});
