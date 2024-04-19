const form = document.getElementById('form');
const input = document.getElementById('input');
const tasks = document.getElementById('tasks');
const data = []

function createListItem(item, onRemove, onMark) {
    const body = document.createElement('li');
    body.id = 'task';
    body.className = item.done ? 'done' : '';

    const text = document.createElement('p');
    text.innerText = item.text;

    const remove = document.createElement('button');
    remove.className = 'remove';
    remove.textContent = 'Remove';
    remove.addEventListener('click', onRemove);

    const mark = document.createElement('button');
    mark.textContent = item.done ? 'Mark as undone' : 'Mark as done';
    mark.className = 'mark';
    mark.addEventListener('click', onMark);

    body.append(text, remove, mark);
    return body;
}

function populateTasks() {
    // Clear the tasks list
    tasks.innerHTML = '';

    if (data.length === 0) {
        const empty = document.createElement('li');
        empty.id = 'empty';
        empty.textContent = 'Such empty';
        tasks.appendChild(empty);
        return;
    }

    for (let i = 0; i < data.length; ++i) {
        const item = createListItem(data[i], () => {
            data.splice(i, 1);
            populateTasks();
        }, () => {
            data[i].done = !data[i].done;
            populateTasks();
        })
        tasks.appendChild(item);
    }
}

// Add a new task
form.addEventListener('submit', async (event) => {
    // stops the page from refreshing
    event.preventDefault();

    const value = input.value;
    if (!value || value.trim() === '') {
        alert('Please enter a task');
        return;
    }

    data.push({text: value, done: false});
    populateTasks();
});

// Populate the tasks list when the page loads
window.onload = populateTasks;