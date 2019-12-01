import { storageManager } from './storage';
import { uiManager } from './ui-manager';

class AppManager {
  constructor() {
    this.attachStorageListener();
    this.attachRemoveListener();
    this.attackCheckListener();
    this.attachForm();

    this.renderTodos();
  }

  attachRemoveListener() {
    const removeButtom = document.querySelector('.remove-all-button');
    if (removeButtom) {
      removeButtom.addEventListener('click', () => {
        storageManager.clear();
        storageManager.total = 0;
        this.renderTodos();
        alert('OK, I removed it all');  
      }, false);
    }
  }

  attachStorageListener() {
    window.addEventListener('storage', () => {
      this.renderTodos();
    });
  }

  attackCheckListener() {
    uiManager.onCheckChange((id) => {
      const todos = storageManager.todos;
      const todo = todos.find((item) => item.id === id);

      todo.completed = true;
      storageManager.setTodo(todo);
    });
  }

  attachForm() {
    const form = document.querySelector('.todo-form');

    form.addEventListener('submit', (event) => {
      const input = form.querySelector('.todo-input');

      storageManager.setTodo({
        id: Date.now(),
        text: input.value,
        completed: false,
      });
      this.renderTodos();

      input.value = '';

      event.preventDefault();
      return false;
    });
  }

  renderTodos() {
    uiManager.renderTodos(storageManager.todos);
  }
}

new AppManager();