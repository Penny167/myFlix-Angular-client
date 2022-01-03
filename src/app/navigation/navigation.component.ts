import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
// Set isHandset variable using observe method on the BreakpointObserver so we can use this in the template to change the layout for mobile screen sizes
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);
// A BreakpointObserver is added as a property so that we can use its methods within the class to implement layout changes for mobile screen sizes
  constructor(private breakpointObserver: BreakpointObserver) { } 

  ngOnInit(): void {
  }

}
