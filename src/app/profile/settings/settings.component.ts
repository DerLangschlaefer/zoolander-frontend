import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {

  constructor(private dialogRef: MatDialogRef<SettingsComponent>, private cookieService: CookieService) {}

  close(): void {
    this.dialogRef.close();
  }

  logout(): void {
    this.cookieService.delete('userID');
    this.close();
  }

  generateQRCode() {
  // this will be fun...
  }

}
