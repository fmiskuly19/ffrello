import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Board from '../../types/Board'
import BoardMenuItem from "../boardMenuItem";
import * as data from '../../data/hardcodes'
import { useAppDispatch, useAppSelector } from "../../hooks";

const StarredDropdown = () => {

    useEffect(() => {
        const min = 1;
        const max = 100;
        const rand = min + Math.random() * (max - min);

        setStarredBoards(rand > 50 ? data.hardCodedBoards : []);
    }, [])

    const [starredBoards, setStarredBoards] = useState<Board[]>([]);

    const dispatch = useAppDispatch()

    const workspaces = useAppSelector((state) => state.userSlice.Workspaces)

    return (
        <>
            <Box m="12px">
                {
                    starredBoards.length > 0
                        ?
                        <Box sx={{ width: '250px' }}>
                            <Stack direction="column" spacing={.25}>
                                {workspaces ?
                                    workspaces.map((workspace) => {
                                        return workspace.boards.map((board) => {
                                            if (board.isStarred) {
                                                return (<BoardMenuItem {...board} />)
                                            }
                                        })
                                    })
                                    :
                                    <Box display='flex' justifyContent="center">
                                        <CircularProgress />
                                    </Box>
                                }
                            </Stack>
                        </Box>
                        :
                        <Stack direction="column" spacing={1} alignItems="center" sx={{ maxWidth: '250px' }}>
                            <Box sx={{ width: '250px', height: '100px', borderRadius: '8px', background: 'linear-gradient(304deg, rgba(255,255,255,1) 0%, rgba(0,237,255,1) 0%, rgba(0,3,135,1) 100%)' }} />
                            <Box justifyContent="center" alignItems="center" >
                                <Typography textAlign="center" fontSize="14px">
                                    Star important boards to access them quickly and easily.
                                </Typography>
                            </Box>
                        </Stack>
                }
            </Box >
        </>
    )
}

export default StarredDropdown;