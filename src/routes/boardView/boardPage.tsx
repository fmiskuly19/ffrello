import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { getBoardPageThunk, newBoardListThunk, starBoardThunk } from "../../redux/workspaceViewSlice";

import { Box, Button, CircularProgress, Divider, Grid, IconButton, MenuItem, OutlinedInput, Paper, Stack, Typography, useTheme } from "@mui/material";

import StarIcon from '@mui/icons-material/Star';
import CloseIcon from '@mui/icons-material/Close';
import PeopleIcon from '@mui/icons-material/People';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import AddIcon from '@mui/icons-material/Add';

import WorkspaceViewLeftSidebar from "../../components/sidebars/workspaceViewLeftSidebar";
import BoardListPaper from "../../components/material-ui-cards/boardList";

import { ApiCallStatus } from "../../types/ApiCallStatus";
import { BoardList } from "../../types/BoardList";
import FFrelloCardModal from "../../components/modals/ffrelloCardModal";

export interface newBoardListCard {
    boardListId: number,
    open: boolean,
    value: string
}

const MINCOLUMNWIDTH = '250px';

const BoardPage = () => {

    const dispatch = useAppDispatch()

    const [openNewBoardList, setOpenNewBoardList] = useState(false);

    let { boardid } = useParams();

    const board = useAppSelector((state) => state.workspaceViewSlice.currentBoard)
    const workspace = useAppSelector((state) => state.workspaceViewSlice.workspace)
    const boardLists = useAppSelector((state) => state.workspaceViewSlice.currentBoard?.boardLists)
    const getBoardStatus = useAppSelector((state) => state.workspaceViewSlice.getBoardPageStatus)
    const accessToken = useAppSelector((state) => state.authSlice.accessToken)

    const [newBoardListName, setNewBoardListName] = useState('');

    const reset = () => {
        setNewBoardListName('');
        setOpenNewBoardList(false);
    }

    useEffect(() => {
        dispatch(getBoardPageThunk({ accessToken: accessToken, boardid: Number(boardid) }))
    }, [])

    let pageContent;
    if (getBoardStatus == ApiCallStatus.Loading) {
        pageContent = <>
            Loading!!!
            <CircularProgress />
        </>
    }
    else if (getBoardStatus == ApiCallStatus.Failure) {
        pageContent = <>Error!!!</>
    }
    else if (getBoardStatus == ApiCallStatus.Success && board) {
        pageContent =
            <>
                {/* modal for when the user clicks on a card, react to global state change */}
                <FFrelloCardModal />

                {/* top bar */}
                <Box display="flex" width="100%" justifyContent="space-between" p="15px" sx={{ borderBottom: '1px solid gray' }}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography variant="h5" fontWeight="700">{board?.name}</Typography>
                        <IconButton color="primary" onClick={() => dispatch(starBoardThunk({ accessToken: accessToken, isStarred: !board.isStarred, boardId: board.id }))}>
                            {board?.isStarred ?
                                <StarIcon htmlColor="#F8C021" sx={{ fontSize: '18px' }} />
                                :
                                <StarBorderIcon sx={{ width: '18px', height: '18px' }} />
                            }
                        </IconButton>
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
                </Box >



                {/* board lists of cards */}
                <Stack direction="row" spacing={2} sx={{ padding: '15px', overflowX: 'auto' }}>

                    {
                        boardLists ?
                            boardLists.map((list: BoardList) => { return <BoardListPaper {...list}></BoardListPaper> })
                            :
                            <></>

                    }

                    {/* new board list button */}
                    {openNewBoardList ?
                        <>
                            <Paper sx={{ minWidth: MINCOLUMNWIDTH, padding: '10px', height: 'max-content', borderRadius: '15px' }}>
                                <Stack direction="column" spacing={1}>
                                    {/* <OutlinedInput inputRef={input => input && input.focus()} size="small" value={newBoardListName} onChange={(e) => setNewBoardListName(e.target.value as string)} /> */}
                                    <OutlinedInput size="small" value={newBoardListName} onChange={(e) => setNewBoardListName(e.target.value as string)} />
                                    <Stack direction="row">
                                        <Button onClick={() => { dispatch(newBoardListThunk({ accessToken: accessToken, name: newBoardListName, boardId: board.id })); reset() }} sx={{ textTransform: 'none' }}>Add List</Button>
                                        <IconButton onClick={() => reset()}><CloseIcon sx={{ height: '18px', width: '18px' }} color='primary' /></IconButton>
                                    </Stack>
                                </Stack>
                            </Paper>
                        </>
                        :
                        <>
                            <MenuItem sx={{ borderRadius: '8px', minWidth: MINCOLUMNWIDTH, height: 'max-content' }} onClick={() => { setOpenNewBoardList(true); }}>
                                <Stack direction="row" >
                                    Create New Board List
                                    <AddIcon sx={{ width: '18px', height: '22px', ml: '5px' }} />
                                </Stack>
                            </MenuItem>
                        </>
                    }
                </Stack >
            </>
    }

    return (
        <Grid container>
            <Grid item xl={1.5}>
                <WorkspaceViewLeftSidebar workspaceId={Number(workspace?.id)} />
            </Grid>
            <Grid item xl={10.5}>
                {pageContent}
            </Grid>
        </Grid>
    );
}

export default BoardPage;