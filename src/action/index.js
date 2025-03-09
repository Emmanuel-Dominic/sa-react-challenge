import axios from 'axios'
import { REACT_APP_BASE_URL } from "../utils/index";

export const fetchUsers = () => {
    return (dispatch) => {
        dispatch({ type: 'FETCH_USERS' });
        axios.get(REACT_APP_BASE_URL)
            .then((response) => {
                dispatch({ type: 'FETCH_USERS_SUCCESS', users: response.data });
            })
            .catch((error) => {
                dispatch({ type: 'FETCH_USERS_ERROR', error: error.message });
            });
    };
};

export const registerUser = (userData) => {
    return (dispatch) => {
      dispatch({ type: 'REGISTER_USER_REQUEST' });
      axios.post(REACT_APP_BASE_URL, userData)
        .then((response) => {
            dispatch({ type: 'REGISTER_USER_SUCCESS', user: response.data });
        })
        .catch((error) => {
            dispatch({ type: 'REGISTER_USER_ERROR', error: error.response.data.message });
        });
    };
};

export const updateUser = (userId, userData) => {
    return (dispatch) => {
      dispatch({ type: 'UPDATE_USER_REQUEST' });
      axios.put(`${REACT_APP_BASE_URL}/${userId}`, userData)
        .then((response) => {
            dispatch({ type: 'UPDATE_USER_SUCCESS', user: response.data });
        })
        .catch((error) => {
            dispatch({ type: 'UPDATE_USER_ERROR', error: error.response.data.message });
        });
    };
};
