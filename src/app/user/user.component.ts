import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "./User";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users?: User[];

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.http.get<User[]>('http://localhost:8080/api/profile').subscribe((jsonArray) => {
      this.users = jsonArray;
    });
  }

}
