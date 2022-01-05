import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog'; // Used to create a reference to the dialog that we opened in the profile component so we can close it when the edit profile form has been successfully submitted
import { FetchApiDataService } from '../fetch-api-data.service'; // We will use the updateUser function created on this service to update the user's profile in our updateProfile function
import { MatSnackBar } from '@angular/material/snack-bar'; // Used to create pop-up notifications to the user that will confirm success or error messages

@Component({
  selector: 'app-edit-profile-form',
  templateUrl: './edit-profile-form.component.html',
  styleUrls: ['./edit-profile-form.component.scss']
})

export class EditProfileFormComponent implements OnInit {

  profileData = { Username: '', Password: '', Email: '', Birthday: '' };
  username = localStorage.getItem('user');

  constructor( // Passing these parameters sets them as properties on the class so we can access them
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<EditProfileFormComponent>,
    public snackBar: MatSnackBar 
  ) { }

  ngOnInit(): void { }

  updateProfile(): void {
    this.fetchApiData.updateUser(this.username!, this.profileData).subscribe((result) => { // The exclamation mark after username removes the typescript error relating to the fact that username could be null
     this.dialogRef.close(); // Closes the dialog
     localStorage.setItem('user', result.user.Username); // We need to reset the username in case the user changed it when updating their profile because we use it to access some of the Api endpoints
     localStorage.setItem('password', this.profileData.Password); // We want the unhashed password saved to local storage for the profile page so we need to reset this now in case the user changed their password
     console.log(result);
     this.snackBar.open('Your details have been updated!', 'OK', { duration: 4000 }); // Message pops up to confirm that profile has been updated successfully    
    }, (result) => {
      console.log(result);
      this.snackBar.open("Sorry, the update didn't work. Please check you've completed all the fields and try again", 'OK', {
        duration: 4000
      });
    });
  }

}
