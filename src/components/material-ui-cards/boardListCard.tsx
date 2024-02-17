import { Avatar, AvatarGroup, Box, Chip, Grid, Paper, Stack, Typography, useTheme } from "@mui/material";
import FFrelloCard from "../../types/FFrelloCard";
import SubjectIcon from '@mui/icons-material/Subject';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import { useDrag, useDrop } from "react-dnd";
import DraggableType from "../../types/draggableType";
import { InsertCardReducerPayload, insertCard, moveCard, setOpenFFrelloCardModal } from "../../redux/workspaceViewSlice";
import { useAppDispatch } from "../../hooks";

interface BoardListCard extends FFrelloCard { }

const BoardListCard = (props: BoardListCard) => {

    const dispatch = useAppDispatch();
    const theme = useTheme();

    const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
        type: DraggableType.FAWD,
        item: {
            cardId: props.id,
            boardListId: props.boardListId
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    }), [props]);

    const [, dropOnCard] = useDrop(() => ({
        accept: DraggableType.FAWD,
        drop: (item: any) => {

            const cardInfo = {
                cardDroppedOnId: props.id,
                cardDropppedOnBoardListId: props.boardListId,
                cardToMoveId: item.cardId,
                cardToMoveBoardListId: item.boardListId
            };

            dispatch(insertCard(cardInfo as InsertCardReducerPayload))
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        }),
        canDrop: (item) => {
            return item.boardListId !== props.boardListId;
        },
    }), [props])

    const handleFFrelloCardClick = () => {
        dispatch(setOpenFFrelloCardModal({ openModal: true, cardId: props.id as number }))
    }

    return (
        <div>
            <div ref={dragPreview} style={{ opacity: isDragging ? 0.5 : 1 }}>
                <Paper
                    key={props.title}
                    elevation={2}
                    role="Handle"
                    ref={drag}
                    onClick={handleFFrelloCardClick}
                    sx={{ ":hover": { border: `1px solid ${theme.palette.primary.main}`, margin: '-1px' }, borderRadius: '5px', padding: '8px' }}>
                    <Stack direction="column" spacing={1} ref={dropOnCard}>
                        <Box>
                            <Typography variant="body2">{props.title}</Typography>
                        </Box>
                        <Stack direction="row" justifyContent="space-between">

                            <Stack direction="row" spacing={1.5} alignItems="center">
                                {props.description ?
                                    <SubjectIcon sx={{ fontSize: '16px' }} />
                                    : <></>
                                }

                                {props.comments ?
                                    <Stack direction="row" alignItems="center" ><ChatBubbleOutlineIcon sx={{ fontSize: '16px' }} />{props.comments?.length}</Stack>
                                    : <></>
                                }
                                {props.attachments ?
                                    <Stack direction="row" alignItems="center"><AttachFileIcon sx={{ fontSize: '16px', transform: 'rotate(45deg)' }} />{props.attachments?.length}</Stack>
                                    : <></>
                                }

                                {props.checklistItems ?
                                    <Stack direction="row" alignItems="center"><LibraryAddCheckIcon sx={{ fontSize: '16px' }} /></Stack>
                                    : <></>
                                }
                            </Stack>

                            {props.members ?
                                <AvatarGroup max={8}>
                                    {props.members.map((x) => {
                                        return (<Avatar alt="Fwank" src="" sx={{ height: '22px', width: '22px' }} />)
                                    })}
                                </AvatarGroup>
                                : <></>
                            }

                        </Stack>
                    </Stack>
                </Paper>
            </div>
        </div>
    )
}

export default BoardListCard;