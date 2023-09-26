import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Workspace from '../types/Workspace'

interface UserSliceProps {
    Workspaces?: Workspace[]
    CurrentWorkspace?: Workspace;
}

const initialState: UserSliceProps = {
    Workspaces: undefined,
}

export const userSlice = createSlice({
    name: 'data',
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