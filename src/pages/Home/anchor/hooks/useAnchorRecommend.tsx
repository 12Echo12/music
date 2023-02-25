import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getAnchorRecommend } from "../../../../service/api/anchor"
import ListType from '../type';

export const useAnchorRecommend = () => {
    // const [anchorList, setAnchorList] = useState<ListType[]>([]);
    
    // const title = useParams();
    // useEffect(() => {
    //     getAnchorRecommend("3").then((res) => {
    //         let obj = JSON.parse(res);
    //         let list:ListType[] = [];
    //         obj.map((item:any) => {
    //             list.push(item.dj);
    //         })
    //         setAnchorList(list);
    //     })
    // }, [])
    // console.log(anchorList);
    // return anchorList;
}