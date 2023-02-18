import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {favoriteLink} from '../../api/postage'

const favorites = localStorage.getItem('favorites')
console.log(favorites)

const initialState = {
    loading:false,
    error:'',
    data: [],
    list: favorites ? JSON.parse(favorites) : [],
}


export const fetchFavorites = createAsyncThunk('favorites/fetchFavorites', async () => {
    return axios
        .get(favoriteLink.href)
        .then((response) => response.data)
})

const favoritesSlice = createSlice({
    name:'favorites',
    initialState,
    reducers: {
        switchItem: (state, action) => {
            if(state.list.includes(action.payload)) {
                state.list = state.list.filter(elem => elem != action.payload)
            }   
            else {
                state.list.push(action.payload);
            };
            favoriteLink.href = `https://rickandmortyapi.com/api/character/${state.list}`
            localStorage.setItem('favorites', JSON.stringify(state.list))
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchFavorites.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchFavorites.fulfilled, (state, action) => {
            state.loading = false
            action.payload instanceof Array ? state.data = action.payload :state.data = [action.payload];
            state.error = ''
        })
        builder.addCase(fetchFavorites.rejected, (state, action) => {
            state.loading = false
            state.data = []
            state.error = action.error.message
        })
    }
});

export const {showFavorites, switchItem} = favoritesSlice.actions
export default favoritesSlice.reducer