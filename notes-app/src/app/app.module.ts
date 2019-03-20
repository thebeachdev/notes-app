import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './_pages/list/list.component';
import { HeaderComponent } from './_components/header/header.component';
import { CreateComponent } from './_pages/create/create.component';
import { DestroyComponent } from './_pages/destroy/destroy.component';
import { ViewComponent } from './_pages/view/view.component';
import { UpdateComponent } from './_pages/update/update.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    HeaderComponent,
    CreateComponent,
    DestroyComponent,
    ViewComponent,
    UpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
