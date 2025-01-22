const Task = require("../models/task");
const { createTaskService, getTasksService, updateTaskService, deleteTaskService, createTokenSevice } = require('../services/TaskService');

exports.createTaskController = (req, res) => {
    createTaskService(req, res)
        .then((task) => {
            res.send(task);
        })
        .catch((error) => {
            res.send(error);
        });
}

exports.getTasksController = (req, res) => {
    getTasksService(req, res)
        .then((tasks) => {
            res.send(tasks);
        })
        .catch((error) => {
            res.send(error);
        });
}

exports.updateTaskController = (req, res) => {
    updateTaskService(req, res)
        .then((task) => {
            res.send(task);
        })
        .catch((error) => {
            res.send(error);
        });
}

exports.deleteTaskController = async (req, res) => {
    console.log("deleteTaskController", req.params.id);
    deleteTaskService(req, res)
        .then((task) => {
            res.send(task);
        })
        .catch((error) => {
            res.send(error);
        });
}

exports.createToken = (req, res) => {
    createTokenSevice(req, res)
        .then((token) => {
            res.send({ token });
        })
        .catch((error) => {
            res.send(error);
        });
}