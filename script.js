const apiUrl = 'http://localhost:3000';
const input = document.getElementById('taskInput');

document.addEventListener('DOMContentLoaded', ( ) => {
    getTodos();
});

input.addEventListener('keydown' , (e) => {
    if(e.key === 'Enter'){
        addTodo();
    }
})

function getTodos() {
    fetch(apiUrl + '/todos')
    .then((response) => response.json())
    .then(todos => displayTodos(todos))
}

function displayTodos(todos) {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';

    todos.map(todo => {
        const listItem = document.createElement('li');
        listItem.textContent = todo.todo;

        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = 'Delete';
        deleteBtn.onclick = () => deleteTodo(todo.id);
        listItem.appendChild(deleteBtn);
        todoList.appendChild(listItem);

    })
}
function deleteTodo(id) {
    fetch(apiUrl + `/delete/${id}`, {method : 'DELETE'})
    .then(res => res.json())
    .then(result => {
        console.log(result.message);
        getTodos();
    })
}
function addTodo() {
    const taskInput = document.getElementById('taskInput');
    const todo = taskInput.value.trim();
    
    if(todo !== '') {
        fetch(apiUrl + '/todos', {
            method : 'POST',
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify({todo})
        }).then(response => response.json())
        .then(newTodo => {
            getTodos();
            taskInput.value = '';
        })    
    }

}
