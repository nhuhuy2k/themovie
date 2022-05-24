import { getViewMore, srcPoster, getSearchMovie, getLoadMoreMOvie } from "../services/ApiManage.js"

let queryString = window.location.search;
let searchParams = new URLSearchParams(queryString)
let category = searchParams.get("category")

renderMovies(category);


async function renderSearchResults() {
    const keyword = document.getElementById("input_value").value
    const res = await getSearchMovie(keyword);
    const movieList = document.getElementById("movie__list")
    let stringHTML = "";
    res.results.forEach((item) => {
        stringHTML += `
            <div class="movie__item">
            <a  href="../detail_page/detail_page.html?category=movie&movie_id=${item.id}"> <img src="${srcPoster}${item.poster_path}" alt="" class="img__film">
            <h2 class="name__film">${item.original_title || item.title
            }</h2></a>
                </div>`;
    });
    movieList.innerHTML = stringHTML;
}
$(".btn__search").click(function () {
    renderSearchResults()
})
$("#input_value").keypress(function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        $("#btn__search").click()
    }
})

let numberPage = 1;
$("#btn_load_more").click(function () {
    renderMoreMovie(numberPage += 1)
})

async function renderMoreMovie(numberPage) {
    const res = await getLoadMoreMOvie(numberPage);
    const movieList = document.getElementById("movie__list")
    console.log(res)
    res.results.forEach((item) => {
        movieList.insertAdjacentHTML("beforeend", `
        <div class="movie__item">
        <a  href="../detail_page/detail_page.html?category=movie&movie_id=${item.id}"> <img src="${srcPoster}${item.poster_path}" alt="" class="img__film">
        <h2 class="name__film">${item.original_title || item.title}</h2></a>
            </div>`)
    });
}
async function renderMovies(category) {
    const res = await getViewMore(category);
    const movieList = document.getElementById("movie__list")
    let stringHTML = "";
    res.results.forEach((item) => {
        stringHTML += `
            <div class="movie__item">
            <a  href="../detail_page/detail_page.html?category=movie&movie_id=${item.id}"> <img src="${srcPoster}${item.poster_path}" alt="" class="img__film">
            <h2 class="name__film">${item.original_title || item.title
            }</h2></a>
                </div>`;
    });
    movieList.innerHTML = stringHTML;
}

$(document).ready(function () {
    $(function () {
        $("#header__page").load("../header/header.html");
    });
    $(function () {
        $("#footer__page").load("../footer/footer.html");
    });

});
