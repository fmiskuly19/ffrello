import { Box, Button, Divider, Grid, IconButton, MenuItem, OutlinedInput, Paper, Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import WorkspaceViewLeftSidebar, { SkeletonWorkspaceViewLeftSideBar } from "../../components/sidebars/workspaceViewLeftSidebar";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { ApiCallStatus } from "../../types/ApiCallStatus";
import { addBoard, getBoardPageThunk } from "../../redux/workspaceViewSlice";

import PeopleIcon from '@mui/icons-material/People';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useState } from "react";
import { BoardList } from "../../types/BoardList";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const MINCOLUMNWIDTH = '250px';

const BoardPage = () => {

    const dispatch = useAppDispatch()

    const [thing, setThing] = useState(false);

    let { boardid } = useParams();
    const userid = useAppSelector((state) => state.userSlice.User.userid)

    const board = useAppSelector((state) => state.workspaceViewSlice.currentBoard)
    const workspace = useAppSelector((state) => state.workspaceViewSlice.workspace)
    const boardLists = useAppSelector((state) => state.workspaceViewSlice.currentBoard?.boardLists)
    const getBoardStatus = useAppSelector((state) => state.workspaceViewSlice.getBoardPageStatus)

    const [newBoardListName, setNewBoardListName] = useState('');

    let pageContent;
    if (getBoardStatus == ApiCallStatus.Idle) {
        dispatch(getBoardPageThunk({ userid: userid, boardid: Number(boardid) }))
    }
    else if (getBoardStatus == ApiCallStatus.Loading) {
        pageContent = <>Loading!!!</>
    }
    else if (getBoardStatus == ApiCallStatus.Failure) {
        pageContent = <>Error!!!</>
    }
    else if (getBoardStatus == ApiCallStatus.Success && board) {
        pageContent =
            <>
                <Box display="flex" width="100%" justifyContent="space-between" p="15px" sx={{ borderBottom: '1px solid gray' }}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography variant="h5" fontWeight="700">{board?.name}</Typography>
                        <IconButton color="primary"><StarBorderIcon sx={{ width: '18px', height: '18px' }} /></IconButton>
                        <IconButton color="primary"><PeopleIcon sx={{ width: '18px', height: '18px' }} /></IconButton>
                    </Stack>
                    <Box display="flex" flexDirection="row">
                        <IconButton color="primary"><StarBorderIcon sx={{ width: '18px', height: '18px' }} /></IconButton>
                        <IconButton color="primary"><StarBorderIcon sx={{ width: '18px', height: '18px' }} /></IconButton>
                        <IconButton color="primary"><StarBorderIcon sx={{ width: '18px', height: '18px' }} /></IconButton>
                        <Button>Hello</Button>
                        <Divider />
                        <Button>World</Button>
                        <IconButton color="primary"><StarBorderIcon sx={{ width: '18px', height: '18px' }} /></IconButton>
                    </Box>
                </Box>

                <Stack direction="row" spacing={2} sx={{ padding: '15px', overflowX: 'auto' }}>

                    {
                        boardLists ?
                            boardLists.map((list: BoardList) => {
                                return (
                                    <Paper sx={{ minWidth: MINCOLUMNWIDTH, padding: '10px', height: 'max-content' }}>
                                        <Stack direction="row" justifyContent="space-between" alignItems="center" ml="5px">
                                            {list.name}
                                            <IconButton size="small" sx={{ borderRadius: '8px' }}><MoreHorizIcon color="primary" /></IconButton>
                                        </Stack>
                                    </Paper>
                                )
                            })
                            :
                            <></>

                    }

                    {thing ?
                        <>
                            <Paper sx={{ minWidth: MINCOLUMNWIDTH, padding: '10px', height: 'max-content' }}>
                                <Stack direction="column" spacing={1}>
                                    <OutlinedInput inputRef={input => input && input.focus()} size="small" value={newBoardListName} onChange={(e) => setNewBoardListName(e.target.value as string)} />
                                    <Stack direction="row">
                                        <Button onClick={() => dispatch(addBoard(newBoardListName))} sx={{ textTransform: 'none' }}>Add List</Button>
                                        <Button onClick={() => setThing(false)}>Icon</Button>
                                    </Stack>
                                </Stack>
                            </Paper>
                        </>
                        :
                        <>
                            <MenuItem sx={{ borderRadius: '8px' }} onClick={() => { setThing(true); }}>Create New Board List</MenuItem>
                        </>
                    }
                </Stack >
            </>
    }

    return (
        <Grid container>
            <Grid item xl={1.5}>
                {getBoardStatus == ApiCallStatus.Loading ?
                    <SkeletonWorkspaceViewLeftSideBar />
                    :
                    <></>
                }

                {getBoardStatus == ApiCallStatus.Success || getBoardStatus == ApiCallStatus.Failure ?
                    <WorkspaceViewLeftSidebar workspace={workspace} />
                    :
                    <></>
                }

            </Grid>
            <Grid item xl={10.5}>
                {pageContent}
            </Grid>
        </Grid>
    );
}

export default BoardPage;