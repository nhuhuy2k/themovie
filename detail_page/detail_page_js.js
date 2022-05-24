import { getSimilarMovie, srcPoster, getTrendingMovie, urlBackground, getCategoriesMovie, getCasts, getMovies, getDetailMovie} from "../services/ApiManage.js"
const queryString = window.location.search;
let searchParams = new URLSearchParams(queryString)
let movieId = searchParams.get('movie_id')
let category = searchParams.get('category')
let s = searchParams.get('s')
let e = searchParams.get('e')
console.log(s, e, movieId, category)

renderBanner(movieId, category);
renderInfoMovie(movieId, category);
renderCategoriesMovie(movieId, category);
renderCasts(movieId, category)
renderIframeMovie(movieId, category)
renderSimilar(movieId, category);



$(document).ready(function () {
    $(function () {
        $("#header__page").load("../header/header.html");
    });
    $(function () {
        $("#footer__page").load("../footer/footer.html");
    });
})

async function renderInfoMovie(movieId, category) {
    const res = await getDetailMovie(movieId, category);
    const movieInfo = document.getElementById("movie_content")
    let stringHTML = `<div class="movie_content_poster">
    <div class="movie_content_poster_img"
        style="background-image: url(${srcPoster}${res.poster_path});"></div>
</div>
<div class="movie_content_info">
    <h2 class="title">${res.original_title || res.title || res.name || res.original_name}</h2>
    <div class="categories" id="categories_movie">
        
        
    </div>
    <div class="introduce">
        <p>${res.overview}</p>
    </div>

    <h2 class="title_casts">Casts</h2>
    <div class="casts" id="casts_list">
        
    </div>
</div>`;

    movieInfo.innerHTML = stringHTML;

}

async function renderBanner(movieId, category) {
    const res = await getDetailMovie(movieId, category);
    const banner = document.getElementById("banner");
    let stringHTML = `<img class="img_baner" src="${urlBackground}${res.backdrop_path}">`
    banner.innerHTML = stringHTML;
}

async function renderCategoriesMovie(movieId, categorys) {
    const res = await getCategoriesMovie(movieId, categorys);
    const category = document.getElementById("categories_movie");
    let result = res.genres;
    let stringHTML =""
    result.forEach((item) =>{
         stringHTML += `<span class="category">${item.name}</span>`
    });
    category.innerHTML = stringHTML;
}

async function renderCasts(movieId, category) {
    const res = await getCasts(movieId, category);
    const casts = document.getElementById("casts_list");
    let result = res.cast
    let i;
    if(result.length >= 5){
        i = 5
    }
    if((result.length < 5) & (result.length > 0)){
        i = res.length
    }
    let stringHTML =""
    result.slice(0, i).forEach((item) =>{
         stringHTML += `<div class="item">
         <div class="cast_img" style="background-image: url(${srcPoster}${item.profile_path});"></div>
         <h3 class="name_cast">${item.original_name || item.name}</h3>
     </div>`
    })
    
    casts.innerHTML = stringHTML;
}

function renderIframeMovie(movieId, category, s, e){
    const res =  getMovies(movieId, category, s, e)
    console.log(res)
    const iframeMovie = document.getElementById("iframe_movie")
    iframeMovie.setAttribute("src", `${res}`)
}

async function renderSimilar(movieId, category) {
    const res = await getSimilarMovie(movieId, category);
    const listSimilarMovie = document.getElementById("list_similar")
    let results = res.results
    let stringHTML = ""
    results.slice(0, 10).forEach((item) => {
        stringHTML += `<div class="similar_film">
        <a href="../detail_page/detail_page.html?&category=${category}&movie_id=${item.id}&s=1&e=1"> <img class="similar_img" src="${srcPoster}${item.poster_path}" alt="">
        <h3 class="similar_name">${item.original_title || item.title || item.original_name || item.name}</h3></a>
    </div>  `
    });
    listSimilarMovie.innerHTML = stringHTML;
    $(document).ready(function () {
        $('.owl-carousel').owlCarousel({
            loop: true,
            margin: 10,
            nav: false,
            responsive: {
                0: {
                    items: 2
                },
                472: {
                    items: 3
                },
                685: {
                    items: 4
                },
                900: {
                    items: 5
                },
                1100: {
                    items: 6
                },
            }
        })
    })
}
