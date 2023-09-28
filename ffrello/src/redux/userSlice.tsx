import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import Workspace from '../types/Workspace'
import User from '../types/User';
import { GetWorkspaces, NewWorkspace } from '../data/api';
import { ApiCallStatus } from '../types/ApiCallStatus';

interface UserSliceProps {
    Workspaces?: Workspace[]
    CurrentWorkspace?: Workspace;
    User: User,
    workspaceStatus: ApiCallStatus,
    newWorkspaceStatus: ApiCallStatus,
}

const initialState: UserSliceProps = {
    workspaceStatus: ApiCallStatus.Idle,
    newWorkspaceStatus: ApiCallStatus.Idle,
    Workspaces: undefined,
    User: { id: 0, userid: 'frankstestworkspace', name: 'Fwank Misk' }
}

export interface newWorkspace {
    userid: string,
    workspaceName: string,
    theme: string,
    description: string,
}

export const getUserWorkspaces = createAsyncThunk(
    '/getUserWorkspaces',
    async (userId: string, thunkAPI) => {
        return await GetWorkspaces(userId, thunkAPI);
    }
)

export const newWorkspace = createAsyncThunk(
    '/newWorkspace',
    async (data: newWorkspace, thunkAPI) => {
        return await NewWorkspace(data, thunkAPI);
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCurrentWorkspace: (state, action: PayloadAction<number>) => {
            state.CurrentWorkspace = state.Workspaces?.find(x => x.id == action.payload);
        },
        setWorkspaces: (state, action: PayloadAction<Workspace[]>) => {
            console.log('workspaces')
            console.log(action.payload)
            state.Workspaces = action.payload;
        },
        setNewWorkspaceStatus: (state, action: PayloadAction<ApiCallStatus>) => {
            state.newWorkspaceStatus = action.payload;
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
            builder.addCase(newWorkspace.fulfilled, (state) => {
                // Add user to the state array
                state.newWorkspaceStatus = ApiCallStatus.Success;
            }),
            builder.addCase(newWorkspace.rejected, (state) => {
                // Add user to the state array
                state.newWorkspaceStatus = ApiCallStatus.Failure;
            })
    },
})

export const { setCurrentWorkspace, setWorkspaces, setNewWorkspaceStatus } = userSlice.actions

export default userSlice.reducer