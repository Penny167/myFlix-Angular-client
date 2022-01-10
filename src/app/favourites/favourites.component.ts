import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})

export class FavouritesComponent implements OnInit {

  favourites: any[] = []; // Set favourites equal to empty array
  username = localStorage.getItem('user'); // Username needed to make requests to Api endpoints

  constructor(public fetchApiData: FetchApiDataService, public dialog: MatDialog, public snackBar: MatSnackBar) { }

  ngOnInit(): void { this.getFavouriteMovies() }

  getFavouriteMovies(): void {
    this.fetchApiData.getUser(this.username!).subscribe((resp: any) => { this.favourites = resp.FavouriteMovies });
  }

  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: { name: name, description: description },
      width: '280px' 
    });
  } 

  openDirectorDialog(name: string, bio: string, birth: string, death: string): void {
    this.dialog.open(DirectorComponent, {
      data: { name: name, bio: bio, birth: birth, death: death },
      width: '280px' 
    });
  }

  openSynopsisDialog(description: string): void {
    this.dialog.open(SynopsisComponent, {
      data: { description: description },
      width: '280px' 
    });
  }

  deleteFavouriteMovie(movieID: string, title: string): void {
    this.fetchApiData.deleteFavourite(this.username!, movieID).subscribe((resp: any) => { 
      this.favourites = resp;
      this.snackBar.open(`${title} has been removed from your favourites!`, 'Ok', { duration: 4000, panelClass: 'snack-style' });
     }, (result) => {
       console.log(result);
       this.snackBar.open(`Hmm, we couldn't unfavourite ${title}. Please try again`, 'Ok', {
         duration: 4000
       }); 
    });
  }

// This function is purely to adjust the font on one movie with a long title that is affecting the layout
  fontSizer(favouriteTitle: string): number {
    if (favouriteTitle === 'Lord of the Rings: The Fellowship of the Ring') {
      return 16
    } else {
      return 18
    }
  }

}
