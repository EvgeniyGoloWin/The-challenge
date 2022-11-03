import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {baseUrl} from "../../constants/api";

export const itemGet = createAsyncThunk (
    'item/get',
    async ( _,thunkAPI) => {
        try {
            const res = await axios.get(`${baseUrl}`);
            const mappedData = res.data
                .reduce(
                    (result:any, item:any, index:number) => {
                        if (item.parent_id) {
                            const parent = result.find((parent:any) => parent.id === item.parent_id);

                            if (parent) {
                                parent.children = [...(parent.children || []), item];
                            }
                        }
                        return result;
                    },
                    [...res.data]
                )
                .filter((item:any) => !item.parent_id);
            return mappedData
        } catch (error) {
            return thunkAPI.rejectWithValue({error: error});
        }
    }
)