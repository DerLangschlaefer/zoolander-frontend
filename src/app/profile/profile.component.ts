import { Component } from '@angular/core';
import {Profile} from "./profile";
import {MatDialog} from "@angular/material/dialog";
import {SignupComponent} from "../signup/signup.component";
import {SettingsComponent} from "./settings/settings.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  // fields
  profile: Profile = {icon: "monkey", username: "tayoneumann", followers: 460, following: 896, bio: "三段を登るか登ろうとして死ぬか"}

  // constructor
  constructor(private dialog: MatDialog) {}

  // methods
  openSettingsDialog() {this.dialog.open(SettingsComponent);}

}
