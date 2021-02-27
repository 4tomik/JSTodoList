export default class Model {
  constructor() {
    this.view = null;
    this.todos = JSON.parse(localStorage.getItem("todos"));
    if (!this.todos || this.todos.length < 1) {
      this.todos = [
        {
          id: 0,
          title: "Learn JS",
          description: "Watch JS Tutorials",
          completed: false,
        },
      ];
      this.currentId = 1;
    } else {
      this.currentId = this.todos[this.todos.length - 1].id + 1;
    }
  }

  setView(view) {
    this.view = view;
  }

  save() {
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }

  getTodos() {
    return this.todos;
  }

  toggleCompleted(id) {
    const index = this.todos.findIndex((todo) => todo.id === id);
    const todo = this.todos[index];
    console.log(index);
    todo.completed = !todo.completed;
    this.save();
  }

  editTodo(id, values) {
    const index = this.todos.findIndex((todo) => todo.id === id);
    Object.assign(this.todos[index], values);
    this.save();
  }

  addTodo(title, description) {
    const todo = {
      id: this.currentId++,
      title,
      description,
      completed: false,
    };
    this.todos.push(todo);
    this.save();

    return { ...todo };
  }

  removeTodo(id) {
    const index = this.todos.findIndex((todo) => todo.id === id);
    this.todos.splice(index, 1);
    this.save();
  }
}
