const taskList = document.getElementById('taskList');
const taskInput = document.getElementById('taskInput');

// Load tasks from LocalStorage on startup
document.addEventListener('DOMContentLoaded', getTasks);

function addTask() {
    if (taskInput.value === '') return;
    createTaskElement(taskInput.value);
    saveLocalTask(taskInput.value);
    taskInput.value = '';
}

function createTaskElement(text) {
    const li = document.createElement('li');
    li.innerHTML = `${text} <span class="delete-btn" onclick="removeTask(this)">X</span>`;
    taskList.appendChild(li);
}

function removeTask(element) {
    const text = element.parentElement.innerText.replace(' X', '');
    removeLocalTask(text);
    element.parentElement.remove();
}

// Local Storage Functions
function saveLocalTask(task) {
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks() {
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    tasks.forEach(task => createTaskElement(task));
}

function removeLocalTask(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}