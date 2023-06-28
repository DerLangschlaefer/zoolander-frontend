import {Component, OnInit} from '@angular/core';
import {Logger} from "./user/logger";
import {HttpClient} from "@angular/common/http";
import {SignupComponent} from "./signup/signup.component";
import {MatDialog} from "@angular/material/dialog";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Zooland';
  user: Logger = {} as Logger;
  isRegistered: boolean = false;

  constructor(private http: HttpClient, private dialog: MatDialog, private cookieService: CookieService) {}

  ngOnInit() {
    if (this.cookieService.check('userID')) {
      this.isRegistered = true;
      this.user.userID = this.cookieService.get('userID');
    }
  }

  login(frontendUser: Logger) {
    this.http.get<Logger[]>('http://localhost:8080/api/users').subscribe(backendUsers => {
      for (let backendUser of backendUsers) {
        if (backendUser.name == frontendUser.name && backendUser.password == frontendUser.password) {
          this.isRegistered = true;
          this.cookieService.set('userID', backendUser.userID);
        }
      }
    })
  }

  openSignUpDialog() {
    this.dialog.open(SignupComponent);
  }
}
