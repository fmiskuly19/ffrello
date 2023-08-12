import { Box, Stack, Typography } from "@mui/material";
import Board from '../../../types/Board'
import { useState } from "react";
import NavDropdownListItem from "../navDropdownListItem";

const boards = [
    { id: 1, name: 'Fwanks Board', Workspace: { id: 1, name: 'Catherine Workspace', isStarred: false } },
    { id: 1, name: 'Cafwins Board', Workspace: { id: 2, name: 'Catherine Workspace', isStarred: false } }
]

const RecentBoardsDropdownContent = () => {

    const min = 1;
    const max = 100;
    const rand = min + Math.random() * (max - min);

    const [recentBoards, setRecentBoards] = useState<Board[]>(boards);

    return (
        <>
            <Box m="12px">
                <Stack direction="column" spacing={1}>
                    {recentBoards.map((x) => {
                        return (
                            <NavDropdownListItem boardName={x.name} workspaceName={x.Workspace.name}></NavDropdownListItem>
                        )
                    })}
                </Stack>
            </Box>
        </>
    )
}

export default RecentBoardsDropdownContent;