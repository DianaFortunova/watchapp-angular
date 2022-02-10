export class MoviesAndSeries {
    constructor(
        public title: String | null,
        public numberOfSeasons: String | null,
        public numberOfEpisodes: String | null,
        public rating: String | null,
        public genreId: number,
        public id?: number
    ){}
}