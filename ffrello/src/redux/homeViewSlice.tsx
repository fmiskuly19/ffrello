import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Workspace from '../types/Workspace'

interface HomeSliceProps {
    Workspaces?: Workspace[]
    CurrentWorkspace?: Workspace;
}

const initialState: HomeSliceProps = {
    Workspaces: undefined,
}

export const homeViewSlice = createSlice({
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

export const { setCurrentWorkspace, setWorkspaces } = homeViewSlice.actions

export default homeViewSlice.reducer