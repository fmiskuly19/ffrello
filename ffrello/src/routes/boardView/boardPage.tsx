import { Box, Button, Divider, Grid, IconButton, Menu, MenuItem, OutlinedInput, Paper, Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import WorkspaceViewLeftSidebar from "../../components/sidebars/workspaceViewLeftSidebar";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { ApiCallStatus } from "../../types/ApiCallStatus";
import { getBoardPageThunk, newBoardListThunk, starBoardThunk } from "../../redux/workspaceViewSlice";
import StarIcon from '@mui/icons-material/Star';


import PeopleIcon from '@mui/icons-material/People';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useEffect, useState } from "react";
import { BoardList } from "../../types/BoardList";
import BoardListActionMenu from "../../components/boardListActionMenu";
import { enqueueSnackbar } from "notistack";
import AddIcon from '@mui/icons-material/Add';



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
    const addBoardListStatus = useAppSelector((state) => state.workspaceViewSlice.addBoardListStatus)
    const removeBoardListStatus = useAppSelector((state) => state.workspaceViewSlice.removeBoardListStatus)

    const [newBoardListName, setNewBoardListName] = useState('');

    const reset = () => {
        setNewBoardListName('');
        setThing(false);
    }

    useEffect(() => {
        dispatch(getBoardPageThunk({ userid: userid, boardid: Number(boardid) }))
    }, [])

    //get board if the route id and our current cached board id dont match
    if (boardid !== String(board?.id)) {
        dispatch(getBoardPageThunk({ userid: userid, boardid: Number(boardid) }))
    }

    if (addBoardListStatus == ApiCallStatus.Failure) {
        enqueueSnackbar('Could not add list', { variant: 'error' })
    }
    if (removeBoardListStatus == ApiCallStatus.Failure) {
        enqueueSnackbar('Could not remove list', { variant: 'error' })
    }

    let pageContent;
    if (getBoardStatus == ApiCallStatus.Loading) {
        pageContent = <>Loading!!!</>
    }
    else if (getBoardStatus == ApiCallStatus.Failure) {
        pageContent = <>Error!!!</>
    }
    else if (getBoardStatus == ApiCallStatus.Success && board) {

        console.log('board')
        console.log(board)

        pageContent =
            <>
                <Box display="flex" width="100%" justifyContent="space-between" p="15px" sx={{ borderBottom: '1px solid gray' }}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography variant="h5" fontWeight="700">{board?.name}</Typography>
                        <IconButton color="primary" onClick={() => dispatch(starBoardThunk({ userId: userid, isStarred: !board.isStarred, boardId: board.id }))}>
                            {board.isStarred ?
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

                <Stack direction="row" spacing={2} sx={{ padding: '15px', overflowX: 'auto' }}>

                    {
                        boardLists ?
                            boardLists.map((list: BoardList) => {

                                return (
                                    <>
                                        <Paper sx={{ minWidth: MINCOLUMNWIDTH, padding: '10px', height: 'max-content', borderRadius: '15px' }}>
                                            <Stack direction="column" spacing={1}>
                                                <Stack direction="row" justifyContent="space-between" alignItems="center" ml="5px">
                                                    {list.name}
                                                    <BoardListActionMenu boardList={list} />
                                                </Stack>


                                                {list.cards ?

                                                    list.cards.map((card) => {
                                                        return (<>Hello</>)
                                                    })
                                                    :
                                                    <>

                                                    </>
                                                }


                                                <MenuItem sx={{ paddingLeft: '0px', borderRadius: '8px' }}><Box display="flex" flexDirection="row" alignItems="center"><AddIcon sx={{ height: '18px', width: '18px', marginRight: '5px' }} />Add a Card</Box></MenuItem>
                                            </Stack>
                                        </Paper>


                                    </>
                                )
                            })
                            :
                            <></>

                    }

                    {thing ?
                        <>
                            <Paper sx={{ minWidth: MINCOLUMNWIDTH, padding: '10px', height: 'max-content', borderRadius: '15px' }}>
                                <Stack direction="column" spacing={1}>
                                    <OutlinedInput inputRef={input => input && input.focus()} size="small" value={newBoardListName} onChange={(e) => setNewBoardListName(e.target.value as string)} />
                                    <Stack direction="row">
                                        <Button onClick={() => { dispatch(newBoardListThunk({ userid: userid, name: newBoardListName, boardId: board.id })); reset() }} sx={{ textTransform: 'none' }}>Add List</Button>
                                        <Button onClick={() => reset()}>Icon</Button>
                                    </Stack>
                                </Stack>
                            </Paper>
                        </>
                        :
                        <>
                            <MenuItem sx={{ borderRadius: '8px', minWidth: MINCOLUMNWIDTH, height: 'max-content' }} onClick={() => { setThing(true); }}>
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