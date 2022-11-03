import React from 'react';
import {baseUrl} from "../constants/api";
import axios from "axios";
import {useAppDispatch} from "../store";


export const ItemList = () => {

    const renderItem = (item:any) => {
        if (item.children) {
            return (
                <ul key={item.id}>
                    <li key={item.id}>{item.label}</li>
                    {item.children.map((childItem:any) => renderItem(childItem))}
                </ul>
            );
        }

        return <li key={item.id}>
            {item.label}</li>
    };
    const dispatch = useAppDispatch();
    const [item, setItem] = React.useState<any>(null)
    const [loading, setLoading] = React.useState<boolean>(false)
    console.log(item)
    React.useEffect(() => {
        setLoading(true)
        if (item !== undefined) {
            axios.get(`${baseUrl}`).then((res) => {
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
                setItem(mappedData)
            })
        }
        setTimeout(() => setLoading(false), 1500)

    }, [])
        return (
            <ul>
                {item?.map((item:any,index:number) => (
                    renderItem(item)
                    ))}
            </ul>
        );
}
