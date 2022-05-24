// // let header= document.getElementsByClassName('js_header')
import { getMovies, getTrendingMovie, getTopRateMovie, getTrendingTv, getTopRateTv, urlBackground, srcPoster, urlYoutube, getMovieTrailer } from "../services/ApiManage.js";
// Modal 
let modalTrailer = document.getElementById('modal');
let iframeTrailer = document.getElementById("iframe_trailer");

reanderHeader()
renderTrendingMovie()
renderTopRateMovie()
renderTrendingTv()
renderTopRateTv()
renderSlider()
reanderFooter()




function reanderHeader() {
    const header = document.getElementById('header__page')
    const stringHtml = `<div id="header">
<a href="../index.html" class="logo"><img class="logo_img" src="asset/img/logo.1e58b23f.png" alt="">
    <p class="logo_text">MOVIE</p>
</a>
<ul class="nav_menu">
    <li class="nav_item "><a href="../index.html">Home</a></li>
    <li class="nav_item "><a href="../movie_page/movie_page.html?category=movie">Movies</a></li>
    <li class="nav_item"><a href="../tv_page/tv_page.html?category=tv">TV series</a></li>
    <li class="nav_item"><a href="#">Login</a></li>
</ul>
</div>`;
    header.innerHTML = stringHtml
}
function reanderFooter() {
    const footer = document.getElementById('footer__page')
    const stringHtml = `<div id="footer">
    <div class="footer_container">
        <div class="footer_heading">
            <img src="asset/img/logo.1e58b23f.png" alt="">
            <h2>MOVIE</h2>
        </div>
        <div class="footer_content">
            <ul>
                <li><a href="">Home</a></li>
                <li><a href="">Contact us</a></li>
                <li><a href="">Tern of services</a></li>
                <li><a href="">About us</a></li>
            </ul>
            <ul>
                <li><a href="">Live</a></li>
                <li><a href="">FAQ</a></li>
                <li><a href="">Preminum</a></li>
                <li><a href="">Pravacy policy</a></li>
            </ul>
            <ul>
                <li><a href="">You must watch</a></li>
                <li><a href="">Recent release</a></li>
                <li><a href="">Top IMDB</a></li>
            </ul>
        </div>
    </div>
</div>`;
    footer.innerHTML = stringHtml
}
async function renderSlider() {
    const res = await getTrendingMovie();
    const slider = document.getElementById("slider");
    let results = res.results
    let stringSlider = "";
    var x = 0;
    results.slice(0, 4).forEach((item) => {
        stringSlider += `<div class="slide_item fade" style="background-image: url(${urlBackground}${item.backdrop_path})">
             <div class="slide_container">
                <div class="content">
                    <h2 class="name_film fade_in">${item.original_title || item.title}</h2>
                    <p class="introduce fade_in">${item.overview}</p>
                    <div class="btns">
                        <a href="./detail_page/detail_page.html?category=movie&movie_id=${item.id}"><button class="btn btn_watch_now" value="${item.id}"> Watch now</button></a>
                         <button class="btn btn_watch_trailer" value="${item.id}"> Watch trailer</button >
                    </div >
                </div >
                <div class="poster">
                    <img src="${srcPoster}${item.poster_path}" class="poster_img fade_in">
                </div>
            </div >
        <a class="prev" >&#10094;</a>
	    <a class="next" >&#10095;</a>
        </div >
         `;
    });
    slider.innerHTML = stringSlider;

    var slideIndex = 0;
    showSlider();

    function showSlider() {
        var slides = document.getElementsByClassName("slide_item");
        for (var i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slideIndex++;
        if (slideIndex > slides.length) { slideIndex = 1 }
        slides[slideIndex - 1].style.display = "block";
        setTimeout(showSlider, 10000);
    }

    function plusSlides(n) {
        showSlides2(slideIndex += n);
    }

    function showSlides2(n) {
        var i;
        const slides = document.getElementsByClassName("slide_item");
        if (n > slides.length) {
            slideIndex = 1
        }
        if (n < 1) {
            slideIndex = slides.length
        }
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none"
        }
        slides[slideIndex - 1].style.display = "block";
    }


    $(document).ready(function () {
        $(".btn_watch_now").click(function () {
            getMovies(this.value)
        })
        $(".btn_watch_trailer").click(function () {
            renderMovieTrailer(this.value)
            async function renderMovieTrailer(value) {
                const res = await getMovieTrailer(value)
                let results = res.results[0].key
                console.log(results)
                $("#iframe_trailer").attr("src", `${urlYoutube}${results}`)
            }
            modalTrailer.style.display = "block";
        })
        $("#close_modal_trailer").click(function () {
            modalTrailer.style.display = "none"
            $("#iframe_trailer").attr("src", "")
        })

        $('.prev').click(function () {
            plusSlides(-1)
        })

        $('.next').click(function () {
            plusSlides(1)
        })
    });

}

async function renderTrendingMovie() {
    const res = await getTrendingMovie();
    const trendingMovie = document.getElementById("trending_movie");
    let stringTrendMovie = "";
    res.results.slice(0, 10).forEach((item) => {
        stringTrendMovie += `
                        <div class="movie">
                            <a href="./detail_page/detail_page.html?category=movie&movie_id=${item.id}"><img src="${srcPoster}${item.poster_path
            }" alt=""></a>
                            <h3>${item.original_title || item.title}</h3>
                        </div>
                        `;
    });
    trendingMovie.innerHTML = stringTrendMovie;

}

async function renderTopRateMovie() {
    const res = await getTopRateMovie();
    const topRateMovie = document.getElementById("top_rate_movies");
    let stringTopRateMovies = "";
    res.results.slice(0, 10).forEach((item) => {
        stringTopRateMovies += `
                        <div class="movie">
                            <a href="./detail_page/detail_page.html?category=movie&movie_id=${item.id}"><img src="${srcPoster}${item.poster_path
            }" alt=""></a>
                            <h3>${item.original_title || item.title}</h3>
                        </div>
                        `;
    });
    topRateMovie.innerHTML = stringTopRateMovies;

}
async function renderTrendingTv() {
    const res = await getTrendingTv();
    const trendingTv = document.getElementById("trending_tv");
    let results = res.results
    let stringTrendingTv = "";
    results.slice(0, 10).forEach((item) => {
        stringTrendingTv += `
                        <div class="movie">
                            <a href="./detail_page/detail_page.html?category=tv&movie_id=${item.id}&s=1&e=1"><img src="${srcPoster}${item.poster_path
            }" alt=""></a>
                            <h3>${item.original_name || item.name}</h3>
                        </div>
                        `;
    });
    trendingTv.innerHTML = stringTrendingTv;
}
async function renderTopRateTv() {
    const res = await getTopRateTv();
    const topRateTv = document.getElementById("top_rate_tv");
    let stringTopRateTv = "";
    res.results.slice(0, 10).forEach((item) => {
        stringTopRateTv += `
                        <div class="movie">
                            <a href="./detail_page/detail_page.html?category=tv&movie_id=${item.id}&s=1&e=1"><img src="${srcPoster}${item.poster_path
            }" alt=""></a>
                            <h3>${item.original_name || item.name}</h3>
                        </div>
                        `;
    });
    topRateTv.innerHTML = stringTopRateTv;
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


