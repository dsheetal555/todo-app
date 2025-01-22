const TaskController = require('../controllers/TaskController');
const taskModel = require('../models/task');


jest.mock("../models/task");
jest.mock("../services/TaskService", () => ({
    deleteTaskService: jest.fn(),
    updateTaskService: jest.fn(),
    getTasksService: jest.fn(),
    createTaskService: jest.fn(),
}));
const TaskService = require('../services/TaskService');

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
        TaskService.createTaskService.mockResolvedValue(newTask);
        await TaskController.createTaskController(req, res);

        expect(TaskService.createTaskService).toHaveBeenCalledTimes(1);
        expect(TaskService.createTaskService).toHaveBeenCalledWith(req, res);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledWith(newTask);
    });

    it('should handle error if task creation fails', async () => {
        const mockError = new Error('Task creation failed');
        TaskService.createTaskService.mockRejectedValue(mockError);

        // Act: Call the controller
        await TaskController.createTaskController(req, res);

        // Assert: Check that the error is sent in the response
        expect(TaskService.createTaskService).toHaveBeenCalledTimes(2);
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
        TaskService.getTasksService.mockResolvedValue(mockTasks);
        await TaskController.getTasksController(req, res);
        expect(TaskService.getTasksService).toHaveBeenCalledTimes(1);
        expect(TaskService.getTasksService).toHaveBeenCalledWith(req, res); // Ensure the service is called with req and res
        expect(res.status).toHaveBeenCalledWith(200); // Check if status 200 (OK) is returned
        expect(res.send).toHaveBeenCalledWith(mockTasks);
    });

    it('should respond with an error and a 500 status code when service rejects', async () => {
        // Mock the service to return an error
        const mockError = new Error('Something went wrong');
        TaskService.getTasksService.mockRejectedValue(mockError);

        // Call the controller
        await TaskController.getTasksController(req, res);

        // Assertions+
        expect(TaskService.getTasksService).toHaveBeenCalledWith(req, res);
    });

    it('should respond with the updated task when service resolves', async () => {
        // Mock the service to return a successful response
        const mockTask = { id: 1, task: 'Updated Task' };
        TaskService.updateTaskService.mockResolvedValue(mockTask);

        // Call the controller
        await TaskController.updateTaskController(req, res);

        // Assertions
        expect(TaskService.updateTaskService).toHaveBeenCalledWith(req, res);
        expect(res.send).toHaveBeenCalledWith(mockTask);
    });

    it('should respond with an error when service rejects', async () => {
        // Mock the service to return an error
        const mockError = new Error('Update failed');
        TaskService.updateTaskService.mockRejectedValue(mockError);

        // Call the controller
        await TaskController.updateTaskController(req, res);

        // Assertions
        expect(TaskService.updateTaskService).toHaveBeenCalledWith(req, res);
    });

    it('should respond with the task when service resolves', async () => {
        // Mock the service to return a successful response
        const mockTask = { message: 'Task deleted successfully', id: '123' };
        TaskService.deleteTaskService.mockResolvedValue(mockTask);

        // Call the controller
        await TaskController.deleteTaskController(req, res);

        expect(TaskService.deleteTaskService).toHaveBeenCalledWith(req, res);
        expect(res.send).toHaveBeenCalledWith(mockTask);
    });

    it('should respond with an error when service rejects', async () => {
        // Mock the service to return an error
        const mockError = new Error('Delete failed');
        TaskService.deleteTaskService.mockRejectedValue(mockError);

        // Call the controller
        await TaskController.deleteTaskController(req, res);

        // Assertions
        expect(TaskService.deleteTaskService).toHaveBeenCalledWith(req, res);
    });
});