import { HomePageLeftSidebarProps } from '../components/sidebars/homePageLeftSidebar'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import type { RootState } from '../../app/store' //TODO figure out why we need to use this from store

interface NavSliceProps extends HomePageLeftSidebarProps{
  openCreateWorkspaceModal: boolean,
}

// Define the initial state using that type
const initialState: NavSliceProps = {
  selectedMenu: 'Home',
  selectedWorkspaceMenu: '',
  expandedAccordions: [],
  openCreateWorkspaceModal: false,
}

export const navSlice = createSlice({
  name: 'nav',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setSelectedMenu: (state, action: PayloadAction<string>) => {
      state.selectedMenu = action.payload
    },
    setSelectedWorkspaceMenu: (state, action: PayloadAction<string>) => {
      state.selectedWorkspaceMenu = action.payload
    },
    setExpandedAccordions: (state, action: PayloadAction<string[]>) => {
      state.expandedAccordions = action.payload
    },
    setOpenCreateWorkspaceModal: (state, action: PayloadAction<boolean>) => {
      state.openCreateWorkspaceModal = action.payload
    },
  },
})

export const { setSelectedMenu, setExpandedAccordions, setSelectedWorkspaceMenu, setOpenCreateWorkspaceModal } = navSlice.actions

// // Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default navSlice.reducer