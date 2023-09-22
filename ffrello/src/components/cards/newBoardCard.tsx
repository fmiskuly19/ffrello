import { Box, Button } from "@mui/material";

import { BoardCardHeight } from "./boardCard";

const NewBoardCard = () => {
    return (
        <Box component={Button} sx={{
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
    )
}

export default NewBoardCard;