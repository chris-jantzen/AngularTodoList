import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Todo } from '../../models/Todo';
import { TodoService } from '../../services/todo-service.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;

  previousTodoData: Todo;
  activeEdit = false;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.previousTodoData = JSON.parse(JSON.stringify(this.todo));
  }

  setClasses() {
    return {
      todo: true, // this means that there's a class called todo that will always be applied
      flex: true,
      isComplete: this.todo.completed,
    };
  }

  onMarkComplete() {
    this.todo.completed = !this.todo.completed;
    this.todoService.toggleCompleted(this.todo);
  }

  onDelete(todo: Todo) {
    this.todoService.deleteTodo(todo);
  }

  onEdit() {
    this.activeEdit = true;
  }

  editSubmit() {
    this.todoService.updateTodo(this.todo);
    this.activeEdit = false;
  }

  onCancel() {
    this.todo.title = this.previousTodoData.title;
    this.activeEdit = false;
  }
}
