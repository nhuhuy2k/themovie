const apiKey = "d386a82ea55b2f97b7474a45b83c016f";
export const urlBackground = "https://image.tmdb.org/t/p/original/";
export const srcPoster = "https://image.tmdb.org/t/p/w500/";
export const urlYoutube ="https://www.youtube.com/embed/"
const urlMovie ="https://www.2embed.ru/embed/tmdb"
const theMovieDBUrl = "https://api.themoviedb.org/3"
const category = {
    movie: "movie",
    tv: "tv"
}
const movieType = {
    popular: "popular",
    top_rated: "top_rated",
    upcoming: "upcoming",
    similar: "similar",
    credits: "credits",
    videos: "videos"
}

export async function getData(url) {
    const response = await fetch(url, {
        method: 'Get',
        headers: {
            'Content-Type': 'application/json',
            Accept: "application/json"
        },

    });
    return response.json();
}

export function getTrendingMovie() {
     const urlApi = `${theMovieDBUrl}/${category.movie}/${movieType.popular}?api_key=${apiKey}`;
   return getData(urlApi, {}) 
}

export function getTopRateMovie() {
    const urlApiTopRateMovie = `${theMovieDBUrl}/${category.movie}/${movieType.top_rated}?api_key=${apiKey}`
   return getData(urlApiTopRateMovie, {})
};

export function getTrendingTv() {
    const urlApiTrendingTv = `${theMovieDBUrl}/${category.tv}/${movieType.popular}?api_key=${apiKey}`
   return getData(urlApiTrendingTv, {})
}

export function getTopRateTv() {
    const urlApiTopRateTv = `${theMovieDBUrl}/${category.tv}/${movieType.top_rated}?api_key=${apiKey}`
  return  getData(urlApiTopRateTv, {})     
}

export function getDetailMovie(movie_id, category){
    const urlApiDetailMovie =`${theMovieDBUrl}/${category}/${movie_id}?api_key=${apiKey}`
    return getData(urlApiDetailMovie, {})
}

export function getSimilarMovie(movie_id, category){
    const urlApiSimilarMovie =`${theMovieDBUrl}/${category}/${movie_id}/${movieType.similar}?api_key=${apiKey}`
    return getData(urlApiSimilarMovie, {})
}

export function getCategoriesMovie(movie_id, category){
    const urlApiCategory =`${theMovieDBUrl}/${category}/${movie_id}?api_key=${apiKey}`
    return getData(urlApiCategory, {})
}

export function getCasts(movie_id, category){
    // https://api.themoviedb.org/3/movie/414906/credits?api_key=2199f9775718734b07129fef98b449e2
    const urlApiCasts = `${theMovieDBUrl}/${category}/${movie_id}/${movieType.credits}?api_key=${apiKey}`
    return getData(urlApiCasts, {})
}
export function getMovieTrailer(id) {
    const urlApiMovieTrailer = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=d386a82ea55b2f97b7474a45b83c016f`
    return getData(urlApiMovieTrailer, {})
}

export function getMovies(id, category, s, e) {
    // https://www.2embed.ru/embed/tmdb/movie?id=414906
    const urlApiMovie = `${urlMovie}/${category}?id=${id}&s=${s}&e=${e}`
    return urlApiMovie
}

export function getSearchMovie(keyWord) {
// https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&page=1&include_adult=false
    const urlApiSearchMovie = `${theMovieDBUrl}/search/movie?api_key=${apiKey}&query=${keyWord}`
    return getData(urlApiSearchMovie, {})
}

//https://api.themoviedb.org/3/movie/upcoming?api_key=2199f9775718734b07129fef98b449e2
export function getViewMore(category) {
    const urlApiUpcoming = `${theMovieDBUrl}/${category}/${movieType.upcoming}?api_key=${apiKey}`;
  return getData(urlApiUpcoming, {}) 
}

export function getLoadMoreMOvie(numberPage) {
    const urlApiUpcoming = `${theMovieDBUrl}/movie/${movieType.upcoming}?api_key=2199f9775718734b07129fef98b449e2&page=${numberPage}`;
  return getData(urlApiUpcoming, {}) 
}
export function getLoadMoreTv(numberPage) {
    const urlApiMoreTv = `${theMovieDBUrl}/${category.tv}/${movieType.popular}?api_key=${apiKey}&page=${numberPage}`;
  return getData(urlApiMoreTv, {}) 
}