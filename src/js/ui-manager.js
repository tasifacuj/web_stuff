class UIManager {
  renderTodo(todo) {
    const div = document.createElement('div');

    div.classList.add('todo-item');
    div.innerHTML = `
      <div class="custom-control custom-checkbox">
        <input type="checkbox" data-todo-id="${todo.id}" class="custom-control-input" id="customCheck${todo.id}" ${ todo.completed ? 'checked' : '' }>
        <label class="custom-control-label" for="customCheck${todo.id}">${todo.text}</label>
      </div>
    `;

    return div;
  }

  renderTodos(todos) {
    const todosContainer = document.querySelector('.todos-container');
    const fragment = document.createDocumentFragment();

    todosContainer.innerHTML = '';

    todos.forEach((todo) => {
      fragment.appendChild(this.renderTodo(todo));
    });

    todosContainer.appendChild(fragment);
    this.renderTotal(todos.length);
  }

  onCheckChange(onCheck) {
    const todosContainer = document.querySelector('.todos-container');

    todosContainer.addEventListener('click', (event) => {
      console.log(event);
      const target = event.target;
      
      if (target.type === 'checkbox') {
        const id = parseInt(target.dataset.todoId, 10);

        onCheck.call(null, id);
      }
    });
  }

  renderTotal(value) {
    const totalElement = document.querySelector('.total-items');

    totalElement.innerHTML = value;
  }
}

export const uiManager = new UIManager();