const faker = require("faker");

describe("SendgridService", () => {
    const originalEnvs = { ...process.env };

    beforeEach(() => {
        process.env.SENDGRID_API_KEY = faker.random.uuid();
        jest.resetModules();
    });

    afterEach(() => {
        jest.clearAllMocks();
        process.env = { ...originalEnvs };
    });

    describe("addEmailToList", () => {
        let fakeResponse = [
            {
                status: faker.random.number()
            }
        ];

        let mockedSendgridClient = {
            setApiKey: jest.fn(),
            request: jest.fn().mockResolvedValueOnce(fakeResponse)
        };

        let addEmailToList;
        beforeEach(() => {
            jest.mock("@sendgrid/client", () => mockedSendgridClient);

            addEmailToList = require("./").addEmailToList;
        });

        it("adds the provided email to the list provided. Returns the response via a promise", async () => {
            const fakeEmail = faker.internet.email();
            const fakeListID = faker.random.number();

            await expect(addEmailToList(fakeEmail, fakeListID)).resolves.toBe(
                fakeResponse[0]
            );

            // Sendgrid client get initialized with the process.env variable
            expect(mockedSendgridClient.setApiKey).toHaveBeenCalledWith(
                process.env.SENDGRID_API_KEY
            );
            expect(mockedSendgridClient.setApiKey).toHaveBeenCalledTimes(1);

            expect(mockedSendgridClient.request).toHaveBeenCalledWith({
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
            expect(mockedSendgridClient.request).toHaveBeenCalledTimes(1);
        });
    });
});
