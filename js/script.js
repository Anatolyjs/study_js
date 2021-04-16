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
            todoList.append(li);
            if (item.completed) {
                todoCompleted.append(li);
            } else {
                todoList.append(li);
            }

        } );
        
    };

    todoControl.addEventListener('submit', function(event) {
        event.preventDefault();
        const newTodo = {
            value: headerInput.value,
            completed: false
        };
        todoData.push(newTodo);
        render();

    } );
