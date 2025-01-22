const { createTaskService, getTasksService, updateTaskService, deleteTaskService, createTokenSevice } = require('../services/TaskService');

exports.createTaskController = (req, res) => {
    createTaskService(req, res).then((task) => {
        res.status(201).send(task);
    }).catch((error) => {
        res.status(500).send(error);
    });
}

exports.getTasksController = (req, res) => {
    getTasksService(req, res).then((tasks) => {
        res.status(200).send(tasks);
    }).catch((error) => {
        res.status(500).send(error);
    });
}

exports.updateTaskController = (req, res) => {
    updateTaskService(req, res)
        .then((task) => {
            res.status(200).send(task);
        })
        .catch((error) => {
            res.status(500).send(error);
        });
}

exports.deleteTaskController = async (req, res) => {
    deleteTaskService(req, res).then((task) => {
        res.send(task);
    }).catch((error) => {
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