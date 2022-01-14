/** 
 * The ProfileComponent is used to render a mat card displaying the user's profile details. This includes
 * two action buttons to edit their profile and deregister from the application, respectively.
 * @module ProfileComponent
 */

import { Component, OnInit } from '@angular/core';
// Used to access the getUser function created on this service
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileFormComponent } from '../edit-profile-form/edit-profile-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
// Used to navigate the user back to the welcome page on successful deregistration
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

  user: any = { }; 
  username = localStorage.getItem('user');
  // We want to display an unhashed password to the user so we retrieve it from local storage 
  password = localStorage.getItem('password'); 
  
  constructor(
    public fetchApiData: FetchApiDataService, 
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }
  
  /**
   * Calls the getProfile method as soon as the component loads so that the data can be used to populate
   * the template.
   */  
  ngOnInit(): void { this.getProfile() } 

  /** 
   * Invokes the getUser method on the fetchApiData service and populates the user object with
   * the response. 
   */ 
  getProfile(): void {
    this.fetchApiData.getUser(this.username!).subscribe((resp: any) => { this.user = resp });
  }

  /**
   * Opens a dialog containing the edit-profile-form component that renders the edit profile form.
   */ 
  openEditProfileFormDialog(): void {
    this.dialog.open(EditProfileFormComponent, { width: '280px' });
  }

  /** 
   * Invokes the deleteUser method on the fetchApiData service to deregister the user. If deregistration
   * is successful the local storage is cleared, a popup confirms that the profile has been removed and
   * the user is routed back to the welcome page. If unsuccessful, a popup message asks the user to 
   * try again.
   */
  deleteProfile(): void {
    this.fetchApiData.deleteUser(this.username!).subscribe(() => {
      // Clears the local storage so the deregistered user can no longer access protected routes
      localStorage.clear(); 
      this.snackBar.open('Your profile has been removed!', 'X', { duration: 4000, panelClass: 'snack-style' });
      this.router.navigate(['welcome']); // Navigates back to the welcome page
    }, (result) => {
       console.log(result);
       this.snackBar.open("Hmm, we couldn't delete your profile. Please try again", 'Ok', { duration: 4000, panelClass: 'snack-style' });
    });
  }

}