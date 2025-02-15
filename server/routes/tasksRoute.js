import { Router } from "express";
const router = Router();
import verifyToken from '../middleware/authMiddleware.js';

import { createTaskController, getTasksController, updateTaskController, deleteTaskController, createToken } from '../controllers/TaskController.js';

/** POST Methods */
/**
 * @swagger
 * '/api/tasks':
 *  post:
 *     tags:
 *     - Tasks Controller
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
router.route("/").post(verifyToken, createTaskController);

/** GET Methods */
/**
 * @swagger
 * '/api/tasks':
 *  get:
 *     tags:
 *     - Tasks Controller
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
router.route("/").get(verifyToken, getTasksController);

/** PUT Methods */
/**
 * @swagger
 * '/api/tasks/{id}':
 *  put:
 *     tags:
 *     - Task Controller
 *     summary: Modify a Task
 *     parameters:
 *      - in: path
 *        name: id
 *        description: The unique Id of the task
 *        required: true
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
 *      200:
 *        description: Modified
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.route("/:id").put(verifyToken, updateTaskController);

/** DELETE Methods */
/**
 * @swagger
 * '/api/tasks/{id}':
 *  delete:
 *     tags:
 *     - Task Controller
 *     summary: Delete task by Id
 *     parameters:
 *      - in: path
 *        name: id
 *        description: The unique Id of the task
 *        required: true
 *     responses:
 *      200:
 *        description: Removed
 *      400:
 *        description: Bad request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.route("/:id").delete(verifyToken, deleteTaskController);

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
router.route("/login").post(createToken);

export default router;
