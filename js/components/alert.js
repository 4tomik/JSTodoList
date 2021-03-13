export default class Alert {
  constructor(alertId) {
    this.alert = document.getElementById(alertId);
  }

  show(message) {
    this.alert.classList.remove('d-none');
    this.alert.innerText = message;
  }

  hide() {
    this.alert.classList.add('d-none');
  }
}
