// scripts.js

let tasks = [
    { id: 1, description: "Modificar html", completed: false },
    { id: 2, description: "corregir JS", completed: false },
    { id: 3, description: "agregar linea roja dentro de css", completed: false }
];

document.addEventListener("DOMContentLoaded", () => {
    renderTasks();
    updateSummary();
});

const taskInput = document.getElementById("new-task");

function addTask() {
    const taskDescription = taskInput.value.trim();
    if (taskDescription) {
        const newTask = {
            id: Date.now(),
            description: taskDescription,
            completed: false
        };
        tasks.push(newTask);
        taskInput.value = "";
        renderTasks();
        updateSummary();
    }
}

taskInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
    updateSummary();
}

function toggleTaskCompletion(id) {
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.completed = !task.completed;
        renderTasks();
        updateSummary();
    }
}

function renderTasks() {
    const todoList = document.getElementById("todo-list");
    todoList.innerHTML = "";
    tasks.forEach(task => {
        const listItem = document.createElement("li");
        listItem.className = task.completed ? "completed" : "";
        listItem.innerHTML = `
            ${task.description}
            <div>
                <button onclick="toggleTaskCompletion(${task.id})">Listo</button>
                <button class= "delete-button" onclick="deleteTask(${task.id})">&times;</button>
            </div>
        `;
        todoList.appendChild(listItem);
    });
}

function updateSummary() {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    document.getElementById("total-tasks").innerText = totalTasks;
    document.getElementById("completed-tasks").innerText = completedTasks;
}
