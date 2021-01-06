'use strict';

const tasks = [];
const taskSelections = document.getElementById('taskSelections');
const selectionBtns = [ ...taskSelections.getElementsByClassName('selectionBtn')];
const output = document.getElementById('output');
const outputTbody = output.querySelector('tbody');
const TaskField = document.getElementById('TaskField');
const addBtn = document.getElementById('addBtn');
const statuses = { working: '作業中', complete: '完了' };
const currentSelection = { status: '全て' };
let currentId = 0;

addBtn.addEventListener('click', () => {
  if (TaskField.value === '') return;
  tasks.push({
    id: currentId,
    content: TaskField.value,
    status: statuses.working
  });
  TaskField.value = '';
  currentId++;
  outputTasks();
});



const outputTasks = () => {
  outputTbody.textContent = '';
  tasks.forEach((task, index) => {
    const tr = document.createElement('tr');
    tr.appendChild(createCell(index));
    tr.appendChild(createCell(task.content));
    tr.appendChild(createButton(task.status));
    tr.appendChild(createButton('削除'));
    outputTbody.appendChild(tr);
  });
};

const createCell = (value) => {
  const cell = document.createElement('td');
  cell.textContent = value;
  return cell;
};

const createButton = (value) => {
  const button = document.createElement('input');
  button.type = 'button';
  button.value = value;
  return button;
};
