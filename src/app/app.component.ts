import {Component, OnInit} from '@angular/core';
import {User} from "./user/user";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'ZOOLAND';
  user: User = {} as User;
  validUser: boolean = false;

  constructor(private http: HttpClient) {}

  checkUser(u: User) {
    this.http.get<User[]>('http://localhost:8080/api/users').subscribe((jsonArray) => {
      let n_p: string[] = jsonArray.map(e => e.name + '_' + e.password);
      this.validUser = n_p.includes(u.name + '_' + u.password);
    });
  }
}
