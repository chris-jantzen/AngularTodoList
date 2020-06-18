import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../../models/Todo';
import { TodoServiceService as TodoService } from '../../services/todo-service.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent {
  @Input() todo: Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();

  todos: Todo[];

  constructor(private todoService: TodoService) {}

  setClasses = () => ({
    todo: true, // this means that there's a class called todo that will always be applied
    flex: true,
    'is-complete': this.todo.completed
  });

  onClick() {
    this.todo.completed = !this.todo.completed;
    this.todoService.toggleCompleted(this.todo).subscribe((todo) => {}, (err) => {
      this.todo.completed = !this.todo.completed;
      console.error(err.message);
    });
  }

  infoButtonOnClick() {
    console.log('info');
    // TODO: send to a new view for just this todo list item
  }

  onDelete(todo: Todo) {
    this.deleteTodo.emit(todo);
  }

  onEdit() {
    console.log('edit');
    // TODO: Add an update request on the todoService
  }
}
