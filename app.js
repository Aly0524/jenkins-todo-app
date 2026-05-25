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