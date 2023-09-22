import { Button, Container, Dialog, DialogContent, Grid, MenuItem, OutlinedInput, Select, SelectChangeEvent, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setOpenCreateWorkspaceModal } from "../../redux/navSlice";


const CreateWorkspaceModal = () => {

    //get these from the nav state slice so we dont have to duplicate the modal many times, as its opened from 3 different locations
    const openModal = useAppSelector((state) => state.nav.openCreateWorkspaceModal);
    const dispatch = useAppDispatch()

    const handleClose = () => {
        dispatch(setOpenCreateWorkspaceModal(false));
    };

    const [workspaceType, setWorkspaceType] = useState('');

    const handleWorkspaceTypeChange = (event: SelectChangeEvent) => {
        setWorkspaceType(event.target.value as string);
    };

    return (
        <Dialog onClose={handleClose} open={openModal} maxWidth={"lg"} fullWidth={true}>
            <DialogContent>
                <Grid container >
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

                                    <Button sx={{ textTransform: 'none' }} fullWidth>
                                        Continue
                                    </Button>

                                </Stack>
                            </form>
                        </Container>
                    </Grid>
                    <Grid item xs={7}>
                        Right side with design grid, should disappear on smaller viewports
                    </Grid>
                </Grid>
            </DialogContent>

        </Dialog >
    );
}

export default CreateWorkspaceModal;