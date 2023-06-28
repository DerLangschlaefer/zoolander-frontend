import { Component } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {Logger} from "../user/logger";
import {HttpClient} from "@angular/common/http";
import {Post} from "../post/post";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  title = 'Zooland';
  newUser: Logger = {} as Logger;

  constructor(private http: HttpClient, private dialogRef: MatDialogRef<SignupComponent>) { }

  save() {
    this.http.post<Logger>("http://localhost:8080/api/users", this.newUser).subscribe(() => {
      this.dialogRef.close();
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }

}
