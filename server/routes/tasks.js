const Task = require("../models/task");
const express = require("express");
const router = express.Router();

/** POST Methods */
/**
 * @openapi
 * '/api/tasks':
 *  post:
 *     tags:
 *     - User Controller
 *     summary: Create a new todo task
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - task
 *              - description
 *              - status
 *            properties:
 *              task:
 *                type: string
 *                default: task1 
 *              description:
 *                type: string
 *                default: task1 description
 *              status:
 *                type: string
 *                default: pending
 *     responses:
 *      201:
 *        description: Created
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.post("/", async (req, res) => {
    try {
        const task = await new Task(req.body).save();
        res.send(task);
    } catch (error) {
        res.send(error);
    }
});

/** GET Methods */
/**
 * @openapi
 * '/api/tasks':
 *  get:
 *     tags:
 *     - User Controller
 *     summary: Get all todo tasks
 *     responses:
 *      200:
 *        description: Fetched Successfully
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.get("/", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.send(tasks);
    } catch (error) {
        res.send(error);
    }
});

router.put("/:id", async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id },
            req.body
        );
        res.send(task);
    } catch (error) {
        res.send(error);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        res.send(task);
    } catch (error) {
        res.send(error);
    }
});

module.exports = router;
