export const initialState = {
    users: [],
    loading: true,
    error: null,
};
  
export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_USERS':
            return { ...state, loading: true };
        case 'FETCH_USERS_SUCCESS':
            return { ...state, users: action.users, loading: false };
        case 'FETCH_USERS_ERROR':
            return { ...state, error: action.error, loading: false };
        default:
            return state;
    }
};
