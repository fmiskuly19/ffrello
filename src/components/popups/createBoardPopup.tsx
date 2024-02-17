import { Box, Button, CircularProgress, Divider, IconButton, Menu, MenuItem, OutlinedInput, Select, Stack, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { newBoard, setNewBoardStatus } from "../../redux/userSlice";
import { ApiCallStatus } from "../../types/ApiCallStatus";


interface CreateBoardMenuProps {
    open: boolean
    anchorEl: HTMLElement | null
    onClose: () => void
}

const CreateBoardMenu = (props: CreateBoardMenuProps) => {

    const dispatch = useAppDispatch()

    const workspaces = useAppSelector((state) => state.userSlice.Workspaces)
    const newBoardStatus = useAppSelector((state) => state.userSlice.newBoardStatus)
    const accessToken = useAppSelector((state) => state.authSlice.accessToken);

    const [workspaceId, setWorkspaceId] = useState("");
    const [boardTitle, setBoardTitle] = useState("");
    const [visibility, setVisibility] = useState("");

    const createNewBoard = async () => {
        dispatch(newBoard({ accessToken: accessToken, boardTitle: boardTitle, visibility: visibility, workspaceid: Number(workspaceId) }))
    }

    let newBoardContent;
    if (newBoardStatus == ApiCallStatus.Loading) {
        newBoardContent =
            <Box display="flex" justifyContent="center">
                <CircularProgress />
            </Box>
    }
    else if (newBoardStatus == ApiCallStatus.Idle) {
        newBoardContent = <>
            <Stack direction="column" spacing={2} sx={{ padding: '15px' }}>
                <Stack direction="column">
                    <Typography id="boardTitle-input-label">Board Title</Typography>
                    <OutlinedInput placeholder="New Board title" size="small"
                        id="boardTitle-input" value={boardTitle} onChange={(event) => setBoardTitle(event.target.value as string)} />
                </Stack>

                <Stack direction="column">
                    <Typography id="workspace-select-label">Workspace</Typography>
                    <Select
                        labelId="workspace-select-label"
                        id="workspace-select"
                        value={workspaceId}
                        onChange={(event) => setWorkspaceId(event.target.value as string)}
                        size="small"
                    >
                        {workspaces?.map((workspace) => {
                            return (<MenuItem value={workspace.id}>{workspace.name} Workspace</MenuItem>)
                        })}
                    </Select>
                </Stack>

                <Stack direction="column">
                    <Typography id="visibility-select-label">Visibility</Typography>
                    <Select
                        labelId="visibility-select-label"
                        id="visibility-select"
                        value={visibility}
                        onChange={(event) => setVisibility(event.target.value as string)}
                        size="small"
                    >
                        <MenuItem value={'Private'}>Private</MenuItem>
                        <MenuItem value={'Public'}>Public</MenuItem>
                        <MenuItem value={'Workspace??'}>Workspace??</MenuItem>
                    </Select>
                </Stack>

                <Stack direction="column" spacing={1}>
                    <Button sx={{ textTransform: 'none' }} onClick={createNewBoard}>Create</Button>
                    <Button sx={{ textTransform: 'none' }}>Start with a Template</Button>
                </Stack>

            </Stack>
        </>
    }

    //this is probably bad for performance but if I take this out of the useEffect it executes twice
    useEffect(() => {
        if (newBoardStatus == ApiCallStatus.Success) {
            props.onClose();
            dispatch(setNewBoardStatus(ApiCallStatus.Idle))
            setWorkspaceId('')
            setVisibility('')
            setBoardTitle('')
        }
        else if (newBoardStatus == ApiCallStatus.Failure) {
            dispatch(setNewBoardStatus(ApiCallStatus.Idle))
            setWorkspaceId('')
            setVisibility('')
            setBoardTitle('')
        }
    }, [newBoardStatus])

    return (

        <Menu open={props.open}
            onClose={props.onClose}
            anchorEl={props.anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'center',
                horizontal: 'left',
            }}
            sx={{ left: '15px' }}>
            <Box display="flex" flexDirection='column' minWidth="275px" minHeight="200px">
                <Stack direction="row" justifyContent="space-between" alignItems="center" display="flex" p="10px" ml="5px" mr="5px">
                    <>&nbsp;</>
                    <Typography variant="h6">Create Board</Typography>
                    <IconButton onClick={props.onClose}>
                        <CloseIcon height="12px" width="12px" />
                    </IconButton>
                </Stack>
                <Divider />
                {newBoardContent}
            </Box>
        </Menu>
    )
}

export default CreateBoardMenu;