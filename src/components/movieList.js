import axios from "axios";
import {List, message} from 'antd';
import {DeleteFilled, StarOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import {fetchUser} from '../redux/actions';
import {USER_PROFILE_API} from "../utils/api";


const MovieList = ({movieData}) => {

    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [imdbIds, setImdbIds] = useState([]);

    useEffect(() => {
        if(user) {
            let ids = user.favorite_movies.map( movie => movie.imdb_id);
            setImdbIds(ids);
        } else {
            navigate("/");
        }
    },[user])

    const handleAdd = (movie) => {
        if(user.favorite_movies.length === 5) {
            message.error("You have reached the maximum of five movies limit.");
        } else {
            const config = {
              headers : {"Content-type": "application/json"}
            }
            const data = {
                movie: {"title": movie.Title,
                        "year": movie.Year,
                        "imdb_id": movie.imdbID,
                        "poster": movie.Poster,
                        "type": movie.Type},
                action: "add"
            }
            axios.patch(USER_PROFILE_API(user.username), data, config).then((res) => {
                message.success("You have added a new movie to your movie list.");
                dispatch(fetchUser(user.username));
            }
            ).catch((err) => {
                 message.error("Something wrong happened, please try again.");
            })
        }
    }

    const handleRemove = (imdbId) => {
        const config = {
          headers : {"Content-type": "application/json"}
        }
        const data = {
            "imdb_id": imdbId,
            action: "remove"
        }
        axios.patch(USER_PROFILE_API(user.username), data, config).then((res) => {
            message.success("You have removed the movie from your movie list.");
            dispatch(fetchUser(user.username));
        }
        ).catch((err) => {
             message.error("Something wrong happened, please try again.");
        })
    }

    return (
        <div className="movieListContainer" >
            <List
                itemLayout="vertical"
                size="large"
                dataSource={movieData}
                renderItem={(item) => (
                    <List.Item
                        key={item.imdbID || item.imdb_id}
                        actions={[
                             imdbIds.includes(item.imdbID || item.imdb_id)
                                 ? <a className="deleteIcon" onClick={() => handleRemove(item.imdbID || item.imdb_id)}><span><DeleteFilled className="actionButton" /></span></a>
                                 : <a className="likeIcon" onClick={() => handleAdd(item)} ><span><StarOutlined className="actionButton" /></span></a>
                        ]}
                    >
                        <List.Item.Meta
                            title={<span className="titleText" >{item.Title || item.title}</span>}
                            description={item.Year || item.year}
                        />
                        <img alt="poster" height={250} width={180} src={item.Poster || item.poster}/>
                    </List.Item>
                )}
              />
        </div>
    );
};

export default MovieList;
