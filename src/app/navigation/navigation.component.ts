import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  // Set isHandset variable using observe method on the BreakpointObserver so we can use this in the template to change the layout for mobile screen sizes
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);
  componentDisplayed: String = 'movies';

  // A BreakpointObserver is added as a property so that we can use its methods within the class to implement layout changes for mobile screen sizes
  constructor(
    private breakpointObserver: BreakpointObserver,
    public snackBar: MatSnackBar,
    public router: Router
  ) { } 

  ngOnInit(): void { }

  changeComponentDisplayed(name: string): void { this.componentDisplayed = name }

  logout(): void {
    localStorage.clear(); // Clears the local storage so the logged out user can no longer use protected routes
    this.snackBar.open("You've been logged out. Goodbye!", 'X', { duration: 4000 });
    this.router.navigate(['welcome']); // Navigates back to the welcome page so the user must log in again if they wish to continue to use the app   
  }

}
