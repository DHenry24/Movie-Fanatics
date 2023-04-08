var privateKey = "80a597a0c93c43cf353b5afe4098352f521de240";
    var publicKey = "4ec84459a84634cbb689fd829aced84c"
    var ts = new Date().getTime();
    var hash = md5(ts + privateKey + publicKey)
    var marvelUrl = "http://gateway.marvel.com/v1/public/characters/?apikey=4ec84459a84634cbb689fd829aced84c&hash=" + hash + "&ts=" + ts;

    // OMDB API Search Params (API key, search)
    var omdbAPIKey = "d5fca4e1";
    var search = "spiderman";
    var omdbAPIUrl = "http://www.omdbapi.com/?apikey=" + omdbAPIKey + "&s=" + search + "&r=json&page=2&type=movie"

<<<<<<< HEAD
    // Fetch data from Marvel API
    fetch(marvelUrl)
      .then(response => response.json())
      .then(marvelData => {
        // Fetch data from OMDB API
        fetch(omdbAPIUrl)
          .then(response => response.json())
          .then(omdbData => {
            // Update the content of the slides
            document.getElementById("slide1").textContent = marvelData.data.results[0].name;
            document.getElementById("slide2").textContent = omdbData.Search[0].Title;
            document.getElementById("slide3").textContent = marvelData.data.results[1].name;
            document.getElementById("slide4").textContent = omdbData.Search[1].Title;
            document.getElementById("slide5").textContent = marvelData.data.results[2].name;
            document.getElementById("slide6").textContent = omdbData.Search[2].Title;
            document.getElementById("slide7").textContent = marvelData.data.results[3].name;
            document.getElementById("slide8").textContent = omdbData.Search[3].Title;
            document.getElementById("slide9").textContent = marvelData.data.results[4].name;
          });
      });
=======
var hash = md5(ts + privateKey + publicKey)
var marvelUrl = "http://gateway.marvel.com/v1/public/characters/?apikey=4ec84459a84634cbb689fd829aced84c&hash=" + hash + "&ts=" + ts;
console.log(ts)


// Marvel API Fetch
fetch(marvelUrl)
    .then(response => response.json())
    .then(data => console.log(data));


// OMDB API Search Params (API key, search)
var omdbAPIKey = "d5fca4e1";
var search = "spiderman";
var omdbAPIUrl = "http://www.omdbapi.com/?apikey=" + omdbAPIKey + "&s=" + search + "&r=json&page=2&type=movie"

// OMDB API Fetch
fetch(omdbAPIUrl)
    .then(response => response.json())
    .then(data => console.log(data));

<<<<<<< HEAD
    
=======


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

>>>>>>> a70f61cdaccfb748deeea3fb58543c3dfe747464
>>>>>>> 3e6ca16c34788a00350fa57b157e769c775142ac
