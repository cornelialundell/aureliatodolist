import { ITodo } from "todos";


export class App {
  heading = 'Todos';
  todos: ITodo[] = [];
  todoDescription = '';

  constructor() {
    let dataFromLS = JSON.parse(localStorage.getItem('todos'));
    if (dataFromLS) {
      this.todos = dataFromLS;
    }
    this.checkDoneTodos()
  }

  checkDoneTodos() {
    if (this.todos.length === 0) {
      this.heading = 'Todos';
    }

    for (let i = 0; i < this.todos.length; i++) {
      if (!this.todos[i].done) {
        this.heading = 'Todos';
        return;
      }
      this.heading = 'Good work!'
    }
  }

  saveToLs() {
    localStorage.setItem('todos', JSON.stringify(this.todos))
    this.checkDoneTodos()
  }

  addTodo() {
    this.todos.push({
      description: this.todoDescription,
      done: false
    })
    this.saveToLs();
    this.todoDescription = '';
  }

  removeTodo(todo: ITodo) {
    let i = this.todos.indexOf(todo)
    const el = document.getElementById('todo' + i)
    el.classList.add('fade')

    setTimeout(() => {
      this.todos.splice(i, 1)
      this.saveToLs();
    }, 200)
  }

  checkTodo(todo: ITodo) {
    todo.done = !todo.done;
    this.saveToLs();

    this.checkDoneTodos()
  }




}