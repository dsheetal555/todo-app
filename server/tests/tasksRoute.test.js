const route = require("./../routes/tasksRoute");

describe("tasksRoute", () => {
    test("should return a function", () => {
        expect(typeof route).toBe("function");
    });
});
