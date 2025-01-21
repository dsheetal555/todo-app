import React, { useEffect, useState } from 'react'
import { deleteTask, getTasks } from './../../services/taskServices';
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import './todoList.css';
import AddToDoTask from '../AddToDo/AddToDoTask';

function ToDoList() {
    const [todoList, setTodoList] = useState([]);
    const [showAddTask, setShowAddTask] = useState(false);
    const [showEditTask, setShowEditTask] = useState(false);
    useEffect(() => {
        async function fetchData() {
            const { data } = await getTasks();
            setTodoList(data);
        }
        fetchData();
    }, []);

    const handleDelete = async (itemId) => {
        const originalTasks = todoList;
        try {
            const tasks = originalTasks.filter(
                (task) => task._id !== itemId
            );
            setTodoList([...tasks]);
            const data = await deleteTask(itemId);
            console.log(data)
        } catch (error) {
            setTodoList([...originalTasks ]);
            console.log(error);
        }
    };

    const handleUpdate = (itemId) => {
        
    }

    const renderToDoItems = () => {
        return (
            <div className="container">
                {todoList.length > 0 && todoList.map((item, index) => {
                    return (
                        <div className="card" key={index}>
                            <h4><b>{item.task}</b></h4>
                            <p>{item.description}</p>
                            <p>{item.status}</p>
                            <div className="todo-btn">
                                <button className='editBtn' onClick={() => handleUpdate(item._id)}><FaRegEdit /></button>
                                <button className='delBtn' onClick={() => handleDelete(item._id)}><RiDeleteBinLine /></button>
                            </div>
                        </div>
                    )
                })}

            </div>
        )

    }

    const handleAddTaskModalClose = () => setShowAddTask(false);
    const handleAddTaskModalShow = () => setShowAddTask(true);

    return (
        <div>
            <div className="header">
                <h1>To-Do List</h1>
                <button className='addBtn' onClick={handleAddTaskModalShow}>Add Task</button>
            </div>
            {renderToDoItems()}
            {showAddTask &&
                <AddToDoTask showAddTask={showAddTask}
                    handleAddTaskModalClose={handleAddTaskModalClose}
                    setTodoList={setTodoList}
                    todoList={todoList} />
            }
        </div>
    )
}

export default ToDoList
