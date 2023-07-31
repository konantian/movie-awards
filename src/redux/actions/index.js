import axios from "axios";
import {USER_PROFILE_API} from "../../utils/api";

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

export const fetchUser = (username) => {
    const config = {
        headers : {"Authorization": `JWT ${localStorage.getItem("token")}`}
    }
    return (dispatch) => {
        dispatch(fetchUserRequest);
        axios.get(USER_PROFILE_API(username), config).then(res => {
            const user = res.data;
            dispatch(fetchUserSuccess(user));
        })
    }
}