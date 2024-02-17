import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import {
    AddCardCommentApiCall,
    EditCommentApiCall,
    EditDescriptionApiCall,
    GetBoardApiCall,
    GetCardApiCall,
    MoveCardApiCall,
    NewBoardListApiCall,
    NewCardApiCall,
    RemoveBoardListApiCall,
    RemoveCommentApiCall,
    StarBoardApiCall,
    WatchCardApiCall
} from '../data/api';

import { getBoard as getBoardPageArgs } from './userSlice';

//import types
import Workspace from '../types/Workspace';
import Board from '../types/Board';
import Comment from '../types/Comment'
import FFrelloCard from '../types/FFrelloCard';
import { ApiCallStatus } from '../types/ApiCallStatus';
import { BoardList } from '../types/BoardList';

// #region Thunk Args

export interface FFrelloApiCallArgs {
    accessToken: string,
}

export interface addNewCardArgs extends FFrelloApiCallArgs {
    boardListId: number,
    title: string,
}

export interface moveCardArgs extends FFrelloApiCallArgs {
    boardListId: number,
    cardId: number,
}

export interface getCardArgs extends FFrelloApiCallArgs {
    cardId: number,
}

export interface getCardArgs extends FFrelloApiCallArgs {
    cardId: number,
}

export interface newBoardListArgs extends FFrelloApiCallArgs {
    boardId: number,
    name: string,
}

export interface removeBoardListArgs extends FFrelloApiCallArgs {
    boardListId: number,
    boardList: BoardList,
}

export interface starBoardArgs extends FFrelloApiCallArgs {
    boardId: number,
    isStarred: boolean,
}

export interface watchCardArgs extends FFrelloApiCallArgs {
    cardId: number,
    userId: number,
    isWatching: boolean,
}

export interface addCardCommentArgs extends FFrelloApiCallArgs {
    cardId: number,
    userId: number,
    comment: string,
}

export interface removeCommentArgs extends FFrelloApiCallArgs {
    comment: Comment
}

export interface editCommentArgs extends FFrelloApiCallArgs {
    originalComment: Comment,
    newValue: string,
}

export interface editDescriptionArgs extends FFrelloApiCallArgs {
    cardId: number,
    newValue: string,
    originalValue: string,
}

// #endregion

interface WorkspaceViewSliceProps {
    currentBoard?: Board,
    workspace?: Workspace,

    //api call statuses
    getBoardPageStatus: ApiCallStatus,
    removeBoardListStatus: ApiCallStatus,
    addBoardListStatus: ApiCallStatus,
    starBoardStatus: ApiCallStatus,
    newCardStatus: ApiCallStatus,
    getCardStatus: ApiCallStatus,
    watchCardStatus: ApiCallStatus,
    removeCommentStatus: ApiCallStatus,

    //card modal
    openFFrelloCardModal: boolean,
    ffrelloCardModalId: number,
    modalCard?: FFrelloCard
}

export interface MoveCardReducerPayload {
    cardId: number,
    boardListSourceId: number,
    boardListDestId: number,
}

export interface InsertCardReducerPayload {
    cardToMoveId: number,
    cardToMoveBoardListId: number,
    cardDroppedOnId: number,
    cardDropppedOnBoardListId: number
}

export interface OpenFFrelloCardModalPayload {
    openModal: boolean,
    cardId: number
}

export const getBoardPageThunk = createAsyncThunk(
    '/getBoard',
    async (data: getBoardPageArgs, thunkAPI) => {
        return await GetBoardApiCall(data, thunkAPI);
    }
)

export const starBoardThunk = createAsyncThunk(
    '/starBoard',
    async (data: starBoardArgs, thunkAPI) => {
        return await StarBoardApiCall(data, thunkAPI);
    }
)

//boardlists

export const newBoardListThunk = createAsyncThunk(
    '/newBoardList',
    async (data: newBoardListArgs, thunkAPI) => {
        return await NewBoardListApiCall(data, thunkAPI);
    }
)

export const removeBoardListThunk = createAsyncThunk(
    '/removeBoardList',
    async (data: removeBoardListArgs, thunkAPI) => {
        return await RemoveBoardListApiCall(data, thunkAPI);
    }
)

//#region Cards

export const newCardThunk = createAsyncThunk(
    '/newCard',
    async (data: addNewCardArgs, thunkAPI) => {
        return await NewCardApiCall(data, thunkAPI);
    }
)

export const moveCardThunk = createAsyncThunk(
    '/moveCard',
    async (data: moveCardArgs, thunkAPI) => {
        return await MoveCardApiCall(data, thunkAPI);
    }
)

export const getCardThunk = createAsyncThunk(
    '/getCard',
    async (data: getCardArgs, thunkAPI) => {
        return await GetCardApiCall(data, thunkAPI);
    }
)

