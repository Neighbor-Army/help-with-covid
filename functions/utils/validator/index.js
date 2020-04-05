const defaultErrorGeneratorFn = (invalidArgs) =>
    new Error(
        `${invalidArgs.map((arg) => `'${arg.name}'`).join(" and ")} are invalid`
    );

/**
 * Error Generator Function
 * @callback errorGeneratorFnCallback
 * @function
 * @param {{name: string, value: any}[]} invalidArgs Invalid Arguments
 */

/**
 *
 * @param {Object} assertIn
 * @param {object[]} assertIn.args arguments to validate (each item must be 1 key-value pair)
 * @param {(name: string, value: any) => boolean} assertIn.validateFn validation function
 * @param {errorGeneratorFnCallback} assertIn.errorGeneratorFn Error generator function to throw
 * @throws {any | Error} when argument isn't valid
 *
 * @name module:validator#assert
 *
 * @example Usage example
 * const id = undefined;
 * const grade = undefined
 * assert({
 *     args: [{id}, {grade}],
 *     validateFn: (name, item) => item !== undefined
 * }
 *
 * // The thrown error gonna be
 * {
 *     "message": "'id' and 'grade' are invalid"
 * }
 */
const assert = (assertIn) => {
    const invalidArgs = assertIn.args
        // Convert to name value object
        .map((arg) => {
            const entries = Object.entries(arg);
            return {
                name: entries[0][0],
                value: entries[0][1]
            };
        })

        // Get only invalid argument
        .filter(({ value }) => !assertIn.validateFn(value));

    if (invalidArgs.length === 0) {
        return;
    }

    assertIn.errorGeneratorFn =
        assertIn.errorGeneratorFn || defaultErrorGeneratorFn;

    throw assertIn.errorGeneratorFn(invalidArgs);
};

/**
 * @module validator
 */
module.exports = {
    assert
};
