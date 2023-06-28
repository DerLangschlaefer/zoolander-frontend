import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProfileComponent} from "./profile/profile.component";
import {AppComponent} from "./app.component";
import {CreateComponent} from "./post/create/create.component";

const routes: Routes = [
  {path: '', component: AppComponent},
  {path: 'create', component: CreateComponent},
  {path: 'profile', component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
