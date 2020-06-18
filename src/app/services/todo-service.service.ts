import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../models/Todo';

@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {
  limit: number = 5;
  todosUrl: string = "https://jsonplaceholder.typicode.com/todos";
  todosLimit: string = `?_limit=${this.limit}`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.todosUrl, todo, this.httpOptions);
  }

  getTodos(): Observable<Todo[]> {
    const url: string = `${this.todosUrl}${this.todosLimit}`;
    return this.http.get<Todo[]>(url);
  }

  deleteTodo(todo: Todo): Observable<Todo> {
    const url: string = `${this.todosUrl}/${todo.id}`;
    return this.http.delete<Todo>(url, this.httpOptions);
  }

  updateTodo(todo: Todo): Observable<Todo> {
    const url: string = `${this.todosUrl}/${todo.id}`;
    return this.http.put<Todo>(url, JSON.stringify(todo), this.httpOptions);
  }

  toggleCompleted(todo: Todo): Observable<any> {
    const url: string = `${this.todosUrl}/${todo.id}`;
    return this.http.put<Todo>(url, todo, this.httpOptions);
  }
}
