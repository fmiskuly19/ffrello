import { Box, Button, CircularProgress, Container, Dialog, DialogContent, Grid, MenuItem, OutlinedInput, Select, SelectChangeEvent, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setOpenCreateWorkspaceModal } from "../../redux/homeSlice";
import { newWorkspace, setNewWorkspaceStatus } from "../../redux/userSlice";
import { ApiCallStatus } from "../../types/ApiCallStatus";


const CreateWorkspaceModal = () => {

    //get these from the nav state slice so we dont have to duplicate the modal many times, as its opened from 3 different locations
    const openModal = useAppSelector((state) => state.home.openCreateWorkspaceModal);
    const userId = useAppSelector((state) => state.userSlice.User.userid);
    const dispatch = useAppDispatch()

    const handleClose = () => {
        dispatch(setOpenCreateWorkspaceModal(false));
        dispatch(setNewWorkspaceStatus(ApiCallStatus.Idle));
    };

    const [workspaceType, setWorkspaceType] = useState('');

    const handleWorkspaceTypeChange = (event: SelectChangeEvent) => {
        setWorkspaceType(event.target.value as string);
    };

    const createNewWorkspace = async () => {
        dispatch(newWorkspace({ userid: userId, workspaceName: 'franksworkspacename', theme: 'Otter', description: 'random Description' }))
    }

    let modalContent;
    const newWorkspaceStatus = useAppSelector((state) => state.userSlice.newWorkspaceStatus);
    if (newWorkspaceStatus == ApiCallStatus.Idle) {
        modalContent = <>
            <Grid item xs={5} >
                <Container sx={{ marginLeft: '40px', paddingTop: '40px' }}>
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
                                <OutlinedInput placeholder="Fwanks Workspace" />
                                <Typography>This is the name of your company, team, or organization</Typography>
                            </Stack>

                            <Stack direction="column">
                                <Typography id="workspacetype-select-label">Workspace Type</Typography>
                                <Select
                                    labelId="workspacetype-select-label"
                                    id="workspacetype-select"
                                    value={workspaceType}
                                    onChange={handleWorkspaceTypeChange}
                                    size="small"
                                >
                                    <MenuItem value={10}>Otter theme</MenuItem>
                                    <MenuItem value={20}>Rabbit theme</MenuItem>
                                    <MenuItem value={30}>Birb theme</MenuItem>
                                </Select>
                            </Stack>

                            <Stack direction="column">
                                <Typography id="workspacedescription-input-label">Workspace Description</Typography>
                                <TextField
                                    id="workspacedescription-input"
                                    placeholder="Our team organizes everything here"
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
                Right side with design grid, should disappear on smaller viewports
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

    return (
        <Dialog onClose={handleClose} open={openModal} maxWidth={"lg"} fullWidth={true}>
            <DialogContent>
                <Grid container >
                    {modalContent}
                </Grid>
            </DialogContent>

        </Dialog >
    );
}

export default CreateWorkspaceModal;