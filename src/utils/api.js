let protocol = window.location.protocol;
let slashes = protocol.concat("//");
let host = slashes.concat(window.location.host);
if (window.location.port) {
    host = host.replace("3000", "8000")
}
export const HOST = host;

// login and register api
export const LOGIN_API = HOST + "/api/login/";
export const USERS_API = HOST + "/api/users";

export const USER_PROFILE_API = (username) => `${HOST}/api/users/${username}`;
export const MOVIE_DETAILS_API = (imdbId) => `${HOST}/api/movies/${imdbId}`;
export const SEARCH_MOVIE_TITLE_API = (title) => `http://www.omdbapi.com/?t=${title}&apikey=a900ffd5`;
export const SEARCH_MOVIE_API = (title) => `http://www.omdbapi.com/?s=${title}&type=movie&apikey=a900ffd5`;

