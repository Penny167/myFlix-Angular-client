/** 
 * The GenreComponent is used to render a mat dialog containing information about the genre
 * of the movie selected.
 * @module GenreComponent
 */

import { Component, Inject, OnInit } from '@angular/core';
// MAT_DIALOG_DATA is an injection token that allows access to data passed in to a dialog.
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})
export class GenreComponent implements OnInit {
  /**
   * The data that was passed to the Genre dialog in the MovieCardComponent is injected in to the 
   * constructor using the MAT_DIALOG_DATA injection token. The data becomes a property on the class
   * and is hence available to be output in the template.
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: { name: string, description: string }) { }

  ngOnInit(): void { }

}
