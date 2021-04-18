'use strict';

let todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed'),
    d = localStorage.getItem('todoData'),

    correctionWord = function(word) { 
        if (word !== '') {
            word = word.toLowerCase().split('');
            let temp = word[0].toUpperCase();
            word = word.join('');
            word = temp + word.slice(1);
            return word;
        } else {
            return ('');
        }
    },

    todoData = [],

    render = function() {
        todoList.textContent = '';
        todoCompleted.textContent = '';
        
        todoData.forEach( function(item) {
            const li = document.createElement('li');
            li.classList.add('todo-item');
            li.innerHTML = '<span class="text-todo">' + item.value + '</span>' + 
            '<div class="todo-buttons">' +
                '<button class="todo-remove"></button>' +
                '<button class="todo-complete"></button>' +
            '</div>';

            if (item.completed) {
                todoCompleted.append(li);
            } else {
                todoList.append(li);
            }
            const btnCompleted = li.querySelector('.todo-complete');
            btnCompleted.addEventListener('click', function() {
                item.completed = !item.completed;
                render();
            } );    
            const btnDelete = li.querySelector('.todo-remove');
            btnDelete.addEventListener('click', function() {
                console.log(item);
                let numb = todoData.indexOf(item);
                todoData.splice(numb, 1);
                localStorage.setItem('todoData', JSON.stringify(todoData) );
                render();
            } );
            localStorage.setItem('todoData', JSON.stringify(todoData) ); 
        } );
       
    };


todoControl.addEventListener('submit', function(event) {
    event.preventDefault();
    headerInput.value = headerInput.value.trim();
    if (headerInput.value !== '') {
        const newTodo = {
            value: correctionWord(headerInput.value),
            completed: false
        };
        
        todoData.push(newTodo);
        render();
    }
    headerInput.value = '';
} );

d = JSON.parse(d);
if (d !== null) {
    todoData = d;
}


render();