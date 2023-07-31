import axios from 'axios';
import {message, Divider} from "antd";
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {SEARCH_MOVIE_API} from "../utils/api";
import {fetchUser} from "../redux/actions";
import {Header, MovieList, SearchBar} from "../components/";


export default function SearchPage() {

    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [movieData, setMovieData] = useState(null);
    const [showMyMovies, setShowMyMovies] = useState(false);

    useEffect(() => {
        if(!user) navigate("/");
    },[user])

    const handleSearch = (values) => {
        setShowMyMovies(false);
        dispatch(fetchUser(user.username));
        let title = values.title.trim().replace(/\s+/g, '+');
        axios.get(SEARCH_MOVIE_API(title)).then((res) => {
            if(res.data.Response === "True") {
                setMovieData(res.data.Search);
            } else {
                setMovieData([]);
                message.error("No movies found.")
            }
        }).catch((err) => {
            console.log(err);
        });
    };

    const showMyMovieToggle = () => {
        dispatch(fetchUser(user.username));
        setShowMyMovies(true);
        setMovieData(null);
        if(user.favorite_movies.length === 0) {
            message.error("You currently have no favorite movies. Start by searching your favorite movies first.")
        }
    }

    return (
        <div>
            <div>
                <Header showMyMovieToggle={showMyMovieToggle} />
            </div>
            <div className="searchBarContainer" >
                <SearchBar handleSearch={handleSearch} />
            </div>
            <Divider />
            {movieData ? <MovieList movieData={movieData} /> : null}
            {showMyMovies && user.favorite_movies ? <MovieList movieData={user.favorite_movies} /> : null}
        </div>

    );
}