export const initialState = {
    users: [],
    loading: true,
    error: null,
    form: {
      name: '',
      email: '',
      phone: '',
    },
};
  
export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_USERS':
            return { ...state, loading: true };
        case 'FETCH_USERS_SUCCESS':
            return { ...state, users: action.users, loading: false };
        case 'FETCH_USERS_ERROR':
            return { ...state, error: action.error, loading: false };
        case 'REGISTER_USER_REQUEST':
            return { ...state, loading: true, error: null };
        case 'REGISTER_USER_SUCCESS':
            return { ...state, users: [...state.users, action.user], loading: false };
        case 'REGISTER_USER_ERROR':
            return { ...state, error: action.error, loading: false };
        case 'UPDATE_USER_REQUEST':
            return { ...state, loading: true, error: null };
        case 'UPDATE_USER_SUCCESS':
            return {...state, loading: false, error: null, 
                    users: state.users.map((user) => (user.id === action.user.id ? action.user : user)) };
        case 'UPDATE_USER_ERROR':
            return {...state, loading: false, error: action.error };
        case 'UPDATE_FORM':
            return { ...state, form: { ...state.form, [action.field]: action.value } };
        case 'RESET_FORM':
            return { ...state, form: initialState.form };
        default:
            return state;
    }
};
