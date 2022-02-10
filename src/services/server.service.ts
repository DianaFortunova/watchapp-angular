import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Genres } from 'src/entities/genres';
import { catchError, mapTo, Observable, of } from 'rxjs';
import { MoviesAndSeries } from 'src/entities/moviesandseries';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  serverUrl = "http://localhost:8080/";

  constructor(private http: HttpClient) { }

  getGenres(): Observable<Genres[]> {
    return this.http.get<Genres[]>(this.serverUrl + "genres");
  }

  getGenre(id: number): Observable<Genres> {
    return this.http.get<Genres>(this.serverUrl + "genres/" + id);
  }

  getMoviesAndSeries(idGenre: number): Observable<MoviesAndSeries[]>{
    return this.http.get<MoviesAndSeries[]>(this.serverUrl + "moviesandseries/" + idGenre);
  }

  sendMoviesAndSeries(moviesandseries: MoviesAndSeries): Observable<MoviesAndSeries>{
    return this.http.post<MoviesAndSeries>(this.serverUrl + "moviesandseries", moviesandseries);
  }
  deleteMoviesAndSeries(id: number): Observable<boolean> {
    return this.http.delete(this.serverUrl + "moviesandseries/" + id).pipe(
      mapTo(true),
      catchError(error => of(false))
    );
  }
}
