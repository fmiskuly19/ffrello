import { Box, Button } from "@mui/material";

import { BoardCardHeight } from "./boardCard";
import CreateBoardMenu from "../menus/createBoardMenu";
import { useState } from "react";

const NewBoardCard = () => {

    const [openBoardAnchorEl, setOpenBoardAnchorEl] = useState<null | HTMLElement>(null);
    const [openNewBoardMenu, setOpenNewBoardMenu] = useState(false);

    const handleNewBoardClick = (event: any) => {
        setOpenBoardAnchorEl(event.currentTarget);
        setOpenNewBoardMenu(true);
    };

    const handleNewBoardClose = () => {
        setOpenBoardAnchorEl(null);
        setOpenNewBoardMenu(false);
    };


    return (
        <>
            <Box component={Button} 
                onClick={handleNewBoardClick}
                sx={{
                width: '100%',
                height: BoardCardHeight,
                minHeight: BoardCardHeight,
                maxHeight: BoardCardHeight,
                borderRadius: '5px',
                textDecoration: 'none',
                textTransform: 'none',
                justifyContent: 'center'
            }}>
                Create new board
            </Box>
            <CreateBoardMenu open={openNewBoardMenu} anchorEl={openBoardAnchorEl} onClose={handleNewBoardClose} />
        </>
        
    )
}

export default NewBoardCard;