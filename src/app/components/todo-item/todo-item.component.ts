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
    const oldTitle: string = JSON.parse(JSON.stringify(this.todo.title));
    const currentTitle: HTMLParagraphElement = document.querySelector('.title>p');
    const editTodo: HTMLDivElement = document.querySelector('.todo-edit-container');
    const iconContainer: HTMLDivElement = document.querySelector('.iconContainer');
    const editIconContainer: HTMLDivElement = document.querySelector('.editIconContainer');
    const cancelIcon: Element = document.querySelector('#cancel');
    cancelIcon.addEventListener('click', () => {
      this.todo.title = oldTitle;
      this.toggleHidden(editTodo, currentTitle, iconContainer, editIconContainer);
    });
    if (!currentTitle.classList.contains('hidden')) {
      this.toggleHidden(editTodo, currentTitle, iconContainer, editIconContainer);
    }
  }
  
  editSubmit(e) {
    console.log('submit');
    e.preventDefault();
    const currentTitle: HTMLParagraphElement = document.querySelector('.title>p');
    const editTodo: HTMLDivElement = document.querySelector('.todo-edit-container');
    const iconContainer: HTMLDivElement = document.querySelector('.iconContainer');
    const editIconContainer: HTMLDivElement = document.querySelector('.editIconContainer');
    const saveIconLabel: Element = document.querySelector('#saveEditIcon');
    this.toggleHidden(editTodo, currentTitle, iconContainer, editIconContainer);
    // saveIconLabel.addEventListener('click', () => {
    //   console.log('click')
    // });
    this.todoService.updateTodo(this.todo).subscribe(() => {
      console.log('todo update successful');
      // const saveIconLabel: Element = document.querySelector('#saveEditIcon');
      // saveIconLabel.addEventListener('click', () => {
      //   console.log('click')
      //   this.toggleHidden(editTodo, currentTitle, iconContainer, editIconContainer);
      // });
    }, err => {
      console.error(err.message);
    });
  }

  toggleHidden(...elements) {
    elements.forEach(elem => elem.classList.toggle('hidden'));
  }
}
