'use strict';

class ToDo {
    constructor(form, input, todoList, todoCompleted) {
        this.form = document.querySelector(form);
        this.input = document.querySelector(input);
        this.todoList = document.querySelector(todoList);
        this.todoCompleted = document.querySelector(todoCompleted);
        this.todoData = new Map(JSON.parse(localStorage.getItem('toDoList')));
    }

    addToStorage () {
        localStorage.setItem('toDoList', JSON.stringify([...this.todoData]));
    }

    render() {
        this.todoList.textContent = '';
        this.todoCompleted.textContent = '';
        this.todoData.forEach(this.createItem, this);
        this.addToStorage();
    }

    createItem(todo) {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.key = todo.key;
        li.insertAdjacentHTML('beforeend', `
            <span class="text-todo">${todo.value}</span>
            <div class="todo-buttons">
                <button class="todo-remove"></button>
                <button class="todo-complete"></button>
            </div>
        `);

        if (todo.completed) {
            this.todoCompleted.append(li);
        } else {
            this.todoList.append(li);
        }
    }

    correctionWord(word) { 
        if (word !== '') {
            word = word.toLowerCase().split('');
            let temp = word[0].toUpperCase();
            word = word.join('');
            word = temp + word.slice(1);
            return word;
        } else {
            return ('');
        }
    }

    addToDo(e) {
        e.preventDefault();
        if (this.input.value.trim()) {
            this.input.value = this.correctionWord(this.input.value);
            const newTodo = {
                value: this.input.value,
                completed: false,
                key: this.generateKey()
            };
            this.todoData.set(newTodo.key, newTodo);
            this.render();
        }
        this.input.value = '';
    }

    deletedItem(key) {
        this.todoData.delete(key);
        this.render();
    }

    completedItem(item) {
        item.completed = !item.completed;
        this.render();
    }

    handler() {
        const toDoContainer = document.querySelector('.todo-container');
        toDoContainer.addEventListener('click', (event) => {
            const target = event.target;
            if (target.matches('.todo-remove')) {
                this.todoData.forEach((item, i) => {
                    if (item.key === target.closest('.todo-item').key) {
                        this.deletedItem(item.key);
                    }
                });
            } else if (target.matches('.todo-complete')) {
                this.todoData.forEach((item, i) => {
                    if (item.key === target.closest('.todo-item').key) {
                        this.completedItem(item);
                    }
                });   
            }
        });
    }

    generateKey() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    init() {
        this.form.addEventListener('submit', this.addToDo.bind(this));
        this.render();
        this.handler();
    }
 }

const todo = new ToDo('.todo-control', '.header-input', '.todo-list', '.todo-completed');

todo.init();
