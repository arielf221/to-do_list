let tasks = [];

document.addEventListener('DOMContentLoaded', loadTasks);
document.getElementById('addButton').addEventListener('click', addTask);
document.getElementById('clearCompletedButton').addEventListener('click', clearCompletedTasks);

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        renderTasks();
    }
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task.text;
        if (task.completed) {
            li.classList.add('completed');
        }

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.addEventListener('click', (e) => {
            e.stopPropagation();
            removeTask(index);
        });

        li.addEventListener('click', () => {
            toggleTask(index);
        });

        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    tasks.push({ text: taskText, completed: false });
    saveTasks();
    renderTasks();
    taskInput.value = '';
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function removeTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function clearCompletedTasks() {
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
    renderTasks();
}
