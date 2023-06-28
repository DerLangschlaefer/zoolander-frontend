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

  constructor(private http: HttpClient, private dialogRef: MatDialogRef<SignupComponent>) {
    this.newUser.password = "";
  }

  signup() {
    this.http.post<SignupResponse>("http://localhost:8080/api/signup", this.newUser).subscribe(signupResponse => {
      console.log(signupResponse.status);
      this.dialogRef.close();
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

  // password validation methods
  isLong(pw: string): boolean {
    return pw.length > 5;
  }

  hasNumber(pw: string): boolean {
    return pw.replace(/[^0-9]/g, "").length > 0;
  }

  hasUpper(pw: string): boolean {
    return pw.replace(/[^A-Z]/g, "").length > 0;
  }

  hasSpecial(pw: string): boolean {
    return pw.replace(/[a-zA-Z0-9]/g, "").length > 0;
  }

}
