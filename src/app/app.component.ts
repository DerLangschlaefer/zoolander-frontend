import {Component, OnInit} from '@angular/core';
import {User} from "./user/user";
import {HttpClient} from "@angular/common/http";
import {SignupComponent} from "./signup/signup.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Zooland';
  user: User = {} as User;
  validUser: boolean = false;

  constructor(private http: HttpClient, private dialog: MatDialog) {}

  checkUser(u: User) {
    this.http.get<User[]>('http://localhost:8080/api/users').subscribe((jsonArray) => {
      let n_p: string[] = jsonArray.map(e => e.name + '_' + e.password);
      this.validUser = n_p.includes(u.name + '_' + u.password);
      console.log('Hello?')
    });
  }

  openSignUpDialog() {
    this.dialog.open(SignupComponent);
  }
}
