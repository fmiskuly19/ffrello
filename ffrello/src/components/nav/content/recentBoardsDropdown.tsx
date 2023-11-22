import { Box, MenuItem, MenuList, Stack, Typography } from "@mui/material";
import Board from '../../../types/Board'
import { useState } from "react";
import BoardMenuItem from "../../boardMenuItem";
import * as data from '../../../data/hardcodes'

const RecentBoardsDropdown = () => {

    const min = 1;
    const max = 100;
    const rand = min + Math.random() * (max - min);

    const [recentBoards, setRecentBoards] = useState<Board[]>(data.hardCodedBoards);

    return (
        <>
            <Box m="12px" sx={{ minWidth: '250px' }}>
                <Stack direction="column" spacing={.25}>
                    {recentBoards.map((x) => {
                        return (
                            <BoardMenuItem {...x} />
                        )
                    })}
                </Stack>
            </Box >
        </>
    )
}

export default RecentBoardsDropdown;