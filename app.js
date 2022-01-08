// Seletores
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

const filterOption = document.querySelector('.filter-todo');



//Eventos
document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click', addTodo);

todoList.addEventListener('click', deleteCheck)

filterOption.addEventListener('click', filterTodo)


// Funções
function addTodo(event) {
    event.preventDefault();

    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    const todoLi = document.createElement('li');
    todoLi.innerText = todoInput.value
    todoLi.classList.add('todo-item');
    todoDiv.appendChild(todoLi)

    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>'
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton)

    saveLocalTodos(todoInput.value)

    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton)

    todoList.appendChild(todoDiv)

    todoInput.value = ''
} 


function deleteCheck(e) {
    console.log(e.target)

    const item = e.target
    const todo = item.parentElement
    
    if(item.classList[0] === 'trash-btn') {
        todo.classList.add('fall')
        //removeLocalTodos(todo)
        removeLocalStorage(todo)
        todo.addEventListener('transitionend', () => {
            todo.remove()

        })
    }

    if(item.classList[0] === 'complete-btn'){
        todo.classList.toggle('completed')
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    
    todos.forEach( (todo) => {

        switch(e.target.value) {
            case 'all':
                todo.style.display = 'flex'
                break;
            case "completed":
                if(todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        }
    } )
}

function saveLocalTodos(todo) {

    let todos;

    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(todos))
}


function getTodos(){
    let todos;

    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.forEach(function(todo) {

        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
    
        const todoLi = document.createElement('li');
        todoLi.innerText = todo
        todoLi.classList.add('todo-item');
        todoDiv.appendChild(todoLi)
    
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>'
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton)
    
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>'
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton)
    
        todoList.appendChild(todoDiv)
    })
}

function removeLocalStorage(todo) {

    let todos

    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));

}