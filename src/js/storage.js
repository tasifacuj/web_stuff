import { UrlModel } from "./url.model";

class StorageManager {
  constructor() {
    this.initialize();
  }

  get total() {
    return parseInt(localStorage.getItem('urls-count'), 10) || 0;
  }

  set total(value = 0) {
    localStorage.setItem('urls-count', value);
  }

  get urls() {
    const items = [];
    const urls = JSON.parse(localStorage.getItem('urls')) || [];
    
    for (let i = 0, l = urls.length; i < l; i++) {
      items.push(new UrlModel(urls[i]));
    }

    return items;
  }

  clear() {
    localStorage.removeItem('urls');
    localStorage.removeItem('urls-count');
  }

  setUrl(value) {
    const urls = JSON.parse(localStorage.getItem('urls')) || [];

    const urlIndex = urls.findIndex((item) => item.id === value.id);
    if (urlIndex === -1) {
      urls.push(value);
      this.increaseTotal();
    } else {
      urls[urlIndex] = value;
    }

    localStorage.setItem(`urls`, JSON.stringify(urls));
  }

  increaseTotal(value = 1) {
    localStorage.setItem('urls-count', this.total + value);
  }

  initialize() { /*empty by now*/  }
}

export const storageManager = new StorageManager();
