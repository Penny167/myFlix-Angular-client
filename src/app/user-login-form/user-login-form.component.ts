import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})

export class UserLoginFormComponent implements OnInit {

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
     localStorage.setItem('password', this.loginData.Password);
     localStorage.setItem('user', result.user.Username);
     localStorage.setItem('token', result.token);
     console.log(result);
     this.snackBar.open(`Hi ${this.loginData.Username}! You're logged in`, 'Great!', { duration: 4000 });
     this.router.navigate(['movies']);
    }, (result) => {
      console.log(result);
      this.snackBar.open(`Sorry ${this.loginData.Username} we couldn't log you in. Please check your username and password`, 'OK', {
        duration: 4000
      });
    });
  }

}
