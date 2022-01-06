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

  user: any = { }; // Set user to an empty object
  username = localStorage.getItem('user'); // Username needed to make requests to Api endpoints
  password = localStorage.getItem('password'); // We want to display an unhashed password to the user
  
  constructor(
    public fetchApiData: FetchApiDataService, 
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void { this.getProfile() } // We want the data to populate the template as soon as the component loads

  getProfile(): void {
    this.fetchApiData.getUser(this.username!).subscribe((resp: any) => { this.user = resp });
  }

  openEditProfileFormDialog(): void {
    this.dialog.open(EditProfileFormComponent, { width: '280px' });
  }

  deleteProfile(): void {
    this.fetchApiData.deleteUser(this.username!).subscribe((result) => {
      localStorage.clear(); // Clears the local storage so the deregistered user can no longer access protected routes
      console.log(result);
      this.snackBar.open('Your profile has been removed!', 'X', { duration: 4000 });
      this.router.navigate(['welcome']); // Navigates back to the welcome page so the user must re-register if they wish to continue to use the app
     }, (result) => {
       console.log(result);
       this.snackBar.open("Hmm, we couldn't delete your profile. Please try again", 'OK', {
         duration: 4000
       });
     });
  }

}