describe("Validator", () => {
    describe("#assert", () => {
        /**
         * @typedef {module:validator.assert}
         */
        let assertFn;

        beforeEach(() => {
            assertFn = require("./").assert;
        });

        afterEach(() => {
            assertFn = undefined;
        });

        it("should be defined", () => {
            expect(assertFn).toBeDefined();
            expect(typeof assertFn).toEqual("function");
        });

        it("should return nothing when args is valid", () => {
            const id = "some-id";
            const name = "some-name";

            expect(() => {
                return assertFn({
                    args: [{ id }, { name }],
                    validateFn: item => Boolean(item)
                });
            }).not.toThrow();
        });

        it("should throw args are invalid", () => {
            const id = undefined;
            const name = "some-name";

            expect(() => {
                return assertFn({
                    args: [{ id }, { name }],
                    validateFn: item => Boolean(item)
                });
            }).toThrow();
        });

        it("should throw custom error when args are invalid", () => {
            const id = undefined;
            const name = "some-name";

            const customError = {
                message: "custom error"
            };

            expect(() => {
                return assertFn({
                    args: [{ id }, { name }],
                    validateFn: item => Boolean(item),
                    errorGeneratorFn: () => customError
                });
            }).toThrow(customError);
        });

        it("should pass only the invalid arguments to errorGeneratorFn when args are invalid", () => {
            const id = undefined;
            const name = "some-name";

            const errorGen = jest.fn(() => new Error("invalidArgs"));

            const args = [{ id }, { name }];
            const invalidArgs = [{ name: "id", value: id }];
            let errorThrown;

            expect(() => {
                try {
                    return assertFn({
                        args,
                        validateFn: item => Boolean(item),
                        errorGeneratorFn: errorGen
                    });
                } catch (e) {
                    errorThrown = e;
                    throw e;
                }
            }).toThrow();

            expect(errorThrown).toEqual(errorGen.mock.results[0].value);

            // assert errorGen fn called only once
            expect(errorGen.mock.calls.length).toBe(1);

            // assert that the number of arguments of the errorGen call are 1
            expect(errorGen.mock.calls[0].length).toBe(1);

            // assert that the argument that the errorGen fn received are the invalid ones only
            expect(errorGen.mock.calls[0][0]).toEqual(invalidArgs);
        });
    });
});
