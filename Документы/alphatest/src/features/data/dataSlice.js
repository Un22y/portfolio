import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { charactersLink } from '../../api/postage';


const initialState = {
    loading: false,
    data: [],
    error: '',
}

export const fetchData = createAsyncThunk('data/fetchData', async () => {
    return axios
        .get(charactersLink.href)
        .then((response) => response.data.info)
})

const dataSlice = createSlice({
    name:'data',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchData.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchData.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
            state.error = ''
        })
        builder.addCase(fetchData.rejected, (state, action) => {
            state.loading = false
            state.data = []
            state.error = action.error.message
        })
    }
})

export default dataSlice.reducer