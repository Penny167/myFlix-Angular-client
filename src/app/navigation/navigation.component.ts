/** 
 * The NavigationComponent is used to display the main views of the app after the user has logged in.
 * Angular Material's sidenav-container is used to render a responsive container, containing a navigation
 * toolbar and a mat-sidenav-content element, the content of which reflects the navigation option currently 
 * selected by the user. The toolbar has been configured to render a traditional horizontally placed 
 * menu of navigation buttons at non-mobile screen sizes, and a menu icon that toggles a mat sidenav drawer
 * that contains a list of vertical navigation buttons, at mobile screen sizes. The BreakpointObserver from
 * Angular layout is used to track the screen size at any point and render the appropriate navigation 
 * configuration accordingly. In all cases, the content inside the view is updated using the ngSwitch 
 * directive when the user clicks on a navigation button. The navigation options include a button to log 
 * out the user when they wish to end their current myFlix session. 
 * @module NavigationComponent
 */

import { Component, OnInit } from '@angular/core';
/**
 * Breakpoint components from the Angular layout module are used to make the view responsive by allowing 
 * the state of elements, relative to specified breakpoints, to be checked. 
 */ 
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

  /**
   * The isHandset variable is set by using the observe method on the BreakpointObserver (initialized to 
   * the component in the constructor). This will return a match when the screen size reaches the "Handset"
   * breakpoint ie when the screen size reaches that for mobile devices.
   */
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);

  /**
   * componentDisplayed is the value that ngSwitch uses to determine which view to display as the 
   * side-nav content. The value is updated when the user clicks a navigation button using event binding.
   * The default view is movies when the component loads, which displays the movie-card component.
   */
  componentDisplayed: String = 'movies';
 
  /**
   * Parameters passed to the constructor become properties on the component. 
   * @param breakpointObserver Used to implement breakpoint monitoring to make the layout responsive.
   * @param snackBar 
   * @param router Used to navigate the user back to the welcome page then they log out.
   */
  constructor(
    private breakpointObserver: BreakpointObserver,
    public snackBar: MatSnackBar,
    public router: Router
  ) { } 

  ngOnInit(): void { }
 
  /**
   * Updates the value of componentDisplayed based on the nav item selected by the user, thereby 
   * changing the view displayed in the sidenav-content-element.
   * @param name Name of the switch case that will render the view selected by the user from the
   * navigation menu. 
   */
  changeComponentDisplayed(name: string): void { this.componentDisplayed = name }

  /**
   * Logs out the user by clearing their username, password and token from local storage so that they can 
   * no longer access protected routes. On logging out, a goodbye popup message is displayed and the user 
   * is navigated back to the welcome page. 
   */
  logout(): void {
    localStorage.clear(); // Clears the local storage so the logged out user can no longer use protected routes
    this.snackBar.open("You've been logged out. Goodbye!", 'X', { duration: 4000, panelClass: 'snack-style' });
    this.router.navigate(['welcome']); // Navigates back to the welcome page so the user must log in again if they wish to continue to use the app   
  }

}
