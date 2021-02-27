export default class View {
  constructor() {
    this.model = null;
    this.titleInput = document.getElementById("title");
    this.descriptionInput = document.getElementById("description");
    this.addBtn = document.getElementById("add");
    this.table = document.getElementById("table");
    this.alert = document.querySelector(".alert");

    this.modalTitle = document.getElementById("modal-title");
    this.modalDescription = document.getElementById("modal-description");
    this.modalBtn = document.getElementById("modal-btn");
    this.modalCompleted = document.getElementById("modal-completed");

    this.addListeners();
  }

  addListeners() {
    this.addBtn.onclick = () => this.addTodo();
    this.modalBtn.onclick = () =>
      this.editTodo(
        parseInt(this.modalBtn.getAttribute("todo-id")),
        this.modalTitle.value,
        this.modalDescription.value,
        this.modalCompleted.checked
      );
  }

  setModel(model) {
    this.model = model;
  }

  render() {
    const todos = this.model.getTodos();
    todos.forEach((todo) => this.createRow(todo));
  }

  toggleModal(todo) {
    this.modalTitle.value = todo.title;
    this.modalDescription.value = todo.description;
    this.modalBtn.setAttribute("todo-id", todo.id);
  }

  editTodo(id, title, description, completed) {
    this.model.editTodo(id, title, description, completed);
    const row = document.getElementById(id);
    row.children[0].innerText = title;
    row.children[1].innerText = description;
    row.children[2].children[0].checked = completed;
    $("#modal").modal("toggle");
  }

  toggleCompleted(id) {
    this.model.toggleCompleted(id);
  }

  removeTodo(id) {
    this.model.removeTodo(id);
    document.getElementById(id).remove();
  }

  addTodo() {
    if (!this.titleInput.value || !this.descriptionInput.value) {
      this.alert.classList.remove("d-none");
      this.alert.innerText = "Title and description are required!";
    } else {
      const todo = this.model.addTodo(
        this.titleInput.value,
        this.descriptionInput.value
      );
      this.createRow(todo);
      this.alert.classList.add("d-none");
    }
  }

  createRow(todo) {
    const row = this.table.insertRow();
    row.setAttribute("id", todo.id);

    row.innerHTML = `
      <td>${todo.title}</td>
      <td>${todo.description}</td>
      <td class="text-center">

      </td>
      <td class="text-right">

      </td>
    `;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.onclick = () => this.toggleCompleted(todo.id);
    row.children[2].appendChild(checkbox);

    const editBtn = document.createElement("button");
    editBtn.classList.add("btn", "btn-primary", "mb-1");
    editBtn.innerHTML = '<i class="fa fa-pencil"></i>';
    editBtn.setAttribute("data-toggle", "modal");
    editBtn.setAttribute("data-target", "#modal");
    editBtn.onclick = () => this.toggleModal(todo);
    row.children[3].appendChild(editBtn);

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("btn", "btn-danger", "ml-1", "mb-1");
    removeBtn.innerHTML = '<i class="fa fa-trash"></i>';
    removeBtn.onclick = () => this.removeTodo(todo.id);
    row.children[3].appendChild(removeBtn);
  }
}
