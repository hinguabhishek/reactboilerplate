import { configureStore } from "@reduxjs/toolkit";
import {counterSlice} from './slices/counter';

const store = configureStore({
    reducer: {
        guide: counterSlice.reducer
    },
    devTools:true,
});

export default store;