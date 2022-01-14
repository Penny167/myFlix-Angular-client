/** 
 * The UserRegistrationFormComponent is used to render a mat dialog containing a form where the
 * user can complete and submit a profile to register for myFlix. 
 * @module UserRegistrationFormComponent
 */

import { Component, OnInit } from '@angular/core';
// Used to reference a dialog created using the MatDialog service
import { MatDialogRef } from '@angular/material/dialog'; 
// Used to access the userRegistration function created on this service
import { FetchApiDataService } from '../fetch-api-data.service'; 
// Used to create pop-up notifications to the user
import { MatSnackBar } from '@angular/material/snack-bar'; 

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})

export class UserRegistrationFormComponent implements OnInit {
  /** 
   * userData values are populated by form inputs in the user-registration-form template that are 
   * bound using the ngModel directive.
   */ 
  userData = { Username: '', Password: '', Email: '', Birthday: '' };
  
  /** 
   * Passing classes as parameters to the constructor sets them as properties on the component class 
   * that can then be accessed as needed.
   */ 
  constructor( 
    public fetchApiData: FetchApiDataService,
    // Creates a reference to the dialog that contains the UserRegistrationForm component
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar 
  ) { }

  ngOnInit(): void { }

  /**
   * Invokes the userRegistration method on the fetchApiData service, with the userData from the form,
   * in order to register the user. Successful registration closes the form and a popup is displayed 
   * inviting the user to log in. If unsuccessful, a popup message will ask the user to try again with a 
   * different username.
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => { 
      // Closes the dialog that was opened by the WelcomePageComponent when the register button was clicked
      this.dialogRef.close(); 
      this.snackBar.open(`Welcome to myFlix ${this.userData.Username}! Log in to start browsing movies.`, 'Cool!', // Message pops up to confirm successful registration
        { duration: 4000, panelClass: 'snack-style' }
      );
    }, (result) => {
      console.log(result);
      this.snackBar.open("Sorry we couldn't register you. Please try a different username", 'Ok',
        { duration: 4000, panelClass: 'snack-style' }
      );
    });
  }

}
