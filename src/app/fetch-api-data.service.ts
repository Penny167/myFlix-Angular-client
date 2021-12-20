import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

const apiUrl = 'https://intense-depths-38257.herokuapp.com/'; // Url for the heroku hosted api to which we will make our http requests

@Injectable({
  providedIn: 'root' // Indicates that this service will be provided to the root of app and hence available to all components
})

export class FetchApiDataService {
  
  constructor(private http: HttpClient) { } // Injects HttpClient so the service can now access its methods using this.http

  public userRegistration(userDetails: any): Observable<any> { // Post request to register a new user
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe( // Post request to the user registration endpoint
    catchError(this.handleError)
    );
  }

  public loginUser(userDetails: any): Observable<any> { // Post request to log in a user. User does not receive token until logged in so no headers used.
    console.log(userDetails);
    const response = this.http.post(apiUrl + 'login', userDetails);
    return response.pipe(
      map(this.extractResponseData), // Response here should be the logged in user + the token generated at login
      catchError(this.handleError)
    );
  }

  public getUser(username: string): Observable<any> { // Get request to return user details
    const token = localStorage.getItem('token');
    const response = this.http.get(apiUrl + 'users/' + username, { headers: new HttpHeaders({ Authorization: 'Bearer ' + token, })});
    return response.pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  public updateUser(username: string, newDetails: any): Observable<any> { // Put request to update the user's details
    const token = localStorage.getItem('token');
    const response = this.http.put(apiUrl + 'users/' + username, newDetails, { headers: new HttpHeaders({ Authorization: 'Bearer ' + token, })});
    return response.pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  public deleteUser(username: string): Observable<any> { // Delete request to deregister user
    const token = localStorage.getItem('token');
    const response = this.http.delete(apiUrl + 'users/' + username, { headers: new HttpHeaders({ Authorization: 'Bearer ' + token, })});
    return response.pipe(catchError(this.handleError));
  }

  public getAllMovies(): Observable<any> { // Get request to return all movies
    const token = localStorage.getItem('token');
    const response = this.http.get(apiUrl + 'movies', { headers: new HttpHeaders({ Authorization: 'Bearer ' + token, })});
    return response.pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  public getOneMovie(title: string): Observable<any> { // Get request to return a single movie with title provided
    const token = localStorage.getItem('token');
    const response = this.http.get(apiUrl + 'movies/' + title, { headers: new HttpHeaders({ Authorization: 'Bearer ' + token, })});
    return response.pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  public getGenre(genreName: string): Observable<any> { // Get request to return a movie genre description for the genre provided
    const token = localStorage.getItem('token');
    const response = this.http.get(apiUrl + 'movies/genre/' + genreName, { headers: new HttpHeaders({ Authorization: 'Bearer ' + token, })});
    return response.pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  public getDirector(directorName: string): Observable<any> { // Get request to return details about the director with the name provided
    const token = localStorage.getItem('token');
    const response = this.http.get(apiUrl + 'movies/director/' + directorName, { headers: new HttpHeaders({ Authorization: 'Bearer ' + token, })});
    return response.pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  public getFavourites(username: string): Observable<any> { // Get request to return user's favourites
    const token = localStorage.getItem('token');
    const response = this.http.get(apiUrl + 'users/' + username + '/favourites', { headers: new HttpHeaders({ Authorization: 'Bearer ' + token, })});
    return response.pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  public addFavourite(username: string, movieID: any): Observable<any> { // Put request to add movie to a user's favourites
    const token = localStorage.getItem('token');
    const response = this.http.put(apiUrl + `users/${username}/${movieID}`, { headers: new HttpHeaders({ Authorization: 'Bearer ' + token, })});
    return response.pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  public deleteFavourite(username: string, movieID: any): Observable<any> { // Delete request to delete movie from a user's favourites
    const token = localStorage.getItem('token');
    const response = this.http.delete(apiUrl + `users/${username}/${movieID}`, { headers: new HttpHeaders({ Authorization: 'Bearer ' + token, })});
    return response.pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  private extractResponseData(res: any): any { // Returns the response or an empty object
    const body = res;
    return body || { };
  }

  private handleError(error: HttpErrorResponse): any { // Custom error handling function 
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(`Error Status code ${error.status}, ` + `Error body is: ${error.error}`);
    }
    return throwError("Something hasn't worked; please try again later.");
  }

}
