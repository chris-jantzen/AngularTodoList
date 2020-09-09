import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Todo } from '../models/Todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  limit: number = 5;
  todosUrl: string = "https://jsonplaceholder.typicode.com/todos";
  todosLimit: string = `?_limit=${this.limit}`;

  private todosSubject = new BehaviorSubject(null);
  public todos$: Observable<Todo[]> = this.todosSubject.asObservable();

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  addTodo(todo: Todo): void {
    this.http.post<Todo>(this.todosUrl, todo, this.httpOptions).subscribe(
      () => {
        this.todosSubject.next([...this.todosSubject.value, todo]);
      },
      err => console.error(err)
    );
  }

  getTodos(): Observable<Todo[]> {
    const url: string = `${this.todosUrl}${this.todosLimit}`;
    this.http.get<Todo[]>(url).subscribe(
      res => {
        this.todosSubject.next(res);
      },
      err => console.error(err)
    );
    return this.todos$;
  }

  deleteTodo(todo: Todo): void {
    const url: string = `${this.todosUrl}/${todo.id}`;
    this.http.delete<Todo>(url, this.httpOptions).subscribe(() => {
      this.todosSubject.next(
        [...this.todosSubject.value.filter(item => item.id !== todo.id)]
      )
    });
  }

  updateTodo(todo: Todo): void {
    const url: string = `${this.todosUrl}/${todo.id}`;
    this.http.put<Todo>(url, JSON.stringify(todo), this.httpOptions).subscribe(
      () => {
        this.updateInPlace(todo);
      },
      () => {
        // send to error service or something to show an error component
        console.log('Can only edit json placeholder todos for now but we\'ve locally updated it for you in this session. Note: this change will not persist if the app is closed');
      }
    );
  }

  toggleCompleted(todo: Todo): void {
    const url: string = `${this.todosUrl}/${todo.id}`;
    this.http.put<Todo>(url, todo, this.httpOptions).subscribe(
      () => {
        this.updateInPlace(todo);
      },
      () => {
        // send to error service or something to show an error component
        console.log('Can only edit json placeholder todos for now but we\'ve locally updated it for you in this session. Note: this change will not persist if the app is closed');
      });
  }

  private updateInPlace(todo: Todo) {
    this.todosSubject.next(
      this.todosSubject.value.map(item => {
        item.id === todo.id ? todo : item
      })
    );
  }
}
