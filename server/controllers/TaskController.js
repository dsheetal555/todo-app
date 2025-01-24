import { createTaskService, getTasksService, updateTaskService, deleteTaskService, createTokenSevice } from '../services/TaskService.js';

export function createTaskController(req, res) {
    createTaskService(req, res).then((task) => {
        res.status(201).send(task);
    }).catch((error) => {
        res.status(500).send(error);
    });
}

export function getTasksController(req, res) {
    getTasksService(req, res).then((tasks) => {
        res.status(200).send(tasks);
    }).catch((error) => {
        res.status(500).send(error);
    });
}

export function updateTaskController(req, res) {
    updateTaskService(req, res)
        .then((task) => {
            res.status(200).send(task);
        })
        .catch((error) => {
            res.status(500).send(error);
        });
}

export async function deleteTaskController(req, res) {
    deleteTaskService(req, res).then((task) => {
        res.send(task);
    }).catch((error) => {
        res.send(error);
    });
}

export function createToken(req, res) {
    createTokenSevice(req, res)
        .then((token) => {
            res.send({ token });
        })
        .catch((error) => {
            res.send(error);
        });
}