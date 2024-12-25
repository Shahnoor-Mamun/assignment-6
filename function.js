// JavaScript Functionality for To-Do Application

// Select DOM Elements
const todoInput = document.getElementById('todo-input');
const addButton = document.getElementById('add-button');
const todoList = document.getElementById('todo-list');

// Add To-Do Item Function
function addTodo() {
    const todoText = todoInput.value.trim(); // Get input value and trim whitespace

    if (todoText === "") {
        alert("Please enter a task.");
        return;
    }

    // Create a new list item
    const listItem = document.createElement('li');
    listItem.className = "flex items-center justify-between bg-gray-100 p-2 rounded shadow";

    // Completion Circle
    const completionCircle = document.createElement('div');
    completionCircle.className = "w-6 h-6 border-2 border-gray-400 rounded-full flex-shrink-0 cursor-pointer mr-3";
    completionCircle.addEventListener('click', () => toggleCompletion(taskText, completionCircle));

    // Task Text
    const taskText = document.createElement('span');
    taskText.textContent = todoText;
    taskText.className = "flex-1 text-gray-800";

    // Edit Button
    const editButton = document.createElement('button');
    editButton.className = "bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2";
    editButton.textContent = "Edit";
    editButton.addEventListener('click', () => editTodo(taskText, editButton));

    // Delete Button
    const deleteButton = document.createElement('button');
    deleteButton.className = "bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener('click', () => deleteTodo(listItem));

    // Append elements to the list item
    listItem.appendChild(completionCircle);
    listItem.appendChild(taskText);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    // Add the new list item to the top of the list
    todoList.prepend(listItem);

    // Clear the input field
    todoInput.value = "";
}

// Toggle Completion Function
function toggleCompletion(taskText, completionCircle) {
    if (taskText.classList.contains('line-through')) {
        taskText.classList.remove('line-through', 'text-gray-400');
        completionCircle.classList.remove('bg-green-500', 'border-green-500');
    } else {
        taskText.classList.add('line-through', 'text-gray-400');
        completionCircle.classList.add('bg-green-500', 'border-green-500');
    }
}

// Edit To-Do Item Function
function editTodo(taskText, editButton) {
    const currentText = taskText.textContent;

    // Create an input field for editing
    const editInput = document.createElement('input');
    editInput.type = "text";
    editInput.value = currentText;
    editInput.className = "flex-1 border border-gray-300 rounded p-1";

    // Replace the task text with the input field
    taskText.replaceWith(editInput);

    // Change "Edit" button to "Save"
    editButton.textContent = "Save";
    editButton.removeEventListener('click', editTodo);
    editButton.addEventListener('click', () => saveEdit(editInput, editButton));
}

// Save Edited To-Do Item Function
function saveEdit(editInput, editButton) {
    const updatedText = editInput.value.trim();

    if (updatedText === "") {
        alert("Task cannot be empty.");
        return;
    }

    // Create a new span with updated text
    const updatedTaskText = document.createElement('span');
    updatedTaskText.textContent = updatedText;
    updatedTaskText.className = "flex-1 text-gray-800";

    // Replace the input field with the updated text
    editInput.replaceWith(updatedTaskText);

    // Change "Save" button back to "Edit"
    editButton.textContent = "Edit";
    editButton.removeEventListener('click', saveEdit);
    editButton.addEventListener('click', () => editTodo(updatedTaskText, editButton));
}

// Delete To-Do Item Function
function deleteTodo(listItem) {
    listItem.remove();
}

// Add Event Listener to "Add" Button
addButton.addEventListener('click', addTodo);

// Add Event Listener for Enter Key on Input Field
todoInput.addEventListener('keypress', (event) => {
    if (event.key === "Enter") {
        addTodo();
    }
});
