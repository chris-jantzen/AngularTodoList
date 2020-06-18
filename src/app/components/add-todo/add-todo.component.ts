import { Component, Output, EventEmitter } from '@angular/core';
import { Todo } from '../../models/Todo';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent {
  @Output() addTodo: EventEmitter<any> = new EventEmitter();
  title: string;

  constructor() {}

  onSubmit() {
    const todo: Todo = {
      id: uuid(),
      title: this.title,
      completed: false
    };

    this.addTodo.emit(todo);

    let input: HTMLInputElement = document.querySelector('#addTodo');
    input.value = '';
  }
}
// TODO: Make this work with the list