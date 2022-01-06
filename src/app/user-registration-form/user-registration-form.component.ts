import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog'; // Used to create a reference to the dialog that we open in the app component so we can close it here if registration is successful
import { FetchApiDataService } from '../fetch-api-data.service'; // We will use the userRegistration function created on this service to register a user in our registerUser function
import { MatSnackBar } from '@angular/material/snack-bar'; // Used to create pop-up notifications to the user

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})

export class UserRegistrationFormComponent implements OnInit {

  userData = { Username: '', Password: '', Email: '', Birthday: '' };
  
  constructor( // Passing these parameters sets them as properties on each instance of the class
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar 
  ) { }

  ngOnInit(): void { }

  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => { // invokes the userRegistration function in our Api service, passing the userData
  // Logic for a successful user registration goes here
     this.dialogRef.close(); // Closes the dialog opened when the user clicks registration button in the app component
     console.log(result);
     this.snackBar.open(`Welcome to myFlix ${this.userData.Username}! Log in to start browsing movies`, 'Cool!', { // Message pops up to confirm successful registration
        duration: 4000
     });
    }, (result) => {
      console.log(result);
      this.snackBar.open("Sorry we couldn't register you. Please try a different username", 'Ok', {
        duration: 4000
      });
    });
  }

}
