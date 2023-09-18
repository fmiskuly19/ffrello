import { Box } from "@mui/material";
import { useState } from "react";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

interface InteractiveStarIconProps {
    isStarred: boolean
}

const InteractiveStarIcon = (props: InteractiveStarIconProps) => {

    const [isHoveringOnStar, setIsHoveringOnStar] = useState(props.isStarred);

    //there has to be a better shorthand way to do this
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

    return (
        <Box onMouseOver={handleStarHoverOver} onMouseOut={handleStarHoverOut} display="flex" alignItems="center" sx={{ height: '20px', width: '20px' }}>
            {props.isStarred ? <StarIcon htmlColor="#F8C021" sx={{ fontSize: '20px' }} /> : isHoveringOnStar ? <StarBorderIcon sx={{ fontSize: '24px', color: '#F8C021' }} /> : <Box />}
        </Box>
    )
}

export default InteractiveStarIcon;