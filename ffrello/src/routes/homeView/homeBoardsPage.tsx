import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { setSelectedMenu, setSelectedWorkspaceMenu } from "../../redux/homeSlice";

import { Box, Grid, Skeleton, Stack, Typography } from "@mui/material";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import HistoryIcon from '@mui/icons-material/History';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

import BoardCard, { BoardCardHeight } from "../../components/cards/boardCard";
import WorkspaceCard, { SkeletonWorkspaceCard } from "../../components/cards/workspaceCard";
import { ApiCallStatus } from "../../types/ApiCallStatus";
import { useSnackbar } from "notistack";
import { getUserWorkspaces } from "../../redux/userSlice";


const HomeBoardsPage = () => {

    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useAppDispatch()

    const workspaces = useAppSelector((state) => state.userSlice.Workspaces);
    const workspaceStatus = useAppSelector((state) => state.userSlice.workspaceStatus);

    var boardsContent;
    if (workspaceStatus == ApiCallStatus.Loading) {
        boardsContent = <SkeletonBoardsPage />
    }
    else if (workspaceStatus == ApiCallStatus.Failure) {
        boardsContent = <Box justifyContent="center" display="flex">
            <ReportProblemIcon />
        </Box>
        enqueueSnackbar('Could not get workspaces for user');
    }
    else if (workspaceStatus == ApiCallStatus.Success) {
        boardsContent = <>
            <Stack direction="column" spacing={4}>
                <Stack direction="column">
                    <Stack direction="row" spacing={1} mb={1} alignItems={"center"}>
                        <StarBorderIcon style={{ fontSize: '26px' }} />
                        <Typography variant="h6" fontWeight="700">Starred Boards</Typography>
                    </Stack>
                    <Grid container rowSpacing={2} columnGap={2}>
                        {workspaces?.map((workspace) => {
                            return workspace.boards.map((board) => {
                                if (board.isStarred) {
                                    return (<Grid item xl={3}><BoardCard {...board} /></Grid>)
                                }
                            })
                        })}
                    </Grid>
                </Stack>
                <Stack direction="column" >
                    <Stack direction="row" spacing={1} mb={1} alignItems={"center"}>
                        <HistoryIcon style={{ fontSize: '26px' }} />
                        <Typography variant="h6" fontWeight="700">Recent Boards</Typography>
                    </Stack>
                    <Grid container rowSpacing={2} columnGap={2}>
                        <Grid item xl={3}>
                            <BoardCard id={0} name={"Dummy Board"} isStarred={false} Workspace={{ id: 0, name: 'Dummy Board Name', boards: [] }} />
                        </Grid>
                    </Grid>
                </Stack>
            </Stack>
            <Box>
                <Typography variant="h6" fontWeight="700" mb={2} sx={{ textTransform: 'uppercase' }}>Your Workspaces</Typography>
                <Stack direction="column" spacing={4}>
                    {workspaces?.map((x) => {
                        return (<WorkspaceCard {...x} />)
                    })}
                </Stack>
            </Box>
        </>
    }

    useEffect(() => {
        dispatch(setSelectedMenu('Boards')) //set this so when we navigate here the left sidebar reflects that
        dispatch(setSelectedWorkspaceMenu(''))

        if (workspaceStatus == ApiCallStatus.Failure) {
            dispatch(getUserWorkspaces('fwank'))
        }
    }, [])


    return (
        <>
            <Stack direction="column" spacing={8}>
                {boardsContent}
            </Stack>
        </>
    )
}

const SkeletonBoardsPage = () => {
    return (
        <>
            <Stack direction="column" spacing={4}>
                <Stack direction="column">
                    <Stack direction="row" spacing={1} mb={1} alignItems={"center"}>
                        <StarBorderIcon style={{ fontSize: '26px' }} />
                        <Typography variant="h6" fontWeight="700">Starred Boards</Typography>
                    </Stack>
                    <Grid container rowSpacing={2} columnGap={2}>
                        <Grid item xl={3}><Skeleton variant="rounded" height={BoardCardHeight} /></Grid>
                    </Grid>
                </Stack>
                <Stack direction="column" >
                    <Stack direction="row" spacing={1} mb={1} alignItems={"center"}>
                        <HistoryIcon style={{ fontSize: '26px' }} />
                        <Typography variant="h6" fontWeight="700">Recent Boards</Typography>
                    </Stack>
                    <Grid container rowSpacing={2} columnGap={2}>
                        <Grid item xl={3}><Skeleton variant="rounded" height={BoardCardHeight} /></Grid>
                    </Grid>
                </Stack>
            </Stack>
            <Box>
                <Typography variant="h6" fontWeight="700" mb={2} sx={{ textTransform: 'uppercase' }}>Your Workspaces</Typography>
                <Stack direction="column" spacing={4}>
                    <SkeletonWorkspaceCard />
                </Stack>
            </Box>
        </>
    )
}

export default HomeBoardsPage;