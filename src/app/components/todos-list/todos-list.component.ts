import { Component, OnInit, Input } from '@angular/core';
import { Todo } from '../../models/Todo';
import { TodoServiceService as TodoService } from '../../services/todo-service.service';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.css']
})
export class TodosListComponent implements OnInit {
  @Input() todo: Todo;
  todos: Todo[];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getTodos().subscribe((todos) => {
      this.todos = todos;
    });
  }

  addTodo(todo: Todo) {
    console.log('the addTodo method');
    this.todos.push(todo);
    this.todoService.addTodo(todo).subscribe((todo: Todo) => {}, (err: any) => {
      this.todos.slice(0, -1);
      // querySelector to remove if this doesn't work reactively.
    });
  }

  deleteTodo(todo: Todo) {
    this.todos = this.todos.filter(({id}) => id !== todo.id);
    this.todoService.deleteTodo(todo).subscribe((todo: Todo) => {}, (err: any) => {
      this.todos.push(todo);
      console.error(`Problem deleting todo: ${err.message}`);
    });
  }

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo).subscribe(
      (todo: Todo) => {
        console.log('Successfully Updated');
      },
      (err: any) => {
        console.error(err.message);
      });
  }
}
