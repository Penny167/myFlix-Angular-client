import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})

export class MovieCardComponent implements OnInit {
  
  movies: any[] = [];
  username = localStorage.getItem('user'); // Username needed to make requests to Api endpoints
  favourites: any[] = []; // Set favourites equal to empty array

  constructor(public fetchApiData: FetchApiDataService, public dialog: MatDialog, public snackBar: MatSnackBar) { }
  
  ngOnInit(): void { this.getMovies() }
  
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => { this.movies = resp });
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

  addMovieToFavourites(movieID: string, title: string): void {
    this.fetchApiData.addFavourite(this.username!, movieID).subscribe((resp: any) => { 
      this.favourites = resp;
      this.snackBar.open(`${title} has been added to favourites!`, 'OK', { duration: 4000 });
    },  (result) => {
        console.log(result);
        this.snackBar.open(`Hmm, we couldn't add ${title} to favourites. Please try again`, 'OK', { duration: 4000 }); 
    });
  }

  deleteMovieFromFavourites(movieID: string, title: string): void {
    this.fetchApiData.deleteFavourite(this.username!, movieID).subscribe((resp: any) => { 
      this.favourites = resp;
      this.snackBar.open(`${title} has been removed from favourites!`, 'OK', { duration: 4000 });
    },  (result) => {
        console.log(result);
        this.snackBar.open(`Hmm, we couldn't unfavourite ${title}. Please try again`, 'OK', { duration: 4000 }); 
    });
  }

}
