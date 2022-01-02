import { Component, OnInit } from '@angular/core';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { ProfileComponent } from '../profile/profile.component';
import { FavouritesComponent } from '../favourites/favourites.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})

export class WelcomePageComponent implements OnInit {

  constructor(public dialog: MatDialog) { }
  ngOnInit(): void { }
  // This function opens the registration dialog when the registration button is clicked  
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, { width: '280px' });
  }
  // This function opens the login dialog when the login button is clicked
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, { width: '280px' });
  } 
  // This function opens the profile dialog when the profile button is clicked
  openProfileDialog(): void {
    this.dialog.open(ProfileComponent, { width: '500px' });
  }

  // This function opens the profile dialog when the profile button is clicked
  openFavouritesDialog(): void {
    this.dialog.open(FavouritesComponent, { width: '500px' });
  }

}
