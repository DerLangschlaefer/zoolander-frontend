import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "./user"; // I got an error when changing the casing from User.ts file to user.ts (lower case), disappeared on re-opening the project

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
    this.http.get<User[]>('http://localhost:8080/api/users').subscribe((jsonArray) => {
      this.users = jsonArray;
    });
  }

}
