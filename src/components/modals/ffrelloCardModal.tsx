import { Avatar, Box, Button, Dialog, IconButton, InputAdornment, Link, ListItemIcon, ListItemText, MenuItem, Stack, TextField, Typography, useTheme } from "@mui/material"
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getCardThunk, setOpenFFrelloCardModal } from "../../redux/workspaceViewSlice";
import { ApiCallStatus } from "../../types/ApiCallStatus";

//icons
import PersonIcon from '@mui/icons-material/Person';
import LabelIcon from '@mui/icons-material/Label';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import BlurLinearIcon from '@mui/icons-material/BlurLinear';
import SendIcon from '@mui/icons-material/Send';
import WidthFullIcon from '@mui/icons-material/WidthFull';
import DescriptionIcon from '@mui/icons-material/Description';
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

const FFrelloCardModal = () => {

    const dispatch = useAppDispatch();
    const theme = useTheme();

    const openFFrelloCardModal = useAppSelector((state) => state.workspaceViewSlice.openFFrelloCardModal);
    const getCardStatus = useAppSelector((state) => state.workspaceViewSlice.getCardStatus);
    const ffrelloCard = useAppSelector((state) => state.workspaceViewSlice.modalCard);

    const userid = useAppSelector((state) => state.userSlice.User.userid)
    const accessToken = useAppSelector((state) => state.authSlice.accessToken)

    const cardId = useAppSelector((state) => state.workspaceViewSlice.ffrelloCardModalId);

    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        setOpenModal(openFFrelloCardModal)

        if (openFFrelloCardModal && cardId > 0)
            dispatch(getCardThunk({ accessToken: accessToken, userid: userid, cardId: cardId }))
    }, [openFFrelloCardModal])

    const saveFFrelloCard = () => {

    }

    const createComment = () => {

    }

    const handleModalClose = () => {
        dispatch(setOpenFFrelloCardModal({ openModal: false, cardId: 0 }))
    }

    const MenuItems = [
        <>
            <ListItemIcon><PersonIcon sx={{ width: '20px', height: '20px' }} /></ListItemIcon>
            <ListItemText><Typography variant="body2">Members</Typography></ListItemText>
        </>,
        <>
            <ListItemIcon><LabelIcon sx={{ width: '20px', height: '20px' }} /></ListItemIcon>
            <ListItemText><Typography variant="body2">Labels</Typography></ListItemText>
        </>,
        <>
            <ListItemIcon><CheckBoxIcon sx={{ width: '20px', height: '20px' }} /></ListItemIcon>
            <ListItemText><Typography variant="body2">Checklist</Typography></ListItemText>
        </>,
        <>
            <ListItemIcon><DateRangeIcon sx={{ width: '20px', height: '20px' }} /></ListItemIcon>
            <ListItemText><Typography variant="body2">Dates</Typography></ListItemText >
        </>,
        <>
            <ListItemIcon><AttachFileIcon sx={{ width: '20px', height: '20px' }} /></ListItemIcon>
            <ListItemText><Typography variant="body2">Attachments</Typography></ListItemText>
        </>,
    ]

    const CardActions = [
        <>
            <ListItemIcon><PersonIcon sx={{ width: '20px', height: '20px' }} /></ListItemIcon>
            <ListItemText><Typography variant="body2">Move</Typography></ListItemText>
        </>,
        <>
            <ListItemIcon><LabelIcon sx={{ width: '20px', height: '20px' }} /></ListItemIcon>
            <ListItemText><Typography variant="body2">Copy</Typography></ListItemText>
        </>,
        <>
            <ListItemIcon><CheckBoxIcon sx={{ width: '20px', height: '20px' }} /></ListItemIcon>
            <ListItemText><Typography variant="body2">Archive</Typography></ListItemText>
        </>,
        <>
            <ListItemIcon><DateRangeIcon sx={{ width: '20px', height: '20px' }} /></ListItemIcon>
            <ListItemText><Typography variant="body2">Share</Typography></ListItemText>
        </>,
    ]

    let modalContent = <></>

    //if we have an id thats not 0, go get the card from the database/api
    if (getCardStatus == ApiCallStatus.Loading) {
        modalContent = <>Loading!!!</>
    }
    else if (getCardStatus == ApiCallStatus.Failure) {
        modalContent = <>Error!!!</>
    }
    else if (getCardStatus == ApiCallStatus.Success && ffrelloCard) {
        modalContent = <>
            <Box display="flex" sx={{ paddingLeft: '20px', paddingRight: '20px', paddingTop: '30px', paddingBottom: '30px', minWidth: '700px' }}>
                <Stack direction="column" sx={{
                    width: '100%'
                }} spacing={4}>
                    <Stack direction="row" spacing={1} justifyContent={"space-between"} display="flex">
                        <Stack direction="column">
                            <Stack direction="row" alignItems={"center"} spacing={1}>
                                <WidthFullIcon />
                                <Typography variant="h6" fontWeight="900">{ffrelloCard.title}</Typography>
                            </Stack>
                            <Stack direction="row" alignItems="center" spacing={0.5}>
                                <Typography variant="body1" fontWeight="900">in list</Typography>
                                {/* TODO make this link work and redirect */}
                                <Link>
                                    <Typography variant="h6" fontWeight="900">{ffrelloCard.boardListName}</Typography>
                                </Link>
                            </Stack>
                        </Stack>
                        <IconButton size="small" onClick={handleModalClose} sx={{ maxHeight: '30px', maxWidth: '30px' }} >
                            <CloseIcon sx={{ maxHeight: '18px', maxWidth: '18px' }} />
                        </IconButton>
                    </Stack>
                    <Stack direction="row" justifyContent={"space-between"}>
                        <Box sx={{ width: '70%' }}>
                            <Stack direction="column" spacing={2}>
                                <Stack direction="column" spacing={1}>
                                    <Stack direction="row" spacing={1}>
                                        <NotificationsActiveIcon />
                                        <Typography>Notifications</Typography>
                                    </Stack>
                                    <Button fullWidth={false} variant="outlined" sx={{ textTransform: 'none', maxWidth: '30%' }}>
                                        <VisibilityIcon sx={{ mr: '5px' }} />Watch
                                    </Button>
                                </Stack>
                                <Stack direction="column" spacing={1}>
                                    <Stack direction="row" spacing={1}>
                                        <DescriptionIcon />
                                        <Typography>Description</Typography>
                                    </Stack>
                                    <TextField hiddenLabel size="small" variant="filled" fullWidth={true} placeholder="Add a more detailed description..." value={ffrelloCard.description} />
                                </Stack>
                                <Stack direction="row" justifyContent={"space-between"}>
                                    <Stack direction="row" spacing={1}>
                                        <BlurLinearIcon />
                                        <Typography fontWeight="900">Activity</Typography>
                                    </Stack>
                                    <Button variant="outlined" sx={{ textTransform: 'none' }}>Show Details</Button>
                                </Stack>
                                <Stack direction="row" alignItems={"center"} spacing={0.5}>
                                    <Avatar />
                                    <TextField hiddenLabel size="small" variant="filled" fullWidth={true} placeholder="Write a comment..."  >
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={createComment}
                                                edge="end"
                                            >
                                                <SendIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    </TextField>
                                </Stack>
                            </Stack>
                        </Box>
                        <Box sx={{ width: '25%' }}>
                            <Stack spacing={2} direction="column">
                                <Stack spacing={1} direction="column">
                                    <Typography>Add to Card</Typography>
                                    {MenuItems.map((x) =>
                                        <MenuItem sx={{ backgroundColor: theme.palette.background.paper, borderRadius: '4px' }}>
                                            {x}
                                        </MenuItem>)}
                                </Stack>
                                <Stack spacing={1} direction="column">
                                    <Typography>Card actions</Typography>
                                    {CardActions.map((x) =>
                                        <MenuItem sx={{ backgroundColor: theme.palette.background.paper, borderRadius: '4px' }}>
                                            {x}
                                        </MenuItem>)}
                                </Stack>
                            </Stack>

                        </Box>
                    </Stack >
                </Stack>
            </Box >
        </>
    }

    return (
        <Dialog onClose={handleModalClose} open={openModal} maxWidth={false}>
            {modalContent}
        </Dialog>
    )
}

export default FFrelloCardModal;