import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { NavigationComponent } from './navigation/navigation.component';

const routes: Routes = [
  { path: 'welcome', component: WelcomePageComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'prefix' },
  { path: 'movies', component: NavigationComponent } // Movies is the default view inside the navigation component
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Creates in-app navigation using the routes defined above
  exports: [RouterModule]
})

export class AppRoutingModule { }
