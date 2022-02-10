import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Genres } from 'src/entities/genres';
import { MoviesAndSeries } from 'src/entities/moviesandseries';
import { ServerService } from 'src/services/server.service';

@Component({
  selector: 'app-moviesandseries',
  templateUrl: './moviesandseries.component.html',
  styleUrls: ['./moviesandseries.component.css']
})
export class MoviesandseriesComponent implements OnInit {

  idGenre: number = 0;
  genre: Genres | undefined;
  moviesandserieses: MoviesAndSeries[] = [];
  selectedMoviesAndSeries: MoviesAndSeries | undefined;
  editedMoviesAndSeries: MoviesAndSeries | undefined;
  emptyTitle = '';
  emptyRating = '';
  emptySeasons = '';
  emptyEpisodes = '';
  editedTitle= '';

  constructor(private activatedRoute: ActivatedRoute, 
              private serverService: ServerService) { }

  ngOnInit(): void {
    this.idGenre = +this.activatedRoute.snapshot.params['idGenre'];
    this.serverService.getGenre(this.idGenre).subscribe(gen => this.genre = gen);
    this.serverService.getMoviesAndSeries(this.idGenre).subscribe(mas => {
      this.moviesandserieses = mas;
      this.selectedMoviesAndSeries = mas[0];
      console.log("Filmyseriály ", mas);
    });

  }

  setNewMoviesAndSeries() {
    if (this.genre) {
      this.editedMoviesAndSeries = new MoviesAndSeries(this.emptyTitle, this.emptySeasons, 
        this.emptyEpisodes, this.emptyRating, this.idGenre );
    }
    
  }

  setCurrentMoviesAndSeries() {
    this.editedMoviesAndSeries = this.selectedMoviesAndSeries;
   /* if(this.genre && this.selectedMoviesAndSeries) {
      this.editedMoviesAndSeries = new MoviesAndSeries(this.selectedMoviesAndSeries.title,
        this.selectedMoviesAndSeries.numberOfSeasons,
        this.selectedMoviesAndSeries.numberOfEpisodes,
        this.selectedMoviesAndSeries.rating,
        this.selectedMoviesAndSeries.genreId);
    } */
  }

  changeTitle(event: string): String | null {
    const result = event ? new String(event) : null;
    console.log("Názov: ", result);
    return result;
  } 

  changeRating(event: string): String | null{
    const result = event ?  new String(event): null;
    console.log("Rating: ", result);
    return result;
  } 

  changeNumberOfSeasons(event: string): String | null{
    const result = event ?  new String(event): null;
    console.log("Number of seasons: ", result);
    return result;
  } 

  changeNumberOfEpisodes(event: string): String | null{
    const result = event ?  new String(event): null;
    console.log("Number of episodes: ", result);
    return result;
  } 


  saveMoviesAndSeries() {
    //const title = new Title(this.editedTitle);
   if(this.editedMoviesAndSeries) {

    this.serverService.sendMoviesAndSeries(this.editedMoviesAndSeries).subscribe(saved => {
      if (this.editedMoviesAndSeries?.id) {
        const newArray: MoviesAndSeries[] = [];
        for(let mas of this.moviesandserieses) {
          if (mas.id === saved.id) {
            newArray.push(saved);
          } else {
            newArray.push(mas);
          }
        }
        this.moviesandserieses = newArray;        
      } else {
        this.moviesandserieses.push(saved);
     
      }
      this.selectedMoviesAndSeries = saved;
    });
  }
  }

  deleteMoviesAndSeries() {
    if(this.selectedMoviesAndSeries) { 
      if(confirm("Naozaj chcete zmazať film/seriál " + this.selectedMoviesAndSeries?.title)) {
        const id = this.selectedMoviesAndSeries.id ? this.selectedMoviesAndSeries.id: 0;
       this.serverService.deleteMoviesAndSeries(id).subscribe(success =>{
         if (success) {
           this.moviesandserieses = this.moviesandserieses.filter(mas => mas.id !== id);
           if (this.moviesandserieses.length > 0) {

           this.selectedMoviesAndSeries = this.moviesandserieses[0];
          } else {
            this.selectedMoviesAndSeries = undefined;
          }
         }
       })
    }
  }
}

}
