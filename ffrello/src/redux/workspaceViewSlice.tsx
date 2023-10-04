import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GetBoardPage } from '../data/api';
import { ApiCallStatus } from '../types/ApiCallStatus';
import Board from '../types/Board';
import { getBoard as getBoardPageArgs } from './userSlice';
import Workspace from '../types/Workspace';

interface WorkspaceViewSliceProps {
    currentBoard?: Board,
    workspace?: Workspace,
    getBoardPageStatus: ApiCallStatus,
}

const initialState: WorkspaceViewSliceProps = {
    getBoardPageStatus: ApiCallStatus.Idle,
}

export const getBoardPageThunk = createAsyncThunk(
    '/getBoard',
    async (data: getBoardPageArgs, thunkAPI) => {
        return await GetBoardPage(data, thunkAPI);
    }
)

export const workspaceViewSlice = createSlice({
    name: 'workspaceView',
    initialState,
    reducers: {
        setGetBoardStatus: (state, action: PayloadAction<ApiCallStatus>) => {
            state.getBoardPageStatus = action.payload;
        },
        addBoard: (state, action: PayloadAction<string>) => {
            if (state.currentBoard) {
                state.currentBoard.boardLists = [...state.currentBoard.boardLists, { name: action.payload, cards: [] }]
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getBoardPageThunk.pending, (state) => {
            state.getBoardPageStatus = ApiCallStatus.Loading;
        }),
            builder.addCase(getBoardPageThunk.fulfilled, (state, action) => {

                console.log('action.payload')
                console.log(action.payload)


                state.currentBoard = action.payload.board;
                state.workspace = action.payload.workspace;
                state.getBoardPageStatus = ApiCallStatus.Success;
            }),
            builder.addCase(getBoardPageThunk.rejected, (state) => {
                state.getBoardPageStatus = ApiCallStatus.Failure;
            })
    },
})

export const { setGetBoardStatus, addBoard } = workspaceViewSlice.actions

export default workspaceViewSlice.reducer