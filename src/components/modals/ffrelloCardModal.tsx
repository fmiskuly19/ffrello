import { Avatar, Box, Button, Checkbox, Dialog, Divider, IconButton, InputAdornment, Link, ListItemIcon, ListItemText, MenuItem, OutlinedInput, Paper, Stack, TextField, Typography, useTheme } from "@mui/material"
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { addCardCommentThunk, editCommentThunk, editDescriptionThunk, getCardThunk, removeCommentThunk, setIsWatchingModalCard, setOpenFFrelloCardModal, watchCardThunk } from "../../redux/workspaceViewSlice";
import { ApiCallStatus } from "../../types/ApiCallStatus";
import { MoonLoader } from "react-spinners";
import Comment from "../../types/Comment"

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
import AddReactionIcon from '@mui/icons-material/AddReaction';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ArchiveIcon from '@mui/icons-material/Archive';
import IosShareIcon from '@mui/icons-material/IosShare';


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

    const [newComment, setNewCommentValue] = useState("");

    const [isEditingComment, setIsEditingComment] = useState(0);
    const [editedCommentValue, setEditedCommentValue] = useState("");

    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const [editedDescriptionValue, setEditedDescriptionValue] = useState("");

    useEffect(() => {
        setOpenModal(openFFrelloCardModal)

        if (openFFrelloCardModal && cardId > 0)
            dispatch(getCardThunk({ accessToken: accessToken, cardId: cardId }))
    }, [openFFrelloCardModal])

    //re render anytime ffrelloCard changes
    useEffect(() => { }, [ffrelloCard])

    const handleNewCommentKeyPress = (event: any) => {
        if (event.key === 'Enter') {
            createComment();
            event.preventDefault();
        }
    };

    const handleEditCommentKeyPress = (event: any, c: Comment) => {
        if (event.key === 'Enter') {
            handleSaveCommentEdit(c)
            event.preventDefault();
        }
    };

    const handleEditDescriptionKeyPress = (event: any) => {
        if (event.key === 'Enter') {
            handleSaveEditDescription()
            event.preventDefault();
        }
    };

    const createComment = () => {
        setNewCommentValue("")
        dispatch(addCardCommentThunk({ accessToken: accessToken, cardId: cardId, userId: userId, comment: newComment }))
    }

    const handleModalClose = () => {
        //close modal
        dispatch(setOpenFFrelloCardModal({ openModal: false, cardId: 0 }));
        //then reset form
        reset();
    }

    const handleSaveEditDescription = () => {
        setIsEditingDescription(false);
        dispatch(editDescriptionThunk({ accessToken: accessToken, cardId: cardId, newValue: editedDescriptionValue, originalValue: ffrelloCard?.description as string }))
    }

    const handleEditCommentClick = (c: Comment) => {
        setIsEditingComment(c.id as number);
        setEditedCommentValue(c.value);
    }

    const handleEditDescriptionClick = () => {
        setIsEditingDescription(true)
        setEditedDescriptionValue(ffrelloCard?.description as string)
    }

    const handleDeleteClick = (comment: Comment) => {
        dispatch(removeCommentThunk({ accessToken: accessToken, comment: comment }))
    }

    const handleSaveCommentEdit = (comment: Comment) => {
        setIsEditingComment(0);
        setEditedCommentValue("");
        dispatch(editCommentThunk({ accessToken: accessToken, originalComment: comment, newValue: editedCommentValue }))
    }

    const handleWatchClick = () => {
        dispatch(setIsWatchingModalCard(!ffrelloCard?.isUserWatching));
        dispatch(watchCardThunk({ accessToken: accessToken, cardId: cardId, isWatching: !ffrelloCard?.isUserWatching, userId: userId }));
    }

    const reset = () => {
        setNewCommentValue("");
        setIsEditingComment(0);
        setEditedCommentValue("");
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
            <ListItemIcon><ArrowForwardIcon sx={{ width: '20px', height: '20px' }} /></ListItemIcon>
            <ListItemText><Typography variant="body2">Move</Typography></ListItemText>
        </>,
        <>
            <ListItemIcon><ContentCopyIcon sx={{ width: '20px', height: '20px' }} /></ListItemIcon>
            <ListItemText><Typography variant="body2">Copy</Typography></ListItemText>
        </>,
        <>
            <ListItemIcon><ArchiveIcon sx={{ width: '20px', height: '20px' }} /></ListItemIcon>
            <ListItemText><Typography variant="body2">Archive</Typography></ListItemText>
        </>,
        <>
            <ListItemIcon><IosShareIcon sx={{ width: '20px', height: '20px' }} /></ListItemIcon>
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
                    <Box sx={{ width: '70%', maxWidth: '70%' }}>
                        <Stack direction="column" spacing={4}>
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
                                <Stack direction="row" justifyContent="space-between">
                                    <Stack direction="row" spacing={1}>
                                        <DescriptionIcon />
                                        <Typography>Description</Typography>
                                    </Stack>
                                    <Button variant="outlined" size="small" onClick={handleEditDescriptionClick} sx={{ textTransform: 'none' }}>Edit</Button>
                                </Stack>
                                {
                                    isEditingDescription ?
                                        <Stack direction="column" spacing={1}>
                                            <TextField hiddenLabel
                                                size="small"
                                                onKeyDown={handleEditDescriptionKeyPress}
                                                variant="filled"
                                                placeholder="Add a more detailed description..."
                                                value={editedDescriptionValue}
                                                onChange={(e) => { setEditedDescriptionValue(e.target.value) }}
                                                fullWidth
                                                autoFocus />

                                            <Stack direction="row" spacing={1}>
                                                <Button
                                                    size="small"
                                                    color="primary"
                                                    variant="contained"
                                                    onClick={() => handleSaveEditDescription()}
                                                    sx={{ textTransform: 'none' }}>
                                                    Save
                                                </Button>
                                                <Button
                                                    size="small"
                                                    variant="outlined"
                                                    onClick={() => setIsEditingDescription(false)}
                                                    sx={{ textTransform: 'none' }}>
                                                    Cancel
                                                </Button>
                                            </Stack>
                                        </Stack>

                                        :
                                        <Paper sx={{ borderRadius: '8px', width: '100%', padding: '5px' }}>
                                            <Typography variant="body2">
                                                {ffrelloCard.description}
                                            </Typography>
                                        </Paper>
                                }

                            </Stack>
                            <Stack direction="row" justifyContent={"space-between"}>
                                <Stack direction="row" spacing={1}>
                                    <BlurLinearIcon />
                                    <Typography fontWeight="900">Activity</Typography>
                                </Stack>
                                <Button variant="outlined" size="small" sx={{ textTransform: 'none' }}>Show Details</Button>
                            </Stack>
                            <Stack direction="row" alignItems={"center"} spacing={0.5}>
                                <Avatar alt={googleUser?.name} src={googleUser?.pictureUrl} />
                                <TextField
                                    size="small"
                                    variant="filled"
                                    placeholder="Write a comment..."
                                    value={newComment}
                                    onKeyDown={handleNewCommentKeyPress}
                                    onChange={(e) => setNewCommentValue(e.target.value)}
                                    fullWidth
                                    hiddenLabel />
                                {newComment ?
                                    <IconButton
                                        onClick={createComment}
                                        edge="end"
                                    >
                                        <SendIcon />
                                    </IconButton>
                                    : <></>}

                            </Stack>
                            <Stack direction="column" spacing={1}>
                                {ffrelloCard.comments?.map((c) => {
                                    return (
                                        <Stack direction="row" spacing={1}  >
                                            <Avatar alt={c.username} src={c.profilePhotoUrl} sx={{ height: '28px', width: '28px' }} />
                                            <Stack direction="column" sx={{ width: '100%' }}>
                                                <Stack direction="row" alignItems={"flex-end"} spacing={2}>
                                                    <Typography variant="body1">{c.username}</Typography>
                                                    <Typography variant="caption">{c.timestamp}</Typography>
                                                </Stack>

                                                {isEditingComment == c.id as number ?
                                                    <Stack direction="column" spacing={1}>
                                                        <OutlinedInput
                                                            autoFocus
                                                            size="small"
                                                            value={editedCommentValue}
                                                            onChange={(e) => setEditedCommentValue(e.target.value)}
                                                            onKeyDown={(e) => handleEditCommentKeyPress(e, c)} />
                                                        <Stack direction="row" spacing={1}>
                                                            <Button
                                                                size="small"
                                                                color="primary"
                                                                variant="contained"
                                                                onClick={() => handleSaveCommentEdit(c)}
                                                                sx={{ textTransform: 'none' }}>
                                                                Save
                                                            </Button>
                                                            <Button
                                                                size="small"
                                                                variant="outlined"
                                                                onClick={() => setIsEditingComment(0)}
                                                                sx={{ textTransform: 'none' }}>
                                                                Discard Changes
                                                            </Button>
                                                        </Stack>
                                                    </Stack>
                                                    :
                                                    <Paper sx={{ borderRadius: '8px', width: '100%', padding: '5px' }}>
                                                        <Typography variant="body2">
                                                            {c.value}
                                                        </Typography>
                                                    </Paper>
                                                }

                                                <Stack direction="row" alignItems="center" spacing={0.5} >
                                                    <AddReactionIcon sx={{ height: '14px', width: '14px' }} />
                                                    <Divider orientation="vertical" sx={{ height: '50%' }} />
                                                    {/* Add comment id to editing set when clicking on edit */}
                                                    <Link onClick={() => handleEditCommentClick(c)}>
                                                        <Typography variant="caption">Edit</Typography>
                                                    </Link>
                                                    <Typography variant="h6">-</Typography>
                                                    <Link onClick={() => handleDeleteClick(c)}>
                                                        <Typography variant="caption">Delete</Typography>
                                                    </Link>
                                                </Stack>
                                            </Stack>
                                        </Stack>
                                    )
                                })}
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
        <Dialog onClose={handleModalClose} open={openModal} maxWidth={false} scroll="body"
        >
            <Box display="flex"
                sx={{
                    paddingLeft: '20px',
                    paddingRight: '20px',
                    paddingTop: '30px',
                    paddingBottom: '30px',
                    minWidth: '700px',
                    maxWidth: '700px',
                    minHeight: "800px",
                    alignItems: 'stretch',
                }}>
                {modalContent}
            </Box >
        </Dialog >
    )
}

export default FFrelloCardModal;