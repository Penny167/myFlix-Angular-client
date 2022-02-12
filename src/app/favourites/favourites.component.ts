/** 
 * The MovieCardComponent is used to display the data retrieved from the movies collection of the
 * myFlix database. The data is looped through using the ngFor directive and each movie is rendered as
 * a mat card in the template. The cards display the title, director and an image of the movie and contain
 * buttons that can be opened to display dialogs with further information about the director or genre, 
 * or a synopsis. Movies can be added to or removed from favourites by clicking on a heart icon contained
 * in the top right corner of each card. The heart colour toggles accordingly to reflect the movie's status.
 * 
 * @module FavouritesComponent
 */

import { Component, OnInit } from '@angular/core';
// Used to access the getUser and deleteFavourite functions created on the service
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

  favourites: any[] = [];
  username = localStorage.getItem('user');

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  /**
   * Calls the getFavouriteMovies method as soon as the component loads so that the data can
   * be used to populate the template.
   */
  ngOnInit(): void { this.getFavouriteMovies() }

  /** 
   * Invokes the getUser method on the fetchApiData service and populates the favourites array with
   * the favouriteMovies property on the response, which is an array of the user's favourite movies. 
   */
  getFavouriteMovies(): void {
    this.fetchApiData.getUser(this.username!).subscribe((resp: any) => { this.favourites = resp.FavouriteMovies });
  }

  /**
   * Opens a dialog to display the genre component, passing it the data it needs to display
   * genre information inside the data object.
   * @param name Name of the genre for the movie selected.
   * @param description Description of the genre.
   */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: { name: name, description: description },
      width: '280px' 
    });
  } 

  /**
   * Opens a dialog to display the director component, passing it the data it needs to display
   * information about the director inside the data object.
   * @param name Name of the director of the movie selected.
   * @param bio Biography of the director.
   * @param birth Year of birth of the director.
   * @param death Year of death of the director.
   */
  openDirectorDialog(name: string, bio: string, birth: string, death: string): void {
    this.dialog.open(DirectorComponent, {
      data: { name: name, bio: bio, birth: birth, death: death },
      width: '280px' 
    });
  }

  /**
   * Opens a dialog to display the synopsis component, passing it the data it needs to display a
   * synopsis of the movie within the data object.
   * @param title Title of the movie selected.
   * @param description Synopsis of the movie.
   */
  openSynopsisDialog(description: string): void {
    this.dialog.open(SynopsisComponent, {
      data: { description: description },
      width: '280px' 
    });
  }

  /**
   * Invokes the deleteFavourite method on the fetchApiData service, to delete the movie from 
   * the user's favourites. If successful, a popup is displayed confirming that the movie has been
   * removed. If unsuccessful, a popup message asks the user to try again.
   * @param movieID 
   * @param title 
   */
  deleteFavouriteMovie(movieID: string, title: string): void {
    this.fetchApiData.deleteFavourite(this.username!, movieID).subscribe((resp: any) => { 
      this.favourites = resp;
      this.snackBar.open(`${title} has been removed from your favourites`, 'Ok', { duration: 4000, panelClass: 'snack-style' });
     }, (result) => {
       console.log(result);
       this.snackBar.open(`Hmm, we couldn't unfavourite ${title}. Please try again`, 'Ok', {
         duration: 4000
       }); 
    });
  }

  /**
   * Adjusts the font for one movie with a long title that is affecting the layout. For a larger
   * movies dataset where multiple movies may have longer titles, this could be refactored to use
   * the movieTitle length.
   * @param movieTitle The title of the movie being rendered.
   * @returns A number representing the font size in pixels used to style the movie title on the
   * movie's mat card.
   */
  fontSizer(favouriteTitle: string): number {
    if (favouriteTitle === 'Lord of the Rings: The Fellowship of the Ring') {
      return 16
    } else {
      return 18
    }
  }

}
