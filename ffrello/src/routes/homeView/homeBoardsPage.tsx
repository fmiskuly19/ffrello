import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { setSelectedMenu, setSelectedWorkspaceMenu } from "../../redux/homeSlice";

import { Box, Grid, Skeleton, Stack, Typography } from "@mui/material";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import HistoryIcon from '@mui/icons-material/History';

import BoardCard, { BoardCardHeight } from "../../components/cards/boardCard";
import WorkspaceCard, { SkeletonWorkspaceCard } from "../../components/cards/workspaceCard";


const BoardsPage = () => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setSelectedMenu('Boards')) //set this so when we navigate here the left sidebar reflects that
        dispatch(setSelectedWorkspaceMenu(''))
    })

    const workspaces = useAppSelector((state) => state.userSlice.Workspaces);

    return (
        <>
            <Stack direction="column" spacing={8}>
                <Stack direction="column" spacing={4}>
                    <Stack direction="column">
                        <Stack direction="row" spacing={1} mb={1} alignItems={"center"}>
                            <StarBorderIcon style={{ fontSize: '26px' }} />
                            <Typography variant="h6" fontWeight="700">Starred Boards</Typography>
                        </Stack>
                        <Grid container rowSpacing={2} columnGap={2}>
                            {/* there is definitely a faster/shorthand way to do this */}
                            {workspaces ?
                                workspaces.map((workspace) => {
                                    return workspace.boards.map((board) => {
                                        if (board.isStarred) {
                                            return (<Grid item xl={3}><BoardCard {...board} /></Grid>)
                                        }
                                    })
                                })
                                :
                                <Grid item xl={3}><Skeleton variant="rounded" height={BoardCardHeight} /></Grid>
                            }
                        </Grid>
                    </Stack>
                    <Stack direction="column" >
                        <Stack direction="row" spacing={1} mb={1} alignItems={"center"}>
                            <HistoryIcon style={{ fontSize: '26px' }} />
                            <Typography variant="h6" fontWeight="700">Recent Boards</Typography>
                        </Stack>
                        <Grid container rowSpacing={2} columnGap={2}>
                            {workspaces ?
                                <Grid item xl={3}>
                                    <BoardCard id={0} name={"Dummy Board"} isStarred={false} Workspace={{ id: 0, name: 'Dummy Board Name', boards: [] }} />
                                </Grid>
                                :
                                // generate between 1-3 skeletons for the loader
                                <Grid item xl={3}><Skeleton variant="rounded" height={BoardCardHeight} /></Grid>
                            }
                        </Grid>
                    </Stack>
                </Stack>
                <Box>
                    <Typography variant="h6" fontWeight="700" mb={2} sx={{ textTransform: 'uppercase' }}>Your Workspaces</Typography>
                    <Stack direction="column" spacing={4}>
                        {workspaces ?
                            workspaces.map((x) => {
                                return (<WorkspaceCard {...x} />)
                            })
                            :
                            <SkeletonWorkspaceCard />
                        }
                    </Stack>
                </Box>
            </Stack>
        </>
    )
}

export default BoardsPage;