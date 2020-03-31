require("jest-extended");
const { addDebugID, createServiceErrorCreator } = require("./index");
const faker = require("faker");

describe("Error Helper", () => {
    describe("#addDebugID", () => {
        const DEBUG_ID_KEY = "debugId";

        it("should be defined", () => {
            expect(addDebugID).toBeDefined();
        });

        it("should be a function", () => {
            expect(addDebugID).toBeFunction();
        });

        it("should set the debug id to both internal error and error based on the genId function that passed", () => {
            const internalError = {};
            const error = {};
            const id = faker.random.uuid();
            const mockIdGen = jest.fn().mockReturnValueOnce(id);

            addDebugID(internalError, error, mockIdGen);

            expect(mockIdGen).toBeCalledTimes(1);
            expect(mockIdGen).toReturnWith(id);

            expect(error).toHaveProperty(DEBUG_ID_KEY, id);
            expect(internalError).toHaveProperty(DEBUG_ID_KEY, id);
        });

        it("should set the debug id to error only when undefined passed based on the genId function that passed", () => {
            const internalError = undefined;
            const error = {};
            const id = faker.random.uuid();
            const mockIdGen = jest.fn().mockReturnValueOnce(id);

            addDebugID(internalError, error, mockIdGen);

            expect(mockIdGen).toBeCalledTimes(1);
            expect(mockIdGen).toReturnWith(id);

            expect(error).toHaveProperty(DEBUG_ID_KEY, id);
            expect(internalError).toBeUndefined();
        });

        it("shouldn't set the debug id if internal already have one", () => {
            const existId = faker.random.uuid();
            const internalError = {
                [DEBUG_ID_KEY]: existId
            };
            const error = {};
            const id = faker.random.uuid();
            const mockIdGen = jest.fn().mockReturnValueOnce(id);

            addDebugID(internalError, error, mockIdGen);

            expect(mockIdGen).toBeCalledTimes(0);

            expect(error).toHaveProperty(DEBUG_ID_KEY, existId);
            expect(internalError).toHaveProperty(DEBUG_ID_KEY, existId);
        });
    });

    describe("#createServiceErrorCreator", () => {
        it("should be defined", () => {
            expect(createServiceErrorCreator).toBeDefined();
        });

        it("should be a function", () => {
            expect(createServiceErrorCreator).toBeFunction();
        });

        it("should return a function", () => {
            const result = createServiceErrorCreator({});
            expect(result).toBeFunction();
        });

        // TODO - test the function behavior
    });
});