export const watchCardThunk = createAsyncThunk(
    '/watchCard',
    async (data: watchCardArgs, thunkAPI) => {
        return await WatchCardApiCall(data, thunkAPI);
    }
)

export const addCardCommentThunk = createAsyncThunk(
    '/addComment',
    async (data: addCardCommentArgs, thunkAPI) => {
        return await AddCardCommentApiCall(data, thunkAPI);
    }
)

export const removeCommentThunk = createAsyncThunk(
    '/removeComment',
    async (data: removeCommentArgs, thunkAPI) => {
        return await RemoveCommentApiCall(data, thunkAPI);
    }
)

export const editCommentThunk = createAsyncThunk(
    '/editComment',
    async (data: editCommentArgs, thunkAPI) => {
        return await EditCommentApiCall(data, thunkAPI);
    }
)

export const editDescriptionThunk = createAsyncThunk(
    '/editDescription',
    async (data: editDescriptionArgs, thunkAPI) => {
        return await EditDescriptionApiCall(data, thunkAPI);
    }
)

editDescriptionThunk

//#endregion


const initialState: WorkspaceViewSliceProps = {
    getBoardPageStatus: ApiCallStatus.Idle,
    removeBoardListStatus: ApiCallStatus.Idle,
    addBoardListStatus: ApiCallStatus.Idle,
    starBoardStatus: ApiCallStatus.Idle,
    newCardStatus: ApiCallStatus.Idle,
    getCardStatus: ApiCallStatus.Idle,
    watchCardStatus: ApiCallStatus.Idle,
    removeCommentStatus: ApiCallStatus.Idle,

    openFFrelloCardModal: false,
    ffrelloCardModalId: 0,
    modalCard: undefined
}

