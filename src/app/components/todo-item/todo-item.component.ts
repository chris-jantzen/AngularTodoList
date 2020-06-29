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
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();

  previousTodoData: Todo;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.previousTodoData = JSON.parse(JSON.stringify(this.todo));
    this.initCancelButton();
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
    this.todoService.toggleCompleted(this.todo).subscribe(() => {}, (err) => {
      this.todo.completed = !this.todo.completed;
      console.error(err.message);
    });
  }

  infoButtonOnClick() {
    console.log('info about:');
    console.log(this.todo);
    // TODO: send to a new view for just this todo list item
  }

  onDelete(todo: Todo) {
    this.deleteTodo.emit(todo);
  }

  onEdit() {
    const currentTitle: HTMLParagraphElement = document.querySelector('#titleContainer>p');
    const currentTitleContainer: HTMLDivElement = document.querySelector('#titleContainer');
    const editTodo: HTMLDivElement = document.querySelector('.todo-edit-container');
    const iconContainer: HTMLDivElement = document.querySelector('.iconContainer');
    const editIconContainer: HTMLDivElement = document.querySelector('.editIconContainer');
    if (!currentTitle.classList.contains('hidden')) {
      toggleHidden(editTodo, currentTitle, currentTitleContainer, iconContainer, editIconContainer);
    }
  }

  editSubmit() {
    const currentTitle: HTMLParagraphElement = document.querySelector('#titleContainer>p');
    const currentTitleContainer: HTMLDivElement = document.querySelector('#titleContainer');
    const editTodo: HTMLDivElement = document.querySelector('.todo-edit-container');
    const iconContainer: HTMLDivElement = document.querySelector('.iconContainer');
    const editIconContainer: HTMLDivElement = document.querySelector('.editIconContainer');
    toggleHidden(editTodo, currentTitle, currentTitleContainer, iconContainer, editIconContainer);
    this.todoService.updateTodo(this.todo).subscribe(() => {
      this.previousTodoData = this.todo;
    }, err => {
      console.error(err.message);
      this.todo = this.previousTodoData;
    });
  }

  initCancelButton() {
    const currentTitle: HTMLParagraphElement = document.querySelector('.title p');
    const currentTitleContainer: HTMLDivElement = document.querySelector('#titleContainer');
    const editTodo: HTMLDivElement = document.querySelector('.todo-edit-container');
    const iconContainer: HTMLDivElement = document.querySelector('.iconContainer');
    const editIconContainer: HTMLDivElement = document.querySelector('.editIconContainer');
    const cancelIcon: Element = document.querySelector('#cancel');
    const oldTitle: string = this.previousTodoData.title;
    cancelIcon.addEventListener('click', () => {
      this.todo.title = oldTitle;
      toggleHidden(editTodo, currentTitle, currentTitleContainer, iconContainer, editIconContainer);
    });
  }
}
