import { Component, OnInit, ViewChild } from '@angular/core';
import { MoviesService } from './movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  moviesList: any[];
  searchText;
  constructor(private moviesService: MoviesService) { }

  ngOnInit() {
    this.getMoviesList();
  }

  getMoviesList(): void {
    this.moviesService.getMoviesList()
            .subscribe(data => {
                this.moviesList = data['Items'].map(x => {
                  return {
                    "movieName": x.Name,
                    "Id": x.Id,
                    "thumbnailUrl": "http://192.168.1.6:8096/emby/Items/"+x.Id+"/Images/Primary?maxHeight=324&tag="
                    +x.ImageTags.Primary+"quality=90"
                  };
                });
            });
  }

}
