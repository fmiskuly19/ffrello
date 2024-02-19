import { Box, Button, Divider, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { bindMenu, usePopupState, bindTrigger } from "material-ui-popup-state/hooks";
import { useAppDispatch, useAppSelector } from "../../../hooks";

//icons
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CloseIcon from '@mui/icons-material/Close';
import { addChecklistThunk } from "../../../redux/ffrelloCardModalSlice";
import { useState } from "react";

interface chechlistMenuItemProps {
    cardId: number
}

const ChecklistMenuItem = (props: chechlistMenuItemProps) => {
    const dispatch = useAppDispatch()
    const accessToken = useAppSelector((state) => state.authSlice.accessToken);
    var popupstate = usePopupState({ variant: 'popover', popupId: String(props.cardId) });

    const [checklistName, setChecklistName] = useState("")

    const handleNewChecklistKeyPress = (event: any) => {
        if (event.key === 'Enter' && checklistName != "") {
            dispatch(addChecklistThunk({ accessToken: accessToken, cardId: props.cardId, name: checklistName }))
            event.preventDefault();
        }
    };

    return (
        <>
            <MenuItem {...bindTrigger(popupstate)}>
                <ListItemIcon><CheckBoxIcon sx={{ width: '20px', height: '20px' }} /></ListItemIcon>
                <ListItemText><Typography variant="body2">Checklist</Typography></ListItemText>
            </MenuItem >

            <Menu {...bindMenu(popupstate)} sx={{ top: '5px' }}>
                <Box sx={{ minWidth: '250px', mt: '8px', mb: '8px' }}>
                    <Stack direction="column" spacing={1}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" pr="10px" pl="10px">
                            <></>
                            <Typography>Add Checklist</Typography>
                            <IconButton onClick={() => popupstate.close()}>
                                <CloseIcon sx={{ width: '18px', height: '18px' }} />
                            </IconButton>
                        </Stack>
                        <Divider />
                        <Stack direction="column" spacing={2} padding="10px">
                            <Stack direction="column">
                                <Typography>Title</Typography>
                                <TextField variant="outlined" size="small" value={checklistName} onKeyDown={handleNewChecklistKeyPress} onChange={(e) => setChecklistName(e.target.value)} />
                            </Stack>
                            <Stack direction="column">
                                <Typography>Copy items from...</Typography>
                                <Select variant="outlined" size="small" disabled />
                            </Stack>
                            <Box>
                                <Button color="primary" variant="contained" fullWidth={false} disabled={checklistName === ""} onClick={() => dispatch(addChecklistThunk({ accessToken: accessToken, cardId: props.cardId, name: checklistName }))}>Add</Button>
                            </Box>
                        </Stack>
                    </Stack>
                </Box>

            </Menu>

        </>
    )
}

export default ChecklistMenuItem;