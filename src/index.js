// This script adds functionality to a task management application
// It allows users to create tasks with a description and priority level,
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('create-task-form');
  const taskList = document.getElementById('tasks');
  
  // Create priority dropdown
  const priorityLabel = document.createElement('label');
  priorityLabel.htmlFor = 'priority';
  priorityLabel.textContent = 'Priority:';
  
  const prioritySelect = document.createElement('select');
  prioritySelect.id = 'priority';
  prioritySelect.name = 'priority';
  
  const priorities = [
    { value: 'high', text: 'High' },
    { value: 'medium', text: 'Medium', selected: true },
    { value: 'low', text: 'Low' }
  ];
  
  priorities.forEach(priority => {
    const option = document.createElement('option');
    option.value = priority.value;
    option.textContent = priority.text;
    if (priority.selected) option.selected = true;
    prioritySelect.appendChild(option);
  });
  
  // Insert priority dropdown before submit button
  form.insertBefore(priorityLabel, form.lastElementChild);
  form.insertBefore(prioritySelect, form.lastElementChild);
  
  // Form submission handler
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const taskInput = document.getElementById('new-task-description');
    const taskDescription = taskInput.value.trim();
    const priority = prioritySelect.value;
    
    if (taskDescription) {
      addTask(taskDescription, priority);
      taskInput.value = '';
    }
  });
  
  // Function to add new task
  function addTask(description, priority) {
    const taskItem = document.createElement('li');
    taskItem.className = 'task-item';
    
    // Create task text with priority color
    const taskText = document.createElement('span');
    taskText.textContent = description;
    taskText.className = `task-text ${priority}-priority`;
    
    // Create priority badge
    const priorityBadge = document.createElement('span');
    priorityBadge.textContent = priority.charAt(0).toUpperCase() + priority.slice(1);
    priorityBadge.className = 'priority-badge';
    
    // Create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click', () => {
      taskItem.remove();
    });
    
    // Create edit button
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'edit-btn';
    editBtn.addEventListener('click', () => {
      const newText = prompt('Edit task:', description);
      if (newText !== null && newText.trim() !== '') {
        taskText.textContent = newText.trim();
      }
    });
    
    // Assemble task item
    taskItem.appendChild(taskText);
    taskItem.appendChild(priorityBadge);
    taskItem.appendChild(editBtn);
    taskItem.appendChild(deleteBtn);
    
    taskList.appendChild(taskItem);
  }
});