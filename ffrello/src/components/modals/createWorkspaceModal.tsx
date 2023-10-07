import { Box, Button, CircularProgress, Container, Dialog, DialogContent, Grid, MenuItem, OutlinedInput, Select, SelectChangeEvent, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setOpenCreateWorkspaceModal } from "../../redux/homeSlice";
import { newWorkspace, setNewWorkspaceStatus } from "../../redux/userSlice";
import { ApiCallStatus } from "../../types/ApiCallStatus";
import handofgod from '../../assets/create.gif'


const CreateWorkspaceModal = () => {

    //get these from the nav state slice so we dont have to duplicate the modal many times, as its opened from 3 different locations
    const openModal = useAppSelector((state) => state.home.openCreateWorkspaceModal);
    const userId = useAppSelector((state) => state.userSlice.User.userid);
    const dispatch = useAppDispatch()

    const handleClose = () => {
        setWorkspaceName('')
        setWorkspaceTheme('')
        setWorkspaceDescription('')

        //how do I prevent it flashing its idle state before closing? 
        dispatch(setOpenCreateWorkspaceModal(false));
        dispatch(setNewWorkspaceStatus(ApiCallStatus.Idle));
    };


    const [workspaceName, setWorkspaceName] = useState('');
    const [workspaceTheme, setWorkspaceTheme] = useState('');
    const [workspaceDescription, setWorkspaceDescription] = useState('');

    const createNewWorkspace = async () => {
        dispatch(newWorkspace({ userid: userId, workspaceName: workspaceName, theme: workspaceTheme, description: workspaceDescription }))
    }

    let modalContent;
    const newWorkspaceStatus = useAppSelector((state) => state.userSlice.newWorkspaceStatus);
    if (newWorkspaceStatus == ApiCallStatus.Idle) {
        modalContent =
            <Grid container sx={{ paddingLeft: '15px' }}>
                <Grid item xs={5} justifyContent={"space-between"} sx={{ paddingBottom: '25px', paddingTop: '50px', paddingLeft: '30px' }}>
                    <Container>
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
                                        onChange={(event) => setWorkspaceTheme(event.target.value as string)}
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
                <Grid item xs={7} sx={{ background: 'linear-gradient(270deg, rgba(255,255,255,1) 0%, rgba(0,45,77,1) 0%, rgba(0,245,255,0) 100%);', padding: '0px' }}>
                    <Box display="flex" flexDirection={"column"} justifyContent={"center"} alignItems={"center"} height="100%">
                        <img src={handofgod} alt="loading..." width="80%" />
                    </Box>
                </Grid>
            </Grid>
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
        modalContent = <Box display="flex" justifyContent="center" alignContent="center" sx={{ minHeight: '300px' }}>
            IT WORKED
        </Box>
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
            <DialogContent sx={{ padding: '0px' }}>
                {modalContent}
            </DialogContent>
        </Dialog >
    );
}

export default CreateWorkspaceModal;