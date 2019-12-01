import { Todo } from "./todo.model";

class StorageManager {
  constructor() {
    this.initTodos();
  }

  get total() {
    return parseInt(localStorage.getItem('todos-count'), 10) || 0;
  }

  get todos() {
    const items = [];
    const todosResponse = JSON.parse(localStorage.getItem('todos')) || [];
    
    for (let i = 0, l = todosResponse.length; i < l; i++) {
      items.push(new Todo(todosResponse[i]));
    }

    return items;
  }

  clear() {
    localStorage.removeItem('todos');
    localStorage.removeItem('todos-count');
  }

  setTodo(value) {
    const todosResponse = JSON.parse(localStorage.getItem('todos')) || [];

    todosResponse.push(value);

    localStorage.setItem(`todos`, JSON.stringify(todosResponse));
  }

  increaseTotal(value = 1) {
    localStorage.setItem('todos-count', this.total + value);
  }

  initTodos() {
    if (this.total) {
      return;
    }
    const items = [{
      id: 0,
      text: 'Create todo',
      completed: false,
    }, {
      id: 1,
      text: 'Close this todo items',
      completed: false,
    }, {
      id: 2,
      text: 'Close todo app',
      completed: false,
    }];
    
    items.forEach((todo) => this.setTodo(todo));

    this.increaseTotal(items.length);

    alert('You dont have todos!!! We will fix it for you.');
  }
}

export const storageManager = new StorageManager();
