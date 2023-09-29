import { Box, Button, CircularProgress, Container, Dialog, DialogContent, Grid, MenuItem, OutlinedInput, Select, SelectChangeEvent, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setOpenCreateWorkspaceModal } from "../../redux/homeSlice";
import { getUserWorkspaces, newWorkspace, setNewWorkspaceStatus } from "../../redux/userSlice";
import { ApiCallStatus } from "../../types/ApiCallStatus";
import handofgod from '../../assets/create.gif'


const CreateWorkspaceModal = () => {

    //get these from the nav state slice so we dont have to duplicate the modal many times, as its opened from 3 different locations
    const openModal = useAppSelector((state) => state.home.openCreateWorkspaceModal);
    const userId = useAppSelector((state) => state.userSlice.User.userid);
    const dispatch = useAppDispatch()

    const handleClose = () => {
        setIsClosing(true);
        setWorkspaceName('')
        setWorkspaceTheme('')
        setWorkspaceDescription('')
        dispatch(setOpenCreateWorkspaceModal(false));
        dispatch(setNewWorkspaceStatus(ApiCallStatus.Idle));

        if (newWorkspaceStatus == ApiCallStatus.Success) {
            dispatch(getUserWorkspaces('fwank'));
        }
    };

    useEffect(() => {
        setIsClosing(false);
    }, [openModal])


    const [isClosing, setIsClosing] = useState(false);
    const [workspaceName, setWorkspaceName] = useState('');
    const [workspaceTheme, setWorkspaceTheme] = useState('');
    const [workspaceDescription, setWorkspaceDescription] = useState('');

    const createNewWorkspace = async () => {
        dispatch(newWorkspace({ userid: userId, workspaceName: workspaceName, theme: workspaceTheme, description: workspaceDescription }))
    }

    let modalContent;
    const newWorkspaceStatus = useAppSelector((state) => state.userSlice.newWorkspaceStatus);
    if (newWorkspaceStatus == ApiCallStatus.Idle) {
        modalContent = <>
            <Grid item xs={5} justifyContent={"space-between"} >
                <Container sx={{ paddingLeft: '40px', paddingTop: '40px', marginRight: '40px' }}>
                    <form>
                        <Stack direction="column" spacing={3}>
                            <Stack direction="column" spacing={1}>
                                <Typography variant="h4">
                                    Lets Build a Workspace
                                </Typography>
                                <Typography variant="h5">
                                    Boost your productivity by making it easier for everyone to access boards in one location.
                                </Typography>
                            </Stack>

                            <Stack direction="column">
                                <Typography id="workspacename-input-label" fontWeight='600'>Workspace Name</Typography>
                                <OutlinedInput placeholder="Fwanks Workspace" value={workspaceName} onChange={(event) => setWorkspaceName(event.target.value as string)} />
                                <Typography>This is the name of your company, team, or organization</Typography>
                            </Stack>

                            <Stack direction="column">
                                <Typography id="workspacetype-select-label">Workspace Type</Typography>
                                <Select
                                    labelId="workspacetype-select-label"
                                    id="workspacetype-select"
                                    value={workspaceTheme}
                                    onChange={(event) => { console.log(event.target.value); setWorkspaceTheme(event.target.value as string) }}
                                    size="small"
                                >
                                    <MenuItem value={"Otter"}>Otter theme</MenuItem>
                                    <MenuItem value={"Rabbit"}>Rabbit theme</MenuItem>
                                    <MenuItem value={"Birb"}>Birb theme</MenuItem>
                                </Select>
                            </Stack>

                            <Stack direction="column">
                                <Typography id="workspacedescription-input-label">Workspace Description</Typography>
                                <TextField
                                    id="workspacedescription-input"
                                    placeholder="Our team organizes everything here"
                                    value={workspaceDescription}
                                    onChange={(event) => setWorkspaceDescription(event.target.value as string)}
                                    multiline
                                    rows={4}
                                >
                                </TextField>
                                <Typography variant="subtitle2">
                                    Get your members on board with a few words about your Workspace.
                                </Typography>
                            </Stack>

                            <Button sx={{ textTransform: 'none' }} fullWidth onClick={createNewWorkspace}>
                                Continue
                            </Button>

                        </Stack>
                    </form>
                </Container>
            </Grid>
            <Grid item xs={7}>
                <Box display="flex" flexDirection={"column"} justifyContent={"center"} alignItems={"center"} height="100%">
                    <img src={handofgod} alt="loading..." width="80%" />
                </Box>
            </Grid>
        </>
    }
    else if (newWorkspaceStatus == ApiCallStatus.Loading) {
        modalContent = <>
            <Box display="flex" justifyContent="center">
                <CircularProgress />
            </Box>
        </>
    }
    else if (newWorkspaceStatus == ApiCallStatus.Failure) {
        modalContent = <>
            <Box display="flex" justifyContent="center">
                ERROR
            </Box>
        </>
    }
    else if (newWorkspaceStatus == ApiCallStatus.Success) {
        modalContent = <>
            Little cool animation that shows success
        </>
    }

    //when we get a sucessful response, wait 5 seconds and then close the modal
    useEffect(() => {
        if (newWorkspaceStatus == ApiCallStatus.Success) {
            const timer = setTimeout(() => {
                handleClose()
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [newWorkspaceStatus])

    return (
        <Dialog onClose={handleClose} open={openModal} maxWidth={"lg"} fullWidth={true}>
            <DialogContent>
                <Grid container >
                    {isClosing ?
                        <CircularProgress />
                        :
                        modalContent
                    }
                </Grid>
            </DialogContent>
        </Dialog >
    );
}

export default CreateWorkspaceModal;