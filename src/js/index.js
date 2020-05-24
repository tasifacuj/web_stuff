import { storageManager } from './storage';
import { uiManager } from './ui-manager';

class AppManager {
  constructor() {
    this.attachStorageListener();
    this.attachRemoveListener();
    //this.attackCheckListener();
    this.attachForm();

    this.renderTodos();
    this.id_ = 0;
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
      storageManager.clear();
      // storageManager.setTodo({
      //   id: Date.now(),
      //   text: input.value,
      //   completed: false,
      // });

      

      
    var url = 'https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=' + input.value + '&limit=5&namespace=0&format=json';



    fetch( url )
    .then(
      function(response){
        var r = response.json();
        // console.log( 'response: ' + r );
        return r;
      })
    .then(
      function(json) {
        for( var i = 0; i < json[1].length; i++ ){
          console.log( "key: " + json[1][i] );
          var number = Math.random() // 0.9394456857981651
          number.toString(36); // '0.xtis06h6'
          var id = number.toString(36).substr(2, 9);
          storageManager.setTodo({
            id,
            text: json[1][i],
            completed: false,
            url: json[3][i]
        });
        }

        uiManager.renderTodos(storageManager.todos);
        input.value = '';
      })
    .catch(function(error){
      console.log('Err: ' + error);
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