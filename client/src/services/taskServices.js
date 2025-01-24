import axios from "axios";
const apiUrl = "http://localhost:8080/api/tasks";

function getToken() {
    // This function retrieves the current user's token from somewhere Dynamically
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyLCJhcHBsaWNhdGlvbiI6InRvZG9BcHAiLCJpYXQiOjE3Mzc1MjkwNjZ9.aJ8majoJqXukD6cPW1Q3-zRtn6Ybp1buJapChUH-OYM';
}

export function getTasks() {
    return axios.get(apiUrl, {
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    });
}

export function addTask(task) {
    return axios.post(apiUrl, task, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        }
    });
}

export function updateTask(id, task) {
    return axios.put(apiUrl + "/" + id, task, {
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    });
}

export function deleteTask(id) {
    return axios.delete(apiUrl + "/" + id, {
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    });
}
