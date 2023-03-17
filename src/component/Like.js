import { IconButton } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import {useEffect, useState} from 'react';
import {CustomFavoriteIcon} from "./MyStyle";
import Api from "../customApi";

function Like({pno}) {
    const [liked, setLiked] = useState(false);
    const [likeCnt, setLikeCnt] = useState(0);

    useEffect(()=> {
        Api.get('/likes?pno='+pno)
            .then(res => {
                setLiked(res.data);
            })

    },[pno])

    useEffect(()=> {
        Api.get('/board?pno='+pno)
            .then(res => {
                setLikeCnt(res.data.likeCnt);
            })

    },[pno])


    const handleClick = () => {
        setLiked(!liked);

        Api.post('/likes?pno='+pno)
            .then(()=> {
                setLikeCnt(liked ? likeCnt-1 : likeCnt+1);
            })

    };

    return (
        <div>
            {liked ? (
                <CustomFavoriteIcon color="secondary" onClick={handleClick}>
                    <Favorite />
                </CustomFavoriteIcon>
            ) : (
                <CustomFavoriteIcon color="secondary" onClick={handleClick}>
                    <FavoriteBorder />
                </CustomFavoriteIcon>
            )}
            {likeCnt}
        </div>
    );
}

export default Like;