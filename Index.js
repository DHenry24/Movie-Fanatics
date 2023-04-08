var privateKey = "80a597a0c93c43cf353b5afe4098352f521de240";
    var publicKey = "4ec84459a84634cbb689fd829aced84c"
    var ts = new Date().getTime();
    var hash = md5(ts + privateKey + publicKey)
    var marvelUrl = "http://gateway.marvel.com/v1/public/characters/?apikey=4ec84459a84634cbb689fd829aced84c&hash=" + hash + "&ts=" + ts;



// OMDB API Search Params (API key, search)
var omdbAPIKey = "d5fca4e1";
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
