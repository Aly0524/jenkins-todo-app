const COLORS = [
  '#a78bfa',
  '#60a5fa',
  '#34d399',
  '#fbbf24',
  '#f472b6',
  '#fb923c',
];

const state = {
  tasks: JSON.parse(localStorage.getItem('tasks')) || [],
  filter: 'all',
};

const elements = {
  taskInput: document.getElementById('taskInput'),
  taskList: document.getElementById('taskList'),
  addBtn: document.getElementById('addTaskBtn'),

  total: document.getElementById('stat-total'),
  done: document.getElementById('stat-done'),
  left: document.getElementById('stat-left'),

  progressText: document.getElementById('prog-pct'),
  progressFill: document.getElementById('progFill'),

  tabs: document.querySelectorAll('.tab'),
};

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(state.tasks));
}

function getTime() {
  return new Date().toLocaleTimeString('en-PH', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

function addTask() {
  const text = elements.taskInput.value.trim();

  if (!text) return;

  state.tasks.unshift({
    id: crypto.randomUUID(),
    text,
    done: false,
    color: COLORS[state.tasks.length % COLORS.length],
    time: getTime(),
  });

  elements.taskInput.value = '';

  saveTasks();
  render();
}

function toggleTask(id) {
  state.tasks = state.tasks.map(task =>
    task.id === id
      ? { ...task, done: !task.done }
      : task
  );

  saveTasks();
  render();
}

function deleteTask(id) {
  state.tasks = state.tasks.filter(task => task.id !== id);

  saveTasks();
  render();
}

function setFilter(filter) {
  state.filter = filter;

  elements.tabs.forEach(tab => {
    tab.classList.toggle(
      'active',
      tab.dataset.filter === filter
    );
  });

  render();
}

function getFilteredTasks() {
  switch (state.filter) {
    case 'active':
      return state.tasks.filter(task => !task.done);

    case 'done':
      return state.tasks.filter(task => task.done);

    default:
      return state.tasks;
  }
}

function updateStats() {
  const total = state.tasks.length;
  const done = state.tasks.filter(t => t.done).length;
  const left = total - done;

  const percent = total
    ? Math.round((done / total) * 100)
    : 0;

  elements.total.textContent = total;
  elements.done.textContent = done;
  elements.left.textContent = left;

  elements.progressText.textContent = `${percent}%`;
  elements.progressFill.style.width = `${percent}%`;
}

function renderEmpty() {
  elements.taskList.innerHTML = `
    <li class="empty-state">
      <span class="empty-icon">◎</span>
      <span>No tasks found.</span>
    </li>
  `;
}

function createTaskElement(task) {
  const li = document.createElement('li');

  li.className = `task-item ${task.done ? 'done' : ''}`;

  li.style.setProperty('--item-color', task.color);

  li.innerHTML = `
    <button class="check-btn">
      ${task.done ? '✓' : ''}
    </button>

    <span class="task-text"></span>

    <div class="task-right">
      <span class="task-time">${task.time}</span>

      <button class="del-btn">
        ✕
      </button>
    </div>
  `;

  li.querySelector('.task-text').textContent = task.text;

  li.querySelector('.check-btn')
    .addEventListener('click', () => toggleTask(task.id));

  li.querySelector('.del-btn')
    .addEventListener('click', () => deleteTask(task.id));

  return li;
}

function render() {
  updateStats();

  const tasks = getFilteredTasks();

  elements.taskList.innerHTML = '';

  if (!tasks.length) {
    renderEmpty();
    return;
  }

  tasks.forEach(task => {
    elements.taskList.appendChild(
      createTaskElement(task)
    );
  });
}

elements.addBtn.addEventListener('click', addTask);

elements.taskInput.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    addTask();
  }
});

elements.tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    setFilter(tab.dataset.filter);
  });
});

render();

console.log(
  '%c TaskFlow Ready ',
  'background:#7c3aed;color:#fff;padding:6px 10px;border-radius:6px;font-weight:bold;'
);