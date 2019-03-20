import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from "./_pages/list/list.component";
import { CreateComponent } from "./_pages/create/create.component";
import { DestroyComponent } from "./_pages/destroy/destroy.component";
import {ViewComponent} from "./_pages/view/view.component";
import {UpdateComponent} from "./_pages/update/update.component";

const routes: Routes = [
  {
    path: '',
    component: ListComponent
  },
  {
    path: '/createNote',
    component: CreateComponent
  },
  { // :UUID
    path: '/destroyNote',
    component: DestroyComponent
  },
  { // :UUID
    path: '/viewNote',
    component: ViewComponent
  },
  { // :UUI
    path: '/updateNote',
    component: UpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
