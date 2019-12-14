import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class MoviesService {
  movieList: any[] = [
    { movieName: 'Adventure', thumbnail: 'games.jpg'},
    { movieName: 'Action', thumbnail: 'movies.jpg'}
  ];

  constructor(private http: HttpClient) { }

  getMoviesList(): Observable<any> {
    const headers = new HttpHeaders({ 'X-Emby-Token' : '3e3397ed0e474a0f8ed1077b60ddb5bb' });
    const options = { headers: headers };
    return this.http.get<any>('http://192.168.1.6:8096/emby/Items?Recursive=true&IncludeItemTypes=Movie', options).pipe(
            tap(data => console.log('Data Fetched:' + JSON.stringify(data))),
            catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse) {
    let errMsg = '';
    if (err.error instanceof Error) {
       // A client-side or network error occurred. Handle it accordingly.
       console.log('An error occurred:', err.error.message);
       errMsg = err.error.message;
      }
    else {
       // The backend returned an unsuccessful response code.
       // The response body may contain clues as to what went wrong,
       console.log(`Backend returned code ${err.status}`);
       errMsg = err.error.status;
     }
     return throwError(errMsg);
  }

}

