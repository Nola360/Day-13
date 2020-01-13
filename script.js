// Define UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

// Load all event listeners function
function loadEventListeners() {

  // DOM load Event
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add taskEvent
  form.addEventListener('submit', addTask);

  // Remove task Event
  taskList.addEventListener('click', removeTask);

  // Clear Task Events
  clearBtn.addEventListener('click', clearTasks);

  // Filter Through Task events
  filter.addEventListener('keyup', filterTasks);
}


// Get Tasks from LS
function getTasks() {
  // Initialize task
  let tasks;
  // Check for items
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    // Allow items to build in array format
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  // Loop through tasks displayed
  tasks.forEach(function (task) {
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';

    // Create Text node and append to li
    li.appendChild(document.createTextNode(tasks));

    // Create new link element
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';

    // Add Icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';

    // Append the link to li
    li.appendChild(link);
    // console.log(li);

    // Append li to ul
    taskList.appendChild(li);
  })
}


// Add Task function
function addTask(e) {
  if (taskInput.value === '') {
    alert('add a task')
  }
  // Create li element
  const li = document.createElement('li');
  // Add class
  li.className = 'collection-item';

  // Create Text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));

  // Create new link element
  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';

  // Add Icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';

  // Append the link to li
  li.appendChild(link);
  console.log(li);

  // Append li to ul
  taskList.appendChild(li);

  // Store in local Storage
  storeTaskInLocalStorage(taskInput.value);

  // Clear Input
  taskInput.value = '';

  e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task) {
  let tasks;
  // Check for items
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    // Allow items to build in array format
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  // Push onto variable tasks
  tasks.push(task);

  // Store as String
  localStorage.setItem('tasks', JSON.stringify(tasks));
}


// Remove Task
function removeTask(e) {

  if (e.target.parentElement.classList.contains('delete-item')) {
    // console.log(e.target);

    // Confirmation alert
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();

      // Remove task from local Storage (LS)
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  // Check for items
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    // Allow items to build in array format
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function (task, index) {
    // if text of li equals text in itteration
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Task function
function clearTasks() {
  // Removes entire task list
  // taskList.innerHTML = '';

  // Clear each task individually
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // Clear from LS
  clearTaskFromLocalStorage();

}

// Clear TAsk from LS
function clearTaskFromLocalStorage() {
  localStorage.clear();
}


// Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach();
  (function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexof(text) !== -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  })

  // console.log(text);
}

