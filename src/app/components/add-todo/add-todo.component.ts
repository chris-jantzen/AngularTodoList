import { Component } from '@angular/core';
import { TodoServiceService as TodoService } from '../../services/todo-service.service';
import { Todo } from '../../models/Todo';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent {
  // @Output() addTodo: EventEmitter<any> = new EventEmitter();
  title: string;

  constructor(private todoService: TodoService) {}

  onSubmit() {
    const todo: Todo = {
      id: uuid(),
      title: this.title,
      completed: false
    };

    this.todoService.addTodo(todo);

    this.title = '';
  }
}
// TODO: Make this work with the list
