import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import Workspace from '../types/Workspace'
import User from '../types/User';
import { GetWorkspaces, NewBoard, NewWorkspace, RemoveWorkspace } from '../data/api';
import { ApiCallStatus } from '../types/ApiCallStatus';

interface UserSliceProps {
    Workspaces?: Workspace[]
    CurrentWorkspace?: Workspace;
    User: User,
    workspaceStatus: ApiCallStatus,
    newWorkspaceStatus: ApiCallStatus,
    removeWorkspaceStatus: ApiCallStatus,
    newBoardStatus: ApiCallStatus,
}

const initialState: UserSliceProps = {
    workspaceStatus: ApiCallStatus.Idle,
    newWorkspaceStatus: ApiCallStatus.Idle,
    removeWorkspaceStatus: ApiCallStatus.Idle,
    newBoardStatus: ApiCallStatus.Idle,
    Workspaces: undefined,
    User: { id: 0, userid: 'frankstestworkspace', name: 'Fwank Misk' }
}

export interface newWorkspaceArgs {
    userid: string,
    workspaceName: string,
    theme: string,
    description: string,
}

export interface newBoardArgs {
    userid: string,
    workspaceid: number,
    boardTitle: string,
    visibility: string,
}

export interface getBoard {
    userid: string,
    boardid: number,
}

export interface getWorkspaceArgs {
    userid: string,
    workspaceid: number,
}

export interface removeWorkspaceArgs {
    userid: string,
    workspaceid: number,
    workspace: Workspace,
}

export const getUserWorkspaces = createAsyncThunk(
    '/getUserWorkspaces',
    async (userId: string, thunkAPI) => {
        return await GetWorkspaces(userId, thunkAPI);
    }
)

export const newWorkspace = createAsyncThunk(
    '/newWorkspace',
    async (data: newWorkspaceArgs, thunkAPI) => {
        return await NewWorkspace(data, thunkAPI);
    }
)

export const newBoard = createAsyncThunk(
    '/newBoard',
    async (data: newBoardArgs, thunkAPI) => {
        return await NewBoard(data, thunkAPI);
    }
)

export const removeWorkspace = createAsyncThunk(
    '/removeWorkspace',
    async (data: removeWorkspaceArgs, thunkAPI) => {
        return await RemoveWorkspace(data, thunkAPI);
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCurrentWorkspace: (state, action: PayloadAction<number>) => {
            state.CurrentWorkspace = state.Workspaces?.find(x => x.id == action.payload);
        },
        setNewWorkspaceStatus: (state, action: PayloadAction<ApiCallStatus>) => {
            state.newWorkspaceStatus = action.payload;
        },
        setRemoveWorkspaceStatus: (state, action: PayloadAction<ApiCallStatus>) => {
            state.removeWorkspaceStatus = action.payload;
        },
        setNewBoardStatus: (state, action: PayloadAction<ApiCallStatus>) => {
            state.newBoardStatus = action.payload;
        },
    },
    extraReducers: (builder) => {
        //get workspaces reducers
        builder.addCase(getUserWorkspaces.pending, (state) => {
            state.workspaceStatus = ApiCallStatus.Loading;
        }),
            builder.addCase(getUserWorkspaces.fulfilled, (state, action) => {
                state.Workspaces = action.payload
                state.workspaceStatus = ApiCallStatus.Success;
            }),
            builder.addCase(getUserWorkspaces.rejected, (state) => {
                state.workspaceStatus = ApiCallStatus.Failure;
            })

        //create new workspace reducers
        builder.addCase(newWorkspace.pending, (state) => {
            state.newWorkspaceStatus = ApiCallStatus.Loading;
        }),
            builder.addCase(newWorkspace.fulfilled, (state, action) => {
                //set updated workspaces that is returned after successfully adding a new workspace
                state.Workspaces = action.payload
                state.newWorkspaceStatus = ApiCallStatus.Success;
            }),
            builder.addCase(newWorkspace.rejected, (state) => {
                // Add user to the state array
                state.newWorkspaceStatus = ApiCallStatus.Failure;
            })

        //remove workspace reducers
        builder.addCase(removeWorkspace.pending, (state, action) => {
            state.removeWorkspaceStatus = ApiCallStatus.Loading;

            //temporarily remove workspace from list while api call is loading to make it look like its already deleted 
            state.Workspaces = state.Workspaces?.filter(item => item.id !== action.meta.arg.workspaceid);
        }),
            builder.addCase(removeWorkspace.fulfilled, (state, action) => {
                //set updated workspaces that is returned after successfully removing
                state.Workspaces = action.payload
                state.removeWorkspaceStatus = ApiCallStatus.Success;
            }),
            builder.addCase(removeWorkspace.rejected, (state, action) => {
                state.removeWorkspaceStatus = ApiCallStatus.Failure;

                //add temporarily removed workspace back to list if we failed to delete, make it look like nothing happened
                state.Workspaces = [
                    ...state.Workspaces as Workspace[],
                    action.meta.arg.workspace
                ]
            })


        //create new board reducers
        builder.addCase(newBoard.pending, (state) => {
            state.newBoardStatus = ApiCallStatus.Loading;
        }),
            builder.addCase(newBoard.fulfilled, (state, action) => {
                //set updated workspaces that is returned after successfully removing
                state.Workspaces = action.payload
                state.newBoardStatus = ApiCallStatus.Success;
            }),
            builder.addCase(newBoard.rejected, (state) => {
                state.newBoardStatus = ApiCallStatus.Failure;
            })
    },
})

export const { setNewWorkspaceStatus, setRemoveWorkspaceStatus, setCurrentWorkspace, setNewBoardStatus } = userSlice.actions

export default userSlice.reducer