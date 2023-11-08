import { createAsyncThunk, createSlice, current, PayloadAction } from '@reduxjs/toolkit'
import { GetBoardPage, NewBoardListApiCall, NewCardApiCall, RemoveBoardListApiCall, StarBoardApiCall } from '../data/api';
import { ApiCallStatus } from '../types/ApiCallStatus';
import Board from '../types/Board';
import { getBoard as getBoardPageArgs } from './userSlice';
import Workspace from '../types/Workspace';
import { BoardList } from '../types/BoardList';
import FCard from '../types/FCard';

export interface addNewCardArgs {
    userid: string,
    boardListId: number,
    title: string,
}

export interface newBoardListArgs {
    userid: string,
    boardId: number,
    name: string,
}

export interface removeBoardListArgs {
    userId: string,
    boardListId: number,
    boardList: BoardList,
}

export interface starBoardArgs {
    userId: string,
    boardId: number,
    isStarred: boolean,
}

interface WorkspaceViewSliceProps {
    currentBoard?: Board,
    workspace?: Workspace,
    getBoardPageStatus: ApiCallStatus,
    removeBoardListStatus: ApiCallStatus,
    addBoardListStatus: ApiCallStatus,
    starBoardStatus: ApiCallStatus,
    newCardStatus: ApiCallStatus,
}

const initialState: WorkspaceViewSliceProps = {
    getBoardPageStatus: ApiCallStatus.Idle,
    removeBoardListStatus: ApiCallStatus.Idle,
    addBoardListStatus: ApiCallStatus.Idle,
    starBoardStatus: ApiCallStatus.Idle,
    newCardStatus: ApiCallStatus.Idle,
}

export const getBoardPageThunk = createAsyncThunk(
    '/getBoard',
    async (data: getBoardPageArgs, thunkAPI) => {
        return await GetBoardPage(data, thunkAPI);
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

//cards
export const newCardThunk = createAsyncThunk(
    '/newCard',
    async (data: addNewCardArgs, thunkAPI) => {
        return await NewCardApiCall(data, thunkAPI);
    }
)

export const workspaceViewSlice = createSlice({
    name: 'workspaceView',
    initialState,
    reducers: {
        setGetBoardStatus: (state, action: PayloadAction<ApiCallStatus>) => {
            state.getBoardPageStatus = action.payload;
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

            console.log('PENding')

            //this is not right, we should not mutate state directly
            if (state.currentBoard) {
                var currentBoardList = state.currentBoard.boardLists.find(x => x.id == action.meta.arg.boardListId);
                if (!currentBoardList?.cards) {
                    currentBoardList!.cards = [] as FCard[];
                }
                currentBoardList?.cards.push({ boardListId: action.meta.arg.boardListId, title: action.meta.arg.title });
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
    },
})

export const { setGetBoardStatus } = workspaceViewSlice.actions

export default workspaceViewSlice.reducer