import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
// import { MovieCardComponent } from './movie-card/movie-card.component';
import { NavigationComponent } from './navigation/navigation.component';

const routes: Routes = [
  { path: 'welcome', component: WelcomePageComponent },
//  { path: 'movies', component: MovieCardComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'prefix' },
  { path: 'movies', component: NavigationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
