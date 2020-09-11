import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodosListComponent } from './components/todos-list/todos-list.component';
import { TodoInfoComponent } from './components/todo-info/todo-info.component';


const routes: Routes = [
  { path: '', component: TodosListComponent },
  { path: 'info/:id', component: TodoInfoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
