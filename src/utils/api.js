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
export const SEARCH_MOVIE_API = (title) => `http://www.omdbapi.com/?s=${title}&type=movie&apikey=a900ffd5`;

