import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {

  constructor(private dialogRef: MatDialogRef<SettingsComponent>) {}

  onClose(): void {
    this.dialogRef.close();
  }

  generateQRCode() {
  // this will be fun...
  }

}
