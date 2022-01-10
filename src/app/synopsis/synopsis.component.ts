/** 
 * The SynopsisComponent is used to render a mat dialog containing a synopsis of the movie selected.
 * @module DirectorComponent
*/

import { Component, Inject, OnInit } from '@angular/core';
// MAT_DIALOG_DATA is an injection token that allows access to data passed in to a dialog.
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-synopsis',
  templateUrl: './synopsis.component.html',
  styleUrls: ['./synopsis.component.scss']
})
export class SynopsisComponent implements OnInit {
  /**
   * The data that was passed to the Synopsis dialog in the MovieCardComponent is injected to the 
   * constructor using the MAT_DIALOG_DATA injection token. The data becomes a property on the class
   * and is hence available to be output in the template.
  */ 
  constructor(@Inject(MAT_DIALOG_DATA) public data: { title: string, description: string }) { }

  ngOnInit(): void { }

}
