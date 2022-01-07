import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog'; // Used to create a reference to the dialog that we opened in the profile component so we can close it when the edit profile form has been successfully submitted
import { FetchApiDataService } from '../fetch-api-data.service'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile-form',
  templateUrl: './edit-profile-form.component.html',
  styleUrls: ['./edit-profile-form.component.scss']
})

export class EditProfileFormComponent implements OnInit {
// profileData values will be populated by using the ngModel directive on the form inputs in the edit-profile-form template
  profileData = { Username: '', Password: '', Email: '', Birthday: '' };
  username = localStorage.getItem('user'); // Needed to access the Api endpoint for updating a user

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<EditProfileFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router 
  ) { }

  ngOnInit(): void { }

  updateProfile(): void {
    this.fetchApiData.updateUser(this.username!, this.profileData).subscribe((result) => { // The exclamation mark after username removes the typescript error relating to the fact that username could be null
     this.dialogRef.close(); // Closes the dialog
     localStorage.setItem('user', this.profileData.Username); // We need to reset the username in case the user changed it when updating their profile because we use it to access some of the Api endpoints
     localStorage.setItem('password', this.profileData.Password); // We want the unhashed password saved to local storage for the profile page so we need to reset this now in case the user changed their password
     this.snackBar.open('Your details have been updated!', 'Cool!', { duration: 4000, panelClass: 'snack-style' }); // Message pops up to confirm that profile has been updated successfully
     setTimeout(this.redirectToMovies, 4000); // This ensures the transition back to the movies view is smooth with enough time for the snackbar to be displayed
    }, (result) => {
      console.log(result);
      this.snackBar.open("Sorry, the update didn't work. Please check you've completed all the fields and try again", 'Ok', {
        duration: 4000
      });
    });
  }
// Redirects the user to the movies view after they have updated their profile
  redirectToMovies(): void {
    window.open('/movies', '_self'); // We need to refresh the page to get the default navigation route that contains the movie view
  }

}
