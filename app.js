const ACCENT_COLORS = ['#a78bfa', '#34d399', '#60a5fa', '#fbbf24'];

let tasks = [];
let filter = 'all';
let colorIndex = 0;

/* LOAD */
function loadTasks() {
  const data = localStorage.getItem('tasks');
  if (data) tasks = JSON.parse(data);
}

/* SAVE */
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getNow() {
  return new Date().toLocaleTimeString('en-PH', {
    hour: '2-digit',
    minute: '2-digit'
  });
}

/* ADD */
function addTask() {
  const input = document.getElementById('taskInput');
  const text = input.value.trim();
  if (!text) return;

  tasks.unshift({
    id: Date.now(),
    text,
    done: false,
    time: getNow(),
    color: ACCENT_COLORS[colorIndex % ACCENT_COLORS.length]
  });

  colorIndex++;
  input.value = '';
  input.focus();

  saveTasks();
  render();
}

/* TOGGLE */
function toggleTask(id) {
  const t = tasks.find(x => x.id === id);
  if (t) t.done = !t.done;

  saveTasks();
  render();
}

/* DELETE */
function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  render();
}

/* FILTER */
function setFilter(f, btn) {
  filter = f;

  document.querySelectorAll('.tab')
    .forEach(b => b.classList.remove('active'));

  btn.classList.add('active');
  render();
}

/* CLEAR DONE */
function clearCompleted() {
  tasks = tasks.filter(t => !t.done);
  saveTasks();
  render();
}

/* RENDER */
function render() {
  const total = tasks.length;
  const done = tasks.filter(t => t.done).length;
  const left = total - done;

  document.getElementById('stat-total').textContent = total;
  document.getElementById('stat-done').textContent = done;
  document.getElementById('stat-left').textContent = left;

  const pct = total ? Math.round((done / total) * 100) : 0;
  document.getElementById('prog-pct').textContent = pct + '%';
  document.getElementById('progFill').style.width = pct + '%';

  const list = document.getElementById('taskList');

  const visible = tasks.filter(t =>
    filter === 'all' ? true :
    filter === 'done' ? t.done :
    !t.done
  );

  if (!visible.length) {
    list.innerHTML = `<li class="empty-state">Walang nahanap na task — mag-add ka na! ✨</li>`;
    return;
  }

  list.innerHTML = visible.map(t => `
    <li class="task-item ${t.done ? 'done' : ''}" style="--item-color: ${t.color}">
      <div class="task-checkbox-wrapper" onclick="toggleTask(${t.id})">
        <div class="task-checkbox">
          <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
      </div>
      <div class="task-content" onclick="toggleTask(${t.id})">
        <span class="task-text">${escapeHtml(t.text)}</span>
        <span class="task-time">${t.time}</span>
      </div>
      <button class="delete-btn" onclick="deleteTask(${t.id})" aria-label="Delete task">
        <svg class="trash-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          <line x1="10" y1="11" x2="10" y2="17"></line>
          <line x1="14" y1="11" x2="14" y2="17"></line>
        </svg>
      </button>
    </li>
  `).join('');
}

/* SAFE TEXT */
function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/* ENTER KEY */
document.getElementById('taskInput')
  .addEventListener('keydown', e => {
    if (e.key === 'Enter') addTask();
  });

/* INIT */
loadTasks();
render();