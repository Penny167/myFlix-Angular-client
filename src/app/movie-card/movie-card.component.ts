import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
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

  constructor(public fetchApiData: FetchApiDataService, public dialog: MatDialog) { }
  
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

}
