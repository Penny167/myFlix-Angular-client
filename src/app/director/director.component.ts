import { Component, Inject, OnInit } from '@angular/core';
// MAT_DIALOG_DATA is an injection token that allows us to access data passed in to a dialog
import { MAT_DIALOG_DATA } from '@angular/material/dialog'; 

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.scss']
})
export class DirectorComponent implements OnInit {
// The data passed to the dialog is injected into the component so it can be used in the component template
  constructor(@Inject(MAT_DIALOG_DATA) public data: { name: string, bio: string, birth: string, death: string }) { }

  ngOnInit(): void { }

}
