import { Box, Button, CircularProgress, IconButton, MenuItem, Skeleton, Stack, Typography } from "@mui/material"
import StarIcon from '@mui/icons-material/Star';
import AddIcon from '@mui/icons-material/Add';
import BoardMenuItem from "../boardMenuItem";
import HistoryIcon from '@mui/icons-material/History';
import { useAppSelector } from "../../hooks";
import { ApiCallStatus } from "../../types/ApiCallStatus";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { useState } from "react";
import CreateBoardMenu from "../menus/createBoardMenu";

const HomePageRightSidebar = () => {

    const [openBoardAnchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [openNewBoardMenu, setOpenNewBoardMenu] = useState(false);

    const handleNewBoardClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
        setOpenNewBoardMenu(true);
    };

    const handleNewBoardClose = () => {
        setAnchorEl(null);
        setOpenNewBoardMenu(false);
    };

    const workspaces = useAppSelector((state) => state.userSlice.Workspaces)

    let starredContent;
    const workspaceStatus = useAppSelector((state) => state.userSlice.workspaceStatus);
    if (workspaceStatus == ApiCallStatus.Loading) {
        starredContent =
            <Box display='flex' flexDirection="column">
                <Box display='flex' flexDirection="row" alignItems="center">
                    <Skeleton variant='circular' width="10px" height="10px" sx={{ marginRight: '5px' }} />
                    <Skeleton width="20%" />
                </Box>
                <Box display='flex' justifyContent="center">
                    <CircularProgress />
                </Box>
            </Box >
    }
    if (workspaceStatus == ApiCallStatus.Failure) {
        starredContent =
            <Box display="flex" flexDirection='column'>
                <Typography fontSize="12px">Boards</Typography>
                <Box display='flex' justifyContent="center">
                    <ReportProblemIcon />
                </Box>
            </Box >
    }
    else if (workspaceStatus == ApiCallStatus.Success) {
        starredContent =
            <>
                <Box sx={{ margin: '8px' }}>
                    <Stack direction="column" spacing={2}>
                        <Stack direction="row" justifyContent="flex-start" spacing={.5} alignItems={"center"}>
                            <StarIcon htmlColor="#F8C021" sx={{ fontSize: '16px' }} />
                            <Typography fontSize="12px">Starred</Typography>
                        </Stack>
                        <Stack direction="column" spacing={2}>
                            {workspaces?.map((workspace) => {
                                return workspace.boards.map((board) => {
                                    if (board.isStarred) {
                                        return (<BoardMenuItem {...board} />)
                                    }
                                })
                            })}
                        </Stack>
                        <Stack direction="row" alignContent="center" alignItems="center" spacing={1}>
                            <HistoryIcon style={{ fontSize: '16px' }} />
                            <Typography fontSize="12px">Recently Viewed</Typography>
                        </Stack>
                        <Box>
                            <BoardMenuItem id={0} name={"Dummy Board"} isStarred={false} Workspace={{ id: 1, name: 'Dummy Workspace name', boards: [] }} />
                        </Box>
                        <Typography fontSize="12px">Links</Typography>
                        <Box component={Button} onClick={handleNewBoardClick}>
                            <Stack direction="row" alignItems="center" spacing={1} >
                                <IconButton sx={{ borderRadius: '5px' }} >
                                    <AddIcon sx={{ fontSize: '20px' }} />
                                </IconButton>
                                <Typography variant="body2">Create a Board</Typography>
                            </Stack>
                        </Box>
                    </Stack>
                </Box >
                <CreateBoardMenu open={openNewBoardMenu} anchorEl={openBoardAnchorEl} onClose={handleNewBoardClose} />
            </>
    }

    return starredContent;
}

export default HomePageRightSidebar;