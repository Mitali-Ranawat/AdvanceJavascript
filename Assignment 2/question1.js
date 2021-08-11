
$.getJSON("https://raw.githubusercontent.com/prust/wikipedia-movie-data/master/movies.json", (movieData) => {

    console.log("Question 1");

    actors = [];
    genres = [];

    movieData.forEach(movie => {
        movie.cast.forEach(cast =>{
            if(actor = actors.find(actor => actor.Name==cast)){
                actor.Movies.push(movie.title);
            }
            else{
                actors.push({
                    Name: cast,
                    Movies: [ movie.title ]
                })
              }
            });
            movie.genres.forEach(genreType =>{
                if(genre = genres.find(genre => genre.Type==genreType)){
                    genre.Movies.push(movie.title);
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