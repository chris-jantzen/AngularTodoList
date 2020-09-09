import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Todo } from '../../models/Todo';
import { TodoServiceService as TodoService } from '../../services/todo-service.service';
import { toggleHidden } from '../../utils/utils';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
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
      isComplete: this.todo.completed
    };
  }

  onMarkComplete() {
    this.todo.completed = !this.todo.completed;
    this.todoService.toggleCompleted(this.todo);/* .subscribe(() => {}, (err) => {
      this.todo.completed = !this.todo.completed;
      console.error(err.message);
    }); */
  }

  infoButtonOnClick() {
    console.log('info about:');
    console.log(this.todo);
    // TODO: send to a new view for just this todo list item
    // remove this method and just give the button a routerLink
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

  // private getElements() {
  //   const todoId = this.todo.id;
  //   const currentTitle: HTMLParagraphElement = document.querySelector(`#titleContainer${todoId}>p`);
  //   const currentTitleContainer: HTMLDivElement = document.querySelector(`#titleContainer${todoId}`);
  //   const editTodo: HTMLElement = document.getElementById(`editContainer${todoId}`);
  //   const iconContainer: HTMLElement = document.getElementById(`iconContainer${todoId}`);
  //   const editIconContainer: HTMLElement = document.getElementById(`iconContainer${todoId}`);
  //   return { editTodo, currentTitle, currentTitleContainer, iconContainer, editIconContainer };
  // }
}
