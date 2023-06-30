import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProfileComponent} from "./profile/profile.component";
import {AppComponent} from "./app.component";
import {CreateComponent} from "./post/create/create.component";
import {HomeComponent} from "./home/home.component";
import {FilterComponent} from "./navbar/filter/filter.component";

const routes: Routes = [
  {path: '', component: AppComponent},
  {path: 'home', component: HomeComponent},
  {path: 'filter', component: FilterComponent},
  {path: 'create', component: CreateComponent},
  {path: 'profile', component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
