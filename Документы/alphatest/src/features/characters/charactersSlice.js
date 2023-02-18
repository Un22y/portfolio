import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { charactersLink } from "../../api/postage";



const initialState = {
    loading: false,
    error: '',
    page: Number(charactersLink.searchParams.get('page')),
    status: charactersLink.searchParams.get('status'),
    gender: charactersLink.searchParams.get('gender'),
    name: charactersLink.searchParams.get('name'),
    data: [],
}


export const fetchCharacters = createAsyncThunk('characters/fetchCharacters', async () => {
    return axios
        .get(charactersLink.href)
        .then((response) => response.data.results)
})



const characterSlice = createSlice({
    name:'characters',
    initialState,
    reducers: {
        changePage: (state,action) => {
            action.payload == '+' ?
            state.page += 1
            :
            state.page -= 1;
            charactersLink.searchParams.set('page', state.page);
        },
        pageByNumber: (state,action) => {
            state.page = action.payload;
            charactersLink.searchParams.set('page', state.page);
        },
        addStatus: (state,action) => {
            state.status = action.payload;
            charactersLink.searchParams.set('status', state.status);
            state.page = 1;
            charactersLink.searchParams.set('page', '1');
        },
        addGender: (state,action) => {
            state.status = action.payload;
            charactersLink.searchParams.set('gender', state.status);
            state.page = 1;
            charactersLink.searchParams.set('page', '1');
        },
        addName: (state,action) => {
            state.name = action.payload;
            charactersLink.searchParams.set('name', state.name);
            state.page = 1;
            charactersLink.searchParams.set('page', '1');
        },
        
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCharacters.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchCharacters.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
            state.error = ''
        })
        builder.addCase(fetchCharacters.rejected, (state, action) => {
            state.loading = false
            state.data = []
            state.error = action.error.message
        })
    }
})


export const {changePage,pageByNumber,addStatus,addGender,addName} = characterSlice.actions;
export default characterSlice.reducer