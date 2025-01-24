import pkg from 'jsonwebtoken';
import taskModel from "../models/task.js";

const { sign } = pkg;
export async function createTaskService(req, res) {
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

export async function getTasksService(req, res) {
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

export async function updateTaskService(req, res) {
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

export async function deleteTaskService(req, res) {
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

export async function createTokenSevice(req, res) {
    console.log(req.body);
    return new Promise((resolve, reject) => {
        try {
            const secretkey = "da30e0c0eafbadba9389c0883c6537acc7ba17e188a53f49e8dcf6bb914c1fcb"
            const token = sign(req.body, secretkey, { expiresIn: '1h' });
            console.log(token);
            console.log(token);
            resolve(token);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}