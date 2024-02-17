import { Avatar, Box, Button, Checkbox, Dialog, IconButton, InputAdornment, Link, ListItemIcon, ListItemText, MenuItem, Paper, Stack, TextField, Typography, useTheme } from "@mui/material"
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getCardThunk, setIsWatchingModalCard, setOpenFFrelloCardModal, watchCardThunk } from "../../redux/workspaceViewSlice";
import { ApiCallStatus } from "../../types/ApiCallStatus";
import { MoonLoader, SyncLoader } from "react-spinners";

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


const FFrelloCardModal = () => {

    const dispatch = useAppDispatch();
    const theme = useTheme();

    const openFFrelloCardModal = useAppSelector((state) => state.workspaceViewSlice.openFFrelloCardModal);
    const getCardStatus = useAppSelector((state) => state.workspaceViewSlice.getCardStatus);
    const ffrelloCard = useAppSelector((state) => state.workspaceViewSlice.modalCard);

    const userId = useAppSelector((state) => state.authSlice.loggedInUserId)
    const accessToken = useAppSelector((state) => state.authSlice.accessToken)

    const googleUser = useAppSelector((state) => state.authSlice.googleUser);

    const cardId = useAppSelector((state) => state.workspaceViewSlice.ffrelloCardModalId);

    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        setOpenModal(openFFrelloCardModal)

        if (openFFrelloCardModal && cardId > 0)
            dispatch(getCardThunk({ accessToken: accessToken, cardId: cardId }))
    }, [openFFrelloCardModal])

    //re render anytime ffrelloCard changes
    useEffect(() => { }, [ffrelloCard])

    const saveFFrelloCard = () => {

    }

    const createComment = () => {

    }

    const handleModalClose = () => {
        dispatch(setOpenFFrelloCardModal({ openModal: false, cardId: 0 }))
    }

    const handleWatchClick = () => {
        dispatch(setIsWatchingModalCard(!ffrelloCard?.isUserWatching));
        dispatch(watchCardThunk({ accessToken: accessToken, cardId: cardId, isWatching: !ffrelloCard?.isUserWatching, userId: userId }));
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
        modalContent =
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                <MoonLoader color={theme.palette.primary.main as string} />
            </Box>
    }
    else if (getCardStatus == ApiCallStatus.Failure) {
        modalContent = <>Error!!!</>
    }
    else if (getCardStatus == ApiCallStatus.Success && ffrelloCard) {
        modalContent = <>
            <Stack direction="column" sx={{ width: '100%' }} spacing={4}>
                <Stack direction="row" spacing={1} justifyContent={"space-between"} display="flex">
                    <Stack direction="column">
                        <Stack direction="row" alignItems={"center"} spacing={1}>
                            <WidthFullIcon />
                            <Typography variant="h6" fontWeight="900">{ffrelloCard.title}</Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={0.5}>
                            <Typography variant="body2" fontWeight="900">in list</Typography>
                            {/* TODO make this link work and redirect */}
                            <Link>
                                <Typography variant="body1" fontWeight="900">{ffrelloCard.boardListName}</Typography>
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
                            {/* row of actions like notifications and members */}

                            <Stack direction="row" spacing={1}>

                                {ffrelloCard.members?.length as number > 0 ?
                                    <Stack direction="column" spacing={1}>
                                        <Typography variant="body2">Members</Typography>
                                        {ffrelloCard.members?.map((x) => {
                                            return (<Avatar />)
                                        })}
                                    </Stack>
                                    : <></>}

                                <Stack direction="column" spacing={1}>
                                    <Typography variant="body2">Notifications</Typography>
                                    <Stack direction="row">
                                        <Button variant="outlined" sx={{ textTransform: 'none' }} onClick={handleWatchClick}>
                                            <Stack direction="row" justifyContent="center" alignItems="center">
                                                <VisibilityIcon sx={{ mr: '5px' }} />
                                                {ffrelloCard.isUserWatching ?
                                                    <>Watching <CheckBoxIcon sx={{ ml: '5px' }} /></>
                                                    :
                                                    <>Watch</>
                                                }
                                            </Stack>
                                        </Button>
                                    </Stack>

                                </Stack>
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
                                <Avatar alt={googleUser?.name} src={googleUser?.pictureUrl} />
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
                    </Box >
                    <Box sx={{ width: '25%' }}>
                        <Stack spacing={2} direction="column">
                            <Stack spacing={1} direction="column">
                                <Typography>Add to Card</Typography>
                                {MenuItems.map((x) =>
                                    <Paper sx={{ borderRadius: '4px' }} elevation={4}>
                                        <MenuItem>
                                            {x}
                                        </MenuItem>
                                    </Paper>
                                )}
                            </Stack>
                            <Stack spacing={1} direction="column">
                                <Typography>Card actions</Typography>
                                {CardActions.map((x) =>
                                    <Paper sx={{ borderRadius: '4px' }} elevation={4}>
                                        <MenuItem>
                                            {x}
                                        </MenuItem>
                                    </Paper>)}
                            </Stack>
                        </Stack>
                    </Box>
                </Stack >
            </Stack >
        </>
    }

    return (
        <Dialog onClose={handleModalClose} open={openModal} maxWidth={false}>
            <Box display="flex" sx={{
                paddingLeft: '20px',
                paddingRight: '20px',
                paddingTop: '30px',
                paddingBottom: '30px',
                minWidth: '700px',
                minHeight: "600px",
                alignItems: 'stretch',
                overFlowY: 'scroll'
            }}>
                {modalContent}
            </Box >
        </Dialog >
    )
}

export default FFrelloCardModal;