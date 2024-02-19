import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FFrelloApiCallArgs } from './workspaceViewSlice';
import { AddCardCommentApiCall, AddChecklistApiCall, AddChecklistItemApiCall, EditCommentApiCall, EditDescriptionApiCall, GetCardApiCall, RemoveChecklistApiCall, RemoveCommentApiCall, SetChecklistItemValueApiCall, WatchCardApiCall } from '../data/api';
import { ApiCallStatus } from '../types/ApiCallStatus';
import FFrelloCard from '../types/FFrelloCard';
import Comment from '../types/Comment';

export interface getCardArgs extends FFrelloApiCallArgs {
    cardId: number,
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

export interface addChecklistArgs extends FFrelloApiCallArgs {
    cardId: number,
    name: string,
}

export interface removeChecklistArgs extends FFrelloApiCallArgs {
    checklistId: number,
}

export interface addChecklistItemArgs extends FFrelloApiCallArgs {
    checklistId: number,
    name: string,
}

export interface setChecklistItemValueArgs extends FFrelloApiCallArgs {
    checklistItemId: number,
    value: boolean,
}

export interface OpenFFrelloCardModalPayload {
    openModal: boolean,
    cardId: number
}

///////////////////////////////////////////////////////

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

export const addChecklistThunk = createAsyncThunk(
    '/addChecklist',
    async (data: addChecklistArgs, thunkAPI) => {
        return await AddChecklistApiCall(data, thunkAPI);
    }
)

export const removeChecklistThunk = createAsyncThunk(
    '/removeChecklist',
    async (data: removeChecklistArgs, thunkAPI) => {
        return await RemoveChecklistApiCall(data, thunkAPI);
    }
)

export const addChecklistItemThunk = createAsyncThunk(
    '/addChecklistItem',
    async (data: addChecklistItemArgs, thunkAPI) => {
        return await AddChecklistItemApiCall(data, thunkAPI);
    }
)

export const setChecklistItemValueThunk = createAsyncThunk(
    '/setChecklistItem',
    async (data: setChecklistItemValueArgs, thunkAPI) => {
        return await SetChecklistItemValueApiCall(data, thunkAPI);
    }
)


/////////////////////////////////////////////////////

interface ffrelloCardModalSliceProps {
    getCardStatus: ApiCallStatus,
    watchCardStatus: ApiCallStatus,
    removeCommentStatus: ApiCallStatus,
    addChecklistStatus: ApiCallStatus,
    removeChecklistStatus: ApiCallStatus,
    addChecklistItemStatus: ApiCallStatus,
    setChecklistItemValueStatus: ApiCallStatus,

    //card modal
    openFFrelloCardModal: boolean,
    ffrelloCardModalId: number,
    modalCard?: FFrelloCard
}

// Define the initial state using that type
const initialState: ffrelloCardModalSliceProps = {
    getCardStatus: ApiCallStatus.Idle,
    watchCardStatus: ApiCallStatus.Idle,
    removeCommentStatus: ApiCallStatus.Idle,
    addChecklistStatus: ApiCallStatus.Idle,
    removeChecklistStatus: ApiCallStatus.Idle,
    addChecklistItemStatus: ApiCallStatus.Idle,
    setChecklistItemValueStatus: ApiCallStatus.Idle,

    openFFrelloCardModal: false,
    ffrelloCardModalId: 0,
    modalCard: undefined
}

export const ffrelloCardModalSlice = createSlice({
    name: 'ffrelloCardModal',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setIsWatchingModalCard: (state, action: PayloadAction<boolean>) => {
            state.modalCard = {
                ...state.modalCard as FFrelloCard,
                isUserWatching: action.payload
            }
        },
        setGetCardStatus: (state, action: PayloadAction<ApiCallStatus>) => {
            state.getCardStatus = action.payload;
        },
        setOpenFFrelloCardModal: (state, action: PayloadAction<OpenFFrelloCardModalPayload>) => {
            state.openFFrelloCardModal = action.payload.openModal;
            state.ffrelloCardModalId = action.payload.cardId;
        },
    },
    extraReducers: (builder) => {

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

        //add checklist *****************************************************************************************
        builder.addCase(addChecklistThunk.pending, (state) => {
            state.addChecklistStatus = ApiCallStatus.Loading;
        }),
            builder.addCase(addChecklistThunk.rejected, (state) => {
                state.addChecklistStatus = ApiCallStatus.Failure;
            }),
            builder.addCase(addChecklistThunk.fulfilled, (state) => {
                state.addChecklistStatus = ApiCallStatus.Success;
            })

        //remove checklist *****************************************************************************************
        builder.addCase(removeChecklistThunk.pending, (state) => {
            state.removeChecklistStatus = ApiCallStatus.Loading;
        }),
            builder.addCase(removeChecklistThunk.rejected, (state) => {
                state.removeChecklistStatus = ApiCallStatus.Failure;
            }),
            builder.addCase(removeChecklistThunk.fulfilled, (state) => {
                state.removeChecklistStatus = ApiCallStatus.Success;
            })

        //add checklist item *****************************************************************************************
        builder.addCase(addChecklistItemThunk.pending, (state) => {
            state.addChecklistItemStatus = ApiCallStatus.Loading;
        }),
            builder.addCase(addChecklistItemThunk.rejected, (state) => {
                state.addChecklistItemStatus = ApiCallStatus.Failure;
            }),
            builder.addCase(addChecklistItemThunk.fulfilled, (state) => {
                state.addChecklistItemStatus = ApiCallStatus.Success;
            })

        //set checklist item *****************************************************************************************
        builder.addCase(setChecklistItemValueThunk.pending, (state) => {
            state.setChecklistItemValueStatus = ApiCallStatus.Loading;
        }),
            builder.addCase(setChecklistItemValueThunk.rejected, (state) => {
                state.setChecklistItemValueStatus = ApiCallStatus.Failure;
            }),
            builder.addCase(setChecklistItemValueThunk.fulfilled, (state) => {
                state.setChecklistItemValueStatus = ApiCallStatus.Success;
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

export const { setIsWatchingModalCard, setGetCardStatus, setOpenFFrelloCardModal } = ffrelloCardModalSlice.actions

export default ffrelloCardModalSlice.reducer