require("dotenv").config();
const { createTask } = require("./index");

describe("OnFleetService#createTask", () => {
    let mockTaskCreator;
    let fakeAddress;
    let fakePerson;
    let fakeNotes;
    let fakeZip;
    let fakeTeamId;
    beforeEach(() => {
        mockTaskCreator = jest.fn().mockName("mockTaskCreator");
        fakeAddress = "5909 Parkhaven Ln";
        fakeZip = "65810";
        fakePerson = {
            name: "joe ",
            phone: "+14133333333"
        };
        fakeNotes = "notes";
        fakeTeamId = "abc132813823";
    });

    afterEach(() => {
        mockTaskCreator = null;
        fakeAddress = null;
        fakePerson = null;
        fakeNotes = null;
        fakeZip = null;
        fakeTeamId = null;
    });

    it("is called with correct arguments", async () => {
        await createTask(
            fakeAddress,
            fakeZip,
            fakePerson,
            fakeNotes,
            fakeTeamId,
            mockTaskCreator
        );

        expect(mockTaskCreator.mock.calls.length).toBe(1);

        const arg1 = mockTaskCreator.mock.calls[0][0];
        expect(arg1.destination.address.unparsed).toEqual(
            fakeAddress + " " + fakeZip
        );

        expect(arg1.recipients.length).toBe(1);
        expect(arg1.recipients[0]).toEqual(fakePerson);

        expect(arg1.notes).toBe(fakeNotes);

        //expect(arg1.autoAssign).toEqual({ mode: "distance" });
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
