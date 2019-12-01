import { storageManager } from './storage';

function onRemove() {
  console.log("onRemoveCalled")
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