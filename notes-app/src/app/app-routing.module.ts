import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from "./_pages/list/list.component";
import { CreateComponent } from "./_pages/create/create.component";
import { UpdateComponent } from "./_pages/update/update.component";
import { NotesDetailComponent } from "@app/_pages/notes-detail/notes-detail.component";

const routes: Routes = [
  {
    path: '',
    component: ListComponent
  },
  {
    path: 'createNote',
    component: CreateComponent
  },
  {
    path: 'updateNote',
    component: UpdateComponent
  },
  {
    path: 'detail/:uuid',
    component: NotesDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
