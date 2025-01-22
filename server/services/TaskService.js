const jwt = require('jsonwebtoken')
const taskModel = require("../models/task");

exports.createTaskService = async (req, res) => {
    return new Promise((resolve, reject) => {
        const task = new taskModel(req.body);
        task.save()
            .then((task) => {
                resolve(task);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

exports.getTasksService = async (req, res) => {
    return new Promise((resolve, reject) => {
        taskModel.find()
            .then((tasks) => {
                resolve(tasks);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

exports.updateTaskService = async (req, res) => {
    return new Promise((resolve, reject) => {
        taskModel.findOneAndUpdate(
            { _id: req.params.id },
            req.body
        )
            .then((task) => {
                resolve("Task updated successfully");
            })
            .catch((error) => {
                reject(error);
            });
    });
}

exports.deleteTaskService = async (req, res) => {
    return new Promise((resolve, reject) => {
        taskModel.findByIdAndDelete(req.params.id)
            .then((task) => {
                resolve("Task deleted successfully");
            })
            .catch((error) => {
                reject(error);
            });
    });
}

exports.createTokenSevice = async (req, res) => {
    return new Promise((resolve, reject) => {
        try {
            const secretkey = "da30e0c0eafbadba9389c0883c6537acc7ba17e188a53f49e8dcf6bb914c1fcb"
            const token = jwt.sign(req.body, secretkey);
            resolve(token);
        } catch (error) {
            reject(error);
        }
    });
}