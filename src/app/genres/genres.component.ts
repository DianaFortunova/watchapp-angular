import { Component, OnInit } from '@angular/core';
import { Genres } from 'src/entities/genres';
import { ServerService } from 'src/services/server.service';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit {

  genres : Genres[] = [new Genres(10,"Horor"), 
                        new Genres(11,"Anime")];

  constructor(private serverService: ServerService) { }

  ngOnInit(): void {
    this.serverService.getGenres().subscribe(genres => this.genres = genres);

  }

}
