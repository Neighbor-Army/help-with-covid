require("jest-extended");
const { MockFirebaseSdk, MockFirestore } = require("firebase-mock");

function createMockSdk() {
    const mockFirestore = new MockFirestore();
    return new MockFirebaseSdk(
        // use null if your code does not use RTDB
        null,
        // use null if your code does not use AUTHENTICATION
        null,
        // use null if your code does not use FIRESTORE
        () => mockFirestore,
        // use null if your code does not use STORAGE
        null,
        // use null if your code does not use MESSAGING
        null
    );
}

describe("Firebase", () => {
    describe("#writeNewTeam", () => {
        let writeNewTeam;
        let mocksdk;

        beforeEach(() => {
            jest.resetModules();

            mocksdk = createMockSdk();
            jest.mock("firebase", () => mocksdk);

            writeNewTeam = require("./").writeNewTeam;
        });

        afterEach(() => {
            writeNewTeam = undefined;
        });

        it("should write new team when Firestore is empty", async () => {
            let firestoreTeamsData;

            let teamData = { OnFleetID: "<some-fleet-id>", zipcode: "342897" };

            const firestore = mocksdk.firestore();

            // Assert no data been before
            firestoreTeamsData = firestore.collection("teams").data;
            expect(firestoreTeamsData).toBeNull();

            const pr = writeNewTeam(teamData.OnFleetID, teamData.zipcode);

            expect(pr).toResolve();

            // running the waiting tasks (without flush the pr will never resolve)
            firestore.flush();
            await pr;

            // Assert data actually inserted
            firestoreTeamsData = firestore.collection("teams").data;
            expect(firestoreTeamsData).toHaveProperty(
                teamData.zipcode,
                teamData
            );
        });

        it("should write new team when Firestore already data", async () => {
            let firestoreTeamsData;

            let existingTeam = {
                OnFleetID: "<some-fleet-id-1>",
                zipcode: "209345"
            };
            let teamData = {
                OnFleetID: "<some-fleet-id-2>",
                zipcode: "342897"
            };

            const firestore = mocksdk.firestore();

            // Insert existing team
            firestore.collection("teams").data = {
                [existingTeam.zipcode]: existingTeam
            };

            // Assert that the existingTeam is there
            firestoreTeamsData = firestore.collection("teams").data;
            expect(firestoreTeamsData).toHaveProperty(
                existingTeam.zipcode,
                existingTeam
            );

            const pr = writeNewTeam(teamData.OnFleetID, teamData.zipcode);

            expect(pr).toResolve();

            // running the waiting tasks (without flush the pr will never resolve)
            firestore.flush();
            await pr;

            // Assert data actually inserted
            firestoreTeamsData = firestore.collection("teams").data;
            expect(firestoreTeamsData).toHaveProperty(
                teamData.zipcode,
                teamData
            );

            // Assert existing team still there
            expect(firestoreTeamsData).toHaveProperty(
                existingTeam.zipcode,
                existingTeam
            );
        });

        it("should be able to overwrite existing team", async () => {
            let firestoreTeamsData;

            let existingTeam = {
                OnFleetID: "<some-fleet-id-1>",
                zipcode: "209345"
            };
            let teamData = {
                OnFleetID: "<some-fleet-id-2>",
                zipcode: existingTeam.zipcode
            };

            const firestore = mocksdk.firestore();

            // Insert existing team
            firestore.collection("teams").data = {
                [existingTeam.zipcode]: existingTeam
            };

            // Assert that the existingTeam is there
            firestoreTeamsData = firestore.collection("teams").data;
            expect(firestoreTeamsData).toHaveProperty(
                existingTeam.zipcode,
                existingTeam
            );

            const pr = writeNewTeam(teamData.OnFleetID, teamData.zipcode);

            expect(pr).toResolve();

            // running the waiting tasks (without flush the pr will never resolve)
            await firestore.flush();
            await pr;

            // Assert data actually inserted
            firestoreTeamsData = firestore.collection("teams").data;
            expect(firestoreTeamsData).toHaveProperty(
                teamData.zipcode,
                teamData
            );
        });

        describe("Input validation", () => {
            it("should throw an error when passing no args", () => {
                expect(writeNewTeam()).toReject();
            });

            it("should throw an error when passing only 1 argument", () => {
                expect(writeNewTeam("some-value")).toReject();
            });

            it("should throw an error when passing undefined argument", () => {
                expect(writeNewTeam(undefined, undefined)).toReject();
            });

            it("should throw an error when passing object and undefined arguments", () => {
                expect(writeNewTeam({}, undefined)).toReject();
            });
        });
    });

    describe("#getTeam", () => {
        let getTeam;
        let mocksdk;

        beforeEach(() => {
            jest.resetModules();

            mocksdk = createMockSdk();
            jest.mock("firebase", () => mocksdk);

            getTeam = require("./").getTeam;
        });

        afterEach(() => {
            getTeam = undefined;
        });

        it("should get undefined when there is no team", async () => {
            let firestoreTeamsData;

            let zipcode = "342897";

            const firestore = mocksdk.firestore();

            // Assert no data been before
            firestoreTeamsData = firestore.collection("teams").data;
            expect(firestoreTeamsData).toBeNull();

            const pr = getTeam(zipcode);

            expect(pr).toResolve();

            // running the waiting tasks (without flush the pr will never resolve)
            firestore.flush();
            const team = await pr;

            expect(team).toBeNull();
        });

        it("should not get team when Firestore already different team", async () => {
            let firestoreTeamsData;

            let existingTeam = {
                OnFleetID: "<some-fleet-id-1>",
                zipcode: "209345"
            };
            let zipcode = "342897";

            const firestore = mocksdk.firestore();

            // Insert existing team
            firestore.collection("teams").data = {
                [existingTeam.zipcode]: existingTeam
            };

            // Assert that the existingTeam is there
            firestoreTeamsData = firestore.collection("teams").data;
            expect(firestoreTeamsData).toHaveProperty(
                existingTeam.zipcode,
                existingTeam
            );

            const pr = getTeam(zipcode);

            expect(pr).toResolve();

            // running the waiting tasks (without flush the pr will never resolve)
            firestore.flush();
            const team = await pr;

            expect(team).toBeNull();

            // Assert data actually inserted
            firestoreTeamsData = firestore.collection("teams").data;

            // Assert existing team still there
            expect(firestoreTeamsData).toHaveProperty(
                existingTeam.zipcode,
                existingTeam
            );
        });

        it("should be able to get existing team", async () => {
            let firestoreTeamsData;

            let existingTeam = {
                OnFleetID: "<some-fleet-id-1>",
                zipcode: "209345"
            };

            let zipcode = existingTeam.zipcode;

            const firestore = mocksdk.firestore();

            // Insert existing team
            firestore.collection("teams").data = {
                [existingTeam.zipcode]: existingTeam
            };

            // Assert that the existingTeam is there
            firestoreTeamsData = firestore.collection("teams").data;
            expect(firestoreTeamsData).toHaveProperty(
                existingTeam.zipcode,
                existingTeam
            );

            const pr = getTeam(zipcode);

            expect(pr).toResolve();

            // running the waiting tasks (without flush the pr will never resolve)
            await firestore.flush();
            const team = await pr;

            expect(team).toEqual(existingTeam);
        });

        describe("Input validation", () => {
            it("should throw an error when passing no args", async () => {
                expect(getTeam()).toReject();
            });

            it("should throw an error when passing undefined argument", async () => {
                const team = getTeam(undefined);

                expect(team).toReject();
            });

            it("should throw an error when passing object argument", async () => {
                const team = getTeam({});

                expect(team).toReject();
            });
        });
    });
});
