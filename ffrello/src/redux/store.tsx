import { configureStore } from '@reduxjs/toolkit'
import homeReducer from './homeSlice.tsx'
import themeReducer from './themeSlice.tsx'
import userReducer from './userSlice.tsx'
import workspaceViewReducer from './workspaceViewSlice.tsx'

const store = configureStore({
   reducer: {
      home: homeReducer,
      theme: themeReducer,
      userSlice: userReducer,
      workspaceViewSlice: workspaceViewReducer,
   },
})
export default store;

//this comes from the redux documentation
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch