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
  
  username = localStorage.getItem('user'); // Username needed to make requests to Api endpoints
  movies: any[] = [];
  favourites: any[] = []; // Set favourites equal to empty array


  constructor(public fetchApiData: FetchApiDataService, public dialog: MatDialog, public snackBar: MatSnackBar) { }
  
  ngOnInit(): void { 
    this.getMovies();
    this.getFavouriteMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => { this.movies = resp });
  }

  getFavouriteMovies(): void {
    this.fetchApiData.getUser(this.username!).subscribe((resp: any) => { this.favourites = resp.FavouriteMovies });
  }

  toggleHeart(movieID: string): string {
    let movieIds = this.favourites.map(favourite => { return favourite._id });
    return movieIds.includes(movieID) ? 'warn' : 'accent';
  }
  
  toggleFavourite(movieID: string, title: string): void {
    let movieIds = this.favourites.map(favourite => { return favourite._id });
    console.log(movieIds);
    if (movieIds.includes(movieID)) {
      this.deleteMovieFromFavourites(movieID, title);
    } else {
      this.addMovieToFavourites(movieID, title);
    }
  }

  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: { name: name, description: description },
      width: '250px' 
    });
  } 

  openDirectorDialog(name: string, bio: string, birth: string, death: string): void {
    this.dialog.open(DirectorComponent, {
      data: { name: name, bio: bio, birth: birth, death: death },
      width: '250px' 
    });
  }

  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(SynopsisComponent, {
      data: { title: title, description: description },
      width: '250px' 
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

// This function is purely to adjust the font on one movie with a long title that is affecting the layout
  fontSizer(movieTitle: string): number {
    if (movieTitle === 'Lord of the Rings: The Fellowship of the Ring') {
      return 16
    } else {
      return 18
    }
  }

}
