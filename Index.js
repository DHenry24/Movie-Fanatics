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

document.querySelector(".img-btn").addEventListener("click", function() {
    searchEngine.classList.add("hidden");
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
    }

    // Return to home page if there is no value
    if (value === "") {
        searchEngine.classList.toggle("hidden");
        homeSection.classList.toggle("hidden");
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
                }

                i++;
            }

            // searchItem.addEventListener("click", function () {
            //     console.log(this.dataset.id)
            // })
        }
    } 
    catch(error) {
        console.log(error);
    }
}
 

var search = "spiderman";
var omdbAPIUrl = "http://www.omdbapi.com/?apikey=" + omdbAPIKey + "&s=" + search + "&r=json&page=2&type=movie"

// OMDB API Fetch
fetch(omdbAPIUrl)
    .then(response => response.json())
    .then(data => console.log(data));

    

const swiperWrapper = document.querySelector('.swiper-wrapper');

for (let i = 0; i < movies.length; i++) {
    const movie = movies[i];
    const slide = document.createElement('div');
    slide.classList.add('swiper-slide');
    slide.innerHTML = `
          <img src="${movie.image}" alt="${movie.title}">
          <h3>${movie.title}</h3>
        `;
    swiperWrapper.appendChild(slide);
}
