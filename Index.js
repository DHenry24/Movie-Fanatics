// Marvel API Params (private key, public key, hash, and timestamp)
// var privateKey = "80a597a0c93c43cf353b5afe4098352f521de240";
// var publicKey = "4ec84459a84634cbb689fd829aced84c"
// var ts = new Date().getTime();


// var hash = md5(ts + privateKey + publicKey)
// var marvelUrl = "http://gateway.marvel.com/v1/public/characters?apikey=4ec84459a84634cbb689fd829aced84c&hash=" + hash + "&ts=" + ts;
// console.log(ts)

// TMDB Api 
var tmdbUrl = "https://api.themoviedb.org/3/movie/upcoming?api_key=d637d1e3ce44e7d8ae16b67809fe07c8";
fetch(tmdbUrl)
    .then(response => response.json())
    .then(data => console.log(data));

// Main page input
var mainInput = document.querySelector("#main-page-input");
var mainSection = document.querySelector(".main-section");
var homeSection = document.querySelector(".home-section");
var searchEngine = document.querySelector(".search-engine");
var searchGrid = document.querySelector(".search-grid");
var movieDesc = document.querySelector(".movie-desc");

document.querySelector(".img-btn").addEventListener("click", function() {
    searchEngine.classList.add("hidden");
    movieDesc.classList.add("hidden");
    homeSection.classList.remove("hidden");
})

// Search Engine Functionality
mainInput.addEventListener("keypress", function(e) {
    
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




// var privateKey = "80a597a0c93c43cf353b5afe4098352f521de240";
//     var publicKey = "4ec84459a84634cbb689fd829aced84c"
//     var ts = new Date().getTime();
//     var hash = md5(ts + privateKey + publicKey)
//     var marvelUrl = "http://gateway.marvel.com/v1/public/characters/?apikey=4ec84459a84634cbb689fd829aced84c&hash=" + hash + "&ts=" + ts;



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

const fetchFilter = async (value) => {
    let fetchOmdbUrl = "http://www.omdbapi.com/?apikey=" + omdbAPIKey + "&s=" + value + "&r=json&page=1";

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
                    searchItem.style.cursor ="pointer";
                }

                searchItem.addEventListener("click", function() {
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
                    searchEngine.classList.add("hidden");
                    homeSection.classList.add("hidden");
                    movieDesc.classList.remove("hidden");

                })

                i++;
            }

        }
    } 
    catch(error) {
        searchGrid.innerHTML = `<p>No movies found.</p>`
    }
}
 

var search = "Wednesday";


function fetchCard(value) {
    // OMDB API Fetch
    fetch("http://www.omdbapi.com/?apikey=" + omdbAPIKey + "&t=" + value + "&r=json&page=1&type=movie")
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
        
    });
}


    

const swiperWrapper = document.querySelector('.swiper-wrapper');

// for (let i = 0; i < movies.length; i++) {
//     const movie = movies[i];
//     const slide = document.createElement('div');
//     slide.classList.add('swiper-slide');
//     slide.innerHTML = `
//           <img src="${movie.image}" alt="${movie.title}">
//           <h3>${movie.title}</h3>
//         `;
//     swiperWrapper.appendChild(slide);
// }
