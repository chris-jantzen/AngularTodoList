import { Component, Input } from '@angular/core';
import { Todo } from './models/Todo';
import { TodoServiceService } from './services/todo-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @Input() todo: Todo;

  constructor(private todoService: TodoServiceService) {}
}
