function addTask() {
    const input = document.getElementById('taskInput');
    const taskText = input.value.trim();
    
    if (taskText === '') {
        alert('Mangyaring mag-type ng gawain!');
        return;
    }

    const ul = document.getElementById('taskList');
    const li = document.createElement('li');
    
    li.innerHTML = `
        <span>${taskText}</span>
        <span class="delete-btn" onclick="this.parentElement.remove()">X</span>
    `;
    
    ul.appendChild(li);
    input.value = '';
}
console.log("To-Do App System: Successfully loaded and working.");Jenkinsfile


TaskFlow — app.js
// Automated To-Do | Monitored by Jenkins CI/CD

// const ACCENT_COLORS = [
//   '#a78bfa', '#60a5fa', '#34d399',
//   '#fbbf24', '#f472b6', '#fb923c',
// ];

// let tasks = [];
// let filter = 'all';
// let colorIndex = 0;

// function getNow() {
//   return new Date().toLocaleTimeString('en-PH', { hour: '2-digit', minute: '2-digit' });
// }

// function addTask() {
//   const input = document.getElementById('taskInput');
//   const text = input.value.trim();
//   if (!text) { input.focus(); return; }

//   const task = {
//     id: Date.now(),
//     text,
//     done: false,
//     color: ACCENT_COLORS[colorIndex % ACCENT_COLORS.length],
//     time: getNow(),
//   };

//   tasks.unshift(task);
//   colorIndex++;
//   input.value = '';
//   render();
// }

// function toggleTask(id) {
//   const task = tasks.find(t => t.id === id);
//   if (task) task.done = !task.done;
//   render();
// }

// function deleteTask(id) {
//   tasks = tasks.filter(t => t.id !== id);
//   render();
// }

// function setFilter(f, btn) {
//   filter = f;
//   document.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
//   btn.classList.add('active');
//   render();
// }

// function render() {
//   // Stats
//   const total = tasks.length;
//   const done  = tasks.filter(t => t.done).length;
//   const left  = total - done;
//   document.getElementById('stat-total').textContent = total;
//   document.getElementById('stat-done').textContent  = done;
//   document.getElementById('stat-left').textContent  = left;

//   // Progress
//   const pct = total ? Math.round((done / total) * 100) : 0;
//   document.getElementById('prog-pct').textContent = pct + '%';
//   document.getElementById('progFill').style.width  = pct + '%';

//   // Filter
//   const visible = tasks.filter(t =>
//     filter === 'all'    ? true :
//     filter === 'done'   ? t.done :
//     /* active */          !t.done
//   );

//   const list = document.getElementById('taskList');

//   if (!visible.length) {
//     const msg = tasks.length
//       ? 'Walang resulta para sa filter na ito.'
//       : 'Wala pang gawain — mag-add na!';
//     list.innerHTML = `
//       <li class="empty-state">
//         <span class="empty-icon">◎</span>
//         <span>${msg}</span>
//       </li>`;
//     return;
//   }

//   list.innerHTML = visible.map(t => `
//     <li class="task-item${t.done ? ' done' : ''}" style="--item-color: ${t.color}">
//       <button class="check-btn" onclick="toggleTask(${t.id})"
//               aria-label="${t.done ? 'Mark incomplete' : 'Mark complete'}">
//         ${t.done ? '✓' : ''}
//       </button>
//       <span class="task-text">${escapeHtml(t.text)}</span>
//       <div class="task-right">
//         <span class="task-time">${t.time}</span>
//         <button class="del-btn" onclick="deleteTask(${t.id})" aria-label="Delete task">
//           <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
//             <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/>
//           </svg>
//         </button>
//       </div>
//     </li>
//   `).join('');
// }

// function escapeHtml(str) {
//   return str
//     .replace(/&/g, '&amp;')
//     .replace(/</g, '&lt;')
//     .replace(/>/g, '&gt;')
//     .replace(/"/g, '&quot;');
// }

// // Enter key support
// document.getElementById('taskInput').addEventListener('keydown', e => {
//   if (e.key === 'Enter') addTask();
// });

// // Initial render
// render();

// console.log('%c TaskFlow ✦ ', 'background:#7c3aed;color:#fff;padding:4px 8px;border-radius:4px;font-weight:bold;', 'Successfully loaded. Jenkins CI/CD is watching.');