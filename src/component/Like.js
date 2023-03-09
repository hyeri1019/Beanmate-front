import { IconButton } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { useState } from 'react';
import {CustomFavoriteIcon} from "./MyStyle";

function Like() {
    const [liked, setLiked] = useState(false);

    const handleClick = () => {
        setLiked(!liked);
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