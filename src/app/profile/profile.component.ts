import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileFormComponent } from '../edit-profile-form/edit-profile-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

  user: any = { }; // Create a user variable that is an empty object
  username = localStorage.getItem('user'); // Username needed to make the requests to the Api endpoints
  password = localStorage.getItem('password'); // We want to display an unhashed password to the user so we retrieve it from local storage
  
  constructor(
    public fetchApiData: FetchApiDataService, 
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void { this.getProfile() } // We want the data to populate the template as soon as the component loads
// Gets the user data and populates the user object
  getProfile(): void {
    this.fetchApiData.getUser(this.username!).subscribe((resp: any) => { this.user = resp });
  }
// Opens a dialog to display the edit-profile-form component
  openEditProfileFormDialog(): void {
    this.dialog.open(EditProfileFormComponent, { width: '280px' });
  }
// Deletes the user and redirects back to the welcome page
  deleteProfile(): void {
    this.fetchApiData.deleteUser(this.username!).subscribe(() => {
      localStorage.clear(); // Clears the local storage so the deregistered user can no longer access protected routes
      this.snackBar.open('Your profile has been removed!', 'X', { duration: 4000, panelClass: 'snack-style' });
      this.router.navigate(['welcome']); // Navigates back to the welcome page
    }, (result) => {
       console.log(result);
       this.snackBar.open("Hmm, we couldn't delete your profile. Please try again", 'Ok', { duration: 4000, panelClass: 'snack-style' });
    });
  }

}