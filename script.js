// http://www.omdbapi.com/?i=tt3896198&apikey=15498ea8
// https://omdbapi.com/?s=}&page=1&apikey=15498ea8

let input_movie = document.querySelector('.input_movie')
let search_movie = document.querySelector('.search_movie');
let wrapper_movies = document.querySelector('.wrapper_movies');
let delete_movie = document.querySelector('.icon');
let btn_more_details = document.querySelector('.btn_more_details')
let modal_more_info = document.querySelector('.modal_more_info')


delete_movie.addEventListener('click', () => {
    input_movie.value = '';
    if (input_movie.value == '') {
        delete_movie.style.display = 'none'
    }
})

async function loadMovies() {
    const URL = `https://omdbapi.com/?s=${input_movie.value}&page=1&apikey=15498ea8`;
    const response = await fetch(`${URL}`);
    const data = await response.json();
    if (data.Response == "True") {
        CreateMovies(data.Search);
    }
    CreateMovies(data.Search)
    try {
        for (let i = 0; i < data.Search.length; i++) {
            const URLdetails = `https://www.omdbapi.com/?i=${data.Search[i].imdbID}&apikey=15498ea8`;
            const responseDetails = await fetch(`${URLdetails}`);
            const dataDetails = await responseDetails.json();
            document.querySelectorAll('.btn_more_details')[i].addEventListener('click', function () {
                detailsMovie(dataDetails)
                console.log('click work');
                modal_more_info.classList.add('active');
                document.querySelector('.modal_body').style.display = 'block'

            })
        }
    } catch (e) {
        return console.log(e);
    }
}

function CreateMovies(movies) {
    if (input_movie.value <= 0) {
        alert('Введіть назву!')
    } else {
        wrapper_movies.innerHTML = ""
        for (let i = 0; i < movies.length; i++) {
            let movieListItem = document.createElement('div')
            movieListItem.classList.add('movie')
            movieListItem.innerHTML = `
            <img class="img_movie" src="${movies[i].Poster}">
            <div class="heading">
                <h1 class="head_movie">${movies[i].Title}</h1>
            </div>
            <div class="subtext">
                <p style="margin-top: 15px; "class="type">${movies[i].Type}</p>
                <p style="margin-top: 15px; "class="year">${movies[i].Year}</p>
            </div>
            <button class="btn_more_details">More details</button>
        </div>
        `;
            wrapper_movies.appendChild(movieListItem)
        }
    }
}

function detailsMovie(movies) {
    console.log(movies);
    document.querySelector('.name_movie').innerHTML = movies.Title
    document.querySelector('.rating_genre_year').innerHTML = movies.Rated
    document.querySelector('.description').innerHTML = movies.Plot
    document.querySelector('.written_by_cont').innerHTML = movies.Writer
    document.querySelector('.directed_by_cont').innerHTML = movies.Director
    document.querySelector('.starring_cont').innerHTML = movies.Director
    document.querySelector('.box_office_cont').innerHTML = movies.BoxOffice
    document.querySelector('.Awards_cont').innerHTML = movies.Awards
    document.querySelector('.img_left').innerHTML = `<img src="${movies.Poster}">`
    for (let j = 0; j < movies.Ratings.length; j++) {
        let li = document.createElement("li");
        li.textContent += movies.Ratings[j].Source + " " + movies.Ratings[j].Value;
        document.querySelector('.ratings').append(li);
    }

    try {


        // console.log(movies.Title);
    } catch (e) {
        return console.log(e)
    }

}


modal_more_info.addEventListener('click', () => {
    modal_more_info.classList.remove('active')
    document.querySelector('.ratings').innerHTML = ''
    document.querySelector('.modal_body').style.display = 'none'
})


search_movie.addEventListener('click', async () => {
    CreateMovies(loadMovies())
})