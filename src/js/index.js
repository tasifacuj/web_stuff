import { storageManager } from './storage';

function onRemove() {
  storageManager.clear();
  alert('OK, I removed it all');
}

(function() {
  console.log(storageManager.todos);

  const removeButtom = document.querySelector('.remove-all-button');
  if (removeButtom) {
    removeButtom.addEventListener('click', onRemove, false);
  }
})()