import route from "./../routes/tasksRoute.js";

describe("tasksRoute", () => {
    test("should return a function", () => {
        expect(typeof route).toBe("function");
    });
});
