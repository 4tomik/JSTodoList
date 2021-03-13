export default class Filters {
  constructor() {
    this.form = document.getElementById('filters');
    this.btn = document.getElementById('search');
  }

  onClick(callback) {
    this.btn.onclick = (e) => {
      e.preventDefault();
      const data = new FormData(this.form);
      callback({
        type: data.get('type'),
        words: data.get('words'),
      });
    }
  }
}
