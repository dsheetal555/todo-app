const { createTaskService, getTasksService, updateTaskService, deleteTaskService, createTokenSevice } = require('../services/TaskService');
const taskModel = require("../models/task");

jest.mock('../models/task', () => {
    const mockTaskModel = jest.fn();

    // Mock static methods
    mockTaskModel.find = jest.fn();
    mockTaskModel.findOneAndUpdate = jest.fn();
    mockTaskModel.findByIdAndDelete = jest.fn();

    // Mock instance methods
    mockTaskModel.prototype.save = jest.fn();

    return mockTaskModel;
});


describe('Task Services', () => {
    let req;

    beforeEach(() => {
        req = {
            body: {
                task: 'New Task',
                description: 'This is a new task.',
                status: 'Pending',
            },
            params: {
                id: '123',
            },
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyLCJhcHBsaWNhdGlvbiI6InRvZG9BcHAiLCJpYXQiOjE3Mzc1MjkwNjZ9.aJ8majoJqXukD6cPW1Q3-zRtn6Ybp1buJapChUH-OYM', // Add Authorization header with token
            },
        };

        jest.clearAllMocks();
    });

    // Test createTaskService
    describe('createTaskService', () => {
        it('should resolve with the created task when save succeeds', async () => {
            taskModel.prototype.save.mockResolvedValue({
                _id: '123',
                task: 'New Task',
                description: 'This is a new task.',
                status: 'Pending',
            });

            const result = await createTaskService(req);

            expect(taskModel).toHaveBeenCalledWith(req.body);
            expect(taskModel.prototype.save).toHaveBeenCalled();
            expect(result).toEqual({
                _id: '123',
                task: 'New Task',
                description: 'This is a new task.',
                status: 'Pending',
            });
        });

        it('should reject with an error when save fails', async () => {
            const mockError = new Error('Failed to create task');
            taskModel.prototype.save.mockRejectedValue(mockError);

            await expect(createTaskService(req)).rejects.toThrow(mockError);

            expect(taskModel).toHaveBeenCalledWith(req.body);
            expect(taskModel.prototype.save).toHaveBeenCalled();
        });
    });

    // Test getTasksService
    describe('getTasksService', () => {
        it('should resolve with all tasks when find succeeds', async () => {
            const mockTasks = [
                {
                    _id: '1',
                    task: 'New Task 1',
                    description: 'This is a new task 1.',
                    status: 'Pending',
                },
                {
                    _id: '2',
                    task: 'New Task 2',
                    description: 'This is a new task 2.',
                    status: 'In Progress',
                },
            ];
            taskModel.find.mockResolvedValue(mockTasks);

            const result = await getTasksService();

            expect(taskModel.find).toHaveBeenCalled();
            expect(result).toEqual(mockTasks);
        });

        it('should reject with an error when find fails', async () => {
            const mockError = new Error('Failed to fetch tasks');
            taskModel.find.mockRejectedValue(mockError);

            await expect(getTasksService()).rejects.toThrow(mockError);

            expect(taskModel.find).toHaveBeenCalled();
        });
    });

    // Test updateTaskService
    describe('updateTaskService', () => {
        it('should resolve with the updated task when update succeeds', async () => {
            const updatedTask = {
                _id: '123',
                task: 'Updated Task',
                description: 'This is a new task.',
                status: 'Pending',
            };
            taskModel.findOneAndUpdate.mockResolvedValue(updatedTask);

            const result = await updateTaskService(req);

            expect(taskModel.findOneAndUpdate).toHaveBeenCalledWith(
                { _id: req.params.id },
                req.body,
            );
            expect(result).toEqual("Task updated successfully");
        });

        it('should reject with an error when update fails', async () => {
            const mockError = new Error('Failed to update task');
            taskModel.findOneAndUpdate.mockRejectedValue(mockError);

            await expect(updateTaskService(req)).rejects.toThrow(mockError);

            expect(taskModel.findOneAndUpdate).toHaveBeenCalledWith(
                { _id: req.params.id },
                req.body,
            );
        });
    });

    // Test deleteTaskService
    describe('deleteTaskService', () => {
        it('should resolve with a success message when delete succeeds', async () => {
            taskModel.findByIdAndDelete.mockResolvedValue({ _id: '123' });

            const result = await deleteTaskService(req);

            expect(taskModel.findByIdAndDelete).toHaveBeenCalledWith(req.params.id);
            expect(result).toBe('Task deleted successfully');
        });

        it('should reject with an error when delete fails', async () => {
            const mockError = new Error('Failed to delete task');
            taskModel.findByIdAndDelete.mockRejectedValue(mockError);

            await expect(deleteTaskService(req)).rejects.toThrow(mockError);

            expect(taskModel.findByIdAndDelete).toHaveBeenCalledWith(req.params.id);
        });
    });
});