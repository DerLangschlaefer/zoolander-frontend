import { Component } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {HttpClient} from "@angular/common/http";
import {SignupAttempt} from "./signupAttempt";
import {SignupResponse} from "./signupResponse";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  newUser: SignupAttempt = {} as SignupAttempt;

  constructor(private http: HttpClient, private dialogRef: MatDialogRef<SignupComponent>) {}

  signup() {
    this.http.post<SignupResponse>("http://localhost:8080/api/signup", this.newUser).subscribe(signupResponse => {
      console.log(signupResponse.status);
      this.dialogRef.close();
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
