import axios from "axios";
import {USER_PROFILE_API, MOVIE_DETAILS_API, SEARCH_MOVIE_TITLE_API} from "../../utils/api";

export const logout = () => {
    return {
        type : "LOGOUT"
    }
}

export const fetchUserRequest = () => {
    return {
        type : 'FETCH_USER_REQUEST'
    }
}

export const fetchUserSuccess = (user) => {
    return {
        type : 'FETCH_USER_SUCCESS',
        payload: user
    }
}

export const fetchMovieRequest = () => {
    return {
        type : 'FETCH_MOVIE_REQUEST'
    }
}

export const fetchMovieSuccess = (movie) => {
    return {
        type : 'FETCH_MOVIE_SUCCESS',
        payload: movie
    }
}

export const searchMovieRequest = () => {
    return {
        type : 'SEARCH_MOVIE_REQUEST'
    }
}

export const searchMovieSuccess = (movie) => {
    return {
        type : 'SEARCH_MOVIE_SUCCESS',
        payload: movie
    }
}

export const fetchUser = (username) => {
    return (dispatch) => {
        dispatch(fetchUserRequest);
        axios.get(USER_PROFILE_API(username)).then(res => {
            const user = res.data;
            dispatch(fetchUserSuccess(user));
        })
    }
}

export const fetchMovie = (imdbId) => {
    return (dispatch) => {
        dispatch(fetchMovieRequest);
        axios.get(MOVIE_DETAILS_API(imdbId)).then(res => {
            const movie = res.data;
            dispatch(fetchMovieSuccess(movie));
        })
    }
}

export const searchMovie = (title) => {
    return (dispatch) => {
        dispatch(searchMovieRequest());
        axios.get(SEARCH_MOVIE_TITLE_API(title)).then(res => {
            const movie = res.data;
            dispatch(searchMovieSuccess(movie));
        })
    }
}