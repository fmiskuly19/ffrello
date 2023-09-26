import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Workspace from '../types/Workspace'
import User from '../types/User';

interface UserSliceProps {
    Workspaces?: Workspace[]
    CurrentWorkspace?: Workspace;
    User: User
}

const initialState: UserSliceProps = {
    Workspaces: undefined,
    User: { id: 0, userid: 'frankstestworkspace', }
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCurrentWorkspace: (state, action: PayloadAction<number>) => {
            //todo fix this, should return workspaces.where(x=> x.id == action.payload), idk how to do this in js
            state.CurrentWorkspace = state.Workspaces?.find(x => x.id == action.payload);
        },
        setWorkspaces: (state, action: PayloadAction<Workspace[]>) => {
            state.Workspaces = action.payload;
        },
    },
})

export const { setCurrentWorkspace, setWorkspaces } = userSlice.actions

export default userSlice.reducer