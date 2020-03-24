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

            expect(errorGen).toReturnTimes(1);
            expect(errorGen).toReturnWith(errorThrown);

            expect(errorGen).toBeCalledTimes(1);
            expect(errorGen).toBeCalledWith(invalidArgs);
        });
    });
});
