import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router'; // We use the router here to route the user to the movies view on a successful login

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})

export class UserLoginFormComponent implements OnInit {
// loginData values will be populated by using the ngModel directive on the form inputs in the user-login-form template
  loginData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router 
  ) { }

  ngOnInit(): void { }

  userLogin(): void {
    this.fetchApiData.loginUser(this.loginData).subscribe((result) => {
     this.dialogRef.close();
// We set the localStorage password using the loginData because the password returned by the api
// is hashed so will be nonsensical to the user when displayed in their profile
     localStorage.setItem('password', this.loginData.Password); 
     localStorage.setItem('user', result.user.Username);
     localStorage.setItem('token', result.token);
     console.log(result);
     this.snackBar.open(`Hi ${this.loginData.Username}. You're logged in to myFlix!`, 'Cool', { duration: 4000 });
     this.router.navigate(['movies']); // Navigate to the movies route
    }, (result) => {
      console.log(result);
      this.snackBar.open(`Sorry ${this.loginData.Username} we couldn't log you in. Please check your username and password`, 'Ok', {
        duration: 4000
      });
    });
  }

}
