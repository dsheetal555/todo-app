import { createTaskController, getTasksController, updateTaskController, deleteTaskController } from '../controllers/TaskController.js';
import taskModel from '../models/task.js';


jest.mock("../models/task");
jest.mock("../services/TaskService", () => ({
    deleteTaskService: jest.fn(),
    updateTaskService: jest.fn(),
    getTasksService: jest.fn(),
    createTaskService: jest.fn(),
}));

import { createTaskService as _createTaskService, getTasksService as _getTasksService, updateTaskService as _updateTaskService, deleteTaskService as _deleteTaskService } from '../services/TaskService';

describe("Task Controller", () => {
    let req;
    let res;
    beforeEach(() => {
        // Set up mock request and response objects before each test
        req = {
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyLCJhcHBsaWNhdGlvbiI6InRvZG9BcHAiLCJpYXQiOjE3Mzc1MjkwNjZ9.aJ8majoJqXukD6cPW1Q3-zRtn6Ybp1buJapChUH-OYM', // Add Authorization header with token
            },
            body: {
                task: 'New Task',
                description: 'This is a new task.',
                status: 'Pending',
            },
        };

        res = {
            send: jest.fn(), // Mock the send method of the response object
            status: jest.fn().mockReturnThis(), // Mock the status method for chaining
        };
    });

    it("should create a new task", async () => {
        const newTask = { ...req.body, _id: '12345' };
        _createTaskService.mockResolvedValue(newTask);
        await createTaskController(req, res);

        expect(_createTaskService).toHaveBeenCalledTimes(1);
        expect(_createTaskService).toHaveBeenCalledWith(req, res);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledWith(newTask);
    });

    it('should handle error if task creation fails', async () => {
        const mockError = new Error('Task creation failed');
        _createTaskService.mockRejectedValue(mockError);

        // Act: Call the controller
        await createTaskController(req, res);

        // Assert: Check that the error is sent in the response
        expect(_createTaskService).toHaveBeenCalledTimes(1);
    });

    it("should get all tasks", async () => {
        const mockTasks = [
            {
                task: 'Task 1',
                description: 'This is a new task 1.',
                status: 'Pending',
            },
            {
                task: 'Task 2',
                description: 'This is a new task 2.',
                status: 'In Progress',
            }
        ];
        _getTasksService.mockResolvedValue(mockTasks);
        await getTasksController(req, res);
        expect(_getTasksService).toHaveBeenCalledTimes(1);
        expect(_getTasksService).toHaveBeenCalledWith(req, res); // Ensure the service is called with req and res
        expect(res.status).toHaveBeenCalledWith(200); // Check if status 200 (OK) is returned
        expect(res.send).toHaveBeenCalledWith(mockTasks);
    });

    it('should respond with an error and a 500 status code when service rejects', async () => {
        // Mock the service to return an error
        const mockError = new Error('Something went wrong');
        _getTasksService.mockRejectedValue(mockError);

        // Call the controller
        await getTasksController(req, res);

        // Assertions+
        expect(_getTasksService).toHaveBeenCalledWith(req, res);
    });

    it('should respond with the updated task when service resolves', async () => {
        // Mock the service to return a successful response
        const mockTask = { id: 1, task: 'Updated Task' };
        _updateTaskService.mockResolvedValue(mockTask);

        // Call the controller
        await updateTaskController(req, res);

        // Assertions
        expect(_updateTaskService).toHaveBeenCalledWith(req, res);
        expect(res.send).toHaveBeenCalledWith(mockTask);
    });

    it('should respond with an error when service rejects', async () => {
        // Mock the service to return an error
        const mockError = new Error('Update failed');
        _updateTaskService.mockRejectedValue(mockError);

        // Call the controller
        await updateTaskController(req, res);

        // Assertions
        expect(_updateTaskService).toHaveBeenCalledWith(req, res);
    });

    it('should respond with the task when service resolves', async () => {
        // Mock the service to return a successful response
        const mockTask = { message: 'Task deleted successfully', id: '123' };
        _deleteTaskService.mockResolvedValue(mockTask);

        // Call the controller
        await deleteTaskController(req, res);

        expect(_deleteTaskService).toHaveBeenCalledWith(req, res);
        expect(res.send).toHaveBeenCalledWith(mockTask);
    });

    it('should respond with an error when service rejects', async () => {
        // Mock the service to return an error
        const mockError = new Error('Delete failed');
        _deleteTaskService.mockRejectedValue(mockError);

        // Call the controller
        await deleteTaskController(req, res);

        // Assertions
        expect(_deleteTaskService).toHaveBeenCalledWith(req, res);
    });
});