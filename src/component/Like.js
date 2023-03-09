import { IconButton } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import {useEffect, useState} from 'react';
import {CustomFavoriteIcon} from "./MyStyle";
import Api from "../customApi";

function Like({pno}) {
    const [liked, setLiked] = useState(false);

    useEffect(()=> {
        Api.get('/likes?pno='+pno)
            .then(res => {
                setLiked(res.data);
            })

    },[pno])

    const handleClick = () => {
        setLiked(!liked);

        Api.post('/likes?pno='+pno)

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
        </div>
    );
}

export default Like;