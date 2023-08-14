import { Box } from "@mui/material";
import { useState } from "react";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

interface InteractiveStarIconProps{
    isStarred: boolean
}

const InteractiveStarIcon = (props: InteractiveStarIconProps) => {

    const [isHoveringOnStar, setIsHoveringOnStar] = useState(props.isStarred);

    const handleStarHoverOver = () => {
        setIsHoveringOnStar(true);
    }

    const handleStarHoverOut = () => {
        setIsHoveringOnStar(false);
    }

    // const getStar = () => {
    //     if(){

    //     }
    // }

    return(
        <Box onMouseOver={handleStarHoverOver} onMouseOut={handleStarHoverOut} display="flex" alignItems="center" sx={{height: '22px', width: '22px'}}>
            {props.isStarred ? <StarIcon htmlColor="#F8C021" sx={{ fontSize: '22px' }} /> : isHoveringOnStar ? <StarBorderIcon sx={{ fontSize: '24px', color: '#F8C021' }} /> : <Box />}
        </Box>
    )
}

export default InteractiveStarIcon;