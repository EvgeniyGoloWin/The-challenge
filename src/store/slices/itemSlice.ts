import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from "axios";
import {baseUrl} from "../../constants/api";


export interface ItemState {
    loading: boolean,
    error: any,
    items: []
}

export interface Item {
    id: number
    label :string
    parent_id: number
    children?: Item[]
}

export const ItemGet = createAsyncThunk (
    'item/get',
    async ( _,thunkAPI) => {
        try {
            return await axios.get(`${baseUrl}`);
        } catch (error) {
            return thunkAPI.rejectWithValue({error: error});
        }
    }
)

const initialState: ItemState = {
    loading: false,
    error: null,
    items:[]
}

export const itemSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            ItemGet.pending, (state) => {
                state.loading = true;
                state.error = null;
            });
        builder.addCase(
            ItemGet.fulfilled, (state, {payload}:any) => {
                state.items = payload.data
                state.loading = false;
            });
        builder.addCase(
            ItemGet.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            });
    }
})

export default itemSlice.reducer

