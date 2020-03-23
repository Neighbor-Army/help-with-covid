require("dotenv").config();
const { createTask } = require("./index");

describe("OnFleetService#createTask", () => {
    let mockTaskCreator;
    let fakeAddress;
    let fakePerson;
    let fakeNotes;

    beforeEach(() => {
        mockTaskCreator = jest.fn().mockName("mockTaskCreator");
        fakeAddress = {
            apartment: "",
            state: "Missouri",
            postalCode: "65810",
            country: "United States",
            city: "Springfield",
            street: "Parkhaven Ln",
            number: "5904",
            unparsed: "5904 Parkhaven Ln, Springfield, MO 65810"
        };
        fakePerson = {
            name: "joe ",
            phone: "+14133333333"
        };
        fakeNotes = "notes";
    });

    afterEach(() => {
        mockTaskCreator = null;
        fakeAddress = null;
        fakePerson = null;
        fakeNotes = null;
    });

    it("is called with correct arguments", async () => {
        await createTask(fakeAddress, fakePerson, fakeNotes, mockTaskCreator);

        expect(mockTaskCreator.mock.calls.length).toBe(1);

        const arg1 = mockTaskCreator.mock.calls[0][0];
        expect(arg1.destination.address).toEqual(fakeAddress);

        expect(arg1.recipients.length).toBe(1);
        expect(arg1.recipients[0]).toEqual(fakePerson);

        expect(arg1.notes).toBe(fakeNotes);

        expect(arg1.autoAssign).toEqual({ mode: "distance" });
    });

    it("throws an Error if any required args are ommitted", () => {
        expect(() => {
            createTask();
        }).toThrow();

        expect(() => {
            createTask("address");
        }).toThrow();

        expect(() => {
            createTask("address", "person");
        }).toThrow();
    });
});
