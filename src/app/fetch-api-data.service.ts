/**
 * The FetchApiDataService is used to make Http requests to the myFlix Api to retrieve data on movies and
 * users that is used within the app, as well as to register and login users, update their details, and
 * to add or remove movies from their favourites. The class is marked with the Injectable decorator and
 * injected as a dependency to the root component, thereby making the service available to all the other
 * components.
 * @module FetchApiDataService
 */

// Used to provide the service as an injectable dependency to the root app
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
// Used to make Http requests to the Api
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
// Requests return Observables (similar to Promises) 
import { Observable, throwError } from 'rxjs';

// The Url for the heroku hosted Api to which the http requests are made
const apiUrl = 'https://intense-depths-38257.herokuapp.com/'; 

// The service is provided to the root app and hence becomes available to all components
@Injectable({
  providedIn: 'root' 
})

export class FetchApiDataService {
  
  constructor(private http: HttpClient) { }

  /**
   * Sends a POST request to register a new user.
   * @param userDetails An object containing the new user's username, password, email and birthday.
   * @returns An Observable that represents either a JSON object with the new user's details or the 
   * error if the request is unsuccessful.
   */
  public userRegistration(userDetails: any): Observable<any> { 
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe( 
    catchError(this.handleError)
    );
  }

  /**
   * Sends a POST request to log in a user.
   * @param userDetails An object containing the user's username and password.
   * @returns An Observable that represents either a JSON object with the user's details and a web token
   * that is used to make subsequent requests to protected routes whilst the user is logged in; or the 
   * error if the request is unsuccessful.
   */
  public loginUser(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(catchError(this.handleError));
  }

  /**
   * Sends a GET request to fetch details for the specified user.
   * @param username Username of the logged in user.
   * @returns An Observable that represents either a JSON object with the user's details or the 
   * error if the request is unsuccessful.
   */
  public getUser(username: string): Observable<any> { 
    const token = localStorage.getItem('token');
    /**
     * Protected routes require HttpHeaders containing the authorization token obtained when the 
     * user logged on. */  
    const response = this.http.get(apiUrl + 'users/' + username, { headers: new HttpHeaders({ Authorization: 'Bearer ' + token, })});
    return response.pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Sends a PUT request to update the user's details.
   * @param username Username of the logged in user.
   * @param newDetails An object containing the user's username, password, email and birthday, updated
   * to reflect any changes requested.
   * @returns An Observable that represents either a JSON object with the user's details, updated to
   * reflect the changes requested, or the error if the request is unsuccessful.
   */
  public updateUser(username: string, newDetails: any): Observable<any> { 
    const token = localStorage.getItem('token');
    const response = this.http.put(apiUrl + 'users/' + username, newDetails, { headers: new HttpHeaders({ Authorization: 'Bearer ' + token, })});
    return response.pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Sends a DELETE request to deregister the user.
   * @param username Username of the logged in user.
   * @returns An Observable that represents either a text response confirming that the user has been
   * deregistered or the error if the request is unsuccessful.
   */
  public deleteUser(username: string): Observable<any> { 
    const token = localStorage.getItem('token');
    const response = this.http.delete(apiUrl + 'users/' + username, 
    /**
     * Because this request returns a text response rather than a JSON object, the response type
     * must be specified in the request.
     */
      { headers: new HttpHeaders({ Authorization: 'Bearer ' + token, }), responseType: 'text' }
    );
    return response.pipe(catchError(this.handleError));
  }

  /**
   * Sends a GET request to fetch details for all movies.
   * @returns An Observable that represents either a JSON object with details of all movies or the 
   * error if the request is unsuccessful.
   */
  public getAllMovies(): Observable<any> { 
    const token = localStorage.getItem('token');
    const response = this.http.get(apiUrl + 'movies', { headers: new HttpHeaders({ Authorization: 'Bearer ' + token, })});
    return response.pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Sends a Put request to add a movie to the user's favourites.
   * @param username Username of the logged in user.
   * @param movieID ID of the movie to be added to the user's favourites.
   * @returns An Observable that represents either a JSON object with details of the user's updated
   * favourite movies or the error if the request is unsuccessful.
   */
  public addFavourite(username: string, movieID: any): Observable<any> { 
    const token = localStorage.getItem('token');
    const response = this.http.put(apiUrl + `users/${username}/${movieID}`, movieID, { headers: new HttpHeaders({ Authorization: 'Bearer ' + token, })});
    return response.pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Sends a DELETE request to remove a movie from the user's favourites.
   * @param username Username of the logged in user.
   * @param movieID ID of the movie to be removed from the user's favourites.
   * @returns An Observable that represents either a JSON object with details of the user's updated
   * favourite movies or the error if the request is unsuccessful.
   */
  public deleteFavourite(username: string, movieID: any): Observable<any> { 
    const token = localStorage.getItem('token');
    const response = this.http.delete(apiUrl + `users/${username}/${movieID}`, { headers: new HttpHeaders({ Authorization: 'Bearer ' + token, })});
    return response.pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Takes a request response and returns either the response body or an empty object.
   * @param res The response to an Http request.
   * @returns Either the response or an empty object.
   */
  private extractResponseData(res: any): any { 
    const body = res;
    return body || { };
  }

  /**
   * Handles error responses to Http requests.
   * @param error The HttpErrorReponse returned on the Observable's response stream.
   * @returns An observable that errors with the specified message.
   */
  private handleError(error: HttpErrorResponse): Observable<any> { 
    // Checks if the error relates to network problems or front-end errors
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    // For server-side errors, log the error response returned from the server
    console.error(`Error Status code ${error.status}, ` + `Error body is: ${JSON.stringify(error.error)}`);
    }
    return throwError("Something hasn't worked; please try again later.");
  }

}
