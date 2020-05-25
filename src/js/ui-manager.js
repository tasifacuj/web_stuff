class UIManager {
  renderTodoUrl(url) {
    const div = document.createElement('div');

    div.classList.add('url-item');
    div.innerHTML = `
      <div custom-control">
        <a href="${url.url}"  for="customCheck${url.id}">${url.text}</label>
      </div>
    `;

    return div;
  }

  renderUrls(urls) {
    const container = document.querySelector('.urltodos-container');
    const fragment = document.createDocumentFragment();

    container.innerHTML = '';

    urls.forEach((url) => {
      fragment.appendChild(this.renderTodoUrl(url));
    });

    container.appendChild(fragment);
    this.renderTotal(urls.length);
  }

  onCheckChange(onCheck) {
    const container = document.querySelector('.urltodos-container');

    container.addEventListener('click', (event) => {
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