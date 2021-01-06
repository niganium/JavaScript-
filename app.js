'use strict';

const tasks = [];
const taskSelections = document.getElementById('taskSelections');
const selectionBtns = [ ...taskSelections.getElementsByClassName('selectionBtn')];
const output = document.getElementById('output');
const outputTbody = output.querySelector('tbody');
const taskField = document.getElementById('taskField');
const addBtn = document.getElementById('addBtn');
const statuses = { working: '作業中', complete: '完了' };
const currentSelection = { status: '全て' };
let currentId = 0; 

addBtn.addEventListener('click', () => {
  if (taskField.value === '') return;
  tasks.push({
    id: currentId,
    content: taskField.value,
    status: statuses.working
  });
  taskField.value = '';
  currentId ++;
  sortTasks();
});

const sortTasks = () => {
  if (currentSelection.status === '全て') {
    const tasksClone = [...tasks];
    outputTasks(tasksClone);
  } else {
    const tasksClone = tasks.filter(task => task.status === currentSelection.status);
    outputTasks(tasksClone);
  }
};

const outputTasks = (tasksClone) => {
  outputTbody.textContent = '';
  tasksClone.forEach((task, index) => {
    const tr = document.createElement('tr');
    tr.appendChild(createCell(index));
    tr.appendChild(createCell(task.content));
    tr.appendChild(createButton(task.status, task.id, changeStatus));
    tr.appendChild(createButton('削除', task.id, deleteTask));
    outputTbody.appendChild(tr);
  });
};

const createCell = (value) => {
  const cell = document.createElement('td');
  cell.textContent = value;
  return cell;
};

const createButton = (value, id, clickEvent) => {
  const button = document.createElement('input');
  button.type = 'button';
  button.value = value;
  button.addEventListener('click', () => {clickEvent(id)});
  return button;
};

const changeStatus = (id) => {
  const taskResult = tasks.find(task => task.id === id);
  taskResult.status = taskResult.status === '作業中' ? statuses.complete : statuses.working;
  sortTasks();
};

const deleteTask = (id) => {
  tasks.splice(id, 1);
  tasks.forEach((task, index) => task.id = index);
  currentId = tasks.length;
  sortTasks();
};

selectionBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    currentSelection.status = btn.value;
    sortTasks();
  });
});
