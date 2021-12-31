import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileFormComponent } from '../edit-profile-form/edit-profile-form.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

  user: { } = { }; // Set user to an empty object
  username = localStorage.getItem('user'); // Username needed to make request to getUser Api endpoint
  
  constructor(public fetchApiData: FetchApiDataService, public dialog: MatDialog) { }

  ngOnInit(): void { this.getProfile() } // We want the data to populate the template as soon as the component loads

  getProfile(): void {
    this.fetchApiData.getUser(this.username!).subscribe((resp: any) => { this.user = resp });
  }

  openEditProfileFormDialog(): void {
    this.dialog.open(EditProfileFormComponent, { width: '280px' });
  }

}
