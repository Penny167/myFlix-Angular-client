# MyFlixAngularClient

MyFlixAngularClient is a dynamic web application that allows users to explore classic movies. It consumes the myFlix API with a front end built using Angular. The project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.4.

## Live Demo

[Link to live website](https://penny167.github.io/myFlix-Angular-client/welcome)

## App overview

- A welcome page invites users to register or login depending on their status. Successful login takes registered users to the main view which displays movies as movie cards. Each card shows the movie title, director and image from the imdb. Buttons on the cards allow users to explore further details about the movie, the director and the movie genre that pop up as dialogs displaying the relevant information.

- Users can create a collection of favourite movies that they can navigate to from the main page. Movies are added to or removed from favourites by clicking on a heart icon displayed on their cards.

- In addition to the main view and favourites view there is a profile view where users can edit the details they provided at registration or deregister from the application.

- The application is designed to be responsive and uses Angular Material components to provide an optimised user experience.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

The application components are comprehensively commented throughout to provide more detailed explanation as to how they work. 

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
