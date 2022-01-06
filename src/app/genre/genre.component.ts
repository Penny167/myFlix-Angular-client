import { Component, Inject, OnInit } from '@angular/core';
// MAT_DIALOG_DATA is an injection token that allows us to access data passed in to a dialog
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})
export class GenreComponent implements OnInit {
// The data passed to the dialog is injected into the component so it can be used in the component template
  constructor(@Inject(MAT_DIALOG_DATA) public data: { name: string, description: string }) { }

  ngOnInit(): void { }

}
