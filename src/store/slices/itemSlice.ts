import {createSlice} from '@reduxjs/toolkit';
import {itemGet} from "../thunks/itemThunk";

export interface ListItem {
    id: number;
    label: string;
    parent_id: number;
    children?: ListItem[];
}

export interface ItemState {
    loading: boolean,
    error: any,
    data: null | ListItem[],
}

const initialState: ItemState = {
    loading: false,
    error: null,
    data: null,
}

export const itemSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            itemGet.pending, (state) => {
                state.loading = true;
                state.error = null;
            });
        builder.addCase(
            itemGet.fulfilled, (state, {payload}:any) => {
                state.data = payload
                state.loading = false;
            });
        builder.addCase(
            itemGet.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            });
    }
})

export default itemSlice.reducer