export const workspaceViewSlice = createSlice({
    name: 'workspaceView',
    initialState,
    reducers: {
        setGetBoardStatus: (state, action: PayloadAction<ApiCallStatus>) => {
            state.getBoardPageStatus = action.payload;
        },
        moveCard: (state, action: PayloadAction<MoveCardReducerPayload>) => {

            let updatedBoardLists1 = state.currentBoard?.boardLists.map((list) => {

                if (list.id === action.payload.boardListDestId) {

                    const cardToMove = state.currentBoard?.boardLists.find((list) => list.id === action.payload.boardListSourceId)?.cards.find((card) => card.id === action.payload.cardId);

                    if (cardToMove) {
                        cardToMove.boardListId = action.payload.boardListDestId;
                        const updatedCards = [...list.cards, cardToMove];
                        return { ...list, cards: updatedCards };
                    }
                }

                return list;
            });

            let updatedBoardLists2 = updatedBoardLists1?.map((list) => {

                if (list.id === action.payload.boardListSourceId) {
                    // Remove the card from the source list
                    const updatedCards = list.cards.filter((card) => card.id !== action.payload.cardId);
                    return { ...list, cards: updatedCards };
                }

                return list;
            });

            let updatedBoard = {
                ...state.currentBoard,
                boardLists: updatedBoardLists2,
            };

            state.currentBoard = updatedBoard as Board;
        },
        insertCard: (state, action: PayloadAction<InsertCardReducerPayload>) => {

            //insert card into destination list 
            let updatedListsAfterCardInsert = state.currentBoard?.boardLists.map((list) => {

                if (list.id === action.payload.cardDropppedOnBoardListId) {

                    //find the card that we dropped on
                    const cardDroppedOnIndex = state.currentBoard?.boardLists.find((x) => x.id === action.payload.cardDropppedOnBoardListId)?.cards.findIndex((card) => card.id === action.payload.cardDroppedOnId);
                    const cardToMove = state.currentBoard?.boardLists.find((x) => x.id === action.payload.cardToMoveBoardListId)?.cards.find((card) => card.id === action.payload.cardToMoveId);

                    if (cardToMove && cardDroppedOnIndex !== undefined) {

                        cardToMove.boardListId = action.payload.cardDropppedOnBoardListId;

                        const updatedCards = [
                            ...list.cards.slice(0, cardDroppedOnIndex),   // Items before the insert index
                            cardToMove,                           // New card to be inserted
                            ...list.cards.slice(cardDroppedOnIndex)      // Items after the insert index
                        ];

                        return { ...list, cards: updatedCards };
                    }
                }

                return list;
            });

            //remove card from source list
            let updatedListsAfterCardRemoval = updatedListsAfterCardInsert?.map((list) => {

                if (list.id === action.payload.cardToMoveBoardListId) {
                    // Remove the card from the source list
                    const updatedCards = list.cards.filter((card) => card.id !== action.payload.cardToMoveId);
                    return { ...list, cards: updatedCards };
                }

                return list;
            });

            let updatedBoard = {
                ...state.currentBoard,
                boardLists: updatedListsAfterCardRemoval,
            };

            state.currentBoard = updatedBoard as Board;
        },
        setOpenFFrelloCardModal: (state, action: PayloadAction<OpenFFrelloCardModalPayload>) => {
            state.openFFrelloCardModal = action.payload.openModal;
            state.ffrelloCardModalId = action.payload.cardId;
        },
        setIsWatchingModalCard: (state, action: PayloadAction<boolean>) => {
            state.modalCard = {
                ...state.modalCard as FFrelloCard,
                isUserWatching: action.payload
            }
        },
        setGetCardStatus: (state, action: PayloadAction<ApiCallStatus>) => {
            state.getCardStatus = action.payload;
        },
    },
    extraReducers: (builder) => {

        //get board page ******************************************************************************
        builder.addCase(getBoardPageThunk.pending, (state) => {
            state.getBoardPageStatus = ApiCallStatus.Loading;
        }),
            builder.addCase(getBoardPageThunk.fulfilled, (state, action) => {
                state.currentBoard = action.payload.board;
                state.workspace = action.payload.workspace;
                state.getBoardPageStatus = ApiCallStatus.Success;
            }),
            builder.addCase(getBoardPageThunk.rejected, (state) => {
                state.getBoardPageStatus = ApiCallStatus.Failure;
            })


        //add new board list ***************************************************************************
        builder.addCase(newBoardListThunk.pending, (state, action) => {
            //add boardList to state

            if (state.currentBoard) {
                state.currentBoard =
                {
                    ...state.currentBoard,
                    boardLists: state.currentBoard.boardLists.concat({ id: 0, cards: [], name: action.meta.arg.name })
                }
            }

            state.addBoardListStatus = ApiCallStatus.Loading;
        }),
            builder.addCase(newBoardListThunk.fulfilled, (state, action) => {
                if (state.currentBoard) {
                    state.currentBoard =
                    {
                        ...state.currentBoard,
                        boardLists: state.currentBoard.boardLists.map(boardList => boardList.id == 0 && boardList.name == action.payload.name ? action.payload : boardList)
                    }
                }
                state.addBoardListStatus = ApiCallStatus.Success;
            }),
            builder.addCase(newBoardListThunk.rejected, (state, action) => {
                state.addBoardListStatus = ApiCallStatus.Failure;

                //TODO IMPORTANT
                //remove boardlist because it did not succesffulty create
                if (state.currentBoard) {
                    //temporarily remove the board while we wait for api response
                    state.currentBoard =
                    {
                        ...state.currentBoard,
                        boardLists: state.currentBoard.boardLists.filter(item => item.id != 0 && item.name != action.meta.arg.name)
                    }
                }
            })



        //remove board list *****************************************************************************************
        builder.addCase(removeBoardListThunk.pending, (state, action) => {
            state.removeBoardListStatus = ApiCallStatus.Loading;

            if (state.currentBoard) {
                //temporarily remove the board while we wait for api response
                state.currentBoard =
                {
                    ...state.currentBoard,
                    boardLists: state.currentBoard.boardLists.filter(item => item.id !== action.meta.arg.boardListId)
                }
            }
        }),
            builder.addCase(removeBoardListThunk.rejected, (state, action) => {
                state.removeBoardListStatus = ApiCallStatus.Failure;

                //add board back to array because we did not successfully remove
                if (state.currentBoard) {
                    state.currentBoard =
                    {
                        ...state.currentBoard,
                        boardLists: state.currentBoard.boardLists.concat(action.meta.arg.boardList)
                    }
                }
            }),
            builder.addCase(removeBoardListThunk.fulfilled, (state) => {
                state.removeBoardListStatus = ApiCallStatus.Success;
            })



        //star board list *****************************************************************************************
        builder.addCase(starBoardThunk.pending, (state, action) => {
            //star the board so it updates
            if (state.currentBoard) {
                state.currentBoard = {
                    ...state.currentBoard,
                    isStarred: action.meta.arg.isStarred,
                }
            }
            state.starBoardStatus = ApiCallStatus.Loading;
        }),
            builder.addCase(starBoardThunk.rejected, (state, action) => {
                //change star back to what it was if the api call did not succeed
                if (state.currentBoard) {
                    state.currentBoard = {
                        ...state.currentBoard,
                        isStarred: !action.meta.arg.isStarred,
                    }
                }
                state.starBoardStatus = ApiCallStatus.Failure;
            }),
            builder.addCase(starBoardThunk.fulfilled, (state) => {
                state.starBoardStatus = ApiCallStatus.Success;
            })



        //new card *****************************************************************************************
        builder.addCase(newCardThunk.pending, (state, action) => {

            //this is not right, we should not mutate state directly
            if (state.currentBoard) {
                var currentBoardList = state.currentBoard.boardLists.find(x => x.id == action.meta.arg.boardListId);
                if (!currentBoardList?.cards) {
                    currentBoardList!.cards = [] as FFrelloCard[];
                }
                currentBoardList?.cards.push({
                    boardListId: action.meta.arg.boardListId, title: action.meta.arg.title,
                    boardListName: '',
                    isUserWatching: false,
                    comments: []
                });
            }

            state.newCardStatus = ApiCallStatus.Loading;
        }),
            builder.addCase(newCardThunk.rejected, (state, action) => {
                //remove card from list because it did not successfully create in db
                if (state.currentBoard) {
                    var currentBoardList = state.currentBoard.boardLists.find(x => x.id == action.meta.arg.boardListId);
                    var index = currentBoardList?.cards?.findIndex(x => x.id == 0 && x.title == action.meta.arg.title);
                    currentBoardList?.cards.splice(Number(index), 1);
                }

                state.newCardStatus = ApiCallStatus.Failure;
            }),
            builder.addCase(newCardThunk.fulfilled, (state, action) => {
                //this is not right, we should not mutate state directly
                if (state.currentBoard) {
                    var currentBoardList = state.currentBoard.boardLists.find(x => x.id == action.meta.arg.boardListId);
                    var index = currentBoardList?.cards.findIndex(x => x.id == 0 && x.title == action.meta.arg.title);
                    if (currentBoardList && index) {
                        currentBoardList.cards[Number(index)] = action.payload;
                    }
                }

                state.newCardStatus = ApiCallStatus.Success;
            })



        //get card *****************************************************************************************
        builder.addCase(getCardThunk.pending, (state) => {
            state.getCardStatus = ApiCallStatus.Loading;
        }),
            builder.addCase(getCardThunk.rejected, (state) => {
                state.getCardStatus = ApiCallStatus.Failure;
            }),
            builder.addCase(getCardThunk.fulfilled, (state, action) => {
                state.getCardStatus = ApiCallStatus.Success;
                state.modalCard = action.payload
            })

        //watch card *****************************************************************************************
        builder.addCase(watchCardThunk.pending, (state) => {
            state.watchCardStatus = ApiCallStatus.Loading;
        }),
            builder.addCase(watchCardThunk.rejected, (state) => {
                state.watchCardStatus = ApiCallStatus.Failure;
            }),
            builder.addCase(watchCardThunk.fulfilled, (state) => {
                state.watchCardStatus = ApiCallStatus.Success;
            })

        //add card *****************************************************************************************
        builder.addCase(addCardCommentThunk.fulfilled, (state, action) => {
            state.modalCard = {
                ...state.modalCard as FFrelloCard,
                comments: action.payload
            }
        })

        //remove comment *****************************************************************************************
        builder.addCase(removeCommentThunk.pending, (state, action) => {
            //remove comment while it is pending
            let temp = { ...state.modalCard }
            temp.comments = temp.comments?.filter(comment => comment.id !== action.meta.arg.comment.id);
            state.modalCard = temp as FFrelloCard
        })

        builder.addCase(removeCommentThunk.rejected, (state, action) => {
            //add comment back if it failed
            let temp = { ...state.modalCard }
            temp.comments?.unshift(action.meta.arg.comment)
            state.modalCard = temp as FFrelloCard
        })

        //edit comment *****************************************************************************************
        builder.addCase(editCommentThunk.pending, (state, action) => {
            //replace comment while it is pending
            let temp = { ...state.modalCard }
            temp.comments = temp.comments?.map(c => {
                // If the comment id matches, replace it with the new comment
                if (c.id === action.meta.arg.originalComment.id) {
                    return { ...c, value: action.meta.arg.newValue };
                }
                return c;
            });
            state.modalCard = temp as FFrelloCard
        })

        builder.addCase(editCommentThunk.rejected, (state, action) => {
            //add comment back if it failed
            let temp = { ...state.modalCard }
            temp.comments = temp.comments?.map(c => {
                // If the comment id matches, replace it with the new comment
                if (c.id === action.meta.arg.originalComment.id) {
                    return action.meta.arg.originalComment;
                }
                return c;
            });
            state.modalCard = temp as FFrelloCard
        })

        //edit card decription *****************************************************************************************
        builder.addCase(editDescriptionThunk.pending, (state, action) => {
            //replace description while it is pending
            let temp = { ...state.modalCard }
            temp.description = action.meta.arg.newValue
            state.modalCard = temp as FFrelloCard
        })

        builder.addCase(editDescriptionThunk.rejected, (state, action) => {
            //add description back if it failed
            let temp = { ...state.modalCard }
            temp.description = action.meta.arg.originalValue
            state.modalCard = temp as FFrelloCard
        })
    },
})

export const { setGetBoardStatus, moveCard, insertCard, setOpenFFrelloCardModal, setIsWatchingModalCard } = workspaceViewSlice.actions

export default workspaceViewSlice.reducer