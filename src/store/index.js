import { configureStore } from '@reduxjs/toolkit';
import { reducer, initialState } from '../reducer/index';

const store = configureStore({
    reducer, initialState
});

export default store;
