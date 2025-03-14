import axios from 'axios'
import { REACT_APP_BASE_URL } from "../utils/index";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
            toast.success('User registered successfully!');
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
            toast.success('User updated successfully!');
        })
        .catch((error) => {
            dispatch({ type: 'UPDATE_USER_ERROR', error: error.response.data.message });
        });
    };
};

export const deleteUser = (userId) => {
    return (dispatch) => {
        dispatch({ type: 'DELETE_USER_REQUEST' });
        axios.delete(`${REACT_APP_BASE_URL}/${userId}`)
        .then((response) => {
            dispatch({ type: 'DELETE_USER_SUCCESS', userId });
            toast.success(response.data.message);
        })
        .catch((error) => {
            dispatch({ type: 'DELETE_USER_ERROR', error: error.response.data.message });
        });
    };
};
