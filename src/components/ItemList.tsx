import React from 'react';
import {RootState, useAppDispatch} from "../store";
import {ListItem} from "../store/slices/itemSlice";
import {itemGet} from "../store/thunks/itemThunk";
import {useSelector} from "react-redux";

const getList = (data: ListItem[]) => {
    return (
        <ul>
            {data.map((item) => (
                <li key={item.id}>
                    {item.label}
                    {item.children ? getList(item.children) : null}
                </li>
            ))}
        </ul>
    );
};

export const ItemList = () => {
    const dispatch = useAppDispatch();
    const data = useSelector((state:RootState)=> state.itemListReducer.data);
    React.useEffect(() => {
        dispatch(itemGet())
    }, []);
      if(!data) {
          return <p>loading...</p>
      }
     const list = getList(data)
        return list
}
