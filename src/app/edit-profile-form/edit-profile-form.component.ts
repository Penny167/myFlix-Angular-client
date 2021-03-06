/** 
 * The EditProfileFormComponent is used to render a mat dialog containing a form where the
 * user can edit their profile details. 
 * @module EditProfileFormComponent
 */

import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
// Used to access the updateUser function created on this service
import { FetchApiDataService } from '../fetch-api-data.service'; 
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-profile-form',
  templateUrl: './edit-profile-form.component.html',
  styleUrls: ['./edit-profile-form.component.scss']
})

export class EditProfileFormComponent implements OnInit {
  /** 
   * profileData values are populated by form inputs in the edit-profile-form template that are bound 
   * using the ngModel directive.
   */ 
  profileData = { Username: '', Password: '', Email: '', Birthday: '' };
  username = localStorage.getItem('user');

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<EditProfileFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void { }

  /**
   * Invokes the updateUser method on the fetchApiData service, with the profileData from the form,
   * in order to update the user's details. A successful update closes the form and navigates the user
   * to the movies view. A popup is displayed confirming update success. If unsuccessful, a popup message
   * asks the user to check the form fields and try again.
   */
  updateProfile(): void {
    // The exclamation mark after username tells TypeScript that username will not be null to avoid a compilation error
    this.fetchApiData.updateUser(this.username!, this.profileData).subscribe((result) => { 
     this.dialogRef.close(); // Closes the dialog
     /**
      * We need to reset the username in local storage in case the user changed it when updating their profile 
      * because the new username will be needed for any subsequent requests to Api endpoints.
      */ 
     localStorage.setItem('user', this.profileData.Username);
     /**
      * We reset the password in local storage in case the user changed their password because the new
      * password will be needed to display an unhashed version in the profile view.
      */ 
     localStorage.setItem('password', this.profileData.Password); 
     this.snackBar.open('Your details have been updated!', 'Cool', { duration: 4000, panelClass: 'snack-style' });
     /**
      * The redirectToMovies method forces the page to reopen, so a timeout is set to ensure that the snackbar
      * message has time to be displayed before this takes place.
      */
     setTimeout(this.redirectToMovies, 4000); 
    }, (result) => {
      console.log(result);
      this.snackBar.open("Sorry, the update didn't work. Please check you've completed all the fields and try again", 'Ok', {
        duration: 4000
      });
    });
  }

  /**
   * After the user has updated their profile, their old profile will continue to be displayed until the
   * next time that the profile component is loaded. We therefore take the user back to the movies view.
   * Because the movies view and profile view are both inside the navigation component that is currently
   * set to display the profile view, we need to refresh the page to return to the default view of the 
   * navigation component, which will display the movie view that we want to see.
   */
  redirectToMovies(): void {
    window.open('/movies', '_self');
  }

}
