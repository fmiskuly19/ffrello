import { useState } from 'react';
import { useDrop } from 'react-dnd';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { moveCard, newCardThunk } from '../../redux/workspaceViewSlice';

import { Box, Button, IconButton, MenuItem, OutlinedInput, Paper, Stack, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';


import BoardListCard from './boardListCard';
import { newBoardListCard } from '../../routes/boardView/boardPage';
import BoardListActionMenu from '../popups/boardListActionPopup';

import DraggableType from '../../types/draggableType';
import { BoardList } from '../../types/BoardList';

const MINCOLUMNWIDTH = '250px';
const newCardActionsDefault = { boardListId: 0, open: false, value: '' }

const BoardListPaper = (props: BoardList) => {

    const dispatch = useAppDispatch();

    const [newCardActions, setNewCardActions] = useState<newBoardListCard>(newCardActionsDefault);
    const accessToken = useAppSelector((state) => state.authSlice.accessToken)

    const [, drop] = useDrop(() => ({
        accept: DraggableType.FAWD,
        drop: (item: any) => {

            console.log('dropping onto a boardlist!')

            dispatch(moveCard({
                cardId: item.cardId,
                boardListSourceId: item.boardListId,
                boardListDestId: props.id
            }))
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        }),
        canDrop: (item, monitor) => {
            //only drop here if we are not dropping on the same list, use monitor.isOver with shallow: true to only let us drop if the list is the only thing being hovered on
            return item.boardListId !== props.id && monitor.isOver({ shallow: true })
        },
    }))

    return (<>
        <Paper ref={drop} sx={{ minWidth: MINCOLUMNWIDTH, maxWidth: MINCOLUMNWIDTH, padding: '10px', height: 'max-content', borderRadius: '15px' }}>
            <Stack direction="column" spacing={1}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" ml="5px">
                    <Typography variant="h6">{props.name}</Typography>
                    <BoardListActionMenu boardList={props} openAddCard={setNewCardActions} />
                </Stack>


                {props.cards ?
                    <>
                        {props.cards.map((card) => {
                            return (
                                <div>
                                    <Stack direction="column">
                                        <BoardListCard {...card} />
                                    </Stack>
                                </div>
                            )
                        })}
                    </>
                    : null
                }

                {newCardActions.boardListId == props.id && newCardActions.open ?
                    <>
                        <OutlinedInput multiline rows={2} value={newCardActions.value} onChange={(e) => setNewCardActions({ ...newCardActions, value: e.target.value })} />
                        <Stack direction="row" display="flex" alignItems="center">
                            <Button sx={{ textTransform: 'none' }} onClick={() => { dispatch(newCardThunk({ accessToken: accessToken, boardListId: props.id, title: newCardActions.value })); setNewCardActions(newCardActionsDefault) }} >
                                Add Card
                            </Button>
                            <IconButton onClick={() => setNewCardActions({ boardListId: 0, open: false, value: '' })}>
                                <CloseIcon sx={{ height: '18px', width: '18px' }} color='primary' />
                            </IconButton>
                        </Stack>
                    </>
                    :
                    <>
                        <MenuItem sx={{ paddingLeft: '0px', borderRadius: '8px' }} onClick={() => { setNewCardActions({ boardListId: props.id, open: true, value: '' }) }}>
                            <Box display="flex" flexDirection="row" alignItems="center">
                                <AddIcon sx={{ height: '18px', width: '18px', marginRight: '5px' }} />
                                Add a Card
                            </Box>
                        </MenuItem>
                    </>
                }
            </Stack>
        </Paper >


    </>
    )
}

export default BoardListPaper;