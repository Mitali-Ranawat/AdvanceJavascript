
$.getJSON("https://raw.githubusercontent.com/prust/wikipedia-movie-data/master/movies.json", (movieData) => {

    console.log("Question 1");

    actors = [];
    genres = [];

    movieData.forEach(movie => {
        movie.cast.forEach(castMember =>{
            if(thisActor = actors.find(actor => actor.Name==castMember)){
                thisActor.Movies.push(movie.title);
            }
            else{
                actors.push({
                    Name: castMember,
                    Movies: [ movie.title ]
                })
              }
            });
            movie.genres.forEach(genreType =>{
                if(thisGenre = genres.find(genre => genre.Type==genreType)){
                    thisGenre.Movies.push(movie.title);
                }
                else{
                    genres.push({
                    Type: genreType,
                    Movies: [ movie.title ]
                 })
               }
           });
       });

       const result = {
            actors: actors,
            genres: genres
        }

        console.log(result);
});