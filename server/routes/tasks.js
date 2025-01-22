const Task = require("../models/task");
const express = require("express");
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const jwt = require('jsonwebtoken');

/** POST Methods */
/**
 * @swagger
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
router.post("/", verifyToken, async (req, res) => {
    try {
        const task = await new Task(req.body).save();
        res.send(task);
    } catch (error) {
        res.send(error);
    }
});

/** GET Methods */
/**
 * @swagger
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
router.get("/", verifyToken, async (req, res) => {
    try {
        const tasks = await Task.find();
        res.send(tasks);
    } catch (error) {
        res.send(error);
    }
});

router.put("/:id", verifyToken, async (req, res) => {
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

router.delete("/:id", verifyToken, async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        res.send(task);
    } catch (error) {
        res.send(error);
    }
});

/** POST Methods */
/**
 * @swagger
 * '/api/tasks/login':
 *  post:
 *     tags:
 *     - login Controller
 *     summary: create a new token
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - userId
 *              - application
 *            properties:
 *              userId:
 *                type: string
 *                default: 12 
 *              application:
 *                type: string
 *                default: todoApp
 *     responses:
 *      201:
 *        description: Created Token
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.post("/login", async (req, res) => {
    try {
        const secretkey = "da30e0c0eafbadba9389c0883c6537acc7ba17e188a53f49e8dcf6bb914c1fcb"
        const token = jwt.sign(req.body, secretkey);
        console.log(token);
        res.send({ token });
    } catch (error) {
        res.send(error);
    }
});

module.exports = router;
