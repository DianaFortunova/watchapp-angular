import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenresComponent } from 'src/app/genres/genres.component';
import { MoviesandseriesComponent } from 'src/app/moviesandseries/moviesandseries.component';


const routes: Routes = [
  { path: 'genres', component: GenresComponent },
  { path: 'moviesandseries/:idGenre', component: MoviesandseriesComponent },
  { path: '**', redirectTo: 'genres' }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ], 
  exports: [RouterModule]
})
export class AppRoutingModule { }
