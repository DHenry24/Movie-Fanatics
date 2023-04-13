
// TMDB Api
//fetch different catergories 
var tmdbUrlUpcoming = "https://api.themoviedb.org/3/movie/upcoming?api_key=d637d1e3ce44e7d8ae16b67809fe07c8";
var tmdbUrlLatest = "https://api.themoviedb.org/3/movie/latest?api_key=d637d1e3ce44e7d8ae16b67809fe07c8";
var tmdbUrlPopular = "https://api.themoviedb.org/3/movie/popular?api_key=d637d1e3ce44e7d8ae16b67809fe07c8";
var tmdbUrlNowPlaying = "https://api.themoviedb.org/3/movie/now_playing?api_key=d637d1e3ce44e7d8ae16b67809fe07c8";
// Main page input
var mainInput = document.querySelector("#main-page-input");
var mainSection = document.querySelector(".main-section");
var homeSection = document.querySelector(".home-section");
var searchEngine = document.querySelector(".search-engine");
var searchGrid = document.querySelector(".search-grid");
var movieDesc = document.querySelector(".movie-desc");

var omdbAPIKey = "d5fca4e1";

document.querySelector(".img-btn").addEventListener("click", function() {
    searchEngine.classList.add("hidden");
    movieDesc.classList.add("hidden");
    homeSection.classList.remove("hidden");
})

        // Search Engine click functionality (activates when "Enter" is pressed)
        mainInput.addEventListener("keypress", function (e) {

          const value = e.target.value;

          // Give it search a white border when switched to search grid
          mainInput.style.border = "1px solid white";
          searchGrid.innerHTML = "";

          // Search for the value when "Enter" is pressed
          if (e.key === "Enter") {
            searchEngine.classList.remove("hidden");
            homeSection.classList.add("hidden");
            movieDesc.classList.add("hidden");
          }

          // Return to home page if there is no value
          if (value === "") {
            searchEngine.classList.add("hidden");
            homeSection.classList.remove("hidden");
            movieDesc.classList.add("hidden");
            mainInput.style.border = "none";
          }

          // Fetch value
          fetchFilter(value.toLowerCase());
        
        })

        var omdbAPIKey = "d5fca4e1";

        var genre = document.querySelector(".genre");

        var descTitle = document.querySelector("#desc-title");
        var rating = document.querySelector("#rating");
        var rated = document.querySelector("#rated");
        var runtime = document.querySelector("#runtime");
        var year = document.querySelector("#year");
        var descParagraph = document.querySelector("#desc-paragraph");
        var director = document.querySelector("#director");
        var writer = document.querySelector("#writer");
        var actors = document.querySelector("#actors");
        var movieImage = document.querySelector("#movie-image");
        var languages = document.querySelector("#languages");

        // Fetch function for search engine
        const fetchFilter = async (value) => {
          let fetchOmdbUrl = "https://www.omdbapi.com/?apikey=" + omdbAPIKey + "&s=" + value + "&r=json&page=1";

          try {
            const response = await fetch(fetchOmdbUrl);
            const data = await response.json();

            if (data.Response === "True") {
              console.log(data);
              var i = 0;

              // While less than the data length, append the search elements to the 
              // search grid
              while (i < data.Search.length) {

                var imageUrl = document.createElement("img");
                var searchImage = document.createElement("div");
                var searchPara = document.createElement("p");
                var searchItem = document.createElement("div");

                searchImage.setAttribute("class", "search-image");
                searchItem.setAttribute("class", "search-items");
                searchItem.setAttribute("data-id", data.Search[i].imdbID);
                searchPara.innerHTML = data.Search[i].Title;

                if (data.Search[i].Poster !== "N/A") {
                  imageUrl.src = data.Search[i].Poster;
                  imageUrl.alt = data.Search[i].Title;
                  searchImage.appendChild(imageUrl);
                  searchItem.appendChild(searchImage);
                  searchItem.appendChild(searchPara);
                  searchGrid.appendChild(searchItem);
                }

                searchItem.style.cursor = "pointer";

                searchItem.addEventListener("click", function () {
                    descTitle.innerHTML = '';
                    genre.innerHTML = '';
                    rating.innerHTML = '';
                    rated.innerHTML = '';
                    runtime.innerHTML = '';
                    year.innerHTML = '';
                    descParagraph.innerHTML = '';
                    director.innerHTML = '';
                    writer.innerHTML = '';
                    actors.innerHTML = '';
                    movieImage.src = '';
                    movieImage.alt = '';
                    languages.innerHTML = '';


                    fetchCard(this.lastChild.innerHTML);
                })
                  
                i++;
                  
              }

             
            }

          }
          catch (error) {
            searchGrid.innerHTML = `<p>No movies found.</p>`
          }

        }
      


        

      

       
        // Load default movies

        
      // Fetch function for the detail section
      function fetchCard(value) {
        // OMDB API Fetch
        movieDesc.classList.add("hidden");

        fetch("https://www.omdbapi.com/?apikey=" + omdbAPIKey + "&t=" + value + "&r=json&page=1&type=movie")
          .then(response => response.json())
          .then(data => {
            console.log(data);
            descTitle.innerHTML = data.Title;
            rating.innerHTML = data.imdbRating;
            rated.innerHTML = data.Rated;
            runtime.innerHTML = data.Runtime;
            year.innerHTML = data.Year;
            descParagraph.innerHTML = data.Plot;
            director.innerHTML = data.Director;
            writer.innerHTML = data.Writer;
            actors.innerHTML = data.Actors;
            movieImage.src = data.Poster;
            movieImage.alt = data.Title;
            languages.innerHTML = data.Language;

            // Logic for genre 
            var genreSplit = data.Genre.split(", ")
            if (genreSplit.length > 1) {
              for (let i = 0; i < genreSplit.length; i++) {
                var genrePara = document.createElement("p");
                var genreContainer = document.createElement("div");

                genrePara.innerHTML = genreSplit[i];
                genreContainer.setAttribute("class", "genre-container");
                genreContainer.appendChild(genrePara);
                genre.appendChild(genreContainer);
                genre.style.justifyContent = "space-evenly";

              }
            } else if (genreSplit.length === 1) {
              var genrePara = document.createElement("p");
              var genreContainer = document.createElement("div");

              genrePara.innerHTML = genreSplit[0];
              genreContainer.setAttribute("class", "genre-container");
              genreContainer.appendChild(genrePara);
              genre.appendChild(genreContainer);
              genre.style.justifyContent = "left";
            }

            // Detail card shows up after API call is loaded and complete
            searchEngine.classList.add("hidden");
            homeSection.classList.add("hidden");
            movieDesc.classList.remove("hidden");


          });
      }

      var nowPlayingWrapper = document.querySelector(".now-playing-wrapper")

      fetch(tmdbUrlNowPlaying)
          .then(response => response.json())
          .then(data => {
            console.log(data);
        
            for (var i = 0; i < data.results.length; i ++) {
              
              var movieContainer = document.createElement("div");

              var movieTitle = document.createElement("div");
              var movieName = document.createElement("p");
              var movieReleaseDate = document.createElement("p");

              var movieImage = document.createElement("div");
              var moviePosterPath = document.createElement("img");

              movieImage.setAttribute("class", "image-content popular-image");
              moviePosterPath.src = "https://image.tmdb.org/t/p/w200" + data.results[i].poster_path;
              moviePosterPath.alt = data.results[i].title;
              moviePosterPath.style.borderRadius = "10px";

              movieImage.appendChild(moviePosterPath);
            
              movieTitle.setAttribute("class", "title")
              movieName.setAttribute("class", "movie_title")
              movieName.textContent = data.results[i].title;
              movieReleaseDate.textContent = data.results[i].release_date.substring(0,4);
                
              movieTitle.appendChild(movieName);
              movieTitle.appendChild(movieReleaseDate);
                
              movieContainer.setAttribute("class", "card");

              movieContainer.appendChild(moviePosterPath);
              movieContainer.appendChild(movieTitle);
              movieContainer.style.cursor = 'pointer'
              nowPlayingWrapper.appendChild(movieContainer);
            
              movieContainer.addEventListener("click", function() {
                descTitle.innerHTML = '';
                    genre.innerHTML = '';
                    rating.innerHTML = '';
                    rated.innerHTML = '';
                    runtime.innerHTML = '';
                    year.innerHTML = '';
                    descParagraph.innerHTML = '';
                    director.innerHTML = '';
                    writer.innerHTML = '';
                    actors.innerHTML = '';
                    movieImage.src = '';
                    movieImage.alt = '';
                    languages.innerHTML = '';
                fetchCard(this.lastChild.firstChild.innerHTML);
              })
             
            }
        })
      var upcomingWrapper = document.querySelector(".upcoming-wrapper")

      fetch(tmdbUrlUpcoming)
          .then(response => response.json())
          .then(data => {
            console.log(data);
        
             movieContainer.addEventListener('click', function(){
              descTitle.innerHTML = '';
                    genre.innerHTML = '';
                    rating.innerHTML = '';
                    rated.innerHTML = '';
                    runtime.innerHTML = '';
                    year.innerHTML = '';
                    descParagraph.innerHTML = '';
                    director.innerHTML = '';
                    writer.innerHTML = '';
                    actors.innerHTML = '';
                    movieImage.src = '';
                    movieImage.alt = '';
                    languages.innerHTML = '';


                    fetchCard(this.lastChild.firstChild.innerHTML);
             })
            }
        )
        var upcomingWrapper = document.querySelector(".upcoming-wrapper")

        fetch(tmdbUrlUpcoming)
            .then(response => response.json())
            .then(data => {
              console.log(data);
          
              for (var i = 0; i < data.results.length; i ++) {
                
                var movieContainer = document.createElement("div");
  
                var movieTitle = document.createElement("div");
                var movieName = document.createElement("p");
                var movieReleaseDate = document.createElement("p");
  
                var movieImage = document.createElement("div");
                var moviePosterPath = document.createElement("img");
  
                movieImage.setAttribute("class", "image-content popular-image");
                moviePosterPath.src = "https://image.tmdb.org/t/p/w200" + data.results[i].poster_path;
                moviePosterPath.alt = data.results[i].title;
                moviePosterPath.style.borderRadius = "10px";
  
                movieImage.appendChild(moviePosterPath);
              
                movieTitle.setAttribute("class", "title")
                movieName.setAttribute("class", "movie_title")
                movieName.textContent = data.results[i].title;
                movieReleaseDate.textContent = data.results[i].release_date.substring(0,4);
                  
                movieTitle.appendChild(movieName);
                movieTitle.appendChild(movieReleaseDate);
                  
                movieContainer.setAttribute("class", "card");
  
                movieContainer.appendChild(moviePosterPath);
                movieContainer.appendChild(movieTitle);
                movieContainer.style.cursor = 'pointer'
                upcomingWrapper.appendChild(movieContainer);
          
               movieContainer.addEventListener('click', function(){
                descTitle.innerHTML = '';
                      genre.innerHTML = '';
                      rating.innerHTML = '';
                      rated.innerHTML = '';
                      runtime.innerHTML = '';
                      year.innerHTML = '';
                      descParagraph.innerHTML = '';
                      director.innerHTML = '';
                      writer.innerHTML = '';
                      actors.innerHTML = '';
                      movieImage.src = '';
                      movieImage.alt = '';
                      languages.innerHTML = '';
  
  
                      fetchCard(this.lastChild.firstChild.innerHTML);
               })
              }
          })
          var popularWrapper = document.querySelector(".popular-wrapper")

          fetch(tmdbUrlPopular)
              .then(response => response.json())
              .then(data => {
                console.log(data);
            
                for (var i = 0; i < data.results.length; i ++) {
                  
                  var movieContainer = document.createElement("div");
    
                  var movieTitle = document.createElement("div");
                  var movieName = document.createElement("p");
                  var movieReleaseDate = document.createElement("p");
    
                  var movieImage = document.createElement("div");
                  var moviePosterPath = document.createElement("img");
    
                  movieImage.setAttribute("class", "image-content popular-image");
                  moviePosterPath.src = "https://image.tmdb.org/t/p/w200" + data.results[i].poster_path;
                  moviePosterPath.alt = data.results[i].title;
                  moviePosterPath.style.borderRadius = "10px";
    
                  movieImage.appendChild(moviePosterPath);
                
                  movieTitle.setAttribute("class", "title")
                  movieName.setAttribute("class", "movie_title")
                  movieName.textContent = data.results[i].title;
                  movieReleaseDate.textContent = data.results[i].release_date.substring(0,4);
                    
                  movieTitle.appendChild(movieName);
                  movieTitle.appendChild(movieReleaseDate);
                    
                  movieContainer.setAttribute("class", "card");
    
                  movieContainer.appendChild(moviePosterPath);
                  movieContainer.appendChild(movieTitle);
                  movieContainer.style.cursor = 'pointer'
                  popularWrapper.appendChild(movieContainer);
            
                 movieContainer.addEventListener('click', function(){
                  descTitle.innerHTML = '';
                        genre.innerHTML = '';
                        rating.innerHTML = '';
                        rated.innerHTML = '';
                        runtime.innerHTML = '';
                        year.innerHTML = '';
                        descParagraph.innerHTML = '';
                        director.innerHTML = '';
                        writer.innerHTML = '';
                        actors.innerHTML = '';
                        movieImage.src = '';
                        movieImage.alt = '';
                        languages.innerHTML = '';
    
    
                        fetchCard(this.lastChild.firstChild.innerHTML);
                 })
                }
            })


