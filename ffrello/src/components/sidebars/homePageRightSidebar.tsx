import { Box, CircularProgress, IconButton, Stack, Typography } from "@mui/material"
import StarIcon from '@mui/icons-material/Star';
import AddIcon from '@mui/icons-material/Add';
import BoardMenuItem from "../boardMenuItem";
import HistoryIcon from '@mui/icons-material/History';
import { useAppDispatch, useAppSelector } from "../../hooks";

const HomePageRightSidebar = () => {

    const workspaces = useAppSelector((state) => state.userSlice.Workspaces)
    const dispatch = useAppDispatch()

    return (
        <Box sx={{ margin: '8px' }}>
            <Stack direction="column" spacing={2}>
                <Stack direction="row" justifyContent="flex-start" spacing={.5} alignItems={"center"}>
                    <StarIcon htmlColor="#F8C021" sx={{ fontSize: '16px' }} />
                    <Typography fontSize="12px">Starred</Typography>
                </Stack>
                <Stack direction="column" spacing={2}>
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
                <Stack direction="row" alignContent="center" alignItems="center" spacing={1}>
                    <HistoryIcon style={{ fontSize: '16px' }} />
                    <Typography fontSize="12px">Recently Viewed</Typography>
                </Stack>
                <Box>
                    <BoardMenuItem id={0} name={"Dummy Board"} isStarred={false} Workspace={{ id: 1, name: 'Dummy Workspace name', boards: [] }} />
                </Box>
                <Typography fontSize="12px">Links</Typography>
                <Box>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <IconButton sx={{ borderRadius: '5px' }}>
                            <AddIcon sx={{ fontSize: '20px' }} />
                        </IconButton>
                        <Typography variant="body2">Create a Board</Typography>
                    </Stack>
                </Box>
            </Stack>
        </Box >
    )
}

export default HomePageRightSidebar;