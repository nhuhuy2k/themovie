import { getTrendingTv, srcPoster, getSearchMovie, getLoadMoreTv} from "../services/ApiManage.js"
let queryString = window.location.search;
let searchParams = new URLSearchParams(queryString)
let category = searchParams.get("category")

$(document).ready(function () {
    $(function () {
        $("#header__page").load("../header/header.html");
    });
    $(function () {
        $("#footer__page").load("../footer/footer.html");
    });

});

renderTv();

async function renderSearchResults() {
    const keyword = document.getElementById("input_value").value
    const res = await getSearchMovie(keyword);
    const movieList = document.getElementById("movie__list")
    let stringHTML = "";
    res.results.forEach((item) => {
        stringHTML += `
            <div class="movie__item">
            <a href="../detail_page/detail_page.html?category=tv&movie_id=${item.id}&s=1&e=1"> <img src="${srcPoster}${item.poster_path}" alt="" class="img__film">
            <h2 class="name__film">${item.original_title || item.title}</h2></a>
                </div>`;
    });
    movieList.innerHTML = stringHTML;
}
$(".btn__search").click(function () {
    renderSearchResults()
})

$("#input_value").keypress(function(event){
    if(event.key === "Enter"){
        event.preventDefault();
        $("#btn__search").click()
    }
})

let numberPage = 1;
$("#btn_load_more").click(function () {
    renderMoreTv(numberPage += 1)
})

async function renderMoreTv(numberPage) {
    const res = await getLoadMoreTv(numberPage);
    const movieList = document.getElementById("movie__list")
    res.results.forEach((item) => {
        movieList.insertAdjacentHTML("beforeend", `
        <div class="movie__item">
        <a  href="../detail_page/detail_page.html?category=tv&movie_id=${item.id}&s=1&e=1"> <img src="${srcPoster}${item.poster_path}" alt="" class="img__film">
        <h2 class="name__film">${item.original_name || item.name}</h2></a>
            </div>`)
    });
}

async function renderTv() {
    const res = await getTrendingTv();
        const movieList = document.getElementById("movie__list");
        let stringHTML = "";

        res.results.forEach((item) => {
            stringHTML += `
            <div class="movie__item">
                   <a href="../detail_page/detail_page.html?category=tv&movie_id=${item.id}&s=1&e=1"> <img src="${srcPoster}${item.poster_path}" alt="" class="img__film">
                    <h2 class="name__film">${item.original_name || item.name
                }</h2></a>
                </div>`;
        });
        movieList.innerHTML = stringHTML;
   
}


