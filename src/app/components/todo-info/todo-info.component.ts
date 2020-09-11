import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Todo } from '../../models/Todo';
import { TodoService } from 'src/app/services/todo-service.service';

@Component({
  selector: 'app-todo-info',
  templateUrl: './todo-info.component.html',
  styleUrls: ['./todo-info.component.css']
})
export class TodoInfoComponent implements OnInit {

  todo: Todo;
  mouseEntered = false;

  constructor(private route: ActivatedRoute, private router: Router, private todoService: TodoService) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const id: number = +params.get('id');
        return this.todoService.getTodo(id);
      })
    ).subscribe(val => {
      this.todo = this.defineTodoDefaults(val);
    });
  }

  mouseEnter() {
    this.mouseEntered = true;
  }

  mouseExit() {
    this.mouseEntered = false;
  }

  goBack() {
    this.todoService.updateTodo(this.todo);
    this.router.navigate(['/']);
  }

  private defineTodoDefaults(todo: Todo): Todo {
    if (!todo.date) {
      todo.date = {
        year: undefined,
        month: undefined,
        day: undefined
      }
    }
    if (!todo.time) {
      todo.time = {
        hour: undefined,
        minute: undefined
      }
    }
    return todo;
  }

}

// TODO: Make my own DB instead of using json placeholder if I want to make
// these changes persist upon returning to this view
