import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {SignupComponent} from "../signup/signup.component";
import {HttpClient} from "@angular/common/http";
import {LoginAttempt} from "./loginAttempt";
import {LoginResponse} from "./loginResponse";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginAttempt: LoginAttempt = {} as LoginAttempt;
  constructor(private http: HttpClient, private cookieService: CookieService, private dialog: MatDialog) {}

  login() {
    this.http.post<LoginResponse>('http://localhost:8080/api/login', this.loginAttempt).subscribe(loginResponse => {
      console.log(loginResponse.userID);
      if (loginResponse) { // this should test whether the string loginResponse.userID is not empty
        this.cookieService.set('userID', loginResponse.userID);
      }
    })
  }

  openSignUpDialog() {this.dialog.open(SignupComponent);}

}
