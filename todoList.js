class TodoList {
  constructor(title) {
    this.title = title;
    this.todos = [];
  }

  add(todo) {
    if (!(todo instanceof Todo)) {
      throw new TypeError("can only add Todo objects")
    }
    this.todos.push(todo)
  }

  size() {
    return this.todos.length
  }

  first() {
    return this.todos[0]
  }
  
  last() {
    return this.todos[this.size()-1]
  }

  _validatePosition(position) {
    if (!(this.todos[position] instanceof Todo)) {
      throw new TypeError(`invalid index: ${position}`)
    }
  }

  itemAt(position) {
    this._validatePosition(position)
    return this.todos[position]
  }

  markDoneAt(position) {
    return this.itemAt(position).markDone()
  }

  markUndoneAt(position){
    return this.itemAt(position).markUndone()
  }

  isDone() {
    return this.todos.every(todo => todo.isDone())
  }

  shift() {
    return this.todos.shift();
  }

  pop() {
    return this.todos.pop();
  }

  removeAt(position) {
    _validatePosition(position)
    return this.todos.splice(position, 1)
  }

  toString() {
    let title = `---- ${this.title} ----`;
    let list = this.todos.map(todo => todo.toString()).join("\n");
    return `${title}\n${list}`;
  }

  forEach(callback) {
    for (let i = 0; i < this.size(); i++) {
      callback(this.todos[i])
    }
  }

  filter(callback) {
    let newList = new TodoList(this.title)
    this.forEach(todo => {
      if (callback(todo)) {
        newList.add(todo)
      }
    })
    return newList
  }
}

class Todo {
  static DONE_MARKER = "X";
  static UNDONE_MARKER = " ";

  constructor(title) {
    this.title = title;
    this.done = false;
  }

  toString() {
    let marker = this.isDone() ? Todo.DONE_MARKER : Todo.UNDONE_MARKER;
    return `[${marker}] ${this.title}`;
  }

  markDone() {
    this.done = true;
  }

  markUndone() {
    this.done = false;
  }

  isDone() {
    return this.done;
  }

  getTitle() {
    return this.title;
  }
}
