'use strict';

const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed'),


    todoData = [
        {
            value: 'Сварить кофе',
            completed: false
        },

        {
            value: 'Помыть посуду',
            completed: true
        }

    ],

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
                let numb = todoData.indexOf(item);
                todoData.splice(numb, item);
                render();
            } );
        } );
        
    };

    todoControl.addEventListener('submit', function(event) {
        event.preventDefault();
        headerInput.value = headerInput.value.trim();
        if (headerInput.value !== '') {
            const newTodo = {
                value: headerInput.value,
                completed: false
            };
            todoData.push(newTodo);
            render();
        }
        headerInput.value = '';
    } );
    render();
