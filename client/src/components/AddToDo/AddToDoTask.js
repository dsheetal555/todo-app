
import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { addTask } from '../../services/taskServices';

function AddToDoTask(props) {
    const [addToDoTask, setAddToDoTask] = useState({
        task: "",
        description: "",
        status: "",
    });

    const options = [
        "Pending",
        "In Progress",
        "Completed",
    ];
    const onChangeHandler = (e) => {
        setAddToDoTask({ ...addToDoTask, [e.target.name]: e.target.value });
    };
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await addTask(addToDoTask);
            console.log(data);
            props.setTodoList([...props.todoList, data]);
            props.handleAddTaskModalClose();
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <Modal show={props.showAddTask} onHide={props.handleAddTaskModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New TO-DO Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input
                        variant="outlined"
                        name="task"
                        size="small"
                        style={{ width: "80%", marginBottom: "10px" }}
                        required={true}
                        placeholder="Task Name"
                        value={addTask.task}
                        onChange={onChangeHandler}
                    />
                    <input
                        variant="outlined"
                        name="description"
                        size="small"
                        style={{ width: "80%", marginBottom: "10px" }}
                        required={true}
                        value={addTask.description}
                        placeholder="Task Description"
                        onChange={onChangeHandler}
                    />
                    <select onChange={onChangeHandler} name="status" style={{ width: "80%", marginBottom: "10px" }}>
                        <option value={''}>Please choose status</option>
                        {options.map((option, index) => {
                            return (
                                <option key={index} value={addTask.status}>
                                    {option}
                                </option>
                            );
                        })}
                    </select>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleAddTaskModalClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={onSubmitHandler}
                        disabled={!addToDoTask.task || !addToDoTask.description || !addToDoTask.status}>
                        Add Task
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddToDoTask
